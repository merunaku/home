// ==========================================
// CONFIGURACIÓN DINÁMICA - PLATAFORMAS 2026
// ==========================================

// ESTA ES LA ÚNICA RUTA QUE NECESITAS (La de tu Google Sheet Unificado)
const API_UNIFICADA = "AQUI_PEGA_LA_URL_DE_TU_NUEVA_WEB_APP";

// Esta variable guardará toda la info que viene del Google Sheet
let CONFIG = {};

// Función para descargar la configuración antes de iniciar la página
async function cargarConfiguracion() {
    try {
        console.log("Cargando configuración desde Google Sheets...");
        
        // Le pedimos a la API la acción "getConfig"
        const respuesta = await fetch(API_UNIFICADA + "?action=getConfig");
        CONFIG = await respuesta.json();
        
        // Convertimos los textos que deben ser números para evitar errores matemáticos
        CONFIG.EXIGENCIA_MINIMA = parseFloat(CONFIG.EXIGENCIA_MINIMA);
        CONFIG.TOTAL_PREGUNTAS = parseInt(CONFIG.TOTAL_PREGUNTAS);
        
        console.log("¡Configuración cargada con éxito!", CONFIG);
        return true;
        
    } catch (error) {
        console.error("Error crítico al cargar la configuración:", error);
        return false;
    }
}
