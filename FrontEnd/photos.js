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
// La fonction centrale :
function regenerer (projet, cible) {
  const gallerie = document.querySelector(cible);
  const conteneur = document.createElement("div");
  

  ////Spécial modale
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
    href.innerText = "Supprimer la galerie";
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
    modifModale.addEventListener("click", function (e) {
        e.preventDefault();
        queltitre = "Ajout photo";
        ouvreModaleAjouter(gallerie, conteneur, bouton);
        titreModale.innerText = queltitre;
        href.style.display = "none";
        href.textContent = "";
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
      contPoubelle.id = figure.id;
      poubelle.className = "fa-regular fa-trash-can";
      contPhoto.appendChild(contPoubelle);
      contPoubelle.appendChild(poubelle);
        
    }
    contPhoto.appendChild(legende);

  }

    ///Effacement des photos
    const quiEffacer = document.querySelectorAll(".poubelle");
     for(let x=0;x<quiEffacer.length;x++) {
      quiEffacer[x].addEventListener("click", function () {
        let effacement = quiEffacer[x].id;
        effacer(effacement);          
      })
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


function ouvreModaleAjouter (debutCont, rajout, validation) {

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
  const formulaire = document.createElement("form");
  const imagePhoto = document.createElement("i");
  const boutonPhoto = document.createElement("button");
  const chargeImage = document.createElement("input");
  const txtType = document.createElement("p");
  const labelTitre = document.createElement("label");
  const inputTitre = document.createElement("input");
  const labelCat = document.createElement("label");
  const selectCat = document.createElement("select");
  const barre = document.createElement("hr");

  contAjoutPh.className = "contAjoutPhoto";
  formulaire.className = "formAjoutPhoto";
  formulaire.setAttribute("enctype", "multipart/form-data");
  imagePhoto.className = "fa-regular fa-image";
  boutonPhoto.innerText = "+ Ajouter photo";
  boutonPhoto.className = "ajouterPhoto";
  chargeImage.setAttribute("type","file");
  chargeImage.setAttribute("accept",".png, .jpg")
  chargeImage.id = "chargerFichier";
  txtType.innerText = "jpg, png : 4mo max";
  labelTitre.innerText = "Titre";
  labelCat.innerText = "Catégorie";
  labelTitre.setAttribute("for","titre");
  labelCat.setAttribute("for","categorie");
  inputTitre.setAttribute("type","text");
  inputTitre.setAttribute("name", "title");
  inputTitre.required = true;
  inputTitre.className = "title";
  selectCat.setAttribute("name","categories");

  // Suppression bouton d'ajout photo pour un input de soumission
  validation.textContent ="";
  validation.style.display = "none";
  const inputTest = document.createElement("input");
  inputTest.setAttribute("type","submit");
  inputTest.className="validation";
  inputTest.setAttribute("value","valider");
  
  rajout.appendChild(formulaire);
  formulaire.appendChild(contAjoutPh);
  contAjoutPh.appendChild(imagePhoto);
  contAjoutPh.appendChild(boutonPhoto);
  contAjoutPh.appendChild(chargeImage);
  contAjoutPh.appendChild(txtType);
  formulaire.appendChild(labelTitre);
  formulaire.appendChild(inputTitre);
  formulaire.appendChild(labelCat);
  formulaire.appendChild(selectCat);
  formulaire.appendChild(barre);
  formulaire.appendChild(inputTest);

  /// Création des catégories ///
  const catNull = document.createElement("option");
  catNull.innerText = "";
  selectCat.appendChild(catNull);

  for(let i=0;i<repFiltres.length; i++) {
    const nomCat = repFiltres[i];
    const categorie = document.createElement("option");
    categorie.innerText = nomCat.name;
    categorie.setAttribute("value",nomCat.name);
    selectCat.appendChild(categorie);
  }


  ///Ajout d'une photo en cliquant
  const boutonAjout = document.querySelector(".ajouterPhoto");
  boutonAjout.addEventListener("click", function (e) {
    e.preventDefault();
    ajoutPhoto();
  })

      //La met sur le serveur
      const formCible = document.querySelector(".formAjoutPhoto");
      formCible.addEventListener("submit", function (event) {

         event.preventDefault();
         let estOk = check(formCible);
         if (estOk) {

          let newCatId;
          const formData = new FormData(formCible);
          let newPhoto = document.querySelector("#chargerFichier").files[0];
          const newCat = document.querySelector("select[name='categories']").value;

          //Chercher le nom de la catégorie
           for (let i=0;i<repFiltres.length; i++) {
            const quelnom = repFiltres[i].name;
            if (newCat == quelnom) {
              newCatId = repFiltres[i].id;
            }
          }
                   
          formData.delete("categories");
          formData.append("image", newPhoto);
          formData.append("category", newCatId);

          ///Fetch pour enregistrer :
          fetch ("http://localhost:5678/api/works",{
            method: 'POST',
            headers: {
              'Authorization' : `Bearer ${tokenB}`
            },
            body: formData
          })
          .then(response => {
            if (response.ok) {
              
              //Supprimer les données de la modale ajout et la regenerer
              document.querySelector(".modaleProjet").innerHTML="";
              main(".modaleProjet");

              ///Effacement des données de la gallerie et la regenerer
              document.querySelector(photos).innerHTML ="";
              regenArriere();
            
            } else {
              throw new Error(response.statusText);
            }
          })
          .catch (erreur => {
            console.error(erreur);
          })
         }   
       })

}

///Pour regenerer uniquement la page accueil sans toucher aux modales
function regenArriere () {

  fetch ("http://localhost:5678/api/works")
  .then (Response => Response.json())
  .then (data=> {
    repPhoto = data;
    const gallerie = document.querySelector(photos);
    for (let i=0; i<repPhoto.length; i++) {
      const figure = repPhoto[i];
      //  Création de l'HTML pour les photos des projets
      const contPhoto = document.createElement("figure");
      const photo = document.createElement("img");
      const legende = document.createElement("figcaption");
      photo.src = figure.imageUrl;

      legende.innerText =  figure.title;
      gallerie.appendChild(contPhoto); 

      contPhoto.appendChild(photo);
      contPhoto.appendChild(legende);
    }
  })
  .catch (error => console.error(error));

}


////////////// fonctions pour ajouter les photos //////

function check(cible) {
  let ok = false;
  // Création du contenu pour le message d'erreur
  if (!(document.querySelector(".contMsg"))) {
    const contMsg = document.createElement("div");
    contMsg.className = "contMsg";
    cible.appendChild(contMsg);
   }

  const boutonAjout = document.querySelector(".ajouterPhoto");
  const contMsg = document.querySelector(".contMsg");
  const titre = document.querySelector(".title").value;
  const categorie = document.querySelector("select[name='categories']").value;

  const msgErreur = document.createElement("p");
  msgErreur.id = "nonRempli";

  //Pour effacer le message précédent si existant
  const msgCree = document.querySelector("#nonRempli");
  if (msgCree) {
    contMsg.innerHTML ="";
  }

  if (cible.contains(boutonAjout)) {
    msgErreur.innerText = "La photo est absente";
   } else if (titre.length<3) {
    msgErreur.innerText = "Le titre est incomplet";
   } else if (categorie=="") {
    msgErreur.innerText = "Il manque la catégorie";
   } else {
    return ok = true;
   }
   contMsg.appendChild(msgErreur);

}

function ajoutPhoto () {
  document.querySelector("#chargerFichier").click();

  //Récupère la photo reçue et donne une URL blob
  const chargerFichiers = document.querySelector("#chargerFichier");
  chargerFichiers.addEventListener("change", function () {
    const image = chargerFichiers.files[0];
    const conversion = URL.createObjectURL(image);
    const conteneur = document.querySelector(".contAjoutPhoto");
    const suppression = conteneur.querySelectorAll("*:scope> *:not(#chargerFichier)");
    suppression.forEach (function (balise) {
        conteneur.removeChild(balise);
    });

    const imgNew = document.createElement("img");
    imgNew.className = "newPhoto";
    imgNew.src = conversion;
    conteneur.appendChild(imgNew); 

  })
}


/////////////////// La suppression de photo ///////////

//// Fetch pour effacer les photos
function effacer (bouton) {
  fetch (`http://localhost:5678/api/works/${bouton}`, {
    method: "DELETE",
    headers: {"Authorization" : `Bearer ${tokenB}`}

  })
  .then (response => {
    if (response.ok) {
      
      effacerFiltre(bouton, repPhoto);
      creeModale("Galerie photos", "idP"); 

    } else {
      throw new Error(response.statusText);
    }
  })

  .catch(erreur => {
    console.error(erreur);
    })
} 


///fonction pour filtrer les photos avant suppression
function effacerFiltre (boutons, source) {
  let effaceToi;
  if (boutons == "") {

    effaceToi = source.filter (function (photo) {
    return (photo.id);
    })

  } else {
    effaceToi = source.filter( function (photo) {
    return !(photo.id == boutons);
    })
  }
  
  document.querySelector(photos).innerHTML ="";
  quelType = "";
  regenerer(effaceToi,photos); 
  
  document.querySelector(".modaleProjet").innerHTML="";
}

//////////////// Appel des fonctions ///////////////

/// Pour faire apparaitre les projets de la page d'accueil
main(photos);
mesFiltres();

/// Pour faire apparaitre tous les éléments du mode admin
if (tokenB) { 
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
