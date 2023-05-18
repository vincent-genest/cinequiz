/*///////////////////////////////////////////////////////////////////////
                     LES VARIABLES DU QUIZ
///////////////////////////////////////////////////////////////////////*/

// Extraits audio à utiliser dans l'interface du quiz
let audio = {
    succes: new Audio("medias/cymbale.mp3"),
    echec: new Audio("medias/basse.mp3"),
};

// Numéro de la question courante
let noQuestion = 0;

// Stock le tableau de question en cours
let objetQuestion;

//Tableau pour copier au hasard une des questions du tableau de question complet
let lesNouvellesQuestions = [];

// Nombre de réponses justes
let nombreReponsesJustes = 0;
// Plus grand nombre de réponses justes
let meilleurScore = localStorage.getItem("meilleurScoreJeu") || 0;

// Zone d'intro du quiz
let zoneIntro = document.querySelector(".intro");
// Zone d'affichage du quiz
let zoneQuiz = document.querySelector(".quiz");
// Zone de fin du quiz
let zoneFin = document.querySelector(".fin");

// Barre d'avancement du quiz
let barresAvancements = document.querySelectorAll(".barre-avancement");
// Largeur de la barre à tout moment (initialement 0)
let largeurBarre = 0;
// Cible de largeur pour chaque étape d'avancement du quiz (calculée selon
// la progression dans les questions et le nombre total de questions)
let largeurCibleBarre = 0;

//Bouton pour démarrer
let btnCommencer;

// Conteneur du titre du quiz
let headerTitre = document.querySelector("header");

// Conteneurs des titres des questions et des choix de réponse
let sectionQuestion = document.querySelector("section");

// Questions
let titreQuestion = document.querySelector(".titre-question");
// Choix de réponses
let lesChoixDeReponses = document.querySelector(".les-choix-de-reponse");

//Un des choix de réponses
let unChoix;

// Bouton servant à recommencer le quiz
let btnRecommencer = document.querySelector("main.fin .btn-recommencer");

//Les 2 vidéos
let video = document.querySelector("#video");

// Le cLap
let animationDebut = document.querySelector(".clappeur");

/*///////////////////////////////////////////////////////////////////////
                            ÉVÉNEMENTS
///////////////////////////////////////////////////////////////////////*/
// Gérer la fin de l'animation d'intro
animationDebut.addEventListener("animationend", afficherVideoIntro);

// Gestion du bouton de redémarrage du quiz (à la fin du quiz)
btnRecommencer.addEventListener("click", recommencer);

/*///////////////////////////////////////////////////////////////////////
                            LES FONCTIONS
///////////////////////////////////////////////////////////////////////*/

//------------------------------------INTRO DU QUIZ------------------------------------//
//Affiche la première vidéo de décompte
function afficherVideoIntro(event) {
    //Lorsque l'animation du clap est terminée
    if (event.animationName == "clappeur-rotation") {
        //On enlève l'écouteur et le clap
        animationDebut.removeEventListener("animationend", afficherVideo);
        animationDebut.remove();

        //On crée l'élément vidéo
        let videoIntro = document.createElement("video");
        //On lui donne un ID
        videoIntro.id = "video";
        //On détermnine la source selon la taille de la fenêtre
        if (window.matchMedia("(min-width: 992px)").matches) {
            videoIntro.src = "medias/OrdiDebut.mp4";
        } else if (window.matchMedia("(min-width: 666px)").matches) {
            videoIntro.src = "medias/TabletteDebut.mp4";
        } else {
            videoIntro.src = "medias/TelephoneDebut.mp4";
        }
        //On donne les propriétés nécéssaires
        videoIntro.setAttribute("loop", "");
        videoIntro.setAttribute("muted", "");
        videoIntro.setAttribute("autoplay", "");
        videoIntro.currentTime = 0;
        //On l'introduit
        zoneIntro.append(videoIntro);

        //On effectue un décompte pour faire apparaitre la prochaine section une fois la première vidéo terminée
        setTimeout(afficherVideo, 5000);
    }
}

