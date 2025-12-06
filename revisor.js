// revisor.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" }); // Asegúrate de tener dotenv instalado: npm install dotenv

const MODEL_NAME = "gemini-1.5-flash";

/**
 * Construye el prompt para la revisión de código.
 * @param {string} codeContent - El contenido del código a revisar.
 * @param {string} fileName - El nombre del archivo para dar contexto.
 * @returns {string} El prompt completo.
 */
function buildPrompt(codeContent, fileName) {
  return `
    Actúa como un Tech Lead Senior experto en desarrollo web, especialmente con React, Vite y JavaScript moderno.
    Tu tarea es revisar el siguiente código del archivo "${fileName}".

    Quiero que te enfoques en los siguientes puntos:
    1.  **Errores Potenciales:** Identifica bugs, lógica incorrecta o posibles problemas en tiempo de ejecución.
    2.  **Optimización:** Sugiere mejoras de rendimiento, legibilidad y mantenibilidad.
    3.  **Buenas Prácticas:** Asegúrate de que el código siga las convenciones y buenas prácticas actuales de React y JavaScript.
    4.  **Refactorización:** Si encuentras código repetitivo o complejo, propón una refactorización clara con ejemplos.

    Sé claro, conciso y proporciona ejemplos de código cuando sea necesario.

    Aquí está el código:
    \`\`\`javascript
    ${codeContent}
    \`\`\`
  `;
}

/**
 * Función principal que orquesta la revisión del código.
 */
async function reviewCode() {
  // 1. Validar la API Key
  if (!process.env.GOOGLE_API_KEY) {
    console.error(
      "❌ Error: La variable de entorno GOOGLE_API_KEY no está definida."
    );
    process.exit(1);
  }

  // 2. Validar el argumento del archivo
  const filePath = process.argv[2];
  if (!filePath) {
    console.error(
      "❌ Error: Debes proporcionar la ruta a un archivo. \nEjemplo: node revisor.js src/features/about/aboutData.js"
    );
    process.exit(1);
  }

  // 3. Leer el contenido del archivo
  let codeContent;
  try {
    codeContent = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(
      `❌ Error: No se pudo leer el archivo en la ruta: ${filePath}`
    );
    process.exit(1);
  }

  // 4. Interactuar con la API de Gemini
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const fileName = path.basename(filePath);
    const prompt = buildPrompt(codeContent, fileName);

    console.log(`🤖 Analizando "${fileName}" con Gemini...`);

    const result = await model.generateContent(prompt);
    console.log("\n--- 📝 Reporte de Revisión ---\n");
    console.log(result.response.text());
  } catch (error) {
    console.error("\n❌ Error al conectar con la API de Gemini.");
    if (error.message.includes("API key not valid")) {
      console.error(
        "   Asegúrate de que tu GOOGLE_API_KEY sea correcta y esté bien configurada en tu archivo .env.local"
      );
    } else {
      console.error("   Detalles:", error.message);
    }
  }
}

reviewCode();
