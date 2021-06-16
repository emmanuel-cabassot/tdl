        /* POUR LE FORMULAIRE DE CONNEXION */
email = document.querySelector('.connexion #email')
password = document.querySelector('.connexion #password')
button = document.querySelector('.connexion #submit')
p = document.querySelector('.connexion .erreur_password p')
erreur = document.querySelector('.connexion .message-erreur')

// On écoute l'input du mot de passe
password.addEventListener("input", checkPass)
// On écoute l'input de l'email
email.addEventListener("input", checkEmail)

var emailCOk;
var passwordCOk;
/* Fonction qui vérifie que le mot de passe est au bon format */
function checkPass() {
    // On initialise un score
    let score = '';

    // On récupère ce qui a été saisi
    let mdp = password.value;

    // On va chercher les éléments dont on a besoin
    let minuscule = document.querySelector('.connexion #minuscule')
    let majuscule = document.querySelector('.connexion #majuscule');
    let chiffre = document.querySelector('.connexion #chiffre');
    let special = document.querySelector('.connexion #special');
    let longueur = document.querySelector('.connexion #longueur')

    // On vérifie qu'on a une minuscule
    if (/[a-z]/.test(mdp)) {
        // On passe en vert minuscule (valid)
        minuscule.classList.replace("invalid", "valid");
        score += 'a';
    } else {
        // On passe en rouge minuscule (invalid)
        minuscule.classList.replace('valid', 'invalid');
    }

    // On vérifie qu'on a une majuscule
    if (/[A-Z]/.test(mdp)) {
        // On passe en vert (valid)
        majuscule.classList.replace('invalid', 'valid');
        score += 'b';
    } else {
        // On passe en rouge (invalid)
        majuscule.classList.replace('valid', 'invalid');
    }

    // On vérifie qu'on a un chiffre
    if (/[0-9]/.test(mdp)) {
        // On passe en vert (valid)
        chiffre.classList.replace('invalid', 'valid');
        score += 'c';
    } else {
        // On passe en rouge (invalid)
        chiffre.classList.replace('valid', 'invalid');
    }

    // On vérifie qu'on a un caractère spécial
    if (/[$@!/\\%*#&]/.test(mdp)) {
        // On passe en vert  (valid)
        special.classList.replace('invalid', 'valid');
        score += 'd';
    } else {
        // On passe en rouge  (invalid)
        special.classList.replace('valid', 'invalid');
    }

    // On vérifie la longueur du mdp
    if (mdp.length >= 6) {
        // On passe en vert
        longueur.classList.replace('invalid', 'valid');
        score += 'e';
    } else {
        verif = score.includes("e")

        // On passe en rouge
        longueur.classList.replace('valid', 'invalid')
    }

    if (score == 'abcde') {
        passwordCOk = true;
        if (emailCOk == true) {
            button.disabled = false
        }
    } else {
        passwordCOk = false
        button.disabled = true
    }
}

/* Fonction qui vérifie que l'email est au bon format */
function checkEmail() {
    // On récupère la valeur d'email
    let emails = email.value;

    // On va chercher l'element qui affiche que l'email est au bon format
    let emailValide = document.querySelector('#emailValide')

    if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emails)) {
        // email valide
        emailValide.classList.replace('cacher', 'vue')
        emailCOk = true;
        if (passwordCOk == true) {
            button.disabled = false
        }
    }
    else {
        // Email non valide 
        emailValide.classList.replace('vue', 'cacher')
        emailCOk = false
        button.disabled = true
    }
}


// Au click on prépare et l'on envoie la requete ajax
button.addEventListener("click", function () {
    let emailValue = email.value
    let passwordValue = password.value

    let inserer = {
        email: emailValue,
        password: passwordValue
    }
    /* Requete POST */
    fetch('api/login.php', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(inserer)
    })
        .then((resultat) => {
            return resultat.json()
        })
        .then((json) => {
            if (json == "Arrêtez de chercher les problèmes : pas de failles!") {
                erreur.innerHTML = "Arrêtez de chercher les problèmes : pas de failles! :)"
            }
            if (json == "email et/ou mot de passe incorrect(s)") {
                erreur.innerHTML = "email et/ou mot de passe incorrect(s)"
            }
            if (json == 'vous êtes connecté') {
                document.location.href = "views/todolist.php";
            }
            if (json == "Il y a eu un problème lors de la création de votre compte") {
                erreur.innerHTML = "Il y a eu un problème lors de la création de votre compte"
            }
        })
})

            /* POUR LE FORMULAIRE D'INSCRIPTION */
emailReg = document.querySelector('.inscription #email')
nomReg = document.querySelector('.inscription #nom')
prenomReg = document.querySelector('.inscription #prenom')
passwordReg = document.querySelector('.inscription #password')
buttonReg = document.querySelector('.inscription #submit')
pReg = document.querySelector('.inscription .erreur_password p')
erreurReg = document.querySelector('.inscription .message-erreur')

// On écoute l'input du mot de passe
passwordReg.addEventListener("input", checkPassReg)
// On écoute l'input de l'email
emailReg.addEventListener("input", checkEmailReg)
// On écoute l'input du nom
nomReg.addEventListener("input", checkNom)
// On écoute l'input du prenom
prenomReg.addEventListener("input", checkNom)


