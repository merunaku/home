/* ==========================================================================
   HEADER COMPARTIDO - PLATAFORMA PROFE DIEGO 2026
   Inyecta el encabezado institucional automáticamente en cualquier página.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Detectamos la URL completa actual y la pasamos a minúsculas
    const currentURL = window.location.href.toLowerCase();
    
    // Título por defecto (en caso de que estén en la raíz o en la 404)
    let tituloDinamico = "Plataforma de Estudios 2026"; 

    // Condicionales exactas para cada una de tus páginas
    if (currentURL.includes("normativa")) {
        tituloDinamico = "Normativa Eléctrica 2026";
    } else if (currentURL.includes("instind") || currentURL.includes("instrumentacion")) {
        tituloDinamico = "Instrumentación Eléctrica 2026";
    } else if (currentURL.includes("calculadora")) {
        tituloDinamico = "Calculadora de Notas 2026";
    } else if (currentURL.includes("404") || currentURL.includes("home") || currentURL.endsWith("github.io/")) {
        tituloDinamico = "Plataforma de Estudios 2026";
    }

    // Inyección del HTML en el contenedor correspondiente
    const headerContainer = document.getElementById("global-header");
    if (headerContainer) {
        // Validamos que exista CONFIG para evitar errores si no se ha cargado el script
        const logoSrc = typeof CONFIG !== 'undefined' ? CONFIG.LOGO_URL : "logo.png";
        const nombreInstitucion = typeof CONFIG !== 'undefined' ? CONFIG.INSTITUCION : "IPCHILE";

        headerContainer.innerHTML = `
            <header>
                <div class="header-container">
                    <div class="header-flex">
                        <div class="brand-layout" style="cursor: pointer;" onclick="window.location.href='https://merunaku.github.io/home/index.html'">
                            <!-- Aquí se inyecta la ruta dinámica del config.js -->
                            <img src="${logoSrc}" alt="Logo" onerror="this.style.display='none'">
                            <span>ProfeDiego</span>
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
