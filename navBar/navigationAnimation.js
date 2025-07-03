// Navigation système pour Triapps
// Gestion centralisée de la navigation et du chargement de contenu

class TriappsNavigation {
    constructor() {
        this.ANIMATION_DURATION = 500;
        this.FADE_DELAY = 30;
        this.init();
    }

    init() {
        this.loadNavbar();
        this.setupEventListeners();
        this.showInitialContent();
    }

    // Chargement de la navbar
    async loadNavbar() {
        try {
            const response = await fetch("navBar/navBar.html");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            const navBarElement = document.getElementById("navBar");
            
            if (navBarElement) {
                navBarElement.innerHTML = html;
            }
        } catch (error) {
            console.error("Erreur de chargement de la navbar:", error);
            this.showError("Erreur de chargement de la navigation");
        }
    }

    // Configuration des écouteurs d'événements
    setupEventListeners() {
        // Navigation principale
        document.addEventListener("click", (event) => {
            const navLink = event.target.closest("#navBar a[data-link]");
            if (navLink) {
                event.preventDefault();
                this.navigateToPage(navLink.getAttribute("data-link"), "selectedPage");
            }
        });

        // Navigation des projets (images gallery)
        document.addEventListener("click", (event) => {
            if (event.target.tagName === "IMG" && event.target.classList.contains("gallery-image")) {
                const pageUrl = event.target.getAttribute("data-link");
                if (pageUrl) {
                    this.navigateToPage(pageUrl, "content-container");
                }
            }
        });
    }

    // Afficher le contenu initial
    showInitialContent() {
        const selectedPage = document.getElementById("selectedPage");
        if (selectedPage) {
            selectedPage.classList.add("visible");
        }
    }

    // Navigation vers une page avec gestion d'erreurs
    async navigateToPage(pageUrl, containerId) {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} introuvable!`);
            return;
        }

        try {
            // Animation de sortie
            await this.fadeOut(container);
            
            // Chargement du contenu
            const response = await fetch(pageUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            container.innerHTML = html;
            
            // Animation d'entrée
            await this.fadeIn(container);
            
            // Scroll fluide vers le contenu
            container.scrollIntoView({ behavior: "smooth" });
            
        } catch (error) {
            console.error("Erreur lors du chargement de la page:", error);
            this.showError("Erreur de chargement de la page", container);
        }
    }

    // Animation de disparition
    fadeOut(element) {
        return new Promise(resolve => {
            element.classList.remove("visible");
            element.classList.add("hidden");
            setTimeout(resolve, this.ANIMATION_DURATION);
        });
    }

    // Animation d'apparition
    fadeIn(element) {
        return new Promise(resolve => {
            setTimeout(() => {
                element.classList.remove("hidden");
                element.classList.add("visible");
                resolve();
            }, this.FADE_DELAY);
        });
    }

    // Affichage d'erreur utilisateur
    showError(message, container = null) {
        const errorHtml = `
            <div class="error-message">
                <h3>Oops!</h3>
                <p>${message}</p>
                <button onclick="location.reload()">Rafraîchir la page</button>
            </div>
        `;
        
        if (container) {
            container.innerHTML = errorHtml;
            container.classList.remove("hidden");
            container.classList.add("visible");
        }
    }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    new TriappsNavigation();
});