var emailRegOk;
var passwordRegOk;
var nomOk;
/* Fonction qui vérifie que le mot de passe est au bon format */
function checkPassReg() {
    // On initialise un score
    let score = '';

    // On récupère ce qui a été saisi
    let mdp = passwordReg.value;

    // On va chercher les éléments dont on a besoin
    let minusculeReg = document.querySelector('.inscription #minuscule')
    let majusculeReg = document.querySelector('.inscription #majuscule')
    let chiffreReg = document.querySelector('.inscription #chiffre')
    let specialReg = document.querySelector('.inscription #special')
    let longueurReg = document.querySelector('.inscription #longueur')

    // On vérifie qu'on a une minuscule
    if (/[a-z]/.test(mdp)) {
        // On passe en vert minuscule (valid)
        minusculeReg.classList.replace("invalid", "valid");
        score += 'a';
    } else {
        // On passe en rouge minuscule (invalid)
        minusculeReg.classList.replace('valid', 'invalid');
    }

    // On vérifie qu'on a une majuscule
    if (/[A-Z]/.test(mdp)) {
        // On passe en vert (valid)
        majusculeReg.classList.replace('invalid', 'valid');
        score += 'b';
    } else {
        // On passe en rouge (invalid)
        majusculeReg.classList.replace('valid', 'invalid');
    }

    // On vérifie qu'on a un chiffre
    if (/[0-9]/.test(mdp)) {
        // On passe en vert (valid)
        chiffreReg.classList.replace('invalid', 'valid');
        score += 'c';
    } else {
        // On passe en rouge (invalid)
        chiffreReg.classList.replace('valid', 'invalid');
    }

    // On vérifie qu'on a un caractère spécial
    if (/[$@!/\\%*#&]/.test(mdp)) {
        // On passe en vert  (valid)
        specialReg.classList.replace('invalid', 'valid');
        score += 'd';
    } else {
        // On passe en rouge  (invalid)
        specialReg.classList.replace('valid', 'invalid');
    }

    // On vérifie la longueur du mdp
    if (mdp.length >= 6) {
        // On passe en vert
        longueurReg.classList.replace('invalid', 'valid');
        score += 'e';
    } else {
        // On passe en rouge
        longueurReg.classList.replace('valid', 'invalid')
    }

    if (score == 'abcde') {
        passwordRegOk = true;
        console.log(passwordRegOk)
        if (emailRegOk == true & nomOk == true) {
            buttonReg.disabled = false
        }
    } else {
        passwordRegOk = false
        buttonReg.disabled = true
    }
}

/* Fonction qui vérifie que l'email est au bon format */
function checkEmailReg() {
    // On récupère la valeur d'email
    let emails = emailReg.value;

    // On va chercher l'element qui affiche que l'email est au bon format
    let emailRegValide = document.querySelector('.inscription #emailValide')

    if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emails)) {
        // email valide
        emailRegValide.classList.replace('cacher', 'vue')
        emailRegOk = true;
        console.log(emailRegOk)
        if (passwordRegOk == true && nomOk == true) {
            buttonReg.disabled = false
        }
    }
    else {
        // Email non valide 
        emailRegValide.classList.replace('vue', 'cacher')
        emailRegOk = false
        buttonReg.disabled = true
    }
}

/* Fonction qui vérifie que l'input n'est pas vide */
function checkNom() {
    nomLength = nom.value
    prenomLength = prenom.value
    if (nomLength.length > 0 && prenomLength.length > 0) {
        nomOk = true
        console.log(nomOk)
        if (passwordRegOk == true && emailRegOk == true) {
            buttonReg.disabled = false
        }
    }
    else {
        nomOk = false
        buttonReg.disabled = true
    }

}

// Au click on prépare et l'on envoie la requete ajax
buttonReg.addEventListener("click", function () {
    let emailRegValue = emailReg.value
    let nomRegValue = nomReg.value
    let prenomRegValue = prenomReg.value
    let passwordRegValue = passwordReg.value

    let inserer = {
        email: emailRegValue,
        nom: nomRegValue,
        prenom: prenomRegValue,
        password: passwordRegValue
    }
    /* Requete POST */
    fetch('api/register.php', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(inserer)
    })
        .then((resultat) => {
            return resultat.json()
        })
        .then((json) => {
            if (json == "Arrêtez de chercher les problèmes : pas de failles!") {
                erreurReg.innerHTML = "Arrêtez de chercher les problèmes : pas de failles! :)"
            }
            if (json == 'Cette email est déjà utilisé') {
                erreurReg.innerHTML = "Cet email est déjà utilisé"
            }
            if (json == 'Votre compte à bien été crée') {
                document.location.href = "views/todolist.php";
            }
            if (json == "Il y a eu un problème lors de la création de votre compte") {
                erreurReg.innerHTML = "Il y a eu un problème lors de la création de votre compte"
            }
        })
})

                       /* FENETRE MODALE */
// On récupère tous les boutons d'ouverture de modale
var modalButtons = document.querySelectorAll("[data-toggle=modal]");
    console.log(modalButtons)
for(let button of modalButtons){
    button.addEventListener("click", function(e){
        // On empêche la navigation
        e.preventDefault();
        // On récupère le data-target
        let target = this.dataset.target
        
        // On récupère la bonne modale
        let modal = document.querySelector(target);
        // On affiche la modale
        modal.classList.add("show");

        // On récupère les boutons de fermeture
        const modalClose = modal.querySelectorAll("[data-dismiss=dialog]");
        
        for(let close of modalClose){
            close.addEventListener("click", function (e) {
                e.preventDefault();
                modal.classList.remove("show");
            });
        }

        // On gère la fermeture lors du clic sur la zone grise
        modal.addEventListener("click", function(){
            this.classList.remove("show");
        });
        // On évite la propagation du clic d'un enfant à son parent
        modal.children[0].addEventListener("click", function(e){
            e.stopPropagation();
        })
    });
}

