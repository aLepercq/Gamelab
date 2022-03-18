

document.getElementById('testPersonnalite').onsubmit = function onSubmit(form) {
    var result = {crapaud: 0, grenouille: 0, nasique: 0, singe: 0, pieuvre: 0, caillou: 0, tortue: 0, rattaupe: 0, cyno: 0, crabe: 0, dugong:0, steph:0}
    var couleurAnimaux = {crapaud: [228, 145, 129], grenouille: [252,14,240], nasique: [217,141,105], singe: [255, 91, 13], pieuvre: [233,50,86], caillou: [213,209,208], tortue: [34,177,76], rattaupe: [238,212,199], cyno: [255,242,0], crabe: [77,149,149], dugong: [17,0,225], steph: [225,0,0]}

    var listElementsForm = form.target.elements;

    //Traitement de la variable prénom
    var prenom = listElementsForm["prenom"].value;
    if(prenom.toLowerCase() == "stéphane" || prenom.toLowerCase() == "stephane" || prenom.toLowerCase() == "stéphanie" || prenom.toLowerCase() == "stephanie") result["steph"] += 5;
    if(prenom.toLowerCase() == "sacha") result["cyno"] += 7;
    if(prenom.toLowerCase() == "priscilla") result["caillou"] += 7;
    if(prenom.toLowerCase() == "ryme") result["grenouille"] += 7;
    if(prenom.toLowerCase() == "yazid") result["tortue"] += 7;
    if(prenom.toLowerCase() == "dylan") result["nasique"] += 7;
    if(prenom.toLowerCase() == "marius" || prenom.toLowerCase() == "quentin") result["rattaupe"] += 20;
    if(prenom.toLowerCase() == "anis") result["steph"] += 20;

    //Traitement du chiffre fétiche
    var chFetiche = listElementsForm["chFetiche"].value;
    result[Object.keys(result)[chFetiche-1]] += 2;

    //Traitement de la couleur
    var rouge = hexToRgb(listElementsForm["couleur"].value).r;
    var vert = hexToRgb(listElementsForm["couleur"].value).g;
    var bleu = hexToRgb(listElementsForm["couleur"].value).b;

    min = 255*3;
    keyMin = "";
    for (const [key, value] of Object.entries(couleurAnimaux)) {
        if(Math.abs(value[0]-rouge) + Math.abs(value[1]-vert) + Math.abs(value[2]-bleu) < min){
            min = Math.abs(value[0]-rouge) + Math.abs(value[1]-vert) + Math.abs(value[2]-bleu);
            keyMin = key
        }
    }
    result[keyMin] += 3;

    //Traitement de la voyante
    var resultVoyante = "";
    const radioButtons = document.querySelectorAll('input[name="voyante"]');
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          resultVoyante = radioButton.value;
          break;
        }
    }

    if(resultVoyante == "oui"){
        result["steph"] += 2;
        result["nasique"] += 2;
        result["caillou"] +=2;
        result["cyno"] += 2;
    } else {
        result["crabe"] +=2;
        result["crapaud"] += 2;
        result["dugong"] += 2;
        result["singe"] += 2;
        result["tortue"] +=2;
        result["rattaupe"] +=2;
        result["grenouille"] +=2;
        result["pieuvre"] +=2;
    }

    //Traitement du signe chinois
    var signeAstro = listElementsForm["signeAstro"].value;
    if(signeAstro=="rat") result["rattaupe"] += 6;
    if(signeAstro=="cochon") result["crapaud"] += 4;
    if(signeAstro=="buffle") result["dugong"] += 4;
    if(signeAstro=="tigre") result["nasique"] += 2;
    if(signeAstro=="lapin") result["cyno"] += 2;
    if(signeAstro=="dragon") result["steph"] += 6;
    if(signeAstro=="serpent") result["caillou"] += 4;
    if(signeAstro=="cheval") result["tortue"] += 2;
    if(signeAstro=="chevre") result["crabe"] += 2;
    if(signeAstro=="coq") result["pieuvre"] += 2;
    if(signeAstro=="chien") result["grenouille"] += 2;
    if(signeAstro=="singe") result["singe"] += 6;

    //Traitement des animaux de compagnie
    if(listElementsForm["tortue"].checked) result["tortue"] += 5;
    if(listElementsForm["iguane"].checked) result["cyno"] += 5;
    if(listElementsForm["ane"].checked) result["steph"] += 5;
    if(listElementsForm["souris"].checked) result["rattaupe"] += 5;

    var textFinal = "";
    var imgFinal = ""
    console.log(result);
    max = 0;
    keyMax = "crapaud";
    for (const [key, value] of Object.entries(couleurAnimaux)) {
        if(result[key] > max){
            max = result[key];
            keyMax = key
        }
    }

    if(keyMax == "crapaud") textFinal = "Félicitations, vous serez un magnifique Crapaud Pipa Pipa. Votre corps aplati de couleur olivâtre sera couvert de nombreuses petites tubercules. Vous serez un animal solitaire en dehors des périodes de reproduction. Votre repas préféré sera les petits poissons et les crustacés. Nous vous souhaitons une belle vie de crapaud pipa pipa, votre espérance de vie sera de 8 ans !";
    if(keyMax == "grenouille") textFinal = "Félicitations, vous serez une magnifique Grenouille Arlequin. Votre couleur remarquable vous permettra d'attirer les plus belles grenouilles de votre région, notamment d'octobre à décembre lors de la période des amours. Petite et fine, vous aurez la capacité de vous glisser dans les moindres recoins. Les insectes et les moucherons seront votre met préféré. Espérez 5 à 10 ans de vie supplémentaire grâce à cette réincarnation ! Bravo à vous.";
    if(keyMax == "nasique") textFinal = "C'est pas de chance, vous deviendrez un nasique ! Votre faciès très évoquateur ne vous permettra pas de vous reproduire si facilement. Votre nom, bien que proche d'une idéologie politique controversée, n'a pourtant aucun rapport avec votre humeur. Vous êtes plutôt joyeux et généreux. Votre nez, d'une longueur d'environ 20 cm, vous permettra de réperer votre prochain repas qui sera probablement des feuilles de pedada. Encore pas de chance, le nasique est entièrement végétarien. Retardez votre mort pour ne pas être réincarné pendant 20 années peu agréable.";
    if(keyMax == "singe") textFinal = "Vous vous en sortez bien en devenant un singe à nez retroussé ! Votre deuxième vie se déroulera dans les massifs montagneux d'Asie. Votre physique plutôt avantageux vous permettra d'attirer un bon nombre de prétendants. Sachez qu'avoir plusieurs partenaires vous donnera accès à un rang social supérieur. Votre longue queue vous permettra de vous stabiliser lors de vos préilleuses acrobaties entre les arbres. Enfin, votre fourrure et votre nez retroussé vous permettront d'affronter le froid de votre environnement.";
    if(keyMax == "pieuvre") textFinal = "Gloups ! Vous deviendre une pieuvre ! Ne prétez pas trop attention à votre physique puisque votre intelligence sera votre principale caractéristique. Vous aurez la capacité de changer de couleur en fonction de vos émotions. Votre poids doublera presque tous les 3 mois alors pensez à un régime de temps à autres. Prenez garde a ne pas finir en encornet ! Bonne continuation."
    if(keyMax == "caillou") textFinal = "C'est vraiment pas de chance, vous serez un Caillou ! Vous allez terminer votre vie en tant que caillou. Sous le surnom Jean-Pierre Caillou, vous rejoindrez probablement une falaise avec beaucoup d'autres amis. Malgré tout, votre vie ne sera pas bien passionnante. Vous ne possédez pas d'appareil reproducteur, ni d'estomac. Votre seul but dans la vie sera donc d'attendre et de dormir, ce qui devrait correspondre à votre personnalité. Votre espérance de vie sera très longue, et c'est bien dommage. Bon courage !";
    if(keyMax == "tortue") textFinal = "Bravo ! Vous serez une magnifique tortue à long cou. Nous pourrons également vous appeler tortue-girafe pour les intimes. Vous apprécierez le calme des petits cours d'eau et des étangs. Vous dorer la pilulle sur un rocher ainsi que la chasse aux grenouilles seront vos activités préférées pendant vos 200 belles années de vie. Votre amour pour les tortues dans une vie antérieur n'y est sûrement pas pour rien ! Bravo à vous !";
    if(keyMax == "rattaupe") textFinal = "Téma la taille du rat ! Vous héritez malheureusement de l'animal le plus moche sur Terre, et cela probablement dû à votre physique et votre côté radin. Néanmoins, vos 2 canines vous permettront de déguster le met le plus raffiné : les restes de poubelles. Vous avez beaucoup de chances de trouver votre nouvelle habitation dans le métro de Paris. En terme de reproduction, inutile de préciser que votre physique ne vous aidera pas énormément. Bon courage car tout le monde cherchera à vous éliminer."
    if(keyMax == "cyno") textFinal = "Bon, vous serez un cynophalus variegatus. Bien que personne n'arrivera à prononcer votre nom, vous vous en sortirez plutôt bien. D'une longueur totale de 34 cm avec une queue mesurant près de 15 cm de long, votre physique avantageux vous permettra de ne pas subir les attaques de vos prédateurs. Malheureusement, il faudra se contenter de fleurs en guise de repas. Votre attitude très solitaire vous permettra de vous concentrer sur de longues périodes de gestation avec une petite poche comme les kangourous. Amusez vous bien au sommet des arbres ! "
    if(keyMax == "crabe") textFinal = "Aïe, nous vous annonçons votre réincarnation en crabe yéti. Vous vivrez près des sources hydrothermales de l'océan Pacifique Sud. Attention, vous ne devrez pas vous en approcher de trop si vous ne voulez pas finir en crabe vapeur. Vous serez aveugle, mais le soie couvrant vos pâtes vous permettra de survivre dans les conditions très rude de votre environnement. Bonne chance à vous."
    if(keyMax == "dugong") textFinal = "Bravo ! Vous devenez un brouteur des mers nommé Dugong. Malgré l'importance de votre corpulence, vous serez très discret. Vous êtes associé à une vache marine puisque vous passerez le plus clair de votre temps à brouter les herbiers marins, plus de 30 kilos par jour. Vous serez considérés comme précieux car certainement l'un des derniers de cette espèce menacée."
    if(keyMax == "steph") textFinal = "Bravo ! Vous avez obtenu le boss ultime en devenant un Stéphane Chauvin. Passioné de musique, votre instrument préféré sera le pipo, comme toute votre carrière ! Amadea n'aura plus de secret pour vous, même si Mervane pourrait bien vous apprendre quelques nouveautés. Avec une espérance de vie d'au moins 200 ans, vous pourrez vous épanouir dans de multiples domaines. Attention tout de même à vos périodes de reproduction. Félicitations, vous êtes vraiment un king ! "

    if(keyMax == "crapaud") imgFinal = "images/crapaud.jpg"
    if(keyMax == "grenouille") imgFinal = "images/grenouille.jpg";
    if(keyMax == "nasique") imgFinal = "images/nasique.jpg"
    if(keyMax == "singe") imgFinal = "images/singe.jpg";
    if(keyMax == "pieuvre") imgFinal = "images/pieuvre.jpg"
    if(keyMax == "caillou") imgFinal = "images/caillou.jpg";
    if(keyMax == "tortue") imgFinal = "images/tortue.jpg";
    if(keyMax == "rattaupe") imgFinal = "images/rattaupe.jpg";
    if(keyMax == "cyno") imgFinal = "images/cyno.jpg";
    if(keyMax == "crabe") imgFinal = "images/crabe.jpg";
    if(keyMax == "dugong") imgFinal = "images/dugong.jpg";
    if(keyMax == "steph") imgFinal = "images/chauvin.jpg";

    if(keyMax == "crapaud") titreFinal = "Crapaud pipo pipo"
    if(keyMax == "grenouille") titreFinal = "Grenouille arlequin";
    if(keyMax == "nasique") titreFinal = "Nasique"
    if(keyMax == "singe") titreFinal = "Singe au nez retroussé";
    if(keyMax == "pieuvre") titreFinal = "Pieuvre"
    if(keyMax == "caillou") titreFinal = "Caillou";
    if(keyMax == "tortue") titreFinal = "Tortue au long cou";
    if(keyMax == "rattaupe") titreFinal = "Rat-taupe";
    if(keyMax == "cyno") titreFinal = "Cynocephalus Variegatus";
    if(keyMax == "crabe") titreFinal = "Crabe Yeti";
    if(keyMax == "dugong") titreFinal = "Dugong";
    if(keyMax == "steph") titreFinal = "Stéphane chauvin";

    document.getElementById('titreAnimal').textContent = titreFinal
    document.getElementById('img').src = imgFinal
    document.getElementById('textReponse').textContent = "Hello " + prenom + " ! " + textFinal;
    document.getElementById('reponse').style.display = "block";
    return false;
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }