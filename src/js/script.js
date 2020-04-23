// Funcionalidades iniciales de la app

// 1 Acciones al pulsar el inicio de sesión:
// 1.1- Ocultar los botones de inicio de sesión y de registro para mostrar la pestaña de incio de sesión 

// 1.2- Botón de inicio de sesión


var loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () => {

    //Ocultar Section de botones principales
    document.getElementById('initSection').classList.add('hidden');

    //Mostrar Popup de inicio de sesión
    document.getElementById('loginSection').classList.remove('hidden');

})


// 1.3- Una vez dado a iniciar sesión quieres ir al apartado de registrarte

var auxlrRegisterButton = document.querySelector('#loginSection  p');

auxlrRegisterButton.addEventListener('click', () => {

    //Ocultar Popup de inicio de sesión
    document.getElementById('loginSection').classList.add('hidden');

    //Mostrar Popup de registro
    document.getElementById('registerSection').classList.remove('hidden');


})


// 2 Acciones al pulsar el registro:
// 2.1- Ocultar los botones de inicio de sesión y de registro para mostrar la pestaña de registro


var registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', () => {

    //Ocultar Section de botones principales
    document.getElementById('initSection').classList.add('hidden');

    //Mostrar Popup de registro
    document.getElementById('registerSection').classList.remove('hidden');

})


// 2.2- Una vez dado a registrarme quieres ir al apartado de inicio de sesion

var auxlrLoginButton = document.querySelector('#registerSection  p');

auxlrLoginButton.addEventListener('click', () => {

    //Ocultar Popup de registro
    document.getElementById('registerSection').classList.add('hidden');

    //Mostrar Popup de inicio de sesión
    document.getElementById('loginSection').classList.remove('hidden');

})