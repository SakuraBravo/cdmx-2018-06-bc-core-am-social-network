initiaziling();
// Evento de autenticaciíon con Gmail de Google
document.getElementById('btn-google').addEventListener('click', (event) =>{
  authGoogle();
});
// Evento de autenticaciíon con facebook
document.getElementById('btn-facebook').addEventListener('click', (event) =>{
  authFacebook();
});
//  Proveedor de credenciales de Gmail. Pasa credenciales a la autenticación
const authGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  authentificating(provider);
};
//  Proveedor de credenciales de facebook. Pasa credenciales a la autenticación
const authFacebook = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  authentificating(provider);
};
// autenticación para redes socilaes con Proveedorde credenciales.
const authentificating = (provider) =>{
  firebase.auth().signInWithPopup(provider).then(function(result) { // Genera pantalla emergente para pedir autenticación
    // Da el Token de acceso a Google. Usar para acceder a la API de Google
    let token = result.credential.accessToken;
    // Datos del usuario logeado
    let user = result.user;
    document.getElementById('container').innerHTML = `<p>${'Bienvenido'}${' '}${'usuario'}</p>
    <button class="btn btn-primary" type="button" id="buttonLogout" onclick="cerrar()">LogOut</button>`;
  }).catch(function(error) {
    // generar error
	  let errorCode = error.code;
    let errorMessage = error.message;
    // Este email ya esta en uso
    let email = error.email;
    console.log(email);
    // Los permisos del firebase.auth.AuthCredential ya fueron usados.
    let credential = error.credential;
    console.log(credential);
  });
};

// Registro por correo
const registrar = (email, password, userName, name, birthday, country) =>{
  firebase.auth().createUserWithEmailAndPassword(email, password) // Crea usuarios a apartir del correo
    .then(function() {
      verificarEmail(); // Verifica si existe o no y si esta activo o no
    })
    .catch(function(error) {
      // Manejo de errores
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};
// Ingresar por medio de correo
const ingresar = (emailU, passwordU, nameU) =>{
  firebase.auth().signInWithEmailAndPassword(emailU, passwordU) // Metodo para inicial sesión
    .then(function() {
      observadorEmail(nameU); // Llama al observador para analizar estado de la sesion actual
    })
    .catch(function(error) {
      // Manejo de error
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
};

const observadorEmail = (nameU)=>{
  console.log(nameU);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userSpace(nameU);
      // Usuario logeado
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      console.log('Activo');
    } else {
      console.log('No hay usuario');
    }
  });
};
// observadorEmail();

const userSpace = (user)=>{
  let nameU = user;
  document.getElementById('container').innerHTML = `<p>${'Bienvenido'}${' '}${nameU}</p>
  <button type="button" id="buttonLogout" onclick="cerrar()">LogOut</button>`;
};
const cerrar = () =>{
  let contenido = document.getElementById('container');
  firebase.auth().signOut()
    .then(function() {
      console.log('Cerrar sesion');
      contenido.innerHTML = '';
    })
    .catch(function() {
      console.log(error);
    });
};

const verificarEmail = ()=>{
  let vefificarU = firebase.auth().currentUser;
  vefificarU.sendEmailVerification().then(function() {
    console.log('enviando email');
  }).catch(function() {
    console.log(error);
  });
};

document.getElementById('buttonRegistrar').addEventListener('click', (event) => {
  console.log('entra');
  let email = document.getElementById('uEmail').value;
  let password = document.getElementById('uPsw').value;
  let userName = document.getElementById('uName').value;
  let nombre = document.getElementById('name').value;
  let birthday = document.getElementById('birthday').value;
  registrar(email, password, userName, nombre, birthday);
});
document.getElementById('buttonIngresar').addEventListener('click', (event) => {
  let emailU = document.getElementById('userEmail').value;
  let passwordU = document.getElementById('userPsw').value;
  let nameU = document.getElementById('username').value;
  ingresar(emailU, passwordU, nameU);
});

// Verificar formulario de Registro
const registro = document.getElementByName(formulario)[0],
  elementos = registro.elementos,
  boton = documentGetElementById('buttonRegistrar');

/* const userPrintSpace = document.getElementById('obj');
let database = firebase.database().ref().child('obj');
database.on('value', snap => console.log(snap.val()));*/
function sum(a, b) {
  return a + b;
}
module.exports = sum;
