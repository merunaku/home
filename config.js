// ==========================================
// CONFIGURACIÓN DINÁMICA - PLATAFORMAS 2026
// ==========================================
// ESTA ES LA ÚNICA RUTA QUE NECESITAS (La de tu Google Sheet Unificado)
const API_UNIFICADA = "https://script.google.com/macros/s/AKfycbz-EHeSJb7LGGCjEfnUytjDCYf89tyQojOquOhcA1Ns1DircIMA8AxQ1_dKML0jpwhlFw/exec";

// Esta variable guardará toda la info que viene del Google Sheet (pestaña "config")
let CONFIG = {};

// Info de títulos por materia (pestaña "header" del Sheet), la usa header.js.
// Se llena acá para no tener que pedirla de nuevo por separado.
window.HEADER_INFO = [];

// ------------------------------------------------------------------
// UNA SOLA LLAMADA AL BACKEND (antes eran 3: getConfig + getStyles +
// getHeaderInfo, una detrás de otra). Ahora se piden todas juntas con
// "getBootstrap", que además el backend cachea 5 minutos — así, en
// época de pruebas, la mayoría de los alumnos recibe respuesta casi
// instantánea sin que Apps Script tenga que releer el Sheet cada vez.
// ------------------------------------------------------------------
async function cargarBootstrap() {
    try {
        console.log("Cargando configuración, estilos y header desde Google Sheets...");

        const respuesta = await fetch(API_UNIFICADA + "?action=getBootstrap");
        const datos = await respuesta.json();

        // 1. Configuración general
        CONFIG = datos.config || {};
        CONFIG.EXIGENCIA_MINIMA = parseFloat(CONFIG.EXIGENCIA_MINIMA);
        CONFIG.TOTAL_PREGUNTAS = parseInt(CONFIG.TOTAL_PREGUNTAS);

        // 2. Paleta de colores (inyecta el <style> dinámico)
        aplicarEstilos(datos.estilos || {});

        // 3. Info de títulos por materia, para que header.js no tenga
        //    que pedirla aparte.
        window.HEADER_INFO = Array.isArray(datos.header) ? datos.header : [];

        console.log("¡Bootstrap cargado con éxito!", CONFIG);
        return true;

    } catch (error) {
        console.error("Error crítico al cargar el bootstrap:", error);
        return false;
    }
}

// Inyecta un <style> que sobreescribe las variables CSS definidas en
// :root dentro de styles.css (--primary-color, --secondary-color, etc.),
// a partir de lo que venga en la pestaña "styles" del Sheet. Así se puede
// cambiar la paleta institucional editando el Sheet, sin tocar styles.css.
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
        const styleTag = document.createElement('style');
        styleTag.id = 'dynamic-theme';
        styleTag.innerHTML = `:root {\n${reglasCSS}}`;
        document.head.appendChild(styleTag);
        console.log("Paleta de colores dinámica aplicada.");
    }
}

// Se dispara automáticamente apenas se carga este script (no hay que
// esperar a window.onload de la página). Cualquier otro script (header.js,
// el propio cuestionario, etc.) puede hacer `await window.configListo`
// para asegurarse de que CONFIG, los estilos y window.HEADER_INFO ya
// estén listos, sin disparar una segunda descarga.
//
// Se mantienen "estilosListos" y "headerInfoListo" como alias de la MISMA
// promesa, por compatibilidad con código anterior que los esperaba por
// separado — awaitear una promesa ya resuelta no cuesta una llamada extra.
window.configListo = cargarBootstrap();
window.estilosListos = window.configListo;
window.headerInfoListo = window.configListo;
