<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("X-Frame-Options: DENY");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Allow: POST, OPTIONS");
    http_response_code(204);
    exit;
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Configuracion local opcional (server-only).
 * Debe devolver un array asociativo:
 * return [
 *   'RECAPTCHA_SECRET_KEY' => '...',
 *   'CONTACT_ALLOWED_ORIGINS' => 'https://dominio.com,https://www.dominio.com',
 *   'CONTACT_FROM_EMAIL' => 'no-reply@dominio.com',
 * ];
 */
$localConfig = [];
$localConfigPath = __DIR__ . DIRECTORY_SEPARATOR . "contact.config.php";
if (is_file($localConfigPath)) {
    $loaded = require $localConfigPath;
    if (is_array($loaded)) {
        $localConfig = $loaded;
    }
}

function getEnvValue(string $key): string
{
    global $localConfig;

    $value = getenv($key);
    if (is_string($value) && trim($value) !== "") {
        return trim($value);
    }

    if (isset($localConfig[$key]) && is_string($localConfig[$key])) {
        return trim($localConfig[$key]);
    }

    return "";
}

function cleanLine(string $value): string
{
    $value = str_replace(["\r", "\n"], " ", $value);
    return trim($value);
}

function textLength(string $value): int
{
    if (function_exists("mb_strlen")) {
        return mb_strlen($value, "UTF-8");
    }
    return strlen($value);
}

function verifyRecaptcha(string $token, string $remoteIp): array
{
    $secret = getEnvValue("RECAPTCHA_SECRET_KEY");
    if ($secret === "") {
        return [
            "ok" => false,
            "error" => "missing-secret",
            "codes" => [],
        ];
    }

    $payload = http_build_query([
        "secret" => $secret,
        "response" => $token,
        "remoteip" => $remoteIp,
    ]);

    $url = "https://www.google.com/recaptcha/api/siteverify";
    $responseBody = "";

    if (function_exists("curl_init")) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        $curlResponse = curl_exec($ch);
        if ($curlResponse === false) {
            curl_close($ch);
            return [
                "ok" => false,
                "error" => "transport-error",
                "codes" => [],
            ];
        }
        $responseBody = (string) $curlResponse;
        curl_close($ch);
    } else {
        $context = stream_context_create([
            "http" => [
                "method" => "POST",
                "header" => "Content-type: application/x-www-form-urlencoded\r\n",
                "content" => $payload,
                "timeout" => 8,
            ],
        ]);
        $result = @file_get_contents($url, false, $context);
        $responseBody = is_string($result) ? $result : "";
    }

    if ($responseBody === "") {
        return [
            "ok" => false,
            "error" => "empty-response",
            "codes" => [],
        ];
    }

    $decoded = json_decode($responseBody, true);
    if (!is_array($decoded)) {
        return [
            "ok" => false,
            "error" => "invalid-json",
            "codes" => [],
        ];
    }

    if (!empty($decoded["success"])) {
        return [
            "ok" => true,
            "error" => "",
            "codes" => [],
        ];
    }

    $codes = [];
    if (!empty($decoded["error-codes"]) && is_array($decoded["error-codes"])) {
        foreach ($decoded["error-codes"] as $code) {
            if (is_string($code) && $code !== "") {
                $codes[] = $code;
            }
        }
    }

    return [
        "ok" => false,
        "error" => "verification-failed",
        "codes" => $codes,
    ];
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Allow: POST, OPTIONS");
    respond(405, ["ok" => false, "error" => "Metodo no permitido"]);
}

$allowedOriginsRaw = getEnvValue("CONTACT_ALLOWED_ORIGINS");
if ($allowedOriginsRaw !== "" && isset($_SERVER["HTTP_ORIGIN"])) {
    $allowedOrigins = array_filter(array_map("trim", explode(",", $allowedOriginsRaw)));
    if (!in_array($_SERVER["HTTP_ORIGIN"], $allowedOrigins, true)) {
        respond(403, ["ok" => false, "error" => "Origen no permitido"]);
    }
}

$rawBody = file_get_contents("php://input");
if (!is_string($rawBody) || $rawBody === "") {
    respond(400, ["ok" => false, "error" => "Solicitud vacia"]);
}
if (strlen($rawBody) > 30000) {
    respond(413, ["ok" => false, "error" => "Solicitud demasiado grande"]);
}

$data = json_decode($rawBody, true);
if (!is_array($data)) {
    respond(400, ["ok" => false, "error" => "JSON invalido"]);
}

