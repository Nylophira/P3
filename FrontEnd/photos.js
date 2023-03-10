let repPhoto;
const recupFiltres = await fetch ("http://localhost:5678/api/categories");
const repFiltres = await recupFiltres.json();

function main () {
  fetch ("http://localhost:5678/api/works")
  .then (Response => Response.json())
  .then (data=> {
    repPhoto = data;
    regenerer(repPhoto);
  })
  .catch (error => console.error(error));
}

/////////// Code pour récupérer les projets sur l'API //////////
function regenerer (projet) {
    //function regenerer (repPhoto, repFiltres) {
  const gallerie = document.querySelector(".gallery");

  for (let i=0; i<projet.length; i++) {
    const figure = projet[i];
    //  Création de l'HTML pour les photos des projets
    const contPhoto = document.createElement("figure");
    const photo = document.createElement("img");
    photo.src = figure.imageUrl;
    const legende = document.createElement("figcaption");
    legende.innerText =  figure.title;
    gallerie.appendChild(contPhoto);
    contPhoto.appendChild(photo);
    contPhoto.appendChild(legende);
  }

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
    document.querySelector(".gallery").innerHTML = '';
    regenerer(saufObjet);
  })
  
}

main ();