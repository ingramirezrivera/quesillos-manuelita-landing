// revisor.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" }); // AsegÃºrate de tener dotenv instalado: npm install dotenv

const MODEL_NAME = "gemini-1.5-flash";

/**
 * Construye el prompt para la revisiÃ³n de cÃ³digo.
 * @param {string} codeContent - El contenido del cÃ³digo a revisar.
 * @param {string} fileName - El nombre del archivo para dar contexto.
 * @returns {string} El prompt completo.
 */
function buildPrompt(codeContent, fileName) {
  return `
    ActÃºa como un Tech Lead Senior experto en desarrollo web, especialmente con React, Vite y JavaScript moderno.
    Tu tarea es revisar el siguiente cÃ³digo del archivo "${fileName}".

    Quiero que te enfoques en los siguientes puntos:
    1.  **Errores Potenciales:** Identifica bugs, lÃ³gica incorrecta o posibles problemas en tiempo de ejecuciÃ³n.
    2.  **OptimizaciÃ³n:** Sugiere mejoras de rendimiento, legibilidad y mantenibilidad.
    3.  **Buenas PrÃ¡cticas:** AsegÃºrate de que el cÃ³digo siga las convenciones y buenas prÃ¡cticas actuales de React y JavaScript.
    4.  **RefactorizaciÃ³n:** Si encuentras cÃ³digo repetitivo o complejo, propÃ³n una refactorizaciÃ³n clara con ejemplos.

    SÃ© claro, conciso y proporciona ejemplos de cÃ³digo cuando sea necesario.

    AquÃ­ estÃ¡ el cÃ³digo:
    \`\`\`javascript
    ${codeContent}
    \`\`\`
  `;
}

/**
 * FunciÃ³n principal que orquesta la revisiÃ³n del cÃ³digo.
 */
async function reviewCode() {
  // 1. Validar la API Key
  if (!process.env.GOOGLE_API_KEY) {
    console.error(
      "âŒ Error: La variable de entorno GOOGLE_API_KEY no estÃ¡ definida."
    );
    process.exit(1);
  }

  // 2. Validar el argumento del archivo
  const filePath = process.argv[2];
  if (!filePath) {
    console.error(
      "âŒ Error: Debes proporcionar la ruta a un archivo. \nEjemplo: node revisor.js src/features/about/aboutData.js"
    );
    process.exit(1);
  }

  // 3. Leer el contenido del archivo
  let codeContent;
  try {
    codeContent = fs.readFileSync(filePath, "utf-8");
  } catch {
    console.error(
      `âŒ Error: No se pudo leer el archivo en la ruta: ${filePath}`
    );
    process.exit(1);
  }

  // 4. Interactuar con la API de Gemini
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const fileName = path.basename(filePath);
    const prompt = buildPrompt(codeContent, fileName);

    console.log(`ðŸ¤– Analizando "${fileName}" con Gemini...`);

    const result = await model.generateContent(prompt);
    console.log("\n--- ðŸ“ Reporte de RevisiÃ³n ---\n");
    console.log(result.response.text());
  } catch (error) {
    console.error("\nâŒ Error al conectar con la API de Gemini.");
    if (error.message.includes("API key not valid")) {
      console.error(
        "   AsegÃºrate de que tu GOOGLE_API_KEY sea correcta y estÃ© bien configurada en tu archivo .env.local"
      );
    } else {
      console.error("   Detalles:", error.message);
    }
  }
}

reviewCode();

