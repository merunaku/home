/* ==========================================================================
   HEADER COMPARTIDO - PLATAFORMA PROFE DIEGO 2026
   Inyecta el encabezado institucional automáticamente en cualquier página.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", async () => {
    // Esperamos a que config.js termine de cargar CONFIG desde el Sheet
    // (y de paso, a que se aplique la paleta de colores dinámica).
    if (window.configListo) {
        await window.configListo;
    }
    if (window.estilosListos) {
        await window.estilosListos;
    }

    // Detectamos la URL completa actual y la pasamos a minúsculas
    const currentURL = window.location.href.toLowerCase();

    // Título dinámico: se busca en la pestaña "header" del Sheet
    // (columnas: ramo | titulo) en vez de estar hardcodeado acá.
    const tituloDinamico = await obtenerTituloDinamico(currentURL);

    // Inyección del HTML en el contenedor correspondiente
    const headerContainer = document.getElementById("global-header");
    if (headerContainer) {
        // Validamos que exista CONFIG para evitar errores si no se ha cargado el script
        const logoSrc = typeof CONFIG !== 'undefined' ? CONFIG.LOGO_URL : "logo.png";
        const nombreInstitucion = typeof CONFIG !== 'undefined' ? CONFIG.INSTITUCION : "IPCHILE";
        const nombreProfesor = typeof CONFIG !== 'undefined' ? CONFIG.PROFESOR : "ProfeDiego";
        headerContainer.innerHTML = `
            <header>
                <div class="header-container">
                    <div class="header-flex">
                        <div class="brand-layout" style="cursor: pointer;" onclick="window.location.href='https://merunaku.github.io/home/index.html'">
                            <!-- Aquí se inyecta la ruta dinámica del config.js -->
                            <img src="${logoSrc}" alt="Logo" onerror="this.style.display='none'">
                            <span>${nombreProfesor}</span>
                        </div>
                        <div class="title-layout">
                            <h1>${tituloDinamico}</h1>
                            <p>Herramientas del Estudiante &bull; ${nombreInstitucion}</p>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
});

// Busca en la pestaña "header" del Sheet (vía getHeaderInfo) una fila cuyo
// "ramo" aparezca dentro de la URL actual, y devuelve su título. Si no
// encuentra ninguna coincidencia, usa la fila "default"; si eso también
// falla (o el fetch falla), cae en un título fijo como último respaldo.
async function obtenerTituloDinamico(currentURL) {
    const TITULO_RESPALDO = "Plataforma de Estudios 2026";

    if (typeof API_UNIFICADA === 'undefined' || !API_UNIFICADA || API_UNIFICADA.includes('AQUI_PEGA')) {
        return TITULO_RESPALDO;
    }

    try {
        const respuesta = await fetch(API_UNIFICADA + "?action=getHeaderInfo");
        const filas = await respuesta.json();

        if (!Array.isArray(filas)) return TITULO_RESPALDO;

        const coincidencia = filas.find(f => f.ramo !== "default" && currentURL.includes(f.ramo.toLowerCase()));
        if (coincidencia) return coincidencia.titulo;

        const porDefecto = filas.find(f => f.ramo === "default");
        return porDefecto ? porDefecto.titulo : TITULO_RESPALDO;

    } catch (error) {
        console.error("Error al obtener título dinámico:", error);
        return TITULO_RESPALDO;
    }
}
