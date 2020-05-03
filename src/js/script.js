page.base('');
page('/inicio', searchFilms);
page('/peliculas_guardadas', savedFilms);
page();



import { initAnimation } from "./animation.js"
import { toggleMenu } from "./menu_function.js"
import { apiKeyUser } from "./apis.js"
import { apiKeyFilms } from "./apis.js"





var menu = document.querySelector('.hamburger');
menu.addEventListener('click', toggleMenu, false);


// Vinculación con firebase 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: apiKeyUser,
    authDomain: "filmsapp-ad31a.firebaseapp.com",
    databaseURL: "https://filmsapp-ad31a.firebaseio.com",
    projectId: "filmsapp-ad31a",
    storageBucket: "filmsapp-ad31a.appspot.com",
    messagingSenderId: "856607715556",
    appId: "1:856607715556:web:9a1f6c733102458747fcf1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// Función para comprobar si el usuario tiene sesion iniciada

function searchUser() {
    // Retornamos una promesa con resolve si hay un usuario con sesion iniciada o reject si no hay usuario con sesion iniciada

    return new Promise((resolve) => {

        // Comprobar que el usuario está registrado
        firebase.auth().onAuthStateChanged(user => {

            // Si esta conectado nos devuelve el nombre del usuario
            if (user) {

                firebase.database().ref('usersSafim').on('value', (snapshot) => {

                    snapshot.forEach((childSnapshot) => {

                        if (childSnapshot.key === firebase.auth().currentUser.uid) {
                            resolve(childSnapshot.val().User)
                        }
                    })
                })

            } else {
                resolve("no user")

            }
        })

    })
}

// Segun el resultado de la promesa actuara de dos formas diferentes
//Si el usuario si esta registrado
searchUser()
    .then(result => {

        if (result !== "no user") {
            // Mostrar el nombre de usuario registrado y hacer aparecer y desaparecer las secciones segun se necesite

            let sucessMessg = document.createElement('h3');

            sucessMessg.innerText = result + " bienvenido";

            document.getElementById('login').style.opacity = "0";

            setTimeout(() => {

                document.getElementById('login').classList.add('hidden');

                document.querySelector('#user_select').appendChild(sucessMessg);

                document.querySelector('header').classList.remove('hidden');

                document.querySelector('header').style.animation = "1s cubic-bezier(0, 0, 0, 1.15) 0s 1 normal forwards running opacityHeader";

                document.getElementById('menuSection').classList.remove('hidden');

                document.getElementById('menuSection').style.animation = "1.5s cubic-bezier(0, 0, 0, 1.15) 0s 1 normal forwards running translateX";

                document.getElementById('searchfilms').classList.remove('hidden')
                page.redirect('/inicio');

            }, 800)
        } else {

            //Si el usuario no esta registrado

            // Quitar el sppiner de login y visualizar la cabecera y los botones y login y registro
            document.getElementById('login').style.opacity = "0";

            setTimeout(() => {
                document.getElementById('login').classList.add('hidden');

                document.querySelector('header').style.animation = "1s cubic-bezier(0, 0, 0, 1.15) 0s 1 normal forwards running opacityHeader";

                document.querySelector('header').classList.remove('hidden')

                document.getElementById('initSection').classList.remove('hidden')

                document.getElementById('initSection').style.animation = "1s cubic-bezier(0, 0, 0, 1.15) 0s 1 normal forwards running opacityHeader";

            }, 1000)
        }


    })



//  Acciones al pulsar el inicio de sesión:
// 1- Ocultar los botones de inicio de sesión y de registro para mostrar la pestaña de incio de sesión 

// 1.1- Botón de inicio de sesión



var loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () => {

    //Ocultar Section de botones principales
    document.getElementById('initSection').classList.add('hidden');

    //Mostrar Popup de inicio de sesión
    document.getElementById('loginSection').classList.remove('hidden');

})


// 1.2- Una vez dado a iniciar sesión quieres ir al apartado de registrarte

var auxlrRegisterButton = document.querySelector('#loginSection  p');

auxlrRegisterButton.addEventListener('click', () => {

    //Ocultar Popup de inicio de sesión
    document.getElementById('loginSection').classList.add('hidden');

    //Mostrar Popup de registro
    document.getElementById('registerSection').classList.remove('hidden');


})


//  Acciones al pulsar el registro:
// 1- Ocultar los botones de inicio de sesión y de registro para mostrar la pestaña de registro


var registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', () => {

    //Ocultar Section de botones principales
    document.getElementById('initSection').classList.add('hidden');

    //Mostrar Popup de registro
    document.getElementById('registerSection').classList.remove('hidden');

})


// 1.2- Una vez dado a registrarme quieres ir al apartado de inicio de sesion

var auxlrLoginButton = document.querySelector('#registerSection  p');

