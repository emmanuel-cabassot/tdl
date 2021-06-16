<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>My ToDoList</title>
</head>

<body>
    <header>
        <section class="titre-accueil">
            <ul>
                <li>
                    <h1>My ToDoList</h1>
                </li>
            </ul>
        </section>
    </header>
    <main class="accueil">
        <section class="visible">
            <section class="connexion">
                <section class="container-connexion">
                    <h2>Connexion</h2>
                    <p class="message-erreur">

                    </p>
                    <form>
                        <div>
                            <input type="email" name="email" id="email" placeholder="E-mail">
                        </div>
                        <div class="erreur_email">
                            <span id="emailValide" class="cacher"></span>
                        </div>
                        <div>
                            <input type="password" name="password" id="password" placeholder="Mot de passe">
                        </div>
                        <div>
                            <button type="button" id="submit" disabled="true">Valider</button>
                        </div>
                        <div class="erreur_password">
                            <p>Votre mot de passe contient:<br>
                                <span id="minuscule" class='invalid'>une minuscule</span> /
                                <span id="majuscule" class='invalid'>une majuscule</span> /
                                <span id="chiffre" class='invalid'>un chiffre</span> /
                                <span id="special" class='invalid'>un caractère spécial</span> /
                                <span id="longueur" class='invalid'>minimim 6 caractères</span>
                            </p>
                        </div>
                    </form>
                    <section class="barre">

                    </section>
                    <section class="lien-inscription">
                        <button type="button" id="modale" data-toggle="modal" data-target="#modal">Inscrivez-vous</button>
                    </section>
                </section>
            </section>
            <section class="image">
                <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt="belle illustration">
            </section>
        </section>
        <section class="inscription modal " id="modal" role="dialog">
            <section class="modal-content">
                <div class="modal-close" data-dismiss="dialog">X</div>
                <h2>Inscription</h2>
                <p class="message-erreur">

                </p>
                <form>
                    <div>
                        <input type="email" name="email" id="email" placeholder="E-mail">
                    </div>
                    <div class="erreur_email">
                        <span id="emailValide" class="cacher"></span>
                    </div>
                    <div>
                        <input type="text" name="nom" id="nom" placeholder="Nom">
                    </div>
                    <div>
                        <input type="text" name="prenom" id="prenom" placeholder="Prénom">
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Mot de passe">
                    </div>
                    <div>
                        <button type="button" id="submit" disabled="true">Valider</button>
                    </div>
                    <div class="erreur_password">
                        <p>Votre mot de passe doit contenir:<br>
                            <span id="minuscule" class='invalid'>une minuscule</span>/
                            <span id="majuscule" class='invalid'>une majuscule</span>/
                            <span id="chiffre" class='invalid'>un chiffre</span>/
                            <span id="special" class='invalid'>un caractère spécial</span>/
                            <span id="longueur" class='invalid'>minimim 6 caractères</span>
                        </p>
                    </div>
                </form>
            </section>
        </section>
    </main>
    <footer>
    &#169 Emmanuel CABASSOT
    </footer>

    <script src="api/script.js"></script>
</body>

</html>