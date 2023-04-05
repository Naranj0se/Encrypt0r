// Declaracion de variables referentes a objetos del HTML

let aEncriptar = document.querySelector('#mensaje'); 
const botonGenerar = document.querySelector('.generar-button');
const clave = document.querySelector('#clave');
const botonEncriptalo = document.querySelector('.login-button'); 
const msjEncriptado = document.querySelector('.encriptador');

// Funciones referentes a objetos del HTML

function portapapeles(boton){
  switch(boton){
    case 1: navigator.clipboard.writeText(clave.value);
    break;
    case 2: navigator.clipboard.writeText(msjEncriptado.value);
    break;
  };
}

function rellenaClave(){
  if(aEncriptar.value == ''){
    window.alert('No es posible generar una clave sino ha escrito el mensaje a encriptar.');
  }
  else{
    let claveGenerada = generarClave(); 
    clave.value = claveGenerada
    console.log('Hola soy la generacion')
    return claveGenerada;
  }
};


function encriptador(){
  if(aEncriptar.value.includes('\'') || aEncriptar.value.includes('\"') || aEncriptar.value.includes('\`')){
    window.alert('El uso de los caracteres \'  \"  \` no está permitido');
  }
  else if(aEncriptar.value == '' || clave.value == ''){
    window.alert('Asegurese de haber llenado todos los campos antes de encriptar.');
  }
  else{
    let encriptacion = cifrarMensaje(aEncriptar.value, asignaClave(clave.value, aEncriptar.value));
    msjEncriptado.value = encriptacion; 
  }
}

function desencriptador(){
  if(aEncriptar.value.includes('\'') || aEncriptar.value.includes('\"') || aEncriptar.value.includes('\`')){
    window.alert('El uso de los caracteres \'  \"  \` no está permitido');
  }
  else if(aEncriptar.value == '' || inputClave.value == ''){
    window.alert('Asegurese de haber llenado todos los campos antes de encriptar.');
  }
  else{
    let desencriptacion = descifrarMensaje(aEncriptar.value, asignaClave(inputClave.value, aEncriptar.value));
    msjEncriptado.value = desencriptacion; 
  }
}

// Funciones y Variables de la logica de encriptación

// Alfabeto principal
const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°";

/* Tabla de Gronsfeld hecha con 10 alfabetos que contienen la mayoría de caracteres disponibles
derivados del alfabeto principal. 
*/
let gronsfeldTabla = [
    "CDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°AB",
    "DEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABC",
    "FGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDE",
    "HIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFG",
    "LMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJK",
    "NÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLM",
    "RSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLMNÑOPQ",
    "TUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLMNÑOPQRS",
    "XYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLMNÑOPQRSTUVW",
    "CDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°AB"
  ];
  
// Función para generar una clave aleatoria de cifrado
function generarClave() {
  if(aEncriptar.value.length < 8){
    var clave = "";
    for (let i = 0; i < (aEncriptar.value.length / 2); i++) {
      clave += Math.floor(Math.random() * 10);
    }
    return clave;
  }
  else{
    var clave = "";
    for (let i = 0; i < 8; i++) {
      clave += Math.floor(Math.random() * 10);
    }
    return clave;
  }
  }
 
// Funcion que iguala la cantidad de caracteres entre la clave y el mensaje a encriptar o desencriptar

  function asignaClave(claveGenerada, mensaje){
      asignada = claveGenerada.repeat(aEncriptar.value.length);
      return asignada.substring(0, mensaje.length);
  }

// Funcion que cifra el mensaje utilizando el método de Gronsfeld
  
  function cifrarMensaje(mensaje, clave){
      let codificado = '';
      let mensajeModificado = mensaje;
      let claveMod = clave;
  
          for (element of mensajeModificado){
              let elementoClave = claveMod[0];  
              let elementoAlfabeto = alphabet.indexOf(element);
              
              codificado = codificado + (gronsfeldTabla[elementoClave][elementoAlfabeto]);
              mensajeModificado = mensajeModificado.slice(1);  
              claveMod = claveMod.slice(1); 
          }
      return codificado;
  };
  
