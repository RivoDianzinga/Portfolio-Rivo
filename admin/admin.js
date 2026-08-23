/*
En dessous, nous déclarons nos références vers les élts HTML de connexion et publications
*/
const formConnexion = document.querySelector("#form-connexion");

const champEmail = document.querySelector("#email");
const champPassword = document.querySelector("#password");

const messageConnexion = document.querySelector("#message-connexion");

const sectionConnexion = document.querySelector("#connexion-admin");
const dashboardAdmin = document.querySelector("#dashboard-admin");

const boutonDeconnexion = document.querySelector("#btn-deconnexion");

const listeAdminPublications = document.querySelector("#liste-admin-publications");

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
            blocPublication.appendChild(titre);
            listeAdminPublications.appendChild(
                blocPublication
            );
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
Ci-dessous, on définit la fonctionn de déconnexion
*/
boutonDeconnexion.addEventListener("click", function() {
    sessionStorage.removeItem("adminToken"); // prend temporairement le jwt
    dashboardAdmin.classList.add("cache");
    sectionConnexion.classList.remove("cache");
    formConnexion.reset();
    messageConnexion.textContent = "";
});