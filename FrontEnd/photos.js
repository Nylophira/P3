
/////////// Code pour récupérer les photos sur l'API //////////
const gallerie = document.querySelector(".gallery");

const recupPhoto = await fetch ("http://localhost:5678/api/works");
const repPhoto = await recupPhoto.json();
for (let i=0; i<repPhoto.length; i++) {
  const figure = repPhoto[i];
  //  Création de l'HTML pour les photos
  const contPhoto = document.createElement("figure");
  const photo = document.createElement("img");
  photo.src = figure.imageUrl;
  const legende = document.createElement("figcaption");
  legende.innerText =  figure.title;
  gallerie.appendChild(contPhoto);
  contPhoto.appendChild(photo);
  contPhoto.appendChild(legende);
}