auxlrLoginButton.addEventListener('click', () => {

    //Ocultar Popup de registro
    document.getElementById('registerSection').classList.add('hidden');

    //Mostrar Popup de inicio de sesión
    document.getElementById('loginSection').classList.remove('hidden');

})


// Registro y login de usuarios en Firebase / Authentication

// Variables de mensaje de error de la parte de registro y de login
var errorMessageEmail = document.getElementById('errorMessageEmail');
var errorMessagePassword = document.getElementById('errorMessagePassword');



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

                // Borrado de mensajes de error en la section de registro
                errorMessageEmail.classList.add('hidden');
                errorMessagePassword.classList.add('hidden');

                // Llamada a la función que realiza la animación y aviso al usuario de que se ha registrado con éxito
                initAnimation(userNameRegtr, selectedSection, " registrado con éxito")


            })

            // Gestionando los errores de registro

            .catch(error => {

                if (error.code === 'auth/email-already-in-use') {
                    errorMessageEmail.innerText = 'Correo ya registrado';
                    errorMessageEmail.classList.remove('hidden');

                } else if (error.code === 'auth/invalid-email') {
                    errorMessageEmail.innerText = 'Correo inválido';
                    errorMessageEmail.classList.remove('hidden');

                } else {
                    errorMessageEmail.classList.add('hidden');
                }

                if (error.code === 'auth/weak-password') {
                    errorMessagePassword.innerText = 'La contraseña debe de tener al menos 6 carácteres o más';
                    errorMessagePassword.classList.remove('hidden');
                }

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

                        //Quitar los mensajes de error de la caja de login
                        errorMessageEmail.classList.add('hidden');
                        errorMessagePassword.classList.add('hidden');

                        // Llamada a la función que realiza la animación y aviso al usuario de que se ha registrado con éxito
                        initAnimation(userLogin, selectedSection, " bienvenido");
                        document.getElementById('menuSection').classList.remove('hidden');

                        document.getElementById('menuSection').style.animation = "1.5s cubic-bezier(0, 0, 0, 1.15) 0s 1 normal forwards running translateX";

                    }

                })
            })

        })


        .catch(function (error) {


            if (error.code === "auth/user-not-found") {

                errorMessageEmail.innerText = 'Usuario no encontrado';
                errorMessageEmail.classList.remove('hidden');

                selectedSection.insertBefore(errorMessageEmail, selectedSection.childNodes[2]);


            } else if (error.code === "auth/invalid-email") {
                errorMessageEmail.innerText = 'Email erroneo';
                errorMessageEmail.classList.remove('hidden');

                selectedSection.insertBefore(errorMessageEmail, selectedSection.childNodes[2]);


            }
            else if (errorMessageEmail.classList.contains('hidden') === false) {
                selectedSection.removeChild(errorMessageEmail);

            }

            if (error.code === "auth/wrong-password") {
                errorMessagePassword.innerText = 'Contraseña erronea';
                errorMessagePassword.classList.remove('hidden');

                selectedSection.insertBefore(errorMessagePassword, selectedSection.childNodes[4]);

            }



            // ...
        });

})


// Inicio de sesión con Google


var googleLogin = document.getElementById('googleLogin')

googleLogin.addEventListener('click', () => {

    var selectedSection = document.getElementById('loginSection');
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {

        // The signed-in user info.
        var user = result.user;

        var uidUserGoogle = firebase.database().ref('usersSafim/' + user.uid);

        uidUserGoogle.set({
            User: user.displayName,
            Email: user.email,
        });

        initAnimation(user.displayName, selectedSection, " bienvenido")


    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode)

        var errorMessage = error.message;
        console.log(errorMessage)

        // The email of the user's account used.
        var email = error.email;
        console.log(email)

        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(credential)

        // ...
    });
})

// Cerrar sesión
document.getElementById('closeSession').addEventListener('click', salir)

function salir() {

    firebase.auth().signOut().then(function () {
        console.log("Sign-out successful")
    }).catch(function (error) {
        console.log(" An error happened")
    });
}



function searchFilms() {
    document.getElementById('searchfilms').classList.remove('hidden')
}


function savedFilms() {
    document.getElementById('searchfilms').classList.add('hidden')

}


function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };

document.addEventListener("keydown", disableF5);



// Buscado de peliculas en api 

document.getElementById('searchButton').addEventListener('click', searchFilmsApi);



