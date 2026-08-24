// ==========================================
// CONFIGURACIÓN DINÁMICA - PLATAFORMAS 2026
// ==========================================
// ESTA ES LA ÚNICA RUTA QUE NECESITAS (La de tu Google Sheet Unificado)
const API_UNIFICADA = "https://script.google.com/macros/s/AKfycbwHoK1Lou7DEKtNeYHbjAa33fxwDkLJ8jSwrEvficlchgKBxR-yPVtCXgtCFPTXtfhk0g/exec";

// Esta variable guardará toda la info que viene del Google Sheet (pestaña "config")
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

// Descarga la paleta de colores desde la pestaña "styles" del Sheet e
// inyecta un <style> que sobreescribe las variables CSS definidas en
// :root dentro de styles.css (--primary-color, --secondary-color, etc.).
// Así se puede cambiar toda la paleta institucional editando el Sheet,
// sin tocar styles.css ni redesplegar nada.
async function aplicarEstilosDinamicos() {
    try {
        const respuesta = await fetch(API_UNIFICADA + "?action=getStyles");
        const estilos = await respuesta.json();

        // Mapeo clave del Sheet -> variable CSS
        const mapaVariables = {
            PRIMARY_COLOR: '--primary-color',
            PRIMARY_DARK: '--primary-dark',
            SECONDARY_COLOR: '--secondary-color',
            BG_COLOR: '--bg-color',
            CARD_BG: '--card-bg',
            TEXT_COLOR: '--text-color',
            SUCCESS_COLOR: '--success-color',
            ERROR_COLOR: '--error-color'
        };

        let reglasCSS = '';
        for (const clave in mapaVariables) {
            if (estilos[clave]) {
                reglasCSS += `${mapaVariables[clave]}: ${estilos[clave]};\n`;
            }
        }

        if (reglasCSS) {
            const styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme';
            styleTag.innerHTML = `:root {\n${reglasCSS}}`;
            document.head.appendChild(styleTag);
            console.log("Paleta de colores dinámica aplicada.");
        }

        return true;
    } catch (error) {
        // Si falla, el sitio simplemente se queda con los colores por
        // defecto de styles.css. No es un error crítico.
        console.warn("No se pudo aplicar la paleta dinámica, se usan los colores por defecto:", error);
        return false;
    }
}

// Se disparan automáticamente apenas se carga este script (no hay que
// esperar a window.onload de la página). Cualquier otro script (header.js,
// el propio cuestionario, etc.) puede hacer `await window.configListo` o
// `await window.estilosListos` para asegurarse de que ya terminaron, sin
// disparar una segunda descarga.
window.configListo = cargarConfiguracion();
window.estilosListos = aplicarEstilosDinamicos();
