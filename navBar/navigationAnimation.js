
document.addEventListener("DOMContentLoaded", function() {
    // Charger la navbar
    fetch("navBar/navbar.html")
        .then(response => response.text())
        .then(data => document.getElementById("navBar").innerHTML = data)
        .catch(error => console.error("Erreur de chargement de la navbar :", error));
    
    // Rendre le contenu principal visible au chargement
    const selectedPage = document.getElementById("selectedPage");
    if (selectedPage) {
        selectedPage.classList.add("visible");
    }
});
    

//evenement réalisé au clic de la barre de navigation : affichage du content en dessous

document.addEventListener("DOMContentLoaded", function () {
    let barreNavigation = document.getElementById("navBar");

    if (!barreNavigation) {
        return;
    }

    // Gestion du clic sur les liens de navigation dans la barre de navigation uniquement
    barreNavigation.addEventListener("click", function (event) {
        console.log("Clic dans la barre de navigation", event.target);
        
        let link = event.target.closest("a[data-link]"); // Vérifie si c'est un <a> avec data-link
        if (!link) return; // Si ce n'est pas un lien valide, on ignore

        event.preventDefault(); // Empêche le chargement de la page

        let pageUrl = link.getAttribute("data-link");
        let mainContainer = document.getElementById("selectedPage");

        if (!mainContainer) {
            console.error("Div #selectedPage introuvable !");
            return;
        }

        // // Masquer le contenu avec animation
        mainContainer.classList.remove("visible");
        mainContainer.classList.add("hidden");

        // Attend 500ms avant de charger le nouveau contenu (temps de l'animation CSS)
        setTimeout(() => {
            fetch(pageUrl)
                .then(response => response.text())
                .then(html => {
                    mainContainer.innerHTML = html; // Insère le nouveau contenu
                    
                    // Attendre un petit moment avant de réafficher
                    setTimeout(() => {
                        mainContainer.classList.remove("hidden");
                        mainContainer.classList.add("visible");
                        mainContainer.scrollIntoView({ behavior: "smooth" }); // Scroll fluide
                    }, 30);
                })
                .catch(error => {
                    console.error("Erreur lors du chargement de la page :", error);
                });
        }, 500); // Temps de disparition (0.5s)
    });
});    

//evenement au moment du click de l'image : insère la page associée à l'image en dessous 
document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (event) {
         // Vérifie quel élément est cliqué
        if (event.target.tagName === "IMG" && event.target.classList.contains("gallery-image")) {
            console.log("Clic détecté sur l'image gallerie:", event.target);
            let pageUrl = event.target.getAttribute("data-link");
            let contentContainer = document.getElementById("content-container");

            if (!contentContainer) {
                console.error("Div #content-container introuvable !");
                return;
            };

            // Ajoute la classe "hidden" pour masquer le contenu avant de recharger
            contentContainer.classList.remove("visible");
            contentContainer.classList.add("hidden");

            // Attend 500ms avant de charger le nouveau contenu (temps de l'animation CSS)
            setTimeout(() => {
                fetch(pageUrl)
                    .then(response => response.text())
                    .then(html => {
                        contentContainer.innerHTML = html; // Insère le nouveau contenu
                        
                        // Attendre un petit moment avant de réafficher
                        setTimeout(() => {
                            contentContainer.classList.remove("hidden");
                            contentContainer.classList.add("visible");
                            contentContainer.scrollIntoView({ behavior: "smooth" }); // Scroll fluide
                        }, 50);
                    })
                    .catch(error => {
                        console.error("Erreur lors du chargement de la page :", error);
                    });
            }, 500); // Temps de disparition (0.5s)
        }
    });
});
