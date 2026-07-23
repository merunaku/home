// ==========================================
// CONFIGURACIÓN GLOBAL DE LAS PLATAFORMAS 2026
// ==========================================

const CONFIG = {
    // 1. Identificación Institucional
    INSTITUCION: "IPCHILE",
    PROFESOR: "ProfeDiego",
    ANIO: "2026",
    URL_BASE: "https://merunaku.github.io/404.html",
    
    // 2. Parámetros Generales de Evaluación
    EXIGENCIA_MINIMA: 0.6, // 60% para nota 4.0
    TOTAL_PREGUNTAS: 20,
    
    // 3. Conexiones con Google Sheets (Web Apps de Apps Script)
    APIS: {
        NORMATIVA: "https://script.google.com/macros/s/AKfycbwMC0t6JF4bqocgi1D1msvnC0iEg5V6lURmQGB0bkNNLM1f099VD7y0vz7mHUftLk9Q0Q/exec",
        INSTRUMENTACION: "https://script.google.com/macros/s/AKfycbxfAYkuxXaXYLOuuJvC6IKO4NujyVM3X-NrVRa9sQJomJsT8HQ9NRNZawLoxVaD38jb/exec",
    },
    
    // 4. Origen de los archivos de preguntas (CSVs en GitHub)
    REPOSITORIO_CSV: {
        NORMATIVA: "preguntasnormativa.csv",
        INSTRUMENTACION: "preguntasinstind.csv"
    }, // <-- ¡AQUÍ FALTABA ESTA COMA!

    // 5. Ruta absoluta del logo:
    LOGO_URL: "https://merunaku.github.io/home/logo.png"
};

// Congelamos el objeto para evitar modificaciones accidentales en tiempo de ejecución
Object.freeze(CONFIG);
