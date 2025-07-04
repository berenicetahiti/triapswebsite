// Système de loading unifié pour Triapps
// Gère les spinners, skeleton loading et lazy loading des images

class LoadingManager {
    constructor() {
        this.loadingStates = new Map();
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupSkeletonLoading();
    }

    // Afficher un loading spinner dans un container
    showLoading(containerId, message = 'Chargement...') {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.loadingStates.set(containerId, true);
        
        const loadingHtml = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">${message}</p>
            </div>
        `;
        
        container.innerHTML = loadingHtml;
        container.classList.add('loading-active');
    }

    // Masquer le loading
    hideLoading(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.loadingStates.set(containerId, false);
        container.classList.remove('loading-active');
    }

    // Vérifier si un container est en loading
    isLoading(containerId) {
        return this.loadingStates.get(containerId) || false;
    }

    // Skeleton loading pour les cartes
    showSkeletonCards(containerId, count = 3) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let skeletonHtml = '<div class="skeleton-grid">';
        
        for (let i = 0; i < count; i++) {
            skeletonHtml += `
                <div class="skeleton-card">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text" style="width: 70%;"></div>
                    </div>
                </div>
            `;
        }
        
        skeletonHtml += '</div>';
        container.innerHTML = skeletonHtml;
    }

    // Configuration du lazy loading des images
    setupLazyLoading() {
        // Observer pour lazy loading
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
        }
    }

    // Charger une image avec effet de transition
    loadImage(img) {
        return new Promise((resolve, reject) => {
            const imageLoader = new Image();
            
            imageLoader.onload = () => {
                // Animation d'apparition
                img.style.opacity = '0';
                img.src = imageLoader.src;
                img.classList.add('loaded');
                
                // Transition fluide
                requestAnimationFrame(() => {
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '1';
                });
                
                resolve(img);
            };
            
            imageLoader.onerror = () => {
                img.alt = 'Image non disponible';
                img.classList.add('error');
                reject(new Error('Erreur de chargement d\\'image'));
            };
            
            // Commencer le chargement
            imageLoader.src = img.dataset.src || img.src;
        });
    }

    // Activer le lazy loading pour toutes les images data-src
    enableLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (this.imageObserver) {
            lazyImages.forEach(img => {
                this.imageObserver.observe(img);
            });
        } else {
            // Fallback pour les navigateurs anciens
            lazyImages.forEach(img => this.loadImage(img));
        }
    }

    // Loading progressif pour une galerie
    loadGalleryProgressively(galleryId) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;

        const images = gallery.querySelectorAll('img');
        const loadDelay = 100; // ms entre chaque image

        images.forEach((img, index) => {
            setTimeout(() => {
                img.style.opacity = '0';
                img.style.transform = 'translateY(20px)';
                
                this.loadImage(img).then(() => {
                    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                });
            }, index * loadDelay);
        });
    }

    // Précharger des images critiques
    preloadImages(imageUrls) {
        const promises = imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = () => reject(url);
                img.src = url;
            });
        });
        
        return Promise.allSettled(promises);
    }

    // Configuration skeleton loading
    setupSkeletonLoading() {
        // CSS pour skeleton déjà défini dans components.css
        this.skeletonActive = false;
    }

    // Loading avec progress bar
    showProgressLoading(containerId, progress = 0) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const progressHtml = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <p class="loading-text">Chargement... ${progress}%</p>
            </div>
        `;
        
        container.innerHTML = progressHtml;
    }

    // Mettre à jour le progress
    updateProgress(containerId, progress) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const progressFill = container.querySelector('.progress-fill');
        const progressText = container.querySelector('.loading-text');
        
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `Chargement... ${progress}%`;
    }

    // Loading toast (notification discrète)
    showToastLoading(message = 'Chargement...') {
        const existingToast = document.querySelector('.toast-loading');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-loading';
        toast.innerHTML = `
            <div class="loading-spinner"></div>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Animation d'entrée
        requestAnimationFrame(() => {
            toast.classList.add('toast-visible');
        });
        
        return toast;
    }

    // Masquer toast loading
    hideToastLoading() {
        const toast = document.querySelector('.toast-loading');
        if (toast) {
            toast.classList.remove('toast-visible');
            setTimeout(() => toast.remove(), 300);
        }
    }
}

// CSS additionnels pour le loading (à inclure dans le head)
const loadingStyles = `
<style>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    min-height: 200px;
}

.loading-text {
    margin-top: 15px;
    color: #4a5568;
    font-size: 1rem;
}

.progress-bar {
    width: 200px;
    height: 4px;
    background: #e2e8f0;
    border-radius: 2px;
    margin: 15px 0;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
    transition: width 0.3s ease;
}

.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.skeleton-content {
    padding: 20px;
}

.toast-loading {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.toast-loading.toast-visible {
    transform: translateX(0);
}

.loading-active {
    min-height: 200px;
}

img.loaded {
    transition: opacity 0.3s ease;
}

img.error {
    opacity: 0.5;
    filter: grayscale(100%);
}

@media (max-width: 768px) {
    .toast-loading {
        top: 10px;
        right: 10px;
        left: 10px;
        padding: 12px 15px;
    }
    
    .loading-container {
        padding: 40px 15px;
        min-height: 150px;
    }
    
    .progress-bar {
        width: 150px;
    }
}
</style>
`;

// Injecter les styles si pas déjà présents
if (!document.querySelector('#loading-styles')) {
    document.head.insertAdjacentHTML('beforeend', 
        loadingStyles.replace('<style>', '<style id="loading-styles">')
    );
}

// Instance globale du LoadingManager
window.LoadingManager = new LoadingManager();

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingManager;
}