// Funcion que descifra el mensaje codificado utilizando el metodo de Gronsfeld a la inversa
  
  function descifrarMensaje(cifrado, clave){
      let descifrado = '';
      let cifradoMod = cifrado;
      let claveMod = asignaClave(clave, cifrado);
          for (element of cifradoMod){
              let elementoClave = parseInt(claveMod[cifradoMod.indexOf(element)]);    
              let elementoTabla = gronsfeldTabla[elementoClave].indexOf(element); 
  
              descifrado = descifrado + alphabet[elementoTabla];
              cifradoMod = cifradoMod.slice(1);
              claveMod = claveMod.slice(1);
          }
      return descifrado; 
  }

// codigo referente al cambio de modalidad (encriptador <-> desencriptador)

        const title = document.querySelector('.title-encriptado')
        const button = document.querySelector('.secondary-button')
        const body = document.querySelector('.encriptado')
        const label = document.querySelector('.label')
        const label2 = document.querySelector('.label2')
        const label3 = document.querySelector('.label3')
        const inputClave = document.querySelector('.input-clave')
        const contenedorClave = document.querySelector('.clave-container')
        const botonDesencriptalo = document.querySelector('.primary-button-2')
        const portaIcon = document.querySelector('.icono-porta')


        let isEncryptor = true

        function limpiaCasillas(){
            aEncriptar.value = '';
            inputClave.value = "";
            msjEncriptado.value = "";
            clave.value = "";
        }

        button.addEventListener('click', e => {
            isEncryptor = !isEncryptor 
            const textTitle = isEncryptor ? 'Encriptador' :  'Desencriptador'
            const buttonValue = isEncryptor ? 'Desencriptar Mensaje' : 'Encriptar Mensaje'
            const textAEncriptar = isEncryptor ? 'Introduce el mensaje a encriptar:' : 'Introduce el mensaje a desencriptar:'
            const textResultado = isEncryptor ? 'Mensaje encriptado:' : 'Mensaje desencriptado:'

            title.textContent = textTitle
            button.textContent = buttonValue
            label.textContent = textAEncriptar
            label3.textContent = textResultado;
            

            botonEncriptalo.addEventListener('click', e => {
              console.log('Hola');
            });
      

            if(!isEncryptor) {
                body.classList.remove("encriptado")
                body.classList.add("desencriptado")
                title.classList.remove('title-encriptado')
                title.classList.add('title-desencriptado')
                botonEncriptalo.classList.add('inactive')
                botonDesencriptalo.classList.remove('inactive')
                botonGenerar.classList.add('inactive')
                clave.classList.add('inactive')
                portaIcon.classList.add('inactive')
                label.classList.remove('label')
                label2.classList.remove('label2')
                label3.classList.remove('label3')
                label.classList.add('label-2')
                label2.classList.add('label-2')
                label3.classList.add('label-2')
                inputClave.classList.remove('inactive')
                contenedorClave.classList.add('inactive')
            } else {
                body.classList.remove("desencriptado")
                body.classList.add("encriptado")
                title.classList.remove('title-desencriptado')
                title.classList.add('title-encriptado')
                botonEncriptalo.classList.remove('inactive')
                botonDesencriptalo.classList.add('inactive')
                botonGenerar.classList.remove('inactive')
                clave.classList.remove('inactive')
                portaIcon.classList.remove('inactive')
                label.classList.remove('label-2')
                label2.classList.remove('label-2')
                label3.classList.remove('label-2')
                label.classList.add('label')
                label2.classList.add('label2')
                label3.classList.add('label3')
                inputClave.classList.add('inactive')
                contenedorClave.classList.remove('inactive')
            }
        })
