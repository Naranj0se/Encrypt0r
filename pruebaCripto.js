// Función para generar una clave aleatoria de cifrado
function generarClave() {
    let clave = "";
    for (let i = 0; i < 10; i++) {
      clave += Math.floor(Math.random() * 10);
    }
    return clave;
  }
  
  // Función para cifrar un mensaje utilizando el método Gronsfeld
  function cifrarMensaje(mensaje, clave) {
    let mensajeCifrado = "";
    for (let i = 0; i < mensaje.length; i++) {
      let letra = mensaje[i];
      let desplazamiento = parseInt(clave[i % clave.length]);
      let nuevaLetra = String.fromCharCode(((letra.charCodeAt(0) - 65 + desplazamiento) % 26) + 65);
      mensajeCifrado += nuevaLetra;
    }
    return mensajeCifrado;
  }
  
  // Función para descifrar un mensaje utilizando la clave de cifrado
  function descifrarMensaje(mensajeCifrado, clave) {
    let mensajeDescifrado = "";
    for (let i = 0; i < mensajeCifrado.length; i++) {
      let letraCifrada = mensajeCifrado[i];
      let desplazamiento = parseInt(clave[i % clave.length]);
      let nuevaLetra = String.fromCharCode(((letraCifrada.charCodeAt(0) - 65 - desplazamiento + 26) % 26) + 65);
      mensajeDescifrado += nuevaLetra;
    }
    return mensajeDescifrado;
  }
  
  
  // Mensaje a cifrar
  let mensajeOriginal = "Hola, me llamo Jose y tengo 20";
  
  // Generar una clave aleatoria de cifrado
  let clave = generarClave();
  
  // Cifrar el mensaje utilizando el método Gronsfeld
  let mensajeCifrado = cifrarMensaje(mensajeOriginal.toUpperCase(), clave);
  
  // Descifrar el mensaje utilizando la clave de cifrado
  let mensajeDescifrado = descifrarMensaje(mensajeCifrado.toUpperCase(), clave);
  
  // Mostrar el mensaje original, el mensaje cifrado, el mensaje descifrado y la clave de cifrado
  console.log("Mensaje original: " + mensajeOriginal);
  console.log("Mensaje cifrado: " + mensajeCifrado);
  console.log("Mensaje descifrado: " + mensajeDescifrado);
  console.log("Clave de cifrado: " + clave);