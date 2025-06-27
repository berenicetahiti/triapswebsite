<?php
function getImagesEtLinkCreations($directory) {
    $imagesWithLinks = getImagesProjetLink();

    if (!$imagesWithLinks) {
        return "<p>Aucune image trouvée.</p>"; // Message si aucune image n'est trouvée
    }
    
    $html = "
    <div >"; // Conteneur pour les images
    foreach ($imagesWithLinks as $image => $link) {
        $imagePath = $directory . "/" . $image; // Ajoute le chemin du dossier
        $html .= "
            <img src='$imagePath' alt='Image' class='gallery-image' data-link='$link'>
        ";
    }
    $html .= "</div>";

    
    return $html;
}

//Images associées aux projets et leur source
function getImagesProjetLink(){
    return array("agrotic.png" => "/mesCreations/projetAgrotic.html",
                 "dbs_mata.png" => "/mesCreations/projetDbsMata.html",
                 "GLIDE.png" => "/mesCreations/projetGlide.html"
                );
}

?>