let reponseServeur;
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
        .then (function (response) {
            
        if (response.ok) {
            console.log ("ok c'est cool");
        } else {
            console.log("tu t'es planté non ?");
        } 
    })
        //.then (response => response.json())
        /* .then (data => reponseServeur = data)
        .catch(error => console.alert(error));
        console.log(reponseServeur); */
    })
}

envoiLogin();