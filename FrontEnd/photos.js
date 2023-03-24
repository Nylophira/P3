let repPhoto;
const photos = ".gallery";
let queltitre;
let quelType;
let target;

const recupFiltres = await fetch ("http://localhost:5678/api/categories");
const repFiltres = await recupFiltres.json();


const tokenB = window.localStorage.getItem("mdp");

///// Récupère le fichier json et affiche les projets ////
 function main (cible) {
  fetch ("http://localhost:5678/api/works")
  .then (Response => Response.json())
  .then (data=> {
    repPhoto = data;
    regenerer(repPhoto, cible);
  })
  .catch (error => console.error(error));
}

/////////// Code pour récupérer les projets sur l'API //////////
function regenerer (projet, cible) {
  const gallerie = document.querySelector(cible);
  const conteneur = document.createElement("div");

  if (cible == ".modaleProjet") {
    const boutonCroix = document.createElement("button");
    const click = document.createElement("i");
    const titreModale = document.createElement("h2");
    const bouton = document.createElement("button");
    const href = document.createElement("a");
    boutonCroix.id ="fermeture"
    click.className ="fa-solid fa-xmark";
    titreModale.innerText = queltitre;
    bouton.className = "ajoutPhoto";
    bouton.innerText ="Ajouter une photo";
    href.innerText = "Supprimer la gallerie";
    href.setAttribute("href","#");
    gallerie.appendChild(boutonCroix);
    boutonCroix.appendChild(click);
    gallerie.appendChild(titreModale)
    gallerie.appendChild(conteneur);
    gallerie.appendChild(bouton);
    gallerie.appendChild(href);

    /// Ouverture de la première modale
    const  fermeture = document.querySelector("#fermeture");
    ouvreModale(fermeture); 

    /// Ouverture de la 2ème modale 
    const modifModale = document.querySelector(".ajoutPhoto");
    modifModale.addEventListener("click", function () {
        queltitre = "Ajout photo";
        ouvreModaleAjouter(gallerie, conteneur);
        titreModale.innerText = queltitre;
        bouton.innerText = "valider";
        bouton.className = "validation";
        href.style.display = "none";
    })
    
  }
  
  for (let i=0; i<projet.length; i++) {
    const figure = projet[i];

    //  Création de l'HTML pour les photos des projets
    const contPhoto = document.createElement("figure");
    const photo = document.createElement("img");
    const legende = document.createElement("figcaption");
    photo.src = figure.imageUrl;
   
    if (quelType) {
      legende.innerText = "editer";
      conteneur.appendChild(contPhoto);
      
    } else {
       legende.innerText =  figure.title;
       gallerie.appendChild(contPhoto);
       
    }
    
    contPhoto.appendChild(photo);
    
    /// Rajout des petits icones sur les photos en modale
    if (quelType) {
      const contPoubelle = document.createElement("button");
      const poubelle = document.createElement("i");
      contPoubelle.className = "poubelle";
      contPoubelle.id = `n°${i+1}-${figure.id}`;
      poubelle.className = "fa-regular fa-trash-can";
      contPhoto.appendChild(contPoubelle);
      contPoubelle.appendChild(poubelle);
    }

    contPhoto.appendChild(legende);

  }

}

function ouvreModaleAjouter (debutCont, rajout) {

  ///Efface la première modale
  const disparition = document.querySelector(".modaleProjet div");
  disparition.innerHTML="";

  ///Retour arrière
  const boutonRetour= document.createElement("button");
  const retour = document.createElement("i");
  boutonRetour.id = "retour";
  retour.className = "fa-solid fa-arrow-left-long";
  debutCont.appendChild(boutonRetour);
  boutonRetour.appendChild(retour);
  document.querySelector("#retour").addEventListener("click", function (e){
    e.preventDefault();
    debutCont.innerHTML ="";
    creeModale("Galerie photos", "idP");
  })

  ///Ajoute les nouveaux éléments
  rajout.className = "modaleAjouter";
  const contAjoutPh = document.createElement("div");
  const imagePhoto = document.createElement("i");
  const boutonPhoto = document.createElement("button");
  const txtType = document.createElement("p");
  const formulaire = document.createElement("form");
  const labelTitre = document.createElement("label");
  const inputTitre = document.createElement("input");
  const labelCat = document.createElement("label");
  const selectCat = document.createElement("select");

  contAjoutPh.className = "contAjoutPhoto";
  imagePhoto.className = "fa-regular fa-image";
  boutonPhoto.innerText = "+ Ajouter photo";
  txtType.innerText = "jpg, png : 4mo max";
  labelTitre.innerText = "Titre";
  labelCat.innerText = "Catégorie";
  labelTitre.setAttribute("for","titre");
  labelCat.setAttribute("for","categorie");
  inputTitre.setAttribute("type","text");
  selectCat.setAttribute("name","categorie");

  rajout.appendChild(contAjoutPh);
  contAjoutPh.appendChild(imagePhoto);
  contAjoutPh.appendChild(boutonPhoto);
  contAjoutPh.appendChild(txtType);
  rajout.appendChild(formulaire);
  formulaire.appendChild(labelTitre);
  formulaire.appendChild(inputTitre);
  formulaire.appendChild(labelCat);
  formulaire.appendChild(selectCat);

  /// Création des catégories ///
  const catNull = document.createElement("option");
  catNull.innerText = "";
  selectCat.appendChild(catNull);

  for(let i=0;i<repFiltres.length; i++) {
    const nomCat = repFiltres[i];
    const categorie = document.createElement("option");
    categorie.innerText = nomCat.name;
    selectCat.appendChild(categorie);
  }


}

