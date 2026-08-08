// cette 1ère partie nous a appris comment fonctionne Javascript à partir de HTML
// console.log("Bonjour Rivo !"); test pour apprendre l'utilité de la commande console.log("...")
// const titre = document.getElementById("titre-principal"); // extrait d'abord l'objet html par son id
// titre.textContent = "Bienvenue dans mon portfolio !"; // ensuite extrait une propriété de l'objet
// Un autre exemple de javascript
// const bouton = document.getElementById("btn-bienvenue"); // récupère l'objet bouton par son id ajouté dans le html
// bouton.addEventListener("click", function() {
//    console.log("Le bouton a été cliqué !");
// }); // affiche dans la console "bouton cliqué lorsqu'on clique sur le bouton"
// Un autre exmple
// const bouton = document.getElementById("btn-bienvenue");
// const message = document.getElementById("message");
// bouton.addEventListener("click", function() {
//    message.textContent = "Merci de visiter mon portfolio !"; // modifie le message lorsqu'on clique
//    message.style.color = "green"; // change la couleur du texte lorsqu'on clique
// });
// Ici on travaille maintenant sur notre projet de portfolio
// Après avoir créé un id et un bouton dans le html, on les récupère
// bouton et son objet navigateur des publications
const boutonPublications = document.getElementById("btn-publications"); // id du bouton concerné
const publications = document.getElementById("publications-list"); // id de l'objet, c-à-d le div concerné

// bouton et son objet navigateur des formations
const boutonFormations = document.getElementById("btn-formations");
const formations = document.getElementById("formations-list");

// bouton et son objet navigateur du parcours professionnel
const boutonParcours = document.getElementById("btn-parcours");
const parcours = document.getElementById("parcours-list");

// bouton et son objet navigateur des expertises
const boutonExpertises = document.getElementById("btn-expertises");
const expertises = document.getElementById("expertises-list");

// bouton et son objet navigateur de l'adresse email
const boutonCopierEmail = document.getElementById("btn-copier-email");
const email = "dmamyrivo@gmail.com";
const texteCopierEmail = document.getElementById("texte-copier-email");
const iconeCopierEmail = document.getElementById("icone-copier-email");
//console.dir(boutonCopierEmail);

// objet navigateur crée par le navigateur lui-mème. pas besoin de les déclarer 
// car ils existent déjà dans l'environnement javascript de la page
// console.dir(navigator);
// console.dir(navigator.clipboard);
// commande pour copier coller l'email
boutonCopierEmail.addEventListener("click", function(){
    navigator.clipboard.writeText(email)
    .then(function(){
        texteCopierEmail.textContent = "Copié !";
        iconeCopierEmail.classList.remove("fa-regular", "fa-copy"); // style de l'icone, icone représentant la copie
        iconeCopierEmail.classList.add("fa-solid", "fa-check"); // icone de la coche par Font Awesome
        setTimeout(function(){ // fonction obligeant de passer de "copié!" à "copier" après 1500ms
            texteCopierEmail.textContent = "Copier";
            iconeCopierEmail.classList.remove("fa-solid", "fa-check"); // style de l'icone, icone représentant la copie
            iconeCopierEmail.classList.add("fa-regular", "fa-copy");
        },2000);
    })
    .catch(function(){
        texteCopierEmail.textContent = "Erreur";
        setTimeout(function(){
            texteCopierEmail.textContent = "Copier";
        }, 2000);        
    });
});

// console.dir(publications); // permet de lister dans la console toutes les propriétés d'un objet du navigateur

//function afficherPublications() { // la fonction sans arguments pour afficher les publications
//    publications.classList.add("visible");
//    publications.style.display = "block"; pour une affichage statique
//    bouton.textContent = "Masquer les publications";
//}

//function masquerPublications() { // la fonction sans arguments pour masquer les publications
//    publications.classList.remove("visible");
//    publications.style.display = "none"; pour une affichage statique
//    bouton.textContent = "Afficher les publications";
//}

// test des fonctions de généralisation sur les publications, formations,...les sections
function afficherSection(section,boutonAssocie,texteMasquer){
    section.classList.add("visible");
    boutonAssocie.textContent = texteMasquer;
}

function masquerSection(section,boutonAssocie,texteAfficher){
    section.classList.remove("visible");
    boutonAssocie.textContent = texteAfficher;
}

//bouton.addEventListener("click", function() { // écoute un event, notamment un clic de la souris, ensuite rajoute une fonction de réponse à l'event
// cette partie désigne l'affiche statique;
    //    const affichageActuel = getComputedStyle(publications).display; pour un affichage statique // demande au navigateur l'état réel des publications car ne peut communiquer ni avec le html, ni vaec le css
//    console.log(publications.classList);
//    console.log(publications.className);
//    if (affichageActuel === "none"){
//        afficherPublications(); // on appelle la fonction définie ci-dessus
//        publications.style.display = "block"; // modifie le style d'affichage
//        bouton.textContent = "Masquer les publications"; // modifie le contenu de texte
//    } else {
//        masquerPublications(); // on affiche la fonction définie ci-dessus
//        publications.style.display = "none";
//        bouton.textContent = "Afficher les publications";
// cette partie concerne l'affichage animée
//    const publicationsVisibles = publications.classList.contains("visible");
//    if (publicationsVisibles){
//        masquerSection(publications,bouton,"Afficher les publications");
//    } else {
//        afficherSection(publications,bouton,"Masquer les publications");
//    }
//}); 
// Ecouteur pour les publications
boutonPublications.addEventListener("click", function() {
    const publicationsVisibles = publications.classList.contains("visible");
    if(publicationsVisibles) {
        masquerSection(publications,boutonPublications,"Afficher les publications");
    } else {
        afficherSection(publications,boutonPublications,"Masquer les publications");
    }
});
// Ecouteur pour les formations
boutonFormations.addEventListener("click", function() {
    const formationsVisibles = formations.classList.contains("visible");
    if(formationsVisibles) {
        masquerSection(formations,boutonFormations,"Afficher les formations");
    } else {
        afficherSection(formations,boutonFormations,"Masquer les formations");
    }
});
// Ecouteur pour le parcours professionnel
boutonParcours.addEventListener("click", function() {
    const parcoursVisible = parcours.classList.contains("visible");
    if(parcoursVisible) {
        masquerSection(parcours,boutonParcours,"Afficher le parcours professionnel");
    } else {
        afficherSection(parcours,boutonParcours,"Masquer le parcours professionnel");
    }
});
// Ecouteur pour les expertises
boutonExpertises.addEventListener("click", function() {
    const expertisesVisibles = expertises.classList.contains("visible");
    if(expertisesVisibles) {
        masquerSection(expertises,boutonExpertises,"Afficher les expertises");
    } else {
        afficherSection(expertises,boutonExpertises,"Masquer les expertises");
    }
});