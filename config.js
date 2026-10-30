// ==========================================
// CONFIGURACIÓN DINÁMICA - PLATAFORMAS 2026
// ==========================================
// RUTA DEL GOOGLE SHEET UNIFICADO
const API_UNIFICADA = "https://script.google.com/macros/s/AKfycbz-EHeSJb7LGGCjEfnUytjDCYf89tyQojOquOhcA1Ns1DircIMA8AxQ1_dKML0jpwhlFw/exec";

// Guardará la configuración global (pestaña "config")
let CONFIG = {};

// Información de títulos por materia (pestaña "header"), consumida por header.js
window.HEADER_INFO = [];

// ------------------------------------------------------------------
// CARGA CONSOLIDADA "getBootstrap" (config + estilos + header)
// ------------------------------------------------------------------
async function cargarBootstrap() {
    try {
        console.log("Cargando configuración, estilos y header desde Google Sheets...");

        const respuesta = await fetch(API_UNIFICADA + "?action=getBootstrap");
        const datos = await respuesta.json();

        // 1. Configuración general con resguardo contra valores no numéricos
        CONFIG = datos.config || {};
        CONFIG.EXIGENCIA_MINIMA = parseFloat(CONFIG.EXIGENCIA_MINIMA) || 0.6;
        CONFIG.TOTAL_PREGUNTAS = parseInt(CONFIG.TOTAL_PREGUNTAS, 10) || 20;
        CONFIG.CANTIDAD_RANKING = parseInt(CONFIG.CANTIDAD_RANKING, 10) || 50;

        // 2. Paleta de colores (inyecta o actualiza el <style> dinámico)
        aplicarEstilos(datos.estilos || {});

        // 3. Información de cabeceras por materia
        window.HEADER_INFO = Array.isArray(datos.header) ? datos.header : [];

        console.log("¡Bootstrap cargado con éxito!", CONFIG);
        return true;

    } catch (error) {
        console.error("Error crítico al cargar el bootstrap:", error);
        return false;
    }
}

// Inyecta o reemplaza el bloque <style id="dynamic-theme"> con las variables CSS
function aplicarEstilos(estilos) {
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
        let styleTag = document.getElementById('dynamic-theme');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme';
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = `:root {\n${reglasCSS}}`;
        console.log("Paleta de colores dinámica aplicada.");
    }
}

// Promesas para control de asincronía en scripts dependientes
window.configListo = cargarBootstrap();
window.estilosListos = window.configListo;
window.headerInfoListo = window.configListo;
