/*////////////////////////////////////////////////////////////////////////////////////////////
                            LES QUESTIONS DU QUIZ
    Banque de questions dans une "structure de données" JavaScript : le tableau contient
    une collection de questions, et chaque question à trouver est un objet JavaScript
    qui contient TROIS valeurs : la chaîne du titre de la question, un tableau (Array) pour les
    choix de réponse et un nombre indiauqnt l'index de la bonne réponse...
///////////////////////////////////////////////////////////////////////////////////////////////*/

let lesQuestions = [
    {
        titre: "Quel film de Christopher Nolan présente Leonardo DiCaprio dans le rôle d'un expert en extraction de rêves qui cherche à se racheter en exécutant un dernier travail difficile ?",
        choix: ["Inception", "Interstellar", "Dunkerque", "The Prestige"],
        bonneReponse: 0,
    },
    {
        titre: "Dans quelle ville se déroule l'action du film 'La La Land' de 2016, réalisé par Damien Chazelle ?",
        choix: ["New York", "Los Angeles", "Chicago", "San Francisco"],
        bonneReponse: 1,
    },
    {
        titre: "Quel est le nom du personnage principal dans le film 'Joker' de 2019, interprété par Joaquin Phoenix ?",
        choix: ["Arthur Fleck", "Harvey Dent", "Bruce Wayne", "James Gordon"],
        bonneReponse: 0,
    },
    {
        titre: "Qui a réalisé le film 'Pulp Fiction' de 1994, avec John Travolta et Uma Thurman dans les rôles principaux ?",
        choix: ["Steven Spielberg", "Martin Scorsese", "Quentin Tarantino", "Francis Ford Coppola"],
        bonneReponse: 2,
    },
    {
        titre: "Quel est le nom du personnage principal dans le film 'Kill Bill' de Quentin Tarantino, interprété par Uma Thurman ?",
        choix: ["Beatrix Kiddo", "Mia Wallace", "Elle Driver", "O-Ren Ishii"],
        bonneReponse: 0,
    },
    {
        titre: "Qui a joué le rôle de John McClane dans le film 'Die Hard' sorti en 1988",
        choix: ["Harrison Ford", "Sylvester Stallone", "Arnold Schwarzenegger", "Bruce Willis"],
        bonneReponse: 3,
    },
    {
        titre: "Quel est le nom de l'hôtel dans le film d'horreur 'Shining' de Stanley Kubrick ?",
        choix: ["Timberline Lodge", "Overlook Hotel", " Mount Hood Hotel", " The Grand Budepest Hotel"],
        bonneReponse: 1,
    },
    {
        titre: "Quelle année est sorti l'excellent film 'The Shawshank Redemption' de Frank Darabont?",
        choix: ["1984", "1994", "1999", " 2003"],
        bonneReponse: 1,
    },
    {
        titre: "Dans quel film de Martin Scorsese, Robert De Niro incarne-t-il Jake LaMotta, un boxeur italo-américain qui connaît un succès mais est torturé par la jalousie et la paranoïa ?",
        choix: ["Raging Bull", "Casino", "Snatch", "Taxi Dirver"],
        bonneReponse: 0,
    },
    {
        titre: "Quels sont les deniers mots de Charles Foster Kane sur saon lit de mort dans 'Citizen Kane' ?",
        choix: ["Boule à neige", "Maman", "Bouton de rose", "Ouch"],
        bonneReponse: 2,
    },
    {
        titre: "Dans le film 'La Matrice', Neo prend-t-il la pillule bleue ou rouge?",
        choix: ["Bleue", "Rouge"],
        bonneReponse: 1,
    },
    {
        titre: "Quel est le premier film du réalisateur Steven Spielberg qui lui vaudra l'oscar du meilleur directeur?",
        choix: ["Jaws", "E.T.", "Back to the future", "Schindler's list"],
        bonneReponse: 3,
    },
    {
        titre: "Quel est le seul acteur à avoir reçu une nomination aux oscars pour sa performance dans 'Le seigneur des anneaux'?",
        choix: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen", "Orlando Bloom"],
        bonneReponse: 1,
    },
    {
        titre: "Quel film coté R (mature) a engrengé les plus d'argent au box-office?",
        choix: ["It", "The Matrix Reloaded", "Deadpool", "Joker"],
        bonneReponse: 3,
    },
    {
        titre: "Combien de film la franchise James Bond contient-elle?",
        choix: ["19", "25", "28", "30"],
        bonneReponse: 1,
    },
    {
        titre: "Quel compositeur doublement oscarisé à réalisé une bande son originale dans plusieurs franchises tels que Pirates des Caraïbes, Batman, Blade Runner et James Bond?",
        choix: ["Michael Giacchino", "John Williams", "Hans Zimmer", "John Barry"],
        bonneReponse: 2,
    },
    {
        titre: "Quel réalisateur a terrorisé absolument tout le monde avec ses films 'Hereditaire' et 'Midsommar'?",
        choix: ["Ari Aster", "Jordan Peele", "Sam Raimi", "David Cronenberg"],
        bonneReponse: 0,
    },
    {
        titre: "Dans le film 'Fight Club', que fait la compagnie du personnage Tyler Durden?",
        choix: ["Des cigarettes", "Du shampoing", "Des balles de golfs", "Des barres de savons"],
        bonneReponse: 3,
    },
];
