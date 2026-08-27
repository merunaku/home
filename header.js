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

    // Título dinámico: se busca en window.HEADER_INFO, que config.js ya
    // dejó listo como parte del mismo llamado a getBootstrap (ya NO se
    // hace un tercer fetch acá, para no sumar otro round-trip a Apps Script).
    const tituloDinamico = obtenerTituloDinamico(currentURL);

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

// Busca en window.HEADER_INFO (cargado por config.js junto con getBootstrap)
// una fila cuyo "ramo" aparezca dentro de la URL actual, y devuelve su
// título. Si no encuentra ninguna coincidencia, usa la fila "default"; si
// eso también falla, cae en un título fijo como último respaldo.
function obtenerTituloDinamico(currentURL) {
    const TITULO_RESPALDO = "Plataforma de Estudios 2026";
    const filas = window.HEADER_INFO;

    if (!Array.isArray(filas) || filas.length === 0) return TITULO_RESPALDO;

    const coincidencia = filas.find(f => f.ramo !== "default" && currentURL.includes(String(f.ramo).toLowerCase()));
    if (coincidencia) return coincidencia.titulo;

    const porDefecto = filas.find(f => f.ramo === "default");
    return porDefecto ? porDefecto.titulo : TITULO_RESPALDO;
}