function searchFilmsApi() {
    const content = document.getElementById('newFilm');
    var filmName = document.getElementById('filmName').value;

    var url = 'http://www.omdbapi.com/?apikey=' + apiKeyFilms + '&s=' + filmName + '&page=1';

    fetch(url)

        .then(response => response.json())

        .then(data => {
            checkFilmsSaved(data.Search)
                .then((seeFilms) => {


                    seeFilms.forEach(filmsInd => {

                        var rendered = Mustache.render(document.getElementById('templateNew').innerHTML, { filmsInd, Title: filmsInd.Title, image: filmsInd.Poster, Year: filmsInd.Year, Vista: "¡Vista!", Button: "Guardada" });
                        content.innerHTML += rendered;

                    })


                })


            checkFilmsNoSaved(data.Search)

                .then((respuesta) => {


                    respuesta.forEach(filmsInd => {

                        var rendered = Mustache.render(document.getElementById('templateNew').innerHTML, { filmsInd, Title: filmsInd.Title, image: filmsInd.Poster, Year: filmsInd.Year, Vista: "Marcar como vista", Button: "Añadir" });
                        content.innerHTML += rendered;

                    })

                    //Boton de añadir pelicula
                    var addFilmButton = document.getElementsByClassName('addFilmButton');

                    //Boton de marcar pelicula como vista no vista
                    var buttonSeeFilm = document.querySelectorAll("#seeFilms > div")

                    // Imagen de ojos visto no visto
                    var imgSeeFilm = document.querySelectorAll("#seeFilms > div > img")

                    //Mensaje de vista no vista
                    var msgSeeFilm = document.querySelectorAll("#seeFilms > span")



                    for (let i = 0; i < addFilmButton.length; i++) {


                        if (msgSeeFilm[i].innerText === "¡Vista!") {

                            buttonSeeFilm[i].setAttribute('aria-pressed', true);
                            imgSeeFilm[i].setAttribute('src', '/src/img/seefilm_ico.png')

                        }

                        //Función para añadir la pelicula a base de datos
                        addFilmButton[i].addEventListener('click', () => addFilms(data.Search[i], buttonSeeFilm[i]))

                        //Funciones para el marcado de pelicula
                        buttonSeeFilm[i].addEventListener('mouseover', () => funcMouseover(i))
                        buttonSeeFilm[i].addEventListener('mouseout', () => funcMouseout(i))

                        buttonSeeFilm[i].addEventListener('click', () => funcMouseClick(i))

                    }

                    function funcMouseover(position) {

                        imgSeeFilm[position].setAttribute('src', '/src/img/seefilm_ico.png')
                    }



                    function funcMouseout(position) {

                        let clicked = buttonSeeFilm[position].getAttribute('aria-pressed');
                        if (clicked === "false") {
                            imgSeeFilm[position].setAttribute('src', '/src/img/noseefilm_ico.png')
                        } else {
                            imgSeeFilm[position].setAttribute('src', '/src/img/seefilm_ico.png')
                        }
                    }


                    function funcMouseClick(position) {

                        let clicked = buttonSeeFilm[position].getAttribute("aria-pressed") === "true";

                        buttonSeeFilm[position].setAttribute('aria-pressed', !clicked);

                        if (clicked === false) {

                            msgSeeFilm[position].innerHTML = "¡Vista!"
                        }
                        else {
                            msgSeeFilm[position].innerHTML = "Marcar como vista"
                        }

                        imgSeeFilm[position].setAttribute('src', '/src/img/seefilm_ico.png');



                    }


                })
        })

        .catch(function (error) {
            console.log(error.message);
        });
};





// Funcioon para el guardado de peliculas en la base de datos

function addFilms(indvFilms, markSee) {
    var indvName = indvFilms.Title.replace(" ", "+");
    let clicked = markSee.getAttribute("aria-pressed")
    var indvUrl = 'http://www.omdbapi.com/?apikey=' + apiKeyFilms + '&t=' + indvName + '&plot=full';

    fetch(indvUrl)
        .then(response => response.json())

        .then(data => {
            var refMovies = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid + "/savedFiles/" + data.imdbID);


            refMovies.set({
                Poster: data.Type,
                Titulo: data.Title,
                Fecha: data.Year,
                País: data.Country,
                País: data.Released,
                Puntuacion: data.imdbRating,
                Vista: clicked
            });



        })

        .catch(function (error) {
            console.log(error.message);
        });
}


// Función para filtrar las peliculas no vistas
function checkFilmsNoSaved(datosFilms) {

    return new Promise((resolve) => {
        var refData = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid + "/savedFiles");


        refData.on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let finalArray = datosFilms.filter(datosFilm => datosFilm.imdbID !== childSnapshot.key);
                resolve(finalArray)

            })

        })
    })
}

// Función para filtrar las peliculas vistas

function checkFilmsSaved(datosFilms) {

    return new Promise((resolve) => {
        var refData = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid + "/savedFiles");

        refData.on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let finalArray = datosFilms.filter(datosFilm => datosFilm.imdbID === childSnapshot.key);
                resolve(finalArray)

            })

        })
    })
}