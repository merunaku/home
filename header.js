/* ==========================================================================
   HEADER COMPARTIDO - PLATAFORMA PROFE DIEGO 2026
   Inyecta el encabezado institucional automáticamente en cualquier página.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", async () => {
    // Sincronización con las promesas de config.js
    if (window.headerInfoListo) {
        await window.headerInfoListo;
    } else if (window.configListo) {
        await window.configListo;
    }

    // Título dinámico según ramo detectado en URL o parámetro ?ramo=
    const tituloDinamico = obtenerTituloDinamico();

    // Contenedor principal
    const headerContainer = document.getElementById("global-header");
    if (headerContainer) {
        // Variables de configuración con fallback
        const cfg = typeof CONFIG !== 'undefined' ? CONFIG : {};
        const logoSrc = cfg.LOGO_URL || "logo.png";
        const nombreInstitucion = cfg.INSTITUCION || "IPCHILE";
        const nombreProfesor = cfg.PROFESOR || "ProfeDiego";
        const urlHome = cfg.URL_BASE || "index.html";

        headerContainer.innerHTML = `
            <header>
                <div class="header-container">
                    <div class="header-flex">
                        <div class="brand-layout" style="cursor: pointer;" onclick="window.location.href='${escapeHTML(urlHome)}'">
                            <img src="${escapeHTML(logoSrc)}" alt="Logo" onerror="this.style.display='none'">
                            <span>${escapeHTML(nombreProfesor)}</span>
                        </div>
                        <div class="title-layout">
                            <h1>${escapeHTML(tituloDinamico)}</h1>
                            <p>Herramientas del Estudiante &bull; ${escapeHTML(nombreInstitucion)}</p>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
});

// Detecta el título dinámico evaluando ?ramo= primero y luego la URL completa
function obtenerTituloDinamico() {
    const TITULO_RESPALDO = "Plataforma de Estudios 2026";
    const filas = window.HEADER_INFO;

    if (!Array.isArray(filas) || filas.length === 0) return TITULO_RESPALDO;

    // 1. Verificar si existe parámetro ?ramo= en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const ramoParam = (urlParams.get('ramo') || '').trim().toLowerCase();

    if (ramoParam) {
        const coincidenciaParam = filas.find(f => String(f.ramo).toLowerCase() === ramoParam);
        if (coincidenciaParam) return coincidenciaParam.titulo;
    }

    // 2. Verificar por presencia en la URL completa (fallback)
    const currentURL = window.location.href.toLowerCase();
    const coincidenciaURL = filas.find(f => f.ramo !== "default" && currentURL.includes(String(f.ramo).toLowerCase()));
    if (coincidenciaURL) return coincidenciaURL.titulo;

    // 3. Título por defecto
    const porDefecto = filas.find(f => f.ramo === "default");
    return porDefecto ? porDefecto.titulo : TITULO_RESPALDO;
}

// Escape de HTML para mitigar errores de renderizado
function escapeHTML(str) {
    return (str ?? '').toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
