 let token;


///// Envoi des données collectés sur le formulaire de connexion  ///
 function envoiLogin () {
    const form = document.querySelector(".formCo");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const packCo = {
                email: event.target.querySelector("[name=email]").value,
                password: event.target.querySelector("[name=mdp]").value, 
        }
        const packJSON = JSON.stringify(packCo);
        fetch ("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: packJSON
        })
        /////récupère la réponse du serveur
        .then (response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Mauvais identifiants");
            }
        })
        //// si ok redirige et récupère la valeur de la propriété récupérée
        .then (data => {
            token = data.token;
            window.localStorage.setItem("mdp", token);
            window.location.replace("index.html");
        })
        .catch(erreur => {
            message(erreur);
        });
    })
}  

/////Message d'erreur  ////
function message (MessageErreur) {
    const erreur = document.querySelector(".erreur");
    let message = document.querySelector(".messageErreur");
   
    if (!message) {
         message = document.createElement("span");
        message.className = "messageErreur";
        message.innerText = MessageErreur;    
        erreur.appendChild(message);
    } 
   
}


envoiLogin(); 



