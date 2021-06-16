const utilisateur = document.querySelector("#session").value
function test() {
    let user = document.querySelector("#session").value
    let inserer = {

        user: user
    }
    //Requete POST
    fetch('../api/todolist.php', {
        method: "POST",
        header: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(inserer)
    })
        .then((reponse) => {
            if (reponse.ok) {
                return reponse.json()
                    .then((json) => {
                        // On parcours le tableau json
                        json.forEach(element => {
                            let nomDeLaListe = element.nomListe
                            // Section liste
                            let liste = document.createElement("section")
                            liste.classList.add("liste")
                            liste.classList.add("liste" + element.id_liste)
                            document.querySelector(".listes").appendChild(liste)

                            let supListe = document.createElement("div")
                            supListe.classList.add("sup-liste")
                            supListe.id = "sup-liste" + element.id_liste
                            supListe.innerHTML = 'X'
                            document.querySelector(".liste" + element.id_liste).appendChild(supListe)

                            // Section date de la liste
                            maDate = new Date(element.create_liste)
                            const options = { month: 'long', day: 'numeric' };
                            DateListe = maDate.toLocaleDateString('fr-FR', options)

                            // Section description de la liste
                            let descriptionListe = document.createElement("section")
                            descriptionListe.classList.add("description-liste")
                            descriptionListe.innerHTML = `
                            <h3>
                                <u>${element.nomListe}</u>
                            </h3>
                            <section class="heure-debut">
                                <i>créée le ${DateListe}</i>
                            </section>`;
                            document.querySelector(".liste" + element.id_liste).appendChild(descriptionListe)

                            /* SUPPRIMER UNE LISTE */

                            supListe.addEventListener("click", function (e) {
                                if (confirm("voulez vous supprimer la liste: " + element.nomListe)) {
                                    let inserer = {
                                        liste: element.id_liste
                                    }
                                    //Requete POST
                                    fetch('../api/supprimeListe.php', {
                                        method: "POST",
                                        header: {
                                            "Content-type": "application/json"
                                        },
                                        body: JSON.stringify(inserer)
                                    })
                                        .then((reponse) => {
                                            listeSupprimee = document.querySelector(".liste" + element.id_liste)
                                            listeSupprimee.remove()
                                        })
                                }
                            })

                            /* BOUCLE DES TACHES */
                            element.taches.forEach(element => {

                                // Section tache
                                let tache = document.createElement("section")
                                tache.classList.add("tache")
                                tache.id = "tache" + element.id
                                tache.setAttribute('data-target', "#modal" + element.id);
                                tache.innerHTML =
                                    `<h4>${element.nom}</h4>`
                                document.querySelector(".liste" + element.liste_id).appendChild(tache)

                                // Section container
                                let container = document.createElement("section")
                                container.classList.add("container")
                                container.id = "container-tache" + element.id
                                document.querySelector("#tache" + element.id).appendChild(container)

                                // Section date
                                maDate = new Date(element.create_at)
                                const options = { month: 'long', day: 'numeric' };
                                DateTache = maDate.toLocaleDateString('fr-FR', options)

                                let date = document.createElement("section")
                                date.classList.add("date")
                                date.innerHTML = `
                                <section class="date-tache">
                                    <i class="fas fa-calendar-day"></i>
                                    ${DateTache}
                                </section>`;
                                document.querySelector("#container-tache" + element.id).appendChild(date)

                                // Section description de la tache
                                let description = document.createElement("section")
                                description.classList.add("description")
                                if (element.description != null) {
                                    description.innerHTML = `<i class="fas fa-align-left"></i>`
                                }
                                document.querySelector("#container-tache" + element.id).appendChild(description)

                                /* MODALE DE LA TACHE*/
                                if (element.description === null) {
                                    descript = "Entrez une description."
                                } else {
                                    descript = element.description
                                }
                                let modal = document.createElement("section")
                                modal.classList.add("modal")
                                modal.id = "modal" + element.id
                                document.querySelector("main").appendChild(modal)

                                let modalContent = document.createElement("section")
                                modalContent.classList.add("modal-content")
                                modalContent.id = "modal-content" + element.id
                                modalContent.innerHTML = `
                                <section class="modal-close" data-dismiss="dialog">
                                    X
                                </section>
                                <h5><i class="far fa-clipboard"></i>${element.nom}</h5>
                                <p class="nom-liste">Dans la liste <u>${nomDeLaListe}</u></p>
                                <section class="modal-description">
                                    <p>
                                        <i class="fas fa-align-left"></i>
                                        <b>Description</b> 
                                       
                                    </p>
                                </section>
                                <section class="modal-description-text" id="modal-description-text${element.id}">
                                    <p>${descript}</p>
                                </section>

                                <section class="description-modal hidden" id="description-modale${element.id}" data-id="${element.id}"> 
                                    <section class="input-description">
                                        <input type="text" class="input-modale" id="input-modale${element.id}" value="${descript}">
                                    </section>
                                    <section class="button-description">
                                        <button type="button" class="button-modale" id="button-modale${element.id}">Enregistrer</button>
                                    </section>
                                </section>

                                <section class="boutons">
                                    <button type="button" class="tache-finie" id="tache-finie${element.id}" data-id="${element.id}">
                                        Tache finie
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button type="button" class="tache-annule" id="tache-annule${element.id}" data-id="${element.id}">
                                        <i class="fas fa-times-circle"></i>
                                        Annuler la tache
                                    </button>
                                </section>`


                                document.querySelector("#modal" + element.id).appendChild(modalContent)

                                /* Dimensionnement et apparition input description */
                                ModalDescriptionText = document.querySelector("#modal-description-text" + element.id)

                                ModalDescriptionText.addEventListener("click", function (e) {
                                    height = this.offsetHeight
                                    height = height + 10
                                    inputModale = document.querySelector("#input-modale" + element.id)
                                    inputModale.style.height = height + 'px'
                                    descriptionModale = document.querySelector("#description-modale" + element.id)
                                    descriptionModale.classList.remove("hidden")
                                    this.classList.add("hidden")
                                })

                                /* Sauvegarde de la description en BDD */
                                buttonModal = document.querySelector("#button-modale" + element.id)
                                buttonModal.addEventListener("click", function (e) {
                                    inputValue = inputModale.value
                                    if (inputValue != "Entrez une description.") {
                                        let inserer = {
                                            description: inputValue,
                                            idTache: element.id
                                        }
                                        //Requete POST
                                        fetch('../api/description.php', {
                                            method: "POST",
                                            header: {
                                                "Content-type": "application/json"
                                            },
                                            body: JSON.stringify(inserer)
                                        })
                                            .then((reponse) => {

                                                ModalDescriptionTex = document.querySelector("#modal-description-text" + element.id)

                                                ModalDescriptionTex.innerHTML = `
                                                <p>${inputValue}</p>`;
                                                ModalDescriptionTex.classList.remove("hidden")
                                                descriptionModale = document.querySelector("#description-modale" + element.id)
                                                descriptionModale.classList.add("hidden")

                                            })
                                    }

                                })
                                buttonModalValue = buttonModal.value


                                /* FINIR UNE TACHE EN BDD*/
                                buttonTacheFinie = document.querySelector("#tache-finie" + element.id)
                                buttonTacheFinie.addEventListener("click", function (e) {
                                    if (confirm('La tâche ' + element.nom + ' est finie?')) {
                                        let inserer = {
                                            'id_tache': element.id
                                        }

                                        //Requete POST
                                        fetch('../api/tacheFinie.php', {
                                            method: "POST",
                                            header: {
                                                "Content-type": "application/json"
                                            },
                                            body: JSON.stringify(inserer)
                                        })
                                            .then((response) => {
                                                idTache = element.id
                                                modalHidden = document.querySelector("#modal" + idTache)
                                                modalHidden.classList.remove("show")
                                                tacheHidden = document.querySelector("#tache" + idTache)
                                                tacheHidden.classList.add("hidden")
                                            })
                                        retire = document.querySelectorAll(".liste-finie")
                                        retire.forEach(element => {
                                            element.remove()

                                        });
                                        tachesFin(utilisateur)

                                    }
                                });

                                /* SUPPRIMER UNE TACHE EN BDD*/
                                buttonTacheAnnule = document.querySelector("#tache-annule" + element.id)
                                buttonTacheAnnule.addEventListener("click", function (e) {
                                    if (window.confirm('Voulez-vous supprimer la tâche: ' + element.nom + '?')) {
                                        let inserer = {
                                            'id_tache': element.id
                                        }

                                        //Requete POST
                                        fetch('../api/tacheFinie.php', {
                                            method: "POST",
                                            header: {
                                                "Content-type": "application/json"
                                            },
                                            body: JSON.stringify(inserer)
                                        })
                                            .then((response) => {
                                                idTache = element.id
                                                modalHidden = document.querySelector("#modal" + idTache)
                                                modalHidden.classList.remove("show")
                                                tacheHidden = document.querySelector("#tache" + idTache)
                                                tacheHidden.classList.add("hidden")
                                            })
                                    }
                                });
                            });

                            // Section ajouter tache
                            let ajouter = document.createElement("section")
                            ajouter.classList.add("ajouter")
                            ajouter.id = "ajouter" + element.id_liste
                            ajouter.setAttribute('data-liste', element.id_liste);
                            ajouter.innerHTML = `
                            <form>
                                <input type="text" name="ajouter" id="input-ajouter${element.id_liste}" placeholder="Nouvelle tache">
                                <div>
                                <button type="button" class="button-ajouter" id="button-ajouter${element.id_liste}" data-liste="${element.id_liste}">Ajouter</button>
                                </div>
                            </form>`;
                            document.querySelector(".liste" + element.id_liste).appendChild(ajouter)

                        });

                        /* FENETRE MODALE AFFICHE*/
                        // On récupère tous les boutons d'ouverture de modale
                        var modalButtons = document.querySelectorAll(".tache");
                        console.log(modalButtons)
                        for (let button of modalButtons) {
                            button.addEventListener("click", function (e) {
                                // On empêche la navigation
                                e.preventDefault();
                                // On récupère le data-target
                                let target = this.dataset.target

                                // On récupère la bonne modale
                                let modale = document.querySelector(target);

                                // On affiche la modale
                                modale.classList.add("show");

                                // On récupère les boutons de fermeture
                                const modalClose = modale.querySelectorAll("[data-dismiss=dialog]");

                                for (let close of modalClose) {
                                    close.addEventListener("click", function (e) {
                                        e.preventDefault();
                                        modale.classList.remove("show");
                                    });
                                }

                                // On gère la fermeture lors du clic sur la zone grise
                                modale.addEventListener("click", function () {
                                    this.classList.remove("show");
                                });
                                // On évite la propagation du clic d'un enfant à son parent
                                modale.children[0].addEventListener("click", function (e) {
                                    e.stopPropagation();
                                })
                            });
                        }

                        /* AJOUTER UNE LISTE */
                        let ajouterListe = document.createElement("section")
                        ajouterListe.classList.add("ajouter-liste")
                        ajouterListe.innerHTML = `
                        <h3>
                            <i class="fas fa-plus fa-xs"></i>    
                            Créer une liste
                        </h3>
                        <form>
                            <input type="text" name="ajouter" id="ajouter-liste" placeholder="Nouvelle liste">
                            <div>
                                <button type="button" id="button-ajouter" >Ajouter</button>
                            </div>
                        </form>`;
                        document.querySelector(".listes").appendChild(ajouterListe)

                        /* AJOUTER UNE LISTE EN BDD */
                        buttonAjouterListe = document.querySelector('#button-ajouter')
                        buttonAjouterListe.addEventListener("click", () => {
                            ajouterNomListe = document.querySelector("#ajouter-liste")
                            ajouterNomList = ajouterNomListe.value
                            if (ajouterNomList.length > 0) {
                                ajouterNomList = ajouterNomListe.value
                                ajouterNomListe.value = ""


                                let insere = {
                                    userId: user,
                                    nom: ajouterNomList
                                }
                                /* Requete POST */
                                fetch('../api/ajouterListe.php', {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify(insere)
                                })
                                    .then((reponse) => {
                                        return reponse.json()
                                            .then((ajoutListe) => {
                                                var listeNom = ajoutListe.nom
                                                // On ajoute dynamiquement la nouvelle liste
                                                listes = document.querySelector(".listes")
                                                let liste = document.createElement("section")
                                                liste.classList.add("liste")
                                                liste.classList.add("liste" + ajoutListe.id)

                                                listes.insertBefore(liste, ajouterListe)

                                                let supListe = document.createElement("div")
                                                supListe.classList.add("sup-liste")
                                                supListe.innerHTML = 'X'
                                                document.querySelector(".liste" + ajoutListe.id).appendChild(supListe)

                                                // Section date de la liste
                                                maDate = new Date(ajoutListe.create_at)
                                                const options = { month: 'long', day: 'numeric' };
                                                DateListe = maDate.toLocaleDateString('fr-FR', options)

                                                // Section description de la liste
                                                let descriptionListe = document.createElement("section")
                                                descriptionListe.classList.add("description-liste")
                                                descriptionListe.innerHTML =
                                                    `<h3>
                                                        <u>${ajoutListe.nom}</u>
                                                    </h3>
                                                    <section class="heure-debut">
                                                        <i>créée le ${DateListe}</i>
                                                    </section>`;
                                                document.querySelector(".liste" + ajoutListe.id).appendChild(descriptionListe)

                                                // Section ajouter tache
                                                let ajouter = document.createElement("section")
                                                ajouter.classList.add("ajouter")
                                                ajouter.setAttribute('data-liste', ajoutListe.id);
                                                ajouter.id = "ajouter" + ajoutListe.id
                                                ajouter.innerHTML = `
                                                    <form>
                                                        <input type="text" name="ajouter" id="input-ajouter${ajoutListe.id}" placeholder="Nouvelle tache">
                                                        <div>
                                                            <button type="button" class="button-ajouter" id="button-ajouter${ajoutListe.id}" data-liste="${ajoutListe.id}">Ajouter</button>
                                                        </div>
                                                    </form>`;
                                                document.querySelector(".liste" + ajoutListe.id).appendChild(ajouter)

                                                /* SUPPRIMER UNE LISTE */

                                                supListe.addEventListener("click", function (e) {
                                                    if (confirm("voulez vous supprimer la liste: " + ajoutListe.nom)) {
                                                        let inserer = {
                                                            liste: ajoutListe.id
                                                        }
                                                        //Requete POST
                                                        fetch('../api/supprimeListe.php', {
                                                            method: "POST",
                                                            header: {
                                                                "Content-type": "application/json"
                                                            },
                                                            body: JSON.stringify(inserer)
                                                        })
                                                            .then((reponse) => {
                                                                listeSupprimee = document.querySelector(".liste" + ajoutListe.id)
                                                                listeSupprimee.remove()
                                                            })
                                                    }

                                                })

                                                // AJOUTER UNE TACHE EN BDD
                                                var ajouterLliste = document.querySelector("#button-ajouter" + ajoutListe.id)
                                                ajouterLliste.addEventListener("click", function (e) {
                                                    input = document.querySelector("#input-ajouter" + ajoutListe.id)
                                                    inputValeur = input.value
                                                    if (inputValeur.length > 0) {
                                                        let insert = {
                                                            liste: ajoutListe.id,
                                                            nom: inputValeur,
                                                            userId: user
                                                        }

                                                        /* Requete POST */
                                                        fetch('../api/ajouterTache.php', {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-type": "application/json"
                                                            },
                                                            body: JSON.stringify(insert)
                                                        })
                                                            .then((reponse) => {
                                                                return reponse.json()
                                                                    .then((ajoutTache) => {
                                                                        /* afficher la tache dynamiquement  */
                                                                        let tache = document.createElement("section")
                                                                        tache.classList.add("tache")
                                                                        tache.id = "tache" + ajoutTache.id
                                                                        tache.setAttribute('data-target', "#modal" + ajoutTache.id);
                                                                        tache.innerHTML =
                                                                            `<h4>${ajoutTache.nom}</h4>`
                                                                        let ajoute = document.querySelector("#ajouter" + ajoutTache.liste_id)
                                                                        console.log(ajoute)

                                                                        document.querySelector(".liste" + ajoutTache.liste_id).insertBefore(tache, ajoute)
                                                                        // Section container
                                                                        let container = document.createElement("section")
                                                                        container.classList.add("container")
                                                                        container.id = "container-tache" + ajoutTache.id
                                                                        document.querySelector("#tache" + ajoutTache.id).appendChild(container)

                                                                        // Section date
                                                                        maDate = new Date(ajoutTache.create_at)
                                                                        const options = { month: 'long', day: 'numeric' };
                                                                        DateTache = maDate.toLocaleDateString('fr-FR', options)

                                                                        let date = document.createElement("section")
                                                                        date.classList.add("date")
                                                                        date.innerHTML = `
                                                                        <section class="date-tache">
                                                                            <i class="fas fa-calendar-day"></i>
                                                                                ${DateTache}
                                                                        </section>`;
                                                                        document.querySelector("#container-tache" + ajoutTache.id).appendChild(date)


                                                                        // Section description de la tache
                                                                        let description = document.createElement("section")
                                                                        description.classList.add("description")
                                                                        if (ajoutTache.description != null) {
                                                                            description.innerHTML = `<i class="fas fa-align-left"></i>`
                                                                        }
                                                                        document.querySelector("#container-tache" + ajoutTache.id).appendChild(description)


                                                                        /* MODALE DE LA TACHE*/
                                                                        if (ajoutTache.description === null) {
                                                                            descript = "Entrez une description."
                                                                        } else {
                                                                            descript = ajoutTache.description
                                                                        }
                                                                        let modal = document.createElement("section")
                                                                        modal.classList.add("modal")
                                                                        modal.id = "modal" + ajoutTache.id
                                                                        document.querySelector("main").appendChild(modal)

                                                                        let modalContent = document.createElement("section")
                                                                        modalContent.classList.add("modal-content")
                                                                        modalContent.id = "modal-content" + ajoutTache.id
                                                                        modalContent.innerHTML = `
                                                                    <section class="modal-close" data-dismiss="dialog">
                                                                        X
                                                                    </section>
                                                                    <h5><i class="far fa-clipboard"></i>${ajoutTache.nom}</h5>
                                                                    <p class="nom-liste">Dans la liste <u>${listeNom}</u></p>
                                                                    <section class="modal-description">
                                                                        <p>
                                                                            <i class="fas fa-align-left"></i>
                                                                            <b>Description</b> 

                                                                        </p>
                                                                    </section>
                                                                    <section class="modal-description-text" id="modal-description-text${ajoutTache.id}">
                                                                        <p>${descript}</p>
                                                                    </section>

                                                                    <section class="description-modal hidden" id="description-modale${ajoutTache.id}" data-id="${ajoutTache.id}"> 
                                                                        <section class="input-description">
                                                                            <input type="text" class="input-modale" id="input-modale${ajoutTache.id}" value="${descript}">
                                                                        </section>
                                                                        <section class="button-description">
                                                                            <button type="button" class="button-modale" id="button-modale${ajoutTache.id}">Enregistrer</button>
                                                                        </section>
                                                                    </section>

                                                                    <section class="boutons">
                                                                    <button type="button" class="tache-finie" id="tache-finie${ajoutTache.id}" data-id="${ajoutTache.id}">
                                                                        Tache finie
                                                                        <i class="fas fa-check"></i>
                                                                    </button>
                                                                    <button type="button" class="tache-annule" id="tache-annule${ajoutTache.id}" data-id="${ajoutTache.id}">
                                                                        <i class="fas fa-times-circle"></i>
                                                                        Annuler la tache</button>
                                                                    </section>`

                                                                        if (ajoutTache.description == null) {

                                                                        }
                                                                        document.querySelector("#modal" + ajoutTache.id).appendChild(modalContent)

                                                                        /* Dimensionnement et apparition input description */

                                                                        ModalDescriptionText = document.querySelector("#modal-description-text" + ajoutTache.id)
                                                                        console.log(ajoutTache.id)

                                                                        ModalDescriptionText.addEventListener("click", function (e) {
                                                                            height = this.offsetHeight
                                                                            height = height + 10
                                                                            inputModale = document.querySelector("#input-modale" + ajoutTache.id)
                                                                            inputModale.style.height = height + 'px'
                                                                            descriptionModale = document.querySelector("#description-modale" + ajoutTache.id)
                                                                            descriptionModale.classList.remove("hidden")
                                                                            this.classList.add("hidden")
                                                                        })

                                                                        /* Sauvegarde de la description en BDD */
                                                                        buttonModal = document.querySelector("#button-modale" + ajoutTache.id)
                                                                        buttonModal.addEventListener("click", function (e) {
                                                                            inputValue = inputModale.value
                                                                            if (inputValue != "Entrez une description.") {
                                                                                let inserer = {
                                                                                    description: inputValue,
                                                                                    idTache: ajoutTache.id
                                                                                }
                                                                                //Requete POST
                                                                                fetch('../api/description.php', {
                                                                                    method: "POST",
                                                                                    header: {
                                                                                        "Content-type": "application/json"
                                                                                    },
                                                                                    body: JSON.stringify(inserer)
                                                                                })
                                                                                    .then((reponse) => {

                                                                                        ModalDescriptionTex = document.querySelector("#modal-description-text" + ajoutTache.id)

                                                                                        ModalDescriptionTex.innerHTML = `
                                                                                        <p>${inputValue}</p>`;
                                                                                        ModalDescriptionTex.classList.remove("hidden")
                                                                                        descriptionModale = document.querySelector("#description-modale" + ajoutTache.id)
                                                                                        descriptionModale.classList.add("hidden")

                                                                                    })
                                                                            }

                                                                        })
                                                                        buttonModalValue = buttonModal.value
                                                                        console.log(buttonModal)
                                                                        /* FINIR UNE TACHE EN BDD*/
                                                                        buttonTacheFinie = document.querySelector("#tache-finie" + ajoutTache.id)
                                                                        buttonTacheFinie.addEventListener("click", function (e) {
                                                                            if (confirm('La tâche ' + ajoutTache.nom + ' est finie?')) {
                                                                                let inserer = {
                                                                                    'id_tache': ajoutTache.id
                                                                                }

                                                                                //Requete POST
                                                                                fetch('../api/tacheFinie.php', {
                                                                                    method: "POST",
                                                                                    header: {
                                                                                        "Content-type": "application/json"
                                                                                    },
                                                                                    body: JSON.stringify(inserer)
                                                                                })
                                                                                    .then((response) => {
                                                                                        idTache = ajoutTache.id
                                                                                        modalHidden = document.querySelector("#modal" + idTache)
                                                                                        modalHidden.classList.remove("show")
                                                                                        tacheHidden = document.querySelector("#tache" + idTache)
                                                                                        tacheHidden.classList.add("hidden")
                                                                                    })
                                                                                retire = document.querySelectorAll(".liste-finie")
                                                                                retire.forEach(element => {
                                                                                    element.remove()

                                                                                });
                                                                                tachesFin(utilisateur)


                                                                            }
                                                                        });

                                                                        /* SUPPRIMER UNE TACHE EN BDD*/
                                                                        buttonTacheAnnule = document.querySelector("#tache-annule" + ajoutTache.id)
                                                                        buttonTacheAnnule.addEventListener("click", function (e) {
                                                                            if (confirm('Voulez-vous supprimer la tâche: ' + ajoutTache.nom + '?')) {
                                                                                let inserer = {
                                                                                    'id_tache': ajoutTache.id
                                                                                }

                                                                                //Requete POST
                                                                                fetch('../api/tacheFinie.php', {
                                                                                    method: "POST",
                                                                                    header: {
                                                                                        "Content-type": "application/json"
                                                                                    },
                                                                                    body: JSON.stringify(inserer)
                                                                                })
                                                                                    .then((response) => {
                                                                                        idTache = ajoutTache.id
                                                                                        modalHidden = document.querySelector("#modal" + idTache)
                                                                                        modalHidden.classList.remove("show")
                                                                                        tacheHidden = document.querySelector("#tache" + idTache)
                                                                                        tacheHidden.classList.add("hidden")
                                                                                    })
                                                                            }
                                                                        });





                                                                        /* FENETRE MODALE AFFICHE*/
                                                                        // On récupère le button d'ouverture de modale
                                                                        let modalButton = document.querySelector("#tache" + ajoutTache.id);

                                                                        modalButton.addEventListener("click", function (e) {
                                                                            // On empêche la navigation
                                                                            e.preventDefault();
                                                                            // On récupère le data-target
                                                                            let target = this.dataset.target

                                                                            // On récupère la bonne modale
                                                                            let modale = document.querySelector(target);

                                                                            // On affiche la modale
                                                                            modale.classList.add("show");

                                                                            // On récupère les boutons de fermeture
                                                                            const modalClose = modale.querySelectorAll("[data-dismiss=dialog]");

                                                                            for (let close of modalClose) {
                                                                                close.addEventListener("click", function (e) {
                                                                                    e.preventDefault();
                                                                                    modale.classList.remove("show");
                                                                                });
                                                                            }

                                                                            // On gère la fermeture lors du clic sur la zone grise
                                                                            modale.addEventListener("click", function () {
                                                                                this.classList.remove("show");
                                                                            });
                                                                            // On évite la propagation du clic d'un enfant à son parent
                                                                            modale.children[0].addEventListener("click", function (e) {
                                                                                e.stopPropagation();
                                                                            })
                                                                        });

                                                                    })
                                                            })
                                                    }
                                                })
                                            })
                                    })
                            }
                        })
                        /* AJOUTER UNE TACHE EN BDD */
                        var ajouterList = document.querySelectorAll(".button-ajouter")

                        ajouterList.forEach(element => {
                            element.addEventListener("click", function (e) {

                                let idListe = this.dataset.liste
                                input = document.querySelector("#input-ajouter" + idListe)
                                inputValeur = input.value
                                if (inputValeur.length > 0) {
                                    
                                let insert = {
                                    liste: idListe,
                                    nom: inputValeur,
                                    userId: user
                                }
                                /* Requete POST */
                                fetch('../api/ajouterTache.php', {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify(insert)
                                })
                                    .then((reponse) => {
                                        return reponse.json()
                                            .then((ajoutTache) => {
                                                /* afficher la date dynamiquement */
                                                let tache = document.createElement("section")
                                                tache.classList.add("tache")
                                                tache.id = "tache" + ajoutTache.id
                                                tache.setAttribute('data-target', "#modal" + ajoutTache.id);
                                                tache.innerHTML =
                                                    `<h4>${ajoutTache.nom}</h4>`
                                                let ajoute = document.querySelector("#ajouter" + ajoutTache.liste_id)
                                                console.log(ajoute)

                                                document.querySelector(".liste" + ajoutTache.liste_id).insertBefore(tache, ajoute)
                                                // Section container
                                                let container = document.createElement("section")
                                                container.classList.add("container")
                                                container.id = "container-tache" + ajoutTache.id
                                                document.querySelector("#tache" + ajoutTache.id).appendChild(container)

                                                // Section date
                                                maDate = new Date(ajoutTache.create_at)
                                                const options = { month: 'long', day: 'numeric' };
                                                DateTache = maDate.toLocaleDateString('fr-FR', options)

                                                let date = document.createElement("section")
                                                date.classList.add("date")
                                                date.innerHTML = `
                                                    <section class="date-tache">
                                                        <i class="fas fa-calendar-day"></i>
                                                            ${DateTache}
                                                    </section>`;
                                                document.querySelector("#container-tache" + ajoutTache.id).appendChild(date)

                                                // Section description de la tache
                                                let description = document.createElement("section")
                                                description.classList.add("description")
                                                if (ajoutTache.description != null) {
                                                    description.innerHTML = `<i class="fas fa-align-left"></i>`
                                                }
                                                document.querySelector("#container-tache" + ajoutTache.id).appendChild(description)

                                                /* MODALE DE LA TACHE*/
                                                if (ajoutTache.description === null) {
                                                    descript = "Entrez une description."
                                                } else {
                                                    descript = ajoutTache.description
                                                }
                                                let modal = document.createElement("section")
                                                modal.classList.add("modal")
                                                modal.id = "modal" + ajoutTache.id
                                                document.querySelector("main").appendChild(modal)

                                                let modalContent = document.createElement("section")
                                                modalContent.classList.add("modal-content")
                                                modalContent.id = "modal-content" + ajoutTache.id
                                                modalContent.innerHTML = `
                                                <section class="modal-close" data-dismiss="dialog">
                                                    X
                                                </section>
                                                <h5><i class="far fa-clipboard"></i>${ajoutTache.nom}</h5>
                                                <p class="nom-liste">Dans la liste <u></u></p>
                                                <section class="modal-description">
                                                    <p>
                                                        <i class="fas fa-align-left"></i>
                                                        <b>Description</b> 

                                                    </p>
                                                </section>
                                                <section class="modal-description-text" id="modal-description-text${ajoutTache.id}">
                                                    <p>${descript}</p>
                                                </section>

                                                <section class="description-modal hidden" id="description-modale${ajoutTache.id}" data-id="${ajoutTache.id}"> 
                                                    <section class="input-description">
                                                        <input type="text" class="input-modale" id="input-modale${ajoutTache.id}" value="${descript}">
                                                    </section>
                                                    <section class="button-description">
                                                        <button type="button" class="button-modale" id="button-modale${ajoutTache.id}">Enregistrer</button>
                                                    </section>
                                                </section>

                                                <section class="boutons">
                                                <button type="button" class="tache-finie" id="tache-finie${ajoutTache.id}" data-id="${ajoutTache.id}">
                                                    Tache finie
                                                    <i class="fas fa-check"></i>
                                                </button>
                                                <button type="button" class="tache-annule" id="tache-annule${ajoutTache.id}" data-id="${ajoutTache.id}">
                                                    <i class="fas fa-times-circle"></i>
                                                    Annuler la tache</button>
                                                </section>`

                                                if (ajoutTache.description == null) {

                                                }
                                                document.querySelector("#modal" + ajoutTache.id).appendChild(modalContent)

                                                /* Dimensionnement et apparition input description */

                                                ModalDescriptionText = document.querySelector("#modal-description-text" + ajoutTache.id)
                                                console.log(ajoutTache.id)

                                                ModalDescriptionText.addEventListener("click", function (e) {
                                                    height = this.offsetHeight
                                                    height = height + 10
                                                    inputModale = document.querySelector("#input-modale" + ajoutTache.id)
                                                    inputModale.style.height = height + 'px'
                                                    descriptionModale = document.querySelector("#description-modale" + ajoutTache.id)
                                                    descriptionModale.classList.remove("hidden")
                                                    this.classList.add("hidden")
                                                })

                                                /* Sauvegarde de la description en BDD */
                                                buttonModal = document.querySelector("#button-modale" + ajoutTache.id)
                                                buttonModal.addEventListener("click", function (e) {
                                                    inputValue = inputModale.value
                                                    if (inputValue != "Entrez une description.") {
                                                        let inserer = {
                                                            description: inputValue,
                                                            idTache: ajoutTache.id
                                                        }
                                                        //Requete POST
                                                        fetch('../api/description.php', {
                                                            method: "POST",
                                                            header: {
                                                                "Content-type": "application/json"
                                                            },
                                                            body: JSON.stringify(inserer)
                                                        })
                                                            .then((reponse) => {

                                                                ModalDescriptionTex = document.querySelector("#modal-description-text" + ajoutTache.id)

                                                                ModalDescriptionTex.innerHTML = `
                                                                                                                                        <p>${inputValue}</p>`;
                                                                ModalDescriptionTex.classList.remove("hidden")
                                                                descriptionModale = document.querySelector("#description-modale" + ajoutTache.id)
                                                                descriptionModale.classList.add("hidden")

                                                            })
                                                    }

                                                })
                                                buttonModalValue = buttonModal.value
                                                console.log(buttonModal)

                                                /* FINIR UNE TACHE EN BDD*/
                                                buttonTacheFinie = document.querySelector("#tache-finie" + ajoutTache.id)
                                                buttonTacheFinie.addEventListener("click", function (e) {
                                                    if (confirm('La tâche est finie?')) {
                                                        let inserer = {
                                                            'id_tache': ajoutTache.id
                                                        }

                                                        //Requete POST
                                                        fetch('../api/tacheFinie.php', {
                                                            method: "POST",
                                                            header: {
                                                                "Content-type": "application/json"
                                                            },
                                                            body: JSON.stringify(inserer)
                                                        })
                                                            .then((response) => {
                                                                idTache = ajoutTache.id
                                                                modalHidden = document.querySelector("#modal" + idTache)
                                                                modalHidden.classList.remove("show")
                                                                tacheHidden = document.querySelector("#tache" + idTache)
                                                                tacheHidden.classList.add("hidden")
                                                            })
                                                        retire = document.querySelectorAll(".liste-finie")
                                                        retire.forEach(element => {
                                                            element.remove()

                                                        });
                                                        tachesFin(utilisateur)



                                                    }
                                                });

                                                /* SUPPRIMER UNE TACHE EN BDD*/
                                                buttonTacheAnnule = document.querySelector("#tache-annule" + ajoutTache.id)
                                                buttonTacheAnnule.addEventListener("click", function (e) {
                                                    if (confirm('Voulez-vous supprimer la tâche?')) {
                                                        let inserer = {
                                                            'id_tache': ajoutTache.id
                                                        }

                                                        //Requete POST
                                                        fetch('../api/tacheFinie.php', {
                                                            method: "POST",
                                                            header: {
                                                                "Content-type": "application/json"
                                                            },
                                                            body: JSON.stringify(inserer)
                                                        })
                                                            .then((response) => {
                                                                idTache = ajoutTache.id
                                                                modalHidden = document.querySelector("#modal" + idTache)
                                                                modalHidden.classList.remove("show")
                                                                tacheHidden = document.querySelector("#tache" + idTache)
                                                                tacheHidden.classList.add("hidden")
                                                            })
                                                    }
                                                });

                                                /* FENETRE MODALE AFFICHE*/
                                                // On récupère tous les boutons d'ouverture de modale
                                                var modalButtons = document.querySelectorAll(".tache");
                                                console.log(modalButtons)
                                                for (let button of modalButtons) {
                                                    button.addEventListener("click", function (e) {
                                                        // On empêche la navigation
                                                        e.preventDefault();
                                                        // On récupère le data-target
                                                        let target = this.dataset.target

                                                        // On récupère la bonne modale
                                                        let modale = document.querySelector(target);

                                                        // On affiche la modale
                                                        modale.classList.add("show");

                                                        // On récupère les boutons de fermeture
                                                        const modalClose = modale.querySelectorAll("[data-dismiss=dialog]");

                                                        for (let close of modalClose) {
                                                            close.addEventListener("click", function (e) {
                                                                e.preventDefault();
                                                                modale.classList.remove("show");
                                                            });
                                                        }

                                                        // On gère la fermeture lors du clic sur la zone grise
                                                        modale.addEventListener("click", function () {
                                                            this.classList.remove("show");
                                                        });
                                                        // On évite la propagation du clic d'un enfant à son parent
                                                        modale.children[0].addEventListener("click", function (e) {
                                                            e.stopPropagation();
                                                        })
                                                    });
                                                }


                                            })

                                    })
                                    }
                            })
                        })
                    })
            }
            else {
                console.log(reponse.statusText)
            }
        })
}
test()

/* LISTE DES TACHES FINIES */

function tachesFin(user) {

    let inserer = {

        user: user
    }
    //Requete POST
    fetch('../api/voirTachesFinies.php', {
        method: "POST",
        header: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(inserer)
    })
        .then((reponse) => {
            if (reponse.ok) {
                return reponse.json()
                    .then((listes) => {
                        listes.forEach(element => {
                            // Section liste tache finie
                            if (element.taches[0]) {

                                let liste = document.createElement("section")
                                liste.classList.add("liste-finie")
                                liste.classList.add("hidden")
                                liste.classList.add("liste-finie" + element.id_liste)
                                document.querySelector(".listes").appendChild(liste)

                                // Section date de la liste
                                maDate = new Date(element.create_liste)
                                const options = { month: 'long', day: 'numeric' };
                                DateListe = maDate.toLocaleDateString('fr-FR', options)

                                // Section description de la liste
                                let descriptionListe = document.createElement("section")
                                descriptionListe.classList.add("description-liste")
                                descriptionListe.innerHTML =
                                    `<h3>
                                    <u>${element.nomListe}</u>
                                </h3>
                                <section class="heure-debut">
                                    <i>créée le ${DateListe}</i>
                                </section>`;
                                document.querySelector(".liste-finie" + element.id_liste).appendChild(descriptionListe)

                                /* BOUCLE DES TACHES */
                                element.taches.forEach(element => {

                                    // Section tache
                                    let tache = document.createElement("section")
                                    tache.classList.add("tache-fini")
                                    tache.id = "tache-fini" + element.id
                                    tache.setAttribute('data-target', "#modal" + element.id);
                                    tache.innerHTML =
                                        `<h4>${element.nom}</h4>`
                                    document.querySelector(".liste-finie" + element.liste_id).appendChild(tache)

                                    // Section container
                                    let container = document.createElement("section")
                                    container.classList.add("container")
                                    container.id = "container-tache-fini" + element.id
                                    document.querySelector("#tache-fini" + element.id).appendChild(container)

                                    // Section date
                                    maDate = new Date(element.finish)
                                    const options = { month: 'long', day: 'numeric' };
                                    DateTache = maDate.toLocaleDateString('fr-FR', options)

                                    let date = document.createElement("section")
                                    date.classList.add("date")
                                    date.innerHTML = `
                             <section class="date-tache">
                             <i class="fas fa-calendar-check"></i>
                                 Fini le ${DateTache}
                             </section>`;
                                    document.querySelector("#container-tache-fini" + element.id).appendChild(date)

                                })
                            }

                        });
                    })

            } else {
                console.log(reponse.statusText)
            }
        })
}

tachesFin(utilisateur)
let visible = false

/* APPARITION DES TACHES FINIS */
const tachesFinies = document.querySelector("#fini-entete")
tachesFinies.addEventListener("click", function (e) {
    visible = !visible
    titre = document.querySelector(".entete h1")
    buttonTacheFin = document.querySelector(".entete button")

    if (visible === true) {
        titre.textContent = "Ecran des tâches finies"
        buttonTacheFin.textContent = "Mes listes"
    }
    else {
        titre.textContent = "Ecran des listes"
        buttonTacheFin.textContent = "Taches finies"
    }

    liste = document.querySelectorAll(".liste")
    liste.forEach(element => {
        element.classList.toggle("hidden")
    });

    ajouterListe = document.querySelector(".ajouter-liste")
    ajouterListe.classList.toggle("hidden")

    listeFinie = document.querySelectorAll(".liste-finie")
    listeFinie.forEach(element => {
        element.classList.toggle("hidden")
    });

})