//Une fois la première vidéo terminée, on affiche la 2eme vidéo et le bouton de démarrage
function afficherVideo() {
    //On sélectionne la première vidéo et on l'enlève
    videoIntro = document.querySelector("#video");
    videoIntro.remove();

    //On crée le titre du quiz
    let titre = document.createElement("h1");
    titre.innerText = "CinéQuiz";
    //On l'introduit
    zoneIntro.append(titre);

    //On crée l'élément vidéo
    let video = document.createElement("video");
    video.id = "video";
    //On détermnine la source selon la taille de la fenêtre/*
    if (window.matchMedia("(min-width: 992px)").matches) {
        video.src = "medias/Ordi.mp4";
    } else if (window.matchMedia("(min-width: 666px)").matches) {
        video.src = "medias/Tablette.mp4";
    } else {
        video.src = "medias/Telephone.mp4";
    }
    //On donne les propriétés nécéssaires
    video.setAttribute("loop", "");
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.currentTime = 0;
    //On l'introduit
    zoneIntro.prepend(video);

    //On crée le bouton de démarrage
    boutonCommencer = document.createElement("div");
    //On ajoute la classe, le texte et les écouteurs
    boutonCommencer.classList.add("boutonCommencer");
    boutonCommencer.innerText = "Commencer";
    boutonCommencer.addEventListener("mousedown", commencerLeQuiz);
    boutonCommencer.addEventListener("mouseover", changerSurvol);
    boutonCommencer.addEventListener("mouseout", changerSurvol);
    //On l'introduit
    zoneIntro.prepend(boutonCommencer);
}

//------------------------------------DEBUT DU QUIZ------------------------------------//
//On enlève l'intro et on appelle le début du quiz
function commencerLeQuiz() {
    //On enlève le conteneur de l'intro
    document.querySelector("main.intro").remove();

    //On enlève les écouteurs du boutons de démarrage
    boutonCommencer.removeEventListener("mousedown", commencerLeQuiz);
    boutonCommencer.removeEventListener("mouseover", changerSurvol);
    boutonCommencer.removeEventListener("mouseout", changerSurvol);

    //On met le conteneur du quiz visible
    zoneQuiz.style.display = "flex";

    //On crée le petit titre du quiz et on le place dans le header
    titreQuiz = document.createElement("h2");
    titreQuiz.innerText = "CinéQuiz";
    headerTitre.append(titreQuiz);

    //On appelle la fonction qui duplique les options de questions
    gererQuestionsCopie();

    //On affiche la première question
    afficherQuestion();
}

function gererQuestionsCopie() {
    //On crée une copie du tableau de question pour ne pas modifier la source
    lesNouvellesQuestions = lesQuestions.concat();
}

//On affiche les quesions
function afficherQuestion() {
    //Génère un nombre pour une question aléatoire
    noQuestionHasard = Math.floor(Math.random() * lesNouvellesQuestions.length);
    // Récupérer l'objet de la question en cours dans le tableau des questions au hasard
    objetQuestion = lesNouvellesQuestions[noQuestionHasard];

    // Affecter le texte dans le titre de la question
    titreQuestion.innerText = objetQuestion.titre;
    //On applique l'animation d'apparition de la question
    titreQuestion.style.animation = "texte-questions-apparition 0.5s ease-out forwards";

    // Créer et afficher les balises des choix de réponse :
    // On commence par vider le conteneur des choix de réponses.
    lesChoixDeReponses.innerHTML = "";

    // Puis on le remplit de nouveau avec les choix de réponses de la question
    for (let i = 0; i < objetQuestion.choix.length; i++) {
        //On crée la balise et on y affecte une classe CSS
        unChoix = document.createElement("div");
        unChoix.classList.add("choix");

        //On intègre la valeur du choix de réponse
        unChoix.innerText = objetQuestion.choix[i];

        //On affecte dynamiquement l'index de chaque choix
        unChoix.indexChoix = i;

        //On met un écouteur pour vérifier la réponse choisie
        unChoix.addEventListener("mousedown", verifierReponse);

        //On met uyn écouteur pour modifier l'état de survol
        unChoix.addEventListener("mouseover", changerSurvol);
        unChoix.addEventListener("mouseout", changerSurvol);

        //On applique l'animation d'apparition des choix de réponses
        unChoix.style.animation = "fondu-haut-entrant 0.5s ease-out forwards";

        //Enfin on affiche ce choix
        lesChoixDeReponses.append(unChoix);
    }

    //On retire cette question de la copie des questions pour éviter qu'elle revienne
    lesNouvellesQuestions.splice(noQuestionHasard, 1);

    // Fixer la largeur cible de la barre d'avancement (en proportion du nombre
    // de questions disponibles, et du numéro de la question à venir)
    largeurCibleBarre = ((noQuestion + 1) / 7) * 80;

    // Utiliser l'API RequestAnimationFrame pour démarrer l'animation de la
    // barre d'avancement réalisée dans la fonction "animerBarreAvancement" (ci-dessous)
    requestAnimationFrame(animerBarresAvancement);
}

