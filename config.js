// ==========================================
// CONFIGURACIÓN GLOBAL DE LAS PLATAFORMAS 2026
// ==========================================

const CONFIG = {
    // 1. Identificación Institucional
    INSTITUCION: "IPCHILE",
    PROFESOR: "ProfeDiego",
    URL_BASE: "https://merunaku.github.io/404.html",
    
    // 2. Parámetros Generales de Evaluación
    EXIGENCIA_MINIMA: 0.6, // 60% para nota 4.0
    TOTAL_PREGUNTAS: 20,
    
    // 3. Conexiones con Google Sheets (Web Apps de Apps Script)
    // Reemplaza estas URLs con los scripts correspondientes a cada hoja
    APIS: {
        NORMATIVA: "https://script.google.com/macros/s/AKfycbxXuHwc-oPc9Sf3sXf2M9HCkLjiuEEn0uLmRVn3EzNvFtihGtrI8PgtlRP5FBLWaj4EWw/exec",
        INSTRUMENTACION: "https://script.google.com/macros/s/AKfycbw46HZO4J-9mJonYU_qB_fkW27jjZs6F-TO67abPBwksyknCi8Yu-eNT9WZpNsrHhSG/exec",
    },
    
    // 4. Origen de los archivos de preguntas (CSVs en GitHub)
    REPOSITORIO_CSV: {
        NORMATIVA: "preguntasnormativa.csv",
        INSTRUMENTACION: "preguntasinstind.csv"
    }
};

// Congelamos el objeto para evitar modificaciones accidentales en tiempo de ejecución
Object.freeze(CONFIG);
