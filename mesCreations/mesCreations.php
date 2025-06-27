<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" href="mesCreations/creations.css">
</head>
<body>
    <?php include "mesCreations_fonctions.php"; ?>

    <section class="container">
        <h2>Mes créations</h2>
        <p>Voici mes créations</p>

        <?php
        echo getImagesEtLinkCreations("mesCreations/diapo_creations");
        ?>
    </section>
    <script src="mesCreations/mesCreations_navigation.js"></script>
    <div id="content-container"></div>
</body>
</html>