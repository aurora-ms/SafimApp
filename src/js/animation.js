// Función para crear la animación y avisar al usuario que se ha registrado correctamente

export  function initAnimation (userName, section, mensaje) {

    var sucessMessg = document.createElement('h3');

    sucessMessg.innerText = userName + mensaje;

    section.style.transform = "translateY(-521px)";

    setInterval(() => {
        section.style.display = "none"
        document.querySelector('main').appendChild(sucessMessg);

    }, 2000);

}