///////// Mise en place des filtres /////
function mesFiltres () {
  const filtres = document.querySelector(".filtres");
  for (let i=-1; i<repFiltres.length; i++) {
    const filtre = repFiltres[i];
    const bouton = document.createElement("button");
    if (filtre ==null) {
      bouton.className = "Tous";
      bouton.innerText = "Tous";
    } else {
      bouton.innerText = filtre.name;
      bouton.className = filtre.name;
    }
  
    filtres.appendChild(bouton);
  
  }
  
  ////// Filtrer les catégories 
  const filtreClic = document.querySelectorAll("button");
  for (let i = 0; i<repFiltres.length+1; i++ ) {
    filtreClic[i].addEventListener("click", function () {
   
      const saufObjet = repPhoto.filter( function (objet) {
        const id = objet.category;
        if (i == 0) {
          return id.id;
        } else {
          return id.id == [i];
        }
      })
      document.querySelector(photos).innerHTML = '';
      regenerer(saufObjet, photos);
    })
    
  }
}


///////////// La partie "administrateur" ////////////
function bandeau () {
  const bandeau = document.querySelector(".modifBandeau");
  const contenant = document.createElement("div");
  contenant.className = "contenuBandeau";
  const icone = document.createElement("i");
  icone.className ="fa-regular fa-pen-to-square";
  const titre = document.createElement("h2");
  titre.innerText = "Mode édition";
  const boutonModif = document.createElement ("button");
  boutonModif.innerText = "publier les changements";

  bandeau.appendChild(contenant);
  contenant.appendChild(icone);
  contenant.appendChild(titre);
  contenant.appendChild(boutonModif);
}

function coDeco () {
    document.querySelector(".logout").style.display = "block";
    document.querySelector(".login").style.display = "none";
    document.querySelector(".filtres").style.display ="none";
  
  
}

function icoModif (cible, quelIcone) {
 const parent = document.querySelector(cible);
 const conteneur = document.createElement("a");
/*  a changer pour la modale */
 conteneur.setAttribute("href","#")
 conteneur.className = "icoModif";
 conteneur.id = quelIcone;
 const icone = document.createElement("i");
 icone.className = "fa-regular fa-pen-to-square";
 const texte = document.createElement("p");
 texte.innerText = "modifier";

 parent.appendChild(conteneur);
 conteneur.appendChild(icone);
 conteneur.appendChild(texte);
} 

function deco () {
  const logout = document.querySelector(".logout");
  logout.addEventListener ("click", function () {
    tokenB = window.localStorage.removeItem("mdp");
  }
  ) 
}


/////// Fonctions liées à l'ouverture de la modale ////

//// Crée les éléments de la modale en récupérent les données json
function creeModale (titre, type) {
  const modaleProjet = ".modaleProjet";
  
  queltitre = titre;
  quelType = type;
 
   main(modaleProjet);
 
 }

function ouvreModale (croix) {
  
  target = document.querySelector(".modaleCont");
  target.style.display = "block";
  target.setAttribute("aria-hidden", false);
  target.setAttribute("aria-modal", true);
  target.addEventListener("click", fermeModale);
  document.querySelector(".modaleProjet").addEventListener("click", pasClick);
  croix.addEventListener("click", fermeModale);
 
}

function fermeModale () {
  const modale = document.querySelector(".modaleProjet");
  target.style.display = "none";
  target.setAttribute("aria-hidden", true);
  target.setAttribute("aria-modal", false);
  modale.innerHTML="";

}

function pasClick (e) {
  e.stopPropagation();
}


//////////////// Appel des fonctions ///////////////

/// Pour faire apparaitre les projets de la page d'accueil
main (photos); 
mesFiltres();

/// Pour faire apparaitre tous les éléments du mode admin
if (tokenB) {
  // console.log(`hey ${tokenB}`);  
  bandeau();
  coDeco();
  deco();
  icoModif(".portrait", "idPortrait");
  icoModif(".projets","idProjets");

  document.querySelector("#idProjets").addEventListener ("click", function (e) {
    e.preventDefault();
    const clicModaleProjets = "idP";
    creeModale("Galerie photos", clicModaleProjets);
  });

}
