// Code JAVA SCRIPT Projet UNO
// DOM ET VARIABLES GLOBALES
const ordiMainDom = document.querySelector('.ordi-main')
const joueurMainDom = document.querySelector('.player-hand')

const ordiScoreDom = document.querySelector('#ordi-score')
const joueurScoreDom = document.querySelector('#joueur-score')

const jeuPileDom = document.querySelector('.joueur-pile')
const piochePileDom = document.querySelector('.draw-pile')

const joueurUno = document.querySelector('.player-animation')
const ordiUno = document.querySelector('.cpu-animation')

// Tableaux main
const ordiMain = []
const joueurMain = []

const deck = []
let jeuPile

//Scores
let ordiScore = 0
let joueurScore = 0

// Définition des variables du Gameplay
let tourJoueur = true
let gameOn = true
let choixCouleurEstOuvert = false

// Minuteur en milisecondes en fonction de la taille de main de l'ordi
// Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x

let ordiDelai = Math.floor((Math.random() * ordiMain.length * 200) + 1500)

// Score limite --> Si il est atteint, la personne a perdu le jeu complet
let gameOver = 100

//Pour chargement plus rapide

const imgPreLoad = []
let preLoaded = false

//Initialisation du jeu de cartes
const preLoadImgs = () => {
	// Pour chaque couleur (au nombre de 4)
    for (let i = 0; i <= 3; i++) {
        let color
		// Association couleur et numéro
        if (i === 0) color = 'red'
        if (i === 1) color = 'green'
        if (i === 2) color = 'blue'
        if (i === 3) color = 'yellow'
		// Pour chaque carte
        for (let n = 0; n <= 14; n++) {
            let img = new Image()
			// Lien relatif aux images succesives
            img.src = 'images/' + color + i + '.png'
            imgPreLoad.push(img)
        }
    }

    for (let i = 0; i < imgPreLoad.length; i++) {
		// On ajoute les images dans notre jeu
        jeuPileDom.appendChild(imgPreLoad[i])
        jeuPileDom.innerHTML = ''
    }
}
//Initialisation des variables audio
const melange = new Audio('audio/shuffle.wav')
const jouerCarte2 = new Audio('audio/playCard2.wav')
const piocheCarte = new Audio('audio/drawCard.wav')
const gagnePartie = new Audio('audio/winRound.wav')
const gagneJeu = new Audio('audio/winGame.wav')
const partiePerdue = new Audio('audio/lose.wav')
const plusCardFX = new Audio('audio/plusCard.wav')
const uno = new Audio('audio/uno.wav')
const bouttonCouleur = new Audio('audio/colorButton.wav')
const jouerEncore = new Audio('audio/playAgain.wav')

//Son à chaque jeu de cartes
const sonJouerCarte = () => {

    jouerCarte2.play()
}

// Gestion des cartes et DECK Management
class Card {
    constructor(rgb, valeur, points, changeTour, drawValue, imgSrc) {
        this.color = rgb
        this.valeur = valeur
        this.points = points
        this.changeTour = changeTour
        this.drawValue = drawValue
        this.src = imgSrc
        this.joueParJoueur = false
    }
}

// Création des cartes avec appel aux objets Carte
const creerCarte = (rgb, color) => {
    for (let i = 0; i <= 14; i++) {
        // nombre de cartes
        if (i === 0) {
			//ajout par la fonction push
            deck.push(new Card(rgb, i, i, true, 0, 'images/' + color + i + '.png'))
        }
        else if (i > 0 && i <= 9) {
            deck.push(new Card(rgb, i, i, true, 0, 'images/' + color + i + '.png'))
            deck.push(new Card(rgb, i, i, true, 0, 'images/' + color + i + '.png'))
        }
        // reverse/skip des cartes (passes son tour ou sens inverse)
        else if (i === 10 || i === 11) {
            deck.push(new Card(rgb, i, 20, false, 0, 'images/' + color + i + '.png'))
            deck.push(new Card(rgb, i, 20, false, 0, 'images/' + color + i + '.png'))
        }
        //Carte +2 (cartes)
        else if (i === 12) {
            deck.push(new Card(rgb, i, 20, false, 2, 'images/' + color + i + '.png'))
            deck.push(new Card(rgb, i, 20, false, 2, 'images/' + color + i + '.png'))
        }
        else if (i === 13) {
            deck.push(new Card('any', i, 50, true, 0, 'images/wild' + i + '.png'))
        }
        else {
            deck.push(new Card('any', i, 50, false, 4, 'images/wild' + i + '.png'))
        }
    }
}

// Création du deck à partir des cartes précédemment crées

const creerDeck = () => {
    // detruit le deck précedent
    deck.length = 0
    // creer un nouveau deck
    for (let i = 0; i <= 3; i++){
        if (i === 0) {
			// Appel à la fonction creer carte
            creerCarte('rgb(255, 6, 0)', 'red')
        }
        else if (i === 1) {
            creerCarte('rgb(0, 170, 69)', 'green')
        }
        else if (i === 2) {
            creerCarte('rgb(0, 150, 224)', 'blue')
        }
        else {
            creerCarte('rgb(255, 222, 0)', 'yellow')
        }
    }
}

// Mélange du deck après l'avoir créer
const MelangerDeck = (deck) => {
    // Utilisation de la méthode Fisher-Yates Method - https://www.frankmitchell.org/2015/01/fisher-yates/
	// Mélange les cartes du jeu
    
    for (let i = deck.length - 1; i > 0; i--) {
        deck[i].joueParJoueur = false
		// Mélange aléatoire
        let j = Math.floor(Math.random() * (i + 1))
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
    melange.play()
}

//Comportement du Gameplay

const distribcartes = () => {
    for (let i = 0; i < 7; i++) {
        // distribue les cartes mélangées dans les tableaux ordi et joueurs respectifs
        ordiMain.push(deck.shift())       
        joueurMain.push(deck.shift())

        // ajoute les cartes dans le DOM selon leur classe CPU/Ordi ou Player
        const ordiCarte = document.createElement('img')
        ordiCarte.setAttribute('src', 'images/back.png')
        ordiCarte.setAttribute('class', 'cpu')
        ordiMainDom.appendChild(ordiCarte)

        const joueurCarte = document.createElement('img')
		
		//on apport eun nouvel attribut à joueurCarte avec la fonction "set attribute"
        joueurCarte.setAttribute('src', joueurMain[i].src)
        joueurCarte.setAttribute('class', 'player')
        
        // Attribuer aux Cartes un id = leur index dans le tableau joueurMain. 
        //afin de référencer le bon objet Carte

        joueurCarte.setAttribute('id', i)
        joueurMainDom.appendChild(joueurCarte)
    }
}
const debutePileJeu = () => {
    const jouerCarte = document.createElement('img')
    
    // trouve la 1ère carte qui n'est pas une carte d'action
    for (let i = 0; i < deck.length; i++) {
        if (deck[i].color !== "any" && deck[i].valeur <= 9) {
            // commence jouerPile tableau avec la première carte valide
            jeuPile = deck.splice(i, 1)
            break
        }
    }
    // associe jouerCarte à l'image correcte
    jouerCarte.setAttribute('src', jeuPile[0].src)
    // joue la carte de la jouerPile
    jeuPileDom.appendChild(jouerCarte)
}

// Mise à jour du deck après une fin de partie ou de jeu
const nouvelleMain = () => {
    gameOn = true
    // maj la main de l'ordi, du joueur et la play pile
    ordiMainDom.innerHTML = ''
    ordiMain.length = 0
    joueurMainDom.innerHTML = ''
    joueurMain.length = 0
    jeuPileDom.innerHTML = ''

    // créer un nouveua deck
    creerDeck()
    // mélange le deck
    MelangerDeck(deck)
    //distribution des cartes et mise de la première
    distribcartes()
    // Pose la première carte à jouer qui n'est pas une carte d'action.
    debutePileJeu()

    if (choixCouleurEstOuvert) cacheChoixCouleur()
}

// Mise à jour de la pile de jeu
const majJeuPileDom = () => {
    jeuPileDom.innerHTML = ''
    // ajoute une carte jouée dans jouerPile
    const nouvelleCarteImg = document.createElement('img')
    const imgSrc = jeuPile[jeuPile.length - 1].src
    nouvelleCarteImg.setAttribute('src', imgSrc)
    jeuPileDom.appendChild(nouvelleCarteImg)
}

// Mise à jour de la Main
const majMain = (mainAmaj) => {
    let domAMaj, classeCarte;

	//Appel au dom pour le joueur et le cpu
    if (mainAmaj === ordiMain) {
        domAMaj = ordiMainDom
        classeCarte = 'cpu'
        if (ordiVisible) ordiVisible = false
    }
    else {
        domAMaj = joueurMainDom
        classeCarte = 'player'
    }   
    // efface le dommaine sélectionné
    domAMaj.innerHTML = ''

    // mise à jour du dom
    for (let i = 0; i < mainAmaj.length; i++) {
        let src

        if (domAMaj === ordiMainDom) {
            src = 'images/back.png'
        } 
        else {
            src = mainAmaj[i].src
        } 
        const majcartes = document.createElement('img')
        majcartes.setAttribute('src', src)
        majcartes.setAttribute('class', classeCarte)
		
        // mise à jour des ID pour correspondre aux index de joueurMain
        majcartes.setAttribute('id', i)
        domAMaj.appendChild(majcartes)
    }
    // Fin jeu/partie : empêche l'élément dom de ne plus exister lorsque la main est vide
    if (mainAmaj.length === 0) {
        const majcartes = document.createElement('img')
        majcartes.setAttribute('src', 'images/empty.png')
        majcartes.setAttribute('class', 'empty')
		
        // mise à jour des ID pour correspondre aux index de joueurMain
        domAMaj.appendChild(majcartes)
    }
}

// Tirage de cartes

const tireCarte = (mainObtientCarte) => {
    animateTireCarte(mainObtientCarte)
	
    // vérifie si le deck a une carte à tirer ou non
    if (deck.length > 0) {
        // tire la carte du haut
        const nouvelleCarte = deck.shift()
        mainObtientCarte.push(nouvelleCarte)
        
    }
    else {
        // Sinon, nouvelle partie donc nouveau deck --> mélanger jouerPile
        MelangerDeck(jeuPile)
        for (let i = 0; i <= jeuPile.length - 1; i++) {
            // la pile de joueurs mélangée devient le nouveau jeu de cartes.
            deck.push(jeuPile[i])
        }
        // laisse la dernière carte jouée sur le tas de jeu.
        jeuPile.length = 1

        // tire la carte la plus haute du jeu
        const nouvelleCarte = deck.shift()
        mainObtientCarte.push(nouvelleCarte)        
    }
    piocheCarte.play()
	// temps de délai pour mal les mains
    setTimeout(() => {
        majMain(mainObtientCarte)
    }, 500)
}

// Animation du tirage des cartes

const animateTireCarte = (player) => {
    let joueurClasse
	
	//Si c'est l'ordi, on récupére les infos propres à celui-ci
    if (player === ordiMain) joueurClasse = 'cpu-draw'
	
    else joueurClasse = 'player-draw'
    
    const TireCarteEl = document.querySelector('#draw-card')
    TireCarteEl.classList.remove('hidden')
    setTimeout(() => {
        TireCarteEl.classList.add(joueurClasse)
		// délais d'affiche en seconde
        setTimeout(() => {
            TireCarteEl.classList.add('hidden')
            TireCarteEl.classList.remove(joueurClasse)
            clearInterval()
        }, 500)
    }, 30)
}
const afficheUno = (unoMain) => {
    // supprime la classe "hidden" de la div player-uno
    unoMain.classList.remove('hidden')
    uno.play()

    setTimeout(() => {
        unoMain.classList.add('shout')
  
        //setTimeout = délais après x secondes, retirer le son uno
        setTimeout(() => {
            unoMain.classList.remove('shout')

            setTimeout(() => {
                unoMain.classList.add('hidden')
            }, 1000)
        }, 1000)
    }, 10) 
}
// Gestion du choix de couleur lorsque la carte Color est jouée
const afficheChoixCouleur = () => {
    // montre le choix de couleur
    const choixCouleur = document.querySelector('.color-picker')
    choixCouleur.style.opacity = 1
    choixCouleurEstOuvert = true

    //Assigner les gestionnaires d'événements aux boutons
    document.querySelector('.red').addEventListener('click', (e) => {
        // passe le nom de la classe pour la couleur
        couleurChoisie('rgb(255, 6, 0)')
    })
    document.querySelector('.green').addEventListener('click', (e) => {
        // passe le nom de la classe pour la couleur
        couleurChoisie('rgb(0, 170, 69)')
    })
    document.querySelector('.blue').addEventListener('click', (e) => {
        // passe le nom de la classe pour la couleur
        couleurChoisie('rgb(0, 150, 224)')
    })
    document.querySelector('.yellow').addEventListener('click', (e) => {
        // passe le nom de la classe pour la couleur
        couleurChoisie('rgb(255, 222, 0)')
    })
}
const couleurChoisie = (rgb) => {
    //attribuer la couleur au joker qui se trouve sur le dessus de la pile de jeu
    bouttonCouleur.play()
    jeuPile[jeuPile.length - 1].color = rgb

    // cache le choix de couleur
    cacheChoixCouleur()
    tourJoueur = false;
    setTimeout(jeuOrdi, ordiDelai)}

function cacheChoixCouleur() {
    const choixCouleur = document.querySelector('.color-picker')
    choixCouleur.style.opacity = 0
    choixCouleurEstOuvert = false
}

const passOuInversion = () => {
    // vérifie si c'est changement de tour ou passe son tour
    if (jeuPile[jeuPile.length - 1].changeTour) {
        tourJoueur = false

        // au tour de lordi
        setTimeout(jeuOrdi, ordiDelai)
    }
}

// met à jour les noms des joueurs avec le nom de celui dont c'est le tour
//mise en subrillance

const afficheAuTourDom = () => {
	// Au tour du joueur
    if (tourJoueur) {
        document.querySelector('.player-score-title').style.color = 'rgb(100, 150, 150)'
        document.querySelector('.cpu-score-title').style.color = 'rgb(6, 37, 62)'
    }
	// Au tour de lordi
    else {
        document.querySelector('.player-score-title').style.color = 'rgb(6, 37, 62)'
        document.querySelector('.cpu-score-title').style.color = 'rgb(100, 150, 150)'
    }
}
//Fin de la partie et du jeu

// Maj des points après chaque partie en fonction des points sur les cartes restantes

const compterPoint = (perdantMain) => {
	//Initialisation à 0
    let points = 0
	
	// Maj du score
    for (const card of perdantMain) {
        points += card.points
    }
    if (perdantMain == ordiMain) { ordiScore += points} else { joueurScore += points }}

// Maj du score
const majScores = () => {
	
    // met à jour le score de l'ordinateur
    ordiScoreDom.innerHTML = ordiScore
	
	// Si la gagne est pour l'ordi
    if (ordiScore < gameOver / 2) ordiScoreDom.style.color = 'rgb(0, 140, 0)' // couleur initiale du score en vert 
    else ordiScoreDom.style.color = 'rgb(121, 2, 2)' // évolution de la couleur en rouge

    // met à jour le score du joueur
    joueurScoreDom.innerHTML = joueurScore
    if (joueurScore < gameOver / 2) joueurScoreDom.style.color = 'rgb(0, 140, 0)'
    else joueurScoreDom.style.color = 'rgb(121, 2, 2)'
}

// Vérifie le gagnant
const verifiePourGagnant = () => {
    // vérifie si personne n'a perdu
    if (joueurScore < gameOver && ordiScore < gameOver) {
		
        // si joueur a gagné
        if (joueurMain.length === 0) {
            gagnePartie.play()
            finPartie(joueurMain)
        }
		// si ordi a gagné
        if (ordiMain.length === 0) {
            partiePerdue.play()
            finPartie(ordiMain)
        }
    }       
    else { // game over 
	finJeu()
    }
}
//affichage des cartes de lordi
const afficheOrdiCartes = () => {
    if (ordiMain.length >= 1) {
        ordiMainDom.innerHTML = ''
        for (let i = 0; i < ordiMain.length; i++) {
    
            // retourne les cartes
            const ordiCarte = document.createElement('img')
            ordiCarte.setAttribute('src', ordiMain[i].src)
            ordiCarte.setAttribute('class', 'cpu')
            ordiMainDom.appendChild(ordiCarte)
        }
    } 
}
// affichage des cartes cachées de lordi
const cacheOrdiCartes = () => {
    if (ordiMain.length >= 1) {
        ordiMainDom.innerHTML = ''
        for (let i = 0; i < ordiMain.length; i++) {
            // retourne les cartes, vue de dos
            const ordiCarte = document.createElement('img')
			// Appel à l'image back pour afficherr carte retournée
            ordiCarte.setAttribute('src', 'images/back.png')
            ordiCarte.setAttribute('class', 'cpu')
            ordiMainDom.appendChild(ordiCarte)
        }
    } 
}

// gestion fin de partie
const finPartie = (gagnant) => {
    gameOn = false;
    tourJoueur = !tourJoueur

    if (ordiMain.length > 0) afficheOrdiCartes()
    
    const finPartieDom = document.querySelector('.end-of-round')
    const roundDom = document.querySelector('.round')
    
    // affiche l'élément de fin de tour en fonction du gagnant
    finPartieDom.classList.remove('hidden')
    if (gagnant === joueurMain) roundDom.textContent = 'Tu as gagné la partie !'
    else roundDom.textContent = 'Lordi a gagné la partie...'
    
    // cache l'élements de fin de partie après 2 sec
    setTimeout(() => {
        finPartieDom.classList.add('hidden')
        tourJoueur = !tourJoueur
        nouvelleMain()
        if (!tourJoueur) setTimeout(jeuOrdi, ordiDelai)
        
    }, 3000)
}
// gestion fin du jeu
const finJeu = () => {
    gameOn = false;
    if (ordiMain.length > 0) afficheOrdiCartes()

    const finJeuDom = document.querySelector('.end-of-game')
    const gameDom = document.querySelector('.game')

    // affiche l'élément de fin de partie et le format en fonction du gagnant
    finJeuDom.classList.remove('hidden')

    if (joueurScore > gameOver) {
        partiePerdue.play()
		// Ajout contenu textuel
        gameDom.textContent = 'Lordi a gagné le jeu...Encore une partie ?'
    }  
    else {
        gagneJeu.play()
        gameDom.textContent = 'Tu as gagné le jeu ! On recommence ?'
    }

    // ajoute un listener pour le bouton 'play again'
    document.querySelector('.play-again').addEventListener('click', () => {
        jouerEncore.play()
        // cache l'élément de fin de jeu au clic
        finJeuDom.classList.add('hidden')
        joueurScore = 0
        ordiScore = 0
        majScores()
        tourJoueur = !tourJoueur
        nouvelleMain()
        if (!tourJoueur) setTimeout(jeuOrdi, ordiDelai)
    })
}

//Logique ordinateur comme une ia

const laisseOrdiTireCarte = () => {
    if (jeuPile[jeuPile.length - 1].drawValue > 0) {
        // ajoute le nombre de cartes basé sur la valeur de tirage de la dernière carte jouée.
        for (let i = 0; i < jeuPile[jeuPile.length - 1].drawValue; i++) {
            tireCarte(ordiMain)
        }
    }
}
// Choix de jeux de lordi
const jeuOrdi = () => {   
    if (!tourJoueur && gameOn) {  
        
		// En se basant sur la dernière carte jouée et ses propriétés, lordi va parcourir 
		// en boucle  son tableau ordiMain, et toute carte qui correspond à la valeur ou à 
		// la couleur de la dernière carte jouée sera placée dans le tableau playableCartes 
		// avec les jokers que lordi peut détenir.
        // Création d'un tableau temporaire playable de cartes jouables basé sur la 
		//dernière carte jouée

        const playable = determineCartesPlayable()
        // Si pas de cartes à jouer
        if (playable.length === 0) {
            // pioche carte
            tireCarte(ordiMain)
            // fin du tour
            setTimeout(() => {
				// L'ordi a finit son tour, c'est maintenant au tour du joueur
                tourJoueur = true
                return
            }, 500)
        }
        //Si une carte jouable (présente dans le tableau "playable", il joue la carte)
        else if (playable.length === 1) {
            setTimeout(joueOrdiCarte, 300, playable[0])            
            //joueOrdiCarte(playable[0])
        }
        // Si il y a plus d'1 carte jouable
        else if (playable.length > 1) {           
			// application de la stratégie définie précédemment
            let carteChoisie = miseEnPlaceStrategie(playable)
            setTimeout(joueOrdiCarte, 300, carteChoisie)            
        }
    }
//Fonctions spécifiques à l'ordinateur

// Définition tableau "playable" cartes
    function determineCartesPlayable() {
        const playableCartes = []
        for (let i = 0; i < ordiMain.length; i++) {
			// si même couleur ou même chiffre
            if (ordiMain[i].color === jeuPile[jeuPile.length - 1].color || ordiMain[i].valeur === jeuPile[jeuPile.length - 1].valeur || ordiMain[i].color === 'any' || jeuPile[jeuPile.length - 1].color === 'any') {
                let valideCarte = ordiMain.splice(i, 1) // Le tableau se remplit avec les cartes qui correspondent à ce critère
                playableCartes.push(valideCarte[0]) // maj du tableau playable
            }
        }      
        return playableCartes
}
    
    function miseEnPlaceStrategie(playable) {
        let carteIndex    
        
		// Détermination de la stratégie de manière aléatoire à chaque tour
		
		// Si la variable aléatoire est supérieure à 0,5, l'ordi donnera la priorité aux cartes 
		// d'action (jockers) afin de maintenir son score de perte à un niveau bas. 
		
		//Si la variable aléatoire est inférieure à 0,5, l'ordi conservera ses cartes d'action 
		// pour un tour ultérieur et jouera plutôt des cartes de chiffres. 
		
        // Initialisation aléatoire de la stratégie 
		
        let strategie = Math.random()
		
		// Si la variable aléatoire est supérieure à 0,5

        if (jeuPile.length > 2 && (strategie > 0.5 || joueurMain.length < 3 || ordiMain.length > (joueurMain.length * 2) || (jeuPile[jeuPile.length - 1].joueParJoueur === true && jeuPile[jeuPile.length - 1].drawvaleur > 0) || (jeuPile[jeuPile.length - 2].joueParJoueur === true && jeuPile[jeuPile.length - 1].drawvaleur > 0))) {
            // Lordi choisis et priorise la carte chiffre avec le nombre de points le plus élevé
            let plusHauteValeur = 0
            for (let i = 0; i < playable.length; i++){
                if (playable[i].valeur > plusHauteValeur) {
                    plusHauteValeur = playable[i].valeur
                    carteIndex = i
                }
            }
            // joue la carte déterminée par stratégie
            // retire la carte depuis playable

            carteChoisie = playable.splice(carteIndex, 1)

            // return playable to ordiMain
            returnPlayableAMain()
    }
	// Si la variable aléatoire est inférieure à 0,5
        else {
            // sinon priorise les cartes jokers comme la couleur ou le nombre de cartes

            let plusFaibleValeur = 14

            for (let i = 0; i < playable.length; i++){
                if (playable[i].valeur < plusFaibleValeur) {
                    plusFaibleValeur = playable[i].valeur
                    carteIndex = i
                }
            }
            // joue la carte déterminée par stratégie
            // retire la carte depuis playable

            carteChoisie = playable.splice(carteIndex, 1)

            returnPlayableAMain()           
        }
        return carteChoisie[0]

        function returnPlayableAMain() {
            if (playable.length > 0) {
                for (const card of playable) {
                    ordiMain.push(card)
                }
            }
        }
    }
    function joueOrdiCarte(carteChoisie) {
        
        //carte aléatoire de ordiMainDom
        const ordiDomCartes = ordiMainDom.childNodes
        ordiDomCartes[Math.floor(Math.random() * ordiDomCartes.length)].classList.add('cpu-play-card')

        sonJouerCarte()
        
        setTimeout(() => {
            jeuPile.push(carteChoisie)
            // maj jeuPileDom
            majJeuPileDom()

            // vérifie si lordi a joué au hasard
            if (jeuPile[jeuPile.length - 1].color === 'any' && jeuPile[jeuPile.length - 1].drawValue === 0 && jeuPile[jeuPile.length - 1].joueParJoueur === false) {
                choisieCouleurApresWild()
            }

            // vérifie la taille de la main de l'ordi et maj ordiMainDom
            if (ordiMain.length >= 1) {
                majMain(ordiMain)
                if (ordiMain.length === 1) {
                    afficheUno(ordiUno)
                }
            }
            // si fin du tour
            else {
                majMain(ordiMain)
                setTimeout(() => {
                    compterPoint(joueurMain)
                    majScores()
                    verifiePourGagnant()
                }, 1200)
            }
            // si ordi tire une carte
            if (carteChoisie.drawValue > 0) {

                penalitePlusQuatreCarte()
                setTimeout(() => {
                    for (let i = 0; i < carteChoisie.drawValue; i++) {
                        tireCarte(joueurMain)
                    }
                    verifieChangementTour()
                },1000)
            }
			//sinon
            else setTimeout(verifieChangementTour, 500)
        }, 500)
        
		// vérifie si il y a carte changement tour
        function verifieChangementTour() {
            if (carteChoisie.changeTour) {
                tourJoueur = true
                return
            }
            else {
				// pas de changement, au tour de lordi
                setTimeout(jeuOrdi, ordiDelai)
            }
        }
    }

// Fonction choix couleur après carte wild
    function choisieCouleurApresWild() {
		
		// 4 couleurs possibles
        const colors = ['rgb(255, 6, 0)', 'rgb(0, 170, 69)', 'rgb(0, 150, 224)', 'rgb(255, 222, 0)']
        const colorsDansMain = [0, 0, 0, 0]

        // Le processeur vérifie combien il a de cartes de chaque couleur.
        for (const card of ordiMain) {
			// itérations pour chaque couleur en comparant les deux listes
            if (card.color === colors[0]) colorsDansMain[0]++
            if (card.color === colors[1]) colorsDansMain[1]++
            if (card.color === colors[2]) colorsDansMain[2]++
            if (card.color === colors[3]) colorsDansMain[3]++
        }

        // trouver l'indice de la valeur maximale
        let indexOfMax = colorsDansMain.indexOf(Math.max(...colorsDansMain))

        // carte wild et choix des couleurs
        const wildCarteDom = jeuPileDom.childNodes[0]
        wildCarteDom.style.border = '5px solid ' + colors[indexOfMax]
        wildCarteDom.style.width = '105px'
        jeuPile[jeuPile.length - 1].color = colors[indexOfMax]
    }
}

// WILD +4 Carte gestion
const penalitePlusQuatreCarte = () => {
    plusCardFX.play()
    jeuPileDom.classList.add('shout')
    setTimeout(() => {
        jeuPileDom.classList.remove('shout')
    }, 1000)
}

const joueJoueurCarte = (index) => {
    let carteAJouer = joueurMain.splice(index, 1)
    carteAJouer[0].joueParJoueur = true
    jeuPile.push(carteAJouer[0])

    // vide la pile de jeux
    majJeuPileDom()
}

///////Principales fonctions du jeu - MAIN ////////

// Jeu
const CommencerJeu = () => {

	// Initialisation des scores
    joueurScore = 0
    ordiScore = 0

    ecouterForModeDev()
    setInterval(afficheAuTourDom, 100)
    nouvelleMain()
    majScores()

    if (!tourJoueur) setTimeout(jeuOrdi, ordiDelai)
    // Listeners sur joueurMainDom et piochePileDom au clic
    // joueurMainDom
    joueurMainDom.addEventListener('click', (event) => {
        if (tourJoueur && !choixCouleurEstOuvert && event.target.getAttribute('id')) {

            const derniereCarteDom = jeuPileDom.childNodes[0]
            if (derniereCarteDom.style !== '100px') {
                derniereCarteDom.style.width = '100px'
                derniereCarteDom.style.border = 'none'
            }

            // utiliser l'ID de la cible pour trouver l'objet carte dans le tableau
            let index = parseInt(event.target.getAttribute('id'))
            
            // si la valeur ou la couleur correspondent à la carte de la pile
            if (joueurMain[index].valeur === jeuPile[jeuPile.length - 1].valeur || joueurMain[index].color === jeuPile[jeuPile.length - 1].color || joueurMain[index].color === 'any' || jeuPile[jeuPile.length - 1].color === 'any') {     
                
                // carte animée au clic
                sonJouerCarte()
                event.target.classList.add('play-card')

                setTimeout(() => {
                    joueJoueurCarte(index)


                    // appelle cpuTurn pour ajouter des cartes s'il y en a à ajouter
                    laisseOrdiTireCarte()
                    
                    // vérifié la taille de joueurMain et maj DOM
                    if (joueurMain.length >= 1) {
                        majMain(joueurMain)
                        if (joueurMain.length === 1) afficheUno(joueurUno)
                    }
				// FIn de la partie --> maj points et scores et on définit le gagnant
                    else {
                        majMain(joueurMain)
                        setTimeout(() => {
                            compterPoint(ordiMain)
                            majScores()
                            verifiePourGagnant()
                        }, 1200)
                    }

                    //vérifie si carte tirée et carte "wild" (choix des couleurs)
                    if (jeuPile[jeuPile.length - 1].color === 'any' && jeuPile[jeuPile.length - 1].drawValue === 0 && jeuPile[jeuPile.length - 1].joueParJoueur) {
                        // nouvelle couleur
                        afficheChoixCouleur()
                        return
                    }
                    passOuInversion();
                }, 1000)              
            }
        }
    })
	// Clique sur le deck
    piochePileDom.addEventListener('click', () => {
        if (tourJoueur && !choixCouleurEstOuvert) {
            tireCarte(joueurMain)
			
            setTimeout(() => {
                tourJoueur = false;
                setTimeout(jeuOrdi, ordiDelai)
            }, 500)
        }
    })
}
let ordiVisible = false

const ecouterForModeDev = () => {
    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase()
    })
}

CommencerJeu()