//Anime l'avancement des 2 barres... d'avancements
function animerBarresAvancement() {
    // Modifier la largeur de la barre d'avancement en l'augmentant de 1vw à
    // chaque appel de cette fonction
    largeurBarre += 1;

    //On applique la modification de largeur pour chaque barres (x2)
    for (uneBarreAvancement of barresAvancements) {
        uneBarreAvancement.style.width = largeurBarre + "vw";
    }

    // Si la largeur cible n'est pas encore atteinte, faire une autre requête
    // d'animation à l'aide de RAF
    if (largeurBarre < largeurCibleBarre) {
        requestAnimationFrame(animerBarresAvancement);
    }
}

/**
 * Vérifier la réponse cliquée et gerer le passage à la prochaine question.
 *
 * @param {object} event Informations sur l'événement MouseEvent distribué
 */
function verifierReponse(event) {
    //On déscative les intéraction avec les choix de réponses
    lesChoixDeReponses.classList.toggle("desactiver");

    //On retire l'animation du titre pour qu'elle se réexecute lorsqu'il est recréé
    titreQuestion.style.animation = "";

    //On recherche toutes les balises de choix
    let lesChoix = document.querySelectorAll(".choix");

    //Pour chaque choix, on applique la classe ou l'animation selon si c'est la bonne réponses ou non
    for (const unChoix of lesChoix) {
        if (unChoix.indexChoix == objetQuestion.bonneReponse) {
            unChoix.classList.add("reponse-succes");
        } else {
            unChoix.style.animation = "fondu-bas-sortant 1s ease-out forwards";
        }
    }

    //S'il s'agit de la bonne réponse, on joue le son de cymbale et on incrémente le nombre de bonne réponse, sinon on joue le son de basse
    if (event.target.indexChoix == objetQuestion.bonneReponse) {
        audio.succes.currentTime = 0;
        audio.succes.play();
        nombreReponsesJustes++;
    } else {
        audio.echec.currentTime = 0;
        audio.echec.play();
    }

    //Après 1,5s, on appèle la prochgaine question
    setTimeout(gererProchaineQuestion, 1500);
}

//Gère l'affichage de nouvelles questions
function gererProchaineQuestion() {
    // On réactive les clics sur les choix de réponse
    lesChoixDeReponses.classList.toggle("desactiver");

    // On incrémente noQuestion pour la prochaine question à afficher
    noQuestion++;

    //On affiche une nouvelle question tant qu'on n'est pas rendu à 7, sinon on appel la fin du quiz
    if (noQuestion < 7) {
        afficherQuestion();
    } else {
        afficherFinQuiz();
    }
}

//------------------------------------FIN DU QUIZ------------------------------------//
//Affiche la fin du quiz
function afficherFinQuiz() {
    //On retire un écouteur pour vérifier la réponse choisie
    unChoix.removeEventListener("mousedown", verifierReponse);

    //On retire un écouteur pour modifier l'état de survol des boutons de choix
    unChoix.removeEventListener("mouseover", changerSurvol);
    unChoix.removeEventListener("mouseout", changerSurvol);

    // Retirer la zone du quiz de l'affichage
    zoneQuiz.style.display = "none";

    // Créer dynamiquement la section qui contiendra le score (résultat)
    let sectionResultat = document.createElement("section");

    //On verifie si le nouveau score est plus élevé que le dernier socre le plus élevé, su oui, on met la variable meilleur score à jour
    meilleurScore = Math.max(meilleurScore, nombreReponsesJustes);
    //On enregistre dans le storage le meilleur score
    localStorage.setItem("meilleurScoreJeu", meilleurScore);

    //On introduit les texte dans le résultat qui compare le résultat au meilleur résultat
    //sectionResultat.innerText = "Votre score : " + nombreReponsesJustes + " / 7" + ". \nVotre meilleur résultat est " + meilleurScore + " / 7" + ".";
    sectionResultat.innerText =
        "Votre score : " +
        Math.round((nombreReponsesJustes / 7) * 100) +
        "%. \nVotre meilleur résultat est " +
        Math.round((meilleurScore / 7) * 100) +
        "%.";
    //On ajoute la classe résultat
    sectionResultat.classList.add("resultat");
    //On l'introduit
    zoneFin.prepend(sectionResultat);

    // Remettre dans l'affichage la zone de "fin du quiz"
    zoneFin.style.display = "flex";

    // Le bouton "recommencer" est affiché à la fin de l'animation du résultat du quiz
    sectionResultat.addEventListener("animationend", afficherBtnRecommencer);
}

