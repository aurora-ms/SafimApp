page.base('');
page('/inicio', searchFilms);
page('/peliculas_guardadas', savedFilms);
page();






import { initAnimation } from "./animation.js"
import { toggleMenu } from "./menu_function.js"
import { apiKeyUser } from "./apis.js"
import { apiKeyFilms } from "./apis.js"






var menu = document.querySelector('.hamburger');
/**
 * Evento para el funcionamiento del menú
 * @param  {event} 'click' 
 * @param  {function} toggleMenu
 */
menu.addEventListener('click', toggleMenu);


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
/**
 * Promesa para comprobar si el usuario tiene sesión iniciada
 * @returns {string} Respuesta de la promesa
 */
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

            localStorage.setItem('nombreUser', result);

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
            localStorage.setItem('nombreUser', 'nuevo desconocido');

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

    .catch(function (error) {
        console.log(error.message);
    });



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

                document.getElementById('searchfilms').classList.remove('hidden')
                document.getElementById('menuSection').classList.remove('hidden')
document.getElementById('princMenu').style.opacity ="1";


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

                        localStorage.setItem('nombreUser', userLogin)

                        //Quitar los mensajes de error de la caja de login
                        errorMessageEmail.classList.add('hidden');
                        errorMessagePassword.classList.add('hidden');

                        // Llamada a la función que realiza la animación y aviso al usuario de que se ha registrado con éxito
                        initAnimation(userLogin, selectedSection, " bienvenido");
                        document.getElementById('menuSection').classList.remove('hidden');

                        document.getElementById('menuSection').style.animation = "1.5s cubic-bezier(0, 0, 0, 1.15) 0s 1 normal forwards running translateX";
                        page.redirect('/inicio')
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

        page.redirect('/inicio')


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

    firebase.auth().signOut()
}


// Acciones a realizar cuando se de a Buscador en el menu
function searchFilms() {
    var allsavedFilms = new Array;
    var refData = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid + "/savedFiles");

    refData.on('value', (snapshot) => {
        if (snapshot.val() !== null) {
            snapshot.forEach((childSnapshot) => {

                allsavedFilms.push(childSnapshot.val())


            })
        } else {
            allsavedFilms = 'Aun no tienes peliculas guardadas';
        }
    })


    localStorage.setItem('datos', JSON.stringify(allsavedFilms))

    document.getElementById('searchfilms').classList.remove('hidden')
    document.getElementById('savedFilm').classList.add('hidden');
}





// Acciones a realizar cuando se de a Guardadas en el menu
function savedFilms() {
    document.getElementById('searchfilms').classList.add('hidden')
    var refData = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid + "/savedFiles");

    document.getElementById('newFilm').classList.add('hidden');
    document.getElementById('savedFilm').classList.remove('hidden');
    var vistas = 0;
    var noVistas = 0;
    refData.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const content = document.getElementById('savedFilm');
            var filmsInd = childSnapshot.val();



            if (filmsInd.Vista === "true") {
                var seeIcon = "/src/img/seefilm_ico.png"
                var pressedValue = "true";

                vistas += 1
            } else {

                var seeIcon = "/src/img/noseefilm_ico.png"
                var pressedValue = "false"
                noVistas += 1

            }

            var rendered = Mustache.render(document.getElementById('templateSaved').innerHTML, { filmsInd, Title: filmsInd.Titulo, image: filmsInd.Poster, Year: filmsInd.Fecha, seeIcons: seeIcon, ariaPress: pressedValue, Button: "Borrar" });

            content.innerHTML += rendered;



        })
    })

    chartList(vistas, noVistas)

}

var options = {
    width: 300,
    height: 200,
};

/**
 * Funcion para la creación de las barras de estatistas
 * @param  {number} vist
 * @param  {number} nVist
 */
function chartList(vist, nVist) {

    new Chartist.Bar('.ct-chart', {
        labels: ['Vistas', 'Sin ver'],
        series: [
            [vist, nVist]
        ]
    }, options);
}

/**
 * Funcion para inhabilitar el recargado de la página con F5
 * @param  {json} e 
 */
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
            content.innerHTML = " ";

            arrayResult(data.Search)

                .then((datos) => {

                    datos.forEach(filmsInd => {

                        var rendered = Mustache.render(document.getElementById('templateNew').innerHTML, { filmsInd, Title: filmsInd.Title, image: filmsInd.Poster, Year: filmsInd.Year, Vista: "Marcar como vista", Button: "Añadir" });
                        content.innerHTML += rendered;
                    })
                    content.classList.remove('hidden')
                    document.getElementById('savedFilm').classList.add('hidden')


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


                    //Función que se ejecuta al pasar el ratón por encima del icono de vista de cada pelicula

                    function funcMouseover(position) {

                        imgSeeFilm[position].setAttribute('src', '/src/img/seefilm_ico.png')
                    }


                    //Función que se ejecuta al quitar el ratón de encima del icono de vista de cada pelicula

                    function funcMouseout(position) {

                        let clicked = buttonSeeFilm[position].getAttribute('aria-pressed');
                        if (clicked === "false") {
                            imgSeeFilm[position].setAttribute('src', '/src/img/noseefilm_ico.png')
                        } else {
                            imgSeeFilm[position].setAttribute('src', '/src/img/seefilm_ico.png')
                        }
                    }

                    //Función que se ejecuta al pulsar el icono de vista

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





// Funcion para el guardado de peliculas en la base de datos
/**
 * Función para añadir peliculas a la base de datos de firebase
 * @param  {JSON} indvFilms Json de los datos de la pelicula a la que hayamos pulsado añadir
 * @param  {JSON} markSee  Valores del boton de vista o pendiente de cada pelicula
 */

function addFilms(indvFilms, markSee) {


    var indvName = indvFilms.Title.replace(" ", "+");
    let clicked = markSee.getAttribute("aria-pressed");
    var indvUrl = 'http://www.omdbapi.com/?apikey=' + apiKeyFilms + '&t=' + indvName + '&plot=full';

    fetch(indvUrl)
        .then(response => response.json())

        .then(data => {
            var refMovies = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid + "/savedFiles/" + data.imdbID);


            refMovies.set({
                Poster: data.Poster,
                Titulo: data.Title,
                Fecha: data.Year,
                País: data.Country,
                Tipo: data.Type,
                Puntuacion: data.imdbRating,
                Vista: clicked
            });
            searchFilmsApi()
        })

        .catch(function (error) {
            console.log(error.message);
        });
}




/**
 * Función para filtrar las peliculas que no hemos añadido de las que aparecen al realizar una busqueda
 * @param  {JSON} datosFilms Json de los datos de las peliculas que aparecen en el buscador
 * @return {JSON} Respuesta de la promesa que nos pasa el json original o el json filtrado
 */
function arrayResult(datosFilms) {
    return new Promise(resolve => {

        var refData = firebase.database().ref('usersSafim/' + firebase.auth().currentUser.uid + "/savedFiles");
        refData.on('value', (snapshot) => {
            if (snapshot.val() === null) {
                resolve(datosFilms)

            } else {
                snapshot.forEach((childSnapshot) => {
                    for (var i = 0; i < datosFilms.length; i++) {

                        if (datosFilms[i].imdbID === childSnapshot.key) {
                            delete datosFilms[i]
                            datosFilms.splice(i, 1)

                        }

                    }

                    resolve(datosFilms)
                })

            }
        })
    })
}


