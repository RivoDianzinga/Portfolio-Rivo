/*
En dessous, nous déclarons nos références vers les élts HTML de connexion et publications
on utilise "document.querySelector" car on  référence des classes de HTML
*/

const formConnexion = document.querySelector("#form-connexion");

const champEmail = document.querySelector("#email");
const champPassword = document.querySelector("#password");

const messageConnexion = document.querySelector("#message-connexion");

const sectionConnexion = document.querySelector("#connexion-admin");
const dashboardAdmin = document.querySelector("#dashboard-admin");

const boutonDeconnexion = document.querySelector("#btn-deconnexion");

const listeAdminPublications = document.querySelector("#liste-admin-publications");

const messageDashboard = document.querySelector("#message-dashboard");

/*
ci_dessous, les références javascript du formulaire de modification pour les 
champs à modifier : fourmulaire, auteurs, titre, journal volume, nombre, pages, 
année, doi
*/

const formModification = document.querySelector("#form-modification");

const champModifAuthors = document.querySelector("#modif-authors");

const champModifTitle = document.querySelector("#modif-title");

const champModifJournal = document.querySelector("#modif-journal");

const champModifVolume = document.querySelector("#modif-volume");

const champModifNumber = document.querySelector("#modif-number");

const champModifPages = document.querySelector("#modif-pages");

const champModifYear = document.querySelector("#modif-year");

const champModifDoi = document.querySelector("#modif-doi");

const boutonAnnulerModification = document.querySelector("#btn-annuler-modification");

let publicationEnCoursId = null; // cette variable réfère à la publication qu'on est 
// entrain de modifier

/*
Ci-dessous, on construit la fonction qui ouvre le formulaire de modification
*/
function ouvrirFormulaireModification(publication) {
    publicationEnCoursId = publication.id;
    champModifAuthors.value = publication.authors.join("\n");
    champModifTitle.value = publication.title;
    champModifJournal.value = publication.journal || "";
    champModifVolume.value = publication.volume || "";
    champModifNumber.value = publication.number || "";
    champModifPages.value = publication.pages || "";
    champModifYear.value = publication.year;
    champModifDoi.value = publication.doi;
    formModification.classList.remove("cache");
}

/*
Ci-dessous, on définit la fonction qui permet de saisir dans le formulaire 
de modification en utilisant PUT de SQL 
*/
formModification.addEventListener("submit", async function(event) {
        event.preventDefault();
        if (!publicationEnCoursId) {
            return;
        }
        const token = sessionStorage.getItem("adminToken");
        if (!token) {
            messageDashboard.textContent = "Session administrateur absente.";
            return;
        }
        const authors = champModifAuthors.value
            .split("\n")
            .map(function(auteur) {
                return auteur.trim();
            })
            .filter(function(auteur) {
                return auteur !== "";
            });
        const publicationModifiee = {
            authors: authors,
            title: champModifTitle.value.trim(),
            journal: champModifJournal.value.trim(),
            volume: champModifVolume.value.trim(),
            number: champModifNumber.value.trim(),
            pages: champModifPages.value.trim(),
            year: Number(champModifYear.value),
            doi: champModifDoi.value.trim()
        };
        try {
            const reponse = await fetch(
                "http://localhost:3000/api/publications/"
                + publicationEnCoursId,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body:
                        JSON.stringify(publicationModifiee)
                }
            );
            const donnees = await reponse.json();
            if (!reponse.ok) {
                messageDashboard.textContent =
                    donnees.error ||
                    "Impossible de modifier la publication.";
                return;
            }
            messageDashboard.textContent = "Publication modifiée avec succès.";
            formModification.classList.add("cache");
            formModification.reset();
            publicationEnCoursId = null;
            chargerPublicationsAdmin();
        } catch (erreur) {
            console.error("Erreur lors de la modification :", erreur);
            messageDashboard.textContent = "Impossible de contacter le serveur.";
        }
    }
);


/*
Ci-dessous, on définit le bouton "Annuler" qui annule la modification
*/
boutonAnnulerModification.addEventListener("click",function() {
        formModification.classList.add("cache");
        publicationEnCoursId = null;
        formModification.reset();
    }
);


