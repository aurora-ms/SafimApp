import {initAnimation } from "./animation.js"


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



// Vinculación con firebase 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDoctnCFeFLpIcQe7lOtJzkL1lI_YRzJes",
    authDomain: "filmsapp-ad31a.firebaseapp.com",
    databaseURL: "https://filmsapp-ad31a.firebaseio.com",
    projectId: "filmsapp-ad31a",
    storageBucket: "filmsapp-ad31a.appspot.com",
    messagingSenderId: "856607715556",
    appId: "1:856607715556:web:9a1f6c733102458747fcf1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// Registro de usuarios en Firebase / Authentication

// Botón de registro

var registerButtonSection = document.getElementById('registerButtonSection')

registerButtonSection.addEventListener('click', () => {

    // Sección que estamos usando que después se pasará a la fnt initAnimation
    var selectedSection = document.getElementById('registerSection');

    // Variables de valores de registro
    var userNameRegtr = document.getElementById('userNameRegtr').value;
    var userEmailRegtr = document.getElementById('userEmailRegtr').value;
    var userPasswordRegtr = document.getElementById('userPasswordRegtr').value;

    // Variables de mensaje de error de la parte de registro
    var errorMessageName = document.getElementById('errorMessageName');
    var errorMessageEmail = document.getElementById('errorMessageEmail');
    var errorMessagePassword = document.getElementById('errorMessagePassword');

    if (userNameRegtr === "") {

        // Errores si dejamos el apartado de nombre de usuario sin rellenar
        errorMessageName.classList.remove('hidden');
        errorMessageName.innerText = "Debe introducir un nombre de usuario"

    } else {

        // si ya introducimos nombre de usuario creamos la función para elaborar el usuario
        errorMessageName.classList.add('hidden');
        firebase.auth().createUserWithEmailAndPassword(userEmailRegtr, userPasswordRegtr)

            // Si todo está correcto
            // usersSafim
            .then(() => {

                //Registro de usuarios en Firebase DataBase

                var dataBaseUser = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid);

                dataBaseUser.set({
                    User: userNameRegtr,
                    Email: userEmailRegtr,
                });

                // Llamada a la función que realiza la animación y aviso al usuario de que se ha registrado con éxito
                initAnimation(userNameRegtr, selectedSection, " Registrado con éxito")


            })

            // Gestionando los errores de registro

            .catch(error => {

                if (error.code === 'auth/email-already-in-use') {
                    errorMessageEmail.innerText = 'Correo ya registrado';
                    errorMessageEmail.classList.remove('hidden');

                } else if (error.code === 'auth/invalid-email') {
                    errorMessageEmail.innerText = 'Correo inválido';
                    errorMessageEmail.classList.remove('hidden');

                }

                if (error.code === 'auth/weak-password') {
                    errorMessagePassword.innerText = 'La contraseña debe de tener al menos 6 carácteres o más';
                    errorMessagePassword.classList.remove('hidden');
                }

                console.log(error.code)
            });
    }

})


// Inicio de sesión con usuario y contraseña


var loginButtonSection = document.getElementById('loginButtonSection');

loginButtonSection.addEventListener('click', () => {

    // Sección que estamos usando que después se pasará a la fnt initAnimation
    var selectedSection = document.getElementById('loginSection');

    // Variables de registro
    var userEmail = document.getElementById('userEmail').value;
    var userPassword = document.getElementById('userPassword').value

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            firebase.database().ref('usersSafim/').on('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {

                    if (childSnapshot.val().Email === userEmail) {
                        var userLogin = childSnapshot.val().User

                        // Llamada a la función que realiza la animación y aviso al usuario de que se ha registrado con éxito
                        initAnimation(userLogin, selectedSection, " bienvenido")

                    }

                })
            })

        })


        .catch(function (error) {


            if (error.code === "auth/user-not-found") {

                console.log("Usuario no encontrado")

            } else if (error.code === "auth/user-not-found") {

                console.log("Email erroneo")
            }

            if (error.code === "auth/wrong-password") {
                console.log("Contraseña erronea")

            }

            var errorCode = error.code;
            console.log(errorCode)


            // ...
        });

})