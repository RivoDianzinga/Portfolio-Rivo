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
const listePublication = document.getElementById("liste-publications"); // id html que javascript va utiliser pour renvoyer dans html

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
// Fonctionnalité de la section active
// on récupère toutes les sections à surveiller
//const sections = document.querySelectorAll("main section"); // récupère toutes les sections dans le main
//const liensNavigation = document.querySelectorAll("nav a"); // récupère tous les liens du menu de navigation
//console.dir(sections);
//console.dir(liensNavigation);
//sections.forEach(function(section){
//    console.log(section.id); // identifie le id de chaque section
//});
//liensNavigation.forEach(function(lien){
//    console.log(lien.getAttribute("href")); // identifie le href de chaque lien
//});
// on demande ensuite au navigateur de signaler quand une section entre dans la zone visible
// ici, on définit des options permettant à IntersectionObserver de regarder surtout la partie centrale de l'écran
//const optionsObservation = {
//    root: null,
//    rootMargin: "-40% 0px -40% 0px", // réduit visuellement la zone d'observation
//    threshold: 0 
//};
// ici on définit l'observateur, la section visible à son lien de navigation
//const observateur = new IntersectionObserver(function(entrees){
//    console.log(entrees);
//    entrees.forEach(function(entree){
//        console.log(entree.target.id, entree.isIntersecting);
//        if (entree.isIntersecting){
//            liensNavigation.forEach(function(lien){
//                lien.classList.remove("actif"); // avant d'activer le nouveau lien, on nettoie l'ancien état actif
//            });
//            const idSection = entree.target.id;
//            const lienActif = document.querySelector('nav a[href="#' + idSection + '"]');
//            if (lienActif){
//                lienActif.classList.add("actif");
//            }
//        }
//    });
//}, optionsObservation);
//
//sections.forEach(function(section){
//    observateur.observe(section); // on demande au navigateur d'observer chacune des sections
//});
// Logique d'application
// Ici on utilise des données (publications) que Javascript envoie à HTML pour les afficher avec le CSS
// On définit ici les publications comme des données objet pour javascript

// ces 3 donneés publications suivantes sont écrites à la main ici dans javascript dans un 1er temps
// mais, dans un second temps qui représente le cas pratique, ces publications sont 
// dans le fichier json afin d'appliquer la logique d'une architecture orientée
// où les données, la logique et l'interface sont séparées
/* const publication2016 = {
    id: "truflandier-2016-purification",
    authors: [
        "Truflandier, L. A.",
        "Dianzinga, R. M",
        "Bowler, D. R."
    ],
    title: "Communication: Generalized canonical purification for density matrix minimization",
    journal: "The Journal of Chemical Physics",
    volume: "144",
    number: "9",
    pages: "091102",
    year: 2016,
    doi: "10.1063/1.4943213"
};
const publication2020 = {
    id: "truflandier-2020-perturbation",
    authors: [
        "Truflandier, L. A.",
        "Dianzinga, R. M",
        "Bowler, D. R."
    ],
    title: "Notes on density matrix perturbation theory",
    journal: "The Journal of Chemical Physics",
    volume: "153",
    number: "16",
    pages: "164105",
    year: 2020,
    doi: "10.1063/5.0022244"
};
const publication2022 = {
    id: "bouchet-2022-theoretical",
    authors: [
        "Bouchet, J.",
        "Dianzinga, R. M",
        "Jomard, G."
    ],
    title: "Theoretical investigation of charged vacancies and clusters in UXO2 (X = La, Ce, Pu, Am)",
    journal: "Journal of Applied Physics",
    volume: "132",
    number: "7",
    pages: "075110",
    year: 2022,
    doi: "10.1063/5.0098635"
}; */
//

//console.dir(publication2016);
//console.log(publication2016.title);
//console.log(publication2016.year);
//console.log(publication2016.doi);
//console.log(publication2016.authors);
//console.log(publication2016.authors[1]);
// Récupération du id du html
//const publicationTest = document.getElementById("publication-test");

