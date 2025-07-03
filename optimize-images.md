# 🖼️ Guide d'optimisation des images

## Images actuelles à optimiser

### Photos personnelles (/photos/)
- `berenice.jpeg` : 105KB → recommandé: 40-60KB
- `berenice_cap.jpeg` : 79KB → recommandé: 30-50KB  
- `plongee.jpeg` : 79KB → recommandé: 30-50KB
- `triops.jpeg` : 67KB → recommandé: 25-40KB

### Images de projets (/mesCreations/diapo_creations/)
- `GLIDE.png` : 299KB → recommandé: 80-120KB
- `agrotic.png` : 261KB → recommandé: 70-100KB
- `dbs_mata.png` : 325KB → recommandé: 80-120KB

## Outils recommandés

### En ligne (gratuits)
- **TinyPNG** : https://tinypng.com/ (PNG/JPEG)
- **Squoosh** : https://squoosh.app/ (Google)
- **ImageOptim** : https://imageoptim.com/online

### Outils locaux
```bash
# Installer ImageMagick
apt-get install imagemagick

# Optimiser JPEG (qualité 80%)
mogrify -quality 80 -resize 800x600> photos/*.jpeg

# Optimiser PNG
optipng -o7 mesCreations/diapo_creations/*.png
```

## Optimisation automatique (CSS)

J'ai ajouté le lazy loading dans le CSS pour améliorer les performances :

```css
/* Lazy loading pour images */
img[loading="lazy"] {
    opacity: 0;
    transition: opacity 0.3s;
}

img[loading="lazy"].loaded {
    opacity: 1;
}
```

## Recommandations
1. **Redimensionner** les images à leur taille d'affichage réelle
2. **Compresser** avec 80% de qualité pour JPEG
3. **Utiliser WebP** pour les navigateurs modernes
4. **Lazy loading** pour les images hors écran