/*
Ci dessous, on crée la fonction qui charge les publications une fois connecté 
*/
async function chargerPublicationsAdmin() {
    try {
        const reponse = await fetch(
            "http://localhost:3000/api/publications"
        );
        if (!reponse.ok) {
            throw new Error(
                "Erreur HTTP : " + reponse.status
            );
        }
        const publications = await reponse.json();
        listeAdminPublications.innerHTML = "";
        publications.forEach(function(publication) {
            const blocPublication = document.createElement("div");
            const titre = document.createElement("p");
            titre.textContent = publication.year + " - " + publication.title;
            const boutonModifier = document.createElement("button"); // le bouton "Modifier"
            boutonModifier.textContent = "Modifier";
            boutonModifier.addEventListener("click", function() {
                ouvrirFormulaireModification(publication);
                }
            );
            const boutonSupprimer = document.createElement("button"); // le bouton "supprimer"
            boutonSupprimer.textContent = "Supprimer";
            boutonSupprimer.addEventListener("click",function() {
                supprimerPublication(publication.id); // publication.id fait que chaque
                // bouton sait à quel publication il appartient
            }
            );            
            blocPublication.appendChild(titre);
            blocPublication.appendChild(boutonModifier);
            blocPublication.appendChild(boutonSupprimer);
            listeAdminPublications.appendChild(blocPublication);
        });
    } catch (erreur) {
        console.error(
            "Erreur lors du chargement des publications :",
            erreur
        );
        listeAdminPublications.textContent =
            "Impossible de charger les publications.";
    }
}

/*
Ici, on définit le bouton "supprimer" associé à chaque publication, et qui utilise
DELETE de SQL
*/
async function supprimerPublication(id) {
    const confirmation = confirm("Voulez-vous vraiment supprimer cette publication ?");
    if (!confirmation) {
        return;
    }
    const token =
        sessionStorage.getItem("adminToken");
    if (!token) {
        messageDashboard.textContent =
            "Session administrateur absente.";
        return;
    }
    try {
        const reponse = await fetch(
            "http://localhost:3000/api/publications/" + id,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );
        const donnees = await reponse.json();
        if (!reponse.ok) {
            messageDashboard.textContent =
                donnees.error ||
                "Impossible de supprimer la publication.";
            return;
        }
        messageDashboard.textContent = "Publication supprimée avec succès.";
        chargerPublicationsAdmin();
    } catch (erreur) {
        console.error(
            "Erreur lors de la suppression :",
            erreur
        );
        messageDashboard.textContent =
            "Impossible de contacter le serveur.";
    }
}

/*
Ci-dessous, on définit la fonction de connexion. Une fois 
les identifiants (email+pwd) reconnus, le navigateur 
déclenche cette fonction ci-dessous. 
*/
formConnexion.addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = champEmail.value.trim();
    const password = champPassword.value;
    try {
        const reponse = await fetch(
            "http://localhost:3000/api/admin/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );
        const donnees = await reponse.json();
        if (!reponse.ok) {
            messageConnexion.textContent =
                donnees.error || "Connexion impossible";
            return;
        }
        sessionStorage.setItem(
            "adminToken",
            donnees.token
        );
        messageConnexion.textContent = "";
        champPassword.value = "";
        sectionConnexion.classList.add("cache");
        dashboardAdmin.classList.remove("cache"); // une fois la connexion réussie, le cache du css est enlevé
        chargerPublicationsAdmin(); // on charge les publications actuelles
    } catch (erreur) {
        console.error(
            "Erreur de connexion :",
            erreur
        );
        messageConnexion.textContent =
            "Impossible de contacter le serveur.";
    }
});

/*
Ci-dessous, on définit la fonction de déconnexion
*/
boutonDeconnexion.addEventListener("click", function() {
    sessionStorage.removeItem("adminToken"); // prend temporairement le jwt
    dashboardAdmin.classList.add("cache");
    sectionConnexion.classList.remove("cache");
    formConnexion.reset();
    messageConnexion.textContent = "";
});