/* ici on généralise tout dans une fonction
// on généralie tout dans une fonction
function afficherPublication(publication){
// ici, chaque publication doit devenir un bloc unique, donc un div
    const cartePublication = document.createElement("div");
// on donne ensuite une classe
    cartePublication.classList.add("publication-item");        
// création du titre de la publication
    const titrePublication = document.createElement("h3"); // dis au navigateur de créer un nouvel élt HTML <h3>
// on lui donne ensuite comme texte, la donnée venant de l'objet 
    titrePublication.textContent = publication.title;
// ensuite, il faut l'insérer dans la carte
    cartePublication.appendChild(titrePublication);
// pareil pour les auteurs
    const auteursPublication = document.createElement("p");
    auteursPublication.textContent = publication.authors.join(", ");
    cartePublication.appendChild(auteursPublication);
// pareil pour le journal 
//    const journalPublication = document.createElement("p");
//    journalPublication.textContent = publication.journal;
//    cartePublication.appendChild(journalPublication);
// idem pour le volume
//    const volumePublication = document.createElement("p");
//    volumePublication.textContent = publication.volume;
//    cartePublication.appendChild(volumePublication);
// idem pour le nombre
//    const numberPublication = document.createElement("p");
//    numberPublication.textContent = publication.number;
//    cartePublication.appendChild(numberPublication);
// idem pour la page
//    const pagesPublication = document.createElement("p");
//    pagesPublication.textContent = publication.pages;
//    cartePublication.appendChild(pagesPublication);
// idem pour l'année
//    const yearPublication = document.createElement("p");
//    yearPublication.textContent = publication.year;
//    cartePublication.appendChild(yearPublication);
// au lieu de séparer le journal, le volume, le nombre, la page et l'année, on condense tout sur une seule ligne
// Ligne principale de la référence
    const referencePublication = document.createElement("p");
    referencePublication.textContent = `${publication.journal}, ${publication.volume}(${publication.number}), ${publication.pages}(${publication.year})`;
    cartePublication.appendChild(referencePublication);
// idem pour le doi, on crée un l'adresse url
    const doiPublication = document.createElement("p"); // crée un paragraphe
    const lienDoi = document.createElement("a"); // crée une balise de lien
    lienDoi.href = "https://doi.org/" + publication.doi;
    lienDoi.textContent = "DOI : " + publication.doi;
    lienDoi.target = "_blank";
    lienDoi.rel = "noopener noreferrer";
    doiPublication.appendChild(lienDoi);
    cartePublication.appendChild(doiPublication);

//    doiPublication.textContent = publication.doi;
//    cartePublication.appendChild(doiPublication);   
// et on met le tout dans le DOM
//    publicationTest.appendChild(cartePublication); // une donnée métier est un composant visuel cohérent     
    publications.appendChild(cartePublication); // ici c'est "publications" venant de html qui permet à javascript d'envoyer les données traitées au html
};
*/

/* on généralise tout dans une fonction d'affichage dans l'ancein format du html */
function afficherPublication(publication){
// une publication devient un élt de liste li
    const itemPublication = document.createElement("li");
    itemPublication.classList.add("publication-item");
// ligne principale de la référence
    const referencePublication = document.createElement("p");
// auteur mis en avant
    const auteursPublication = document.createElement("span");
    auteursPublication.textContent = "Dianzinga, R. M., et al. : ";
// titre en italique
    const titrePublication = document.createElement("em");
    titrePublication.textContent = `"${publication.title}"`;
// nom du journal
    const journalPublication = document.createElement("span");
    journalPublication.textContent = `, ${publication.journal} `;
// volume en gras
    const volumePublication = document.createElement("strong");
    volumePublication.textContent = publication.volume;
// numéro, pages et année
    const detailsPublication = document.createElement("span");
    detailsPublication.textContent = `(${publication.number}), ${publication.pages} (${publication.year})`;
// Assemblage de la référence
    referencePublication.appendChild(auteursPublication);
    referencePublication.appendChild(titrePublication);
    referencePublication.appendChild(journalPublication);
    referencePublication.appendChild(volumePublication);
    referencePublication.appendChild(detailsPublication);
// Ligne DOI
    const doiPublication = document.createElement("p");
    doiPublication.classList.add("publication-doi");
    const texteDoi = document.createElement("span");
    texteDoi.textContent = "DOI : ";
    const lienDoi = document.createElement("a");
    lienDoi.href = "https://doi.org/" + publication.doi;
    lienDoi.textContent = "Consulter la publication";
    lienDoi.target = "_blank";
    lienDoi.ref = "noopener noreferrer";
    doiPublication.appendChild(texteDoi);
    doiPublication.appendChild(lienDoi);
// insertion dans la publication
    itemPublication.appendChild(referencePublication);
    itemPublication.appendChild(doiPublication);
// insertion dans la liste                            
    listePublication.appendChild(itemPublication);
};

//afficherPublication(publication2016);
//afficherPublication(publication2020);
//afficherPublication(publication2022);
// collection de données des publications issus da javascript lui-mème
// en suivant la séparation des responsabilités, ces mèmes données sont issues
// dans publications.json, donc ici ils sont commentés
/*
const donneesPublications = [
    publication2016,
    publication2020,
    publication2022
];
*/
//console.dir(donneesPublications);
//donneesPublications.forEach(function(publication){
//    afficherPublication(publication);
//});
// ici les données publications sont dans publications.json selon la sépararation
// des responsabilités
//fetch("Data/publications.json") // cherche la ressource de données publications.json dans le dossier data
fetch("http://localhost:3000/api/publications") // on cherche à connecter le front-end aux données de l'API HTTP du back-end
    .then(function(reponse){
//        console.dir(reponse);
        if(!reponse.ok){   // signifie "si la réponse n'est pas correcte"
            throw new Error(
                "Erreur HTTP : " + reponse.status
            );
        }

        return reponse.json(); // objet http response, transforme la réponde json en données javascript
    })
    .then(function(donnees){
//        console.dir(donnees); // donnees correspondant au vrai tableau
        donnees.forEach(function(publication){
            afficherPublication(publication); // c'est ici que javascript envoie au html d'afficher les données gràce à "publications" qui découle "publications-list" déjà présent dans le html
        });
    })
    .catch(function(erreur){
        console.error("Erreur lors du chargement des publications :", erreur); // signale au développeur qu'il y'a une erreur
// on crée en dessous un message pour signaler aussi à l'utilisateur qu'il y'a une erreur        
        const messageErreur = document.createElement("p");
        messageErreur.textContent = "Impossible de charger les publications pour le moment. ";
        publications.appendChild(messageErreur);
    });