//Fait apparaitre le bouton de redémarrage
function afficherBtnRecommencer() {
    //On remet l'opacité au max
    btnRecommencer.style.opacity = "1";
    //On ajoute les écouteurs pour modifier l'état de survol
    btnRecommencer.addEventListener("mouseover", changerSurvol);
    btnRecommencer.addEventListener("mouseout", changerSurvol);
}

//Gère le redémarrage du quiz
function recommencer() {
    // Remettre les variables numériques du quiz à leurs valeurs initiales (à vous
    // de voir lesquelles vous devez réinitialiser)
    noQuestion = 0;
    nombreReponsesJustes = 0;
    largeurBarre = 0;
    positionX = 100;

    // Retirer du DOM la section contenant le résultat (l'élément ayant la classe 'resultat')
    document.querySelector(".resultat").remove();

    // Remettre l'opacité du bouton "recommencer" à 0
    btnRecommencer.style.opacity = "0";
    // On réaffiche le conteneur de la zone du quiz (son affichage initial était "flex")
    zoneQuiz.style.display = "flex";
    // Et on retire la zone de "fin du quiz" de l'affichage
    zoneFin.style.display = "none";

    //On recrée une copie des questions
    gererQuestionsCopie();

    // Finalement, on peut afficher la première question...
    afficherQuestion();
}

/*///////////////////////////////////////////////////////////////////////
                            CURSEUR PERSONALISÉ 
///////////////////////////////////////////////////////////////////////*/

//L'élément HTML qui agira S'IL Y A Lieu comme curseur
let leCurseur = null;

//Au début, on gère ou NON l'apparence du curseur
//selon le dispositif de pointage de l'utilisateur
gererCurseur();

/*
 *Gérer l'aspect du curseur et la gestion des événements de souris
 */
function gererCurseur() {
    //On sélectionne la balise du curseur dans le HTML
    leCurseur = document.querySelector(".curseur");

    // Vérifier avec une requête média la capacité du mécanisme de saisie principal
    // à survoler les éléments
    if (window.matchMedia("(hover : hover)").matches) {
        //On enlève l'affichage du curseur par défaut
        document.querySelector("body").style.cursor = "none";
        //Écouteur sur le document pour l'événement de souris "mousemove"
        document.addEventListener("mousemove", bougerCurseur);
    } else {
        //On met l'affichage du curseur par défaut sur le body
        document.querySelector("body").style.cursor = "auto";
        //On enlève la balise du curseur de l'affichage
        leCurseur.remove();
    }
}

// Saisir l'élément HTML de la page qui représente la racine du document sur lequel sont définies les propriétées personnalisées de position du curseur.
let racine = document.querySelector(":root");

/**
 * Déplacer le curseur personnalisé pour suivre la position du pointeur de souris
 * @param {Event} event : objet Event de l'événement en cours
 */
function bougerCurseur(event) {
    // Modifiez les valeurs des propriétés personnalisées définis sur la racine
    // du document HTML
    racine.style.setProperty("--mouse-x", event.clientX + "px");
    racine.style.setProperty("--mouse-y", event.clientY + "px");
}

/**
 * Modifier la forme du curseur personnalisé lorsqu'on survole un "bouton"
 * @param {Event} event : objet Event de l'événement en cours
 */
function changerSurvol(event) {
    // Selon le type d'événement, on veut ajouter ou enlever la classe 'survol'
    if (event.type == "mouseover") {
        //Si le curseur survol, on ajoute la classe survol aux éléments survolé et survolCurseur au curseur
        event.target.classList.add("survol");
        leCurseur.classList.add("survolCurseur");
    } else {
        //Sinon, on les enlèves
        event.target.classList.remove("survol");
        leCurseur.classList.remove("survolCurseur");
    }
}
