let repPhoto;
const photos = ".gallery";
let queltitre;

const recupFiltres = await fetch ("http://localhost:5678/api/categories");
const repFiltres = await recupFiltres.json();


const tokenB = window.localStorage.getItem("mdp");


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
    const click = document.createElement("i");
    const titreModale = document.createElement("h2");
    const bouton = document.createElement("button");
    const href = document.createElement("a");
    click.className ="fa-solid fa-xmark";
    titreModale.innerText = queltitre;
    bouton.innerText ="Ajouter une photo";
    href.innerText = "Supprimer la gallerie";
    href.setAttribute("href","#");
    gallerie.appendChild(click);
    gallerie.appendChild(titreModale);
    gallerie.appendChild(conteneur);
    gallerie.appendChild(bouton);
    gallerie.appendChild(href);
    
  }
  
  for (let i=0; i<projet.length; i++) {
    const figure = projet[i];
    /* let clicModalePortrait = document.querySelector("#idPortrait"); */
    /* let clicModaleProjets = document.querySelector("#idProjets"); */

    //  Création de l'HTML pour les photos des projets
   
    const contPhoto = document.createElement("figure");
    const photo = document.createElement("img");
    photo.src = figure.imageUrl;
    const legende = document.createElement("figcaption");
   

    if (quelType) {
      legende.innerText = "editer";
      conteneur.appendChild(contPhoto);
      
    } else {
       legende.innerText =  figure.title;
       gallerie.appendChild(contPhoto);
       
    }
    
    contPhoto.appendChild(photo);
    contPhoto.appendChild(legende);

  }

} 


function creeModale (titre, type) {
 const modaleProjet = ".modaleProjet";
 let boutonClick;
 queltitre = titre;
 quelType = type;

  main(modaleProjet);
  ouvreModale(boutonClick);
  
}

let quelType;

/// Pour faire apparaitre tous les éléments du mode admin
if (tokenB) {
  // console.log(`hey ${tokenB}`);  
  bandeau();
  coDeco();
  deco();
  icoModif(".portrait", "idPortrait");
  icoModif(".projets","idProjets");

  /* document.querySelectorAll(".icoModif").forEach (a => {
    a.addEventListener('click', creeModale("Galerie Photos")); })*/
    document.querySelector("#idProjets").addEventListener ("click", function (e) {
      e.preventDefault();
      const clicModaleProjets = "idP";
      creeModale("Galerie photos", clicModaleProjets);
    });


}

let target;


function ouvreModale (croix) {
  
  target = document.querySelector(".modaleCont");
  target.style.display = "block";
  target.setAttribute("aria-hidden", false);
  target.setAttribute("aria-modal", true);
  target.addEventListener("click", fermeModale);
  document.querySelector(".modaleProjet").addEventListener("click", pasClick);
  croix = document.querySelector(".fa-xmark");
  console.log(croix);
  if (croix) {
    console.log("ça fonctionne ?");
    croix.addEventListener("click", pasClick);
  }

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


///////// Mise en place des filtres /////
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

//////////////// Appel des fonctions ///////////////

/// Pour faire apparaitre les projets de la page d'accueil
main (photos); 