$name = cleanLine((string) ($data["name"] ?? ""));
$phone = cleanLine((string) ($data["phone"] ?? ""));
$email = cleanLine((string) ($data["email"] ?? ""));
$message = trim((string) ($data["message"] ?? ""));
$website = cleanLine((string) ($data["website"] ?? ""));
$recaptchaToken = cleanLine((string) ($data["recaptchaToken"] ?? ""));
$remoteIp = cleanLine((string) ($_SERVER["REMOTE_ADDR"] ?? ""));

if ($website !== "") {
    respond(400, ["ok" => false, "error" => "Solicitud invalida"]);
}
if (!preg_match("/^[\\p{L}\\p{M}\\s'.-]{2,120}$/u", $name)) {
    respond(422, ["ok" => false, "error" => "Nombre invalido"]);
}
if ($phone === "" || !preg_match("/^[0-9+\\-().\\s]{7,40}$/", $phone)) {
    respond(422, ["ok" => false, "error" => "Telefono invalido"]);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    respond(422, ["ok" => false, "error" => "Correo invalido"]);
}
if (textLength($message) < 10 || textLength($message) > 3000) {
    respond(422, ["ok" => false, "error" => "Mensaje invalido"]);
}
if ($recaptchaToken === "" || strlen($recaptchaToken) > 5000) {
    respond(422, ["ok" => false, "error" => "reCAPTCHA invalido"]);
}

// Rate limiting basico por IP (ventana de 10 min, max 8 envios).
$rateWindowSeconds = 600;
$rateLimit = 8;
$ipKey = hash("sha256", $remoteIp . "|" . ($_SERVER["HTTP_USER_AGENT"] ?? ""));
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . "qm_contact_" . $ipKey . ".json";
$now = time();
$events = [];

if (is_file($rateFile)) {
    $stored = @file_get_contents($rateFile);
    $decoded = is_string($stored) ? json_decode($stored, true) : null;
    if (is_array($decoded)) {
        foreach ($decoded as $ts) {
            if (is_int($ts) && $ts > ($now - $rateWindowSeconds)) {
                $events[] = $ts;
            }
        }
    }
}

if (count($events) >= $rateLimit) {
    respond(429, ["ok" => false, "error" => "Demasiados intentos. Intenta mas tarde."]);
}

$events[] = $now;
@file_put_contents($rateFile, json_encode($events), LOCK_EX);

    $recaptchaResult = verifyRecaptcha($recaptchaToken, $remoteIp);
if (empty($recaptchaResult["ok"])) {
    $errorCode = isset($recaptchaResult["error"]) && is_string($recaptchaResult["error"])
        ? $recaptchaResult["error"]
        : "unknown-error";
    $providerCodes = [];
    if (isset($recaptchaResult["codes"]) && is_array($recaptchaResult["codes"])) {
        $providerCodes = $recaptchaResult["codes"];
    }
    $providerInfo = count($providerCodes) > 0 ? (" (" . implode(", ", $providerCodes) . ")") : "";
    respond(400, ["ok" => false, "error" => "No se pudo validar reCAPTCHA: " . $errorCode . $providerInfo]);
}

$to = "contacto@quesillosmanuelita.com";
$from = getEnvValue("CONTACT_FROM_EMAIL");
if ($from === "") {
    $from = "no-reply@quesillosmanuelita.com";
}

$subject = "Nuevo mensaje de contacto - Quesillos Manuelita";
$safeMessage = str_replace(["\r\n", "\r"], "\n", $message);

$body = "Nuevo formulario de contacto\n";
$body .= "===========================\n";
$body .= "Nombre: " . $name . "\n";
$body .= "Correo: " . $email . "\n";
$body .= "Telefono: " . ($phone !== "" ? $phone : "No informado") . "\n";
$body .= "IP: " . ($remoteIp !== "" ? $remoteIp : "No disponible") . "\n";
$body .= "Fecha: " . gmdate("Y-m-d H:i:s") . " UTC\n\n";
$body .= "Mensaje:\n" . $safeMessage . "\n";

$headers = [
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "From: Quesillos Manuelita Web <" . $from . ">",
    "Reply-To: " . $email,
    "X-Mailer: PHP/" . phpversion(),
];

$sent = @mail($to, "=?UTF-8?B?" . base64_encode($subject) . "?=", $body, implode("\r\n", $headers));
if (!$sent) {
    respond(500, ["ok" => false, "error" => "No se pudo enviar el mensaje"]);
}

respond(200, ["ok" => true]);
