var listaPalabras = [
  "LUARCA",
  "MIERES",
  "LANGREO",
  "NAVIA",
  "TINEO",
  "PRAVIA",
  "LLANES",
  "SOMAO",
  "OVIEDO",
  "GIJON",
];

//No he conseguido que se enlazaran las clases y que siguiese funcionando correctamente, por lo que he optado por dejarlo como estaba.
//Comparar el Array predeterminado por el que vaya saliendo

var palabraRandom;
var nuevaPalabraGenerada;
var aciertos = 0;
var palabraDesordenada1;
var palabraDesordenada2;
var intentos = 0;

// Desordena los caracteres de un String
function desordenar(_palabra) {
  var unArray = _palabra.split("");
  var a = unArray.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  return a.join("");
}

// Genera una palabra desordenada de el Array
function comenzar() {
  palabraRandom =
    listaPalabras[Math.floor(Math.random() * listaPalabras.length)];

  palabraDesordenada1 = desordenar(palabraRandom);

  document.getElementById("letras").setAttribute("value", palabraDesordenada1);
}

//Cambia la palabra
function cambiaPalabra() {
  nuevaPalabraGenerada =
    listaPalabras[Math.floor(Math.random() * listaPalabras.length)];

  if (palabraRandom != nuevaPalabraGenerada) {
    palabraDesordenada2 = desordenar(nuevaPalabraGenerada);

    document
      .getElementById("letras")
      .setAttribute("value", palabraDesordenada2);
    document.getElementById("palabra").value = "";
    document.getElementById("nueva").disabled = true;
    document.getElementById("solucion").disabled = false;
    //El classList lo he encontrado en internet, sirve para comunicar el .js con el .css
    document.getElementById("resultado").classList.remove("intentos");
    document.getElementById("resultado").classList.remove("info");
    document.getElementById("resultado").innerHTML = "";
    intentos++;
  }
}

//Revela la solucion del juego
function solucionar() {
  if (document.getElementById("letras").value == palabraDesordenada1) {
    //El classList lo he encontrado en internet, sirve para comunicar el .js con el .css
    document.getElementById("resultado").classList.add("info");
    document.getElementById("resultado").innerHTML =
      "La palabra correcta era: " + palabraRandom;
    document.getElementById("solucion").disabled = true;
    document.getElementById("nueva").disabled = false;
  } else {
    document.getElementById("resultado").classList.add("info");
    document.getElementById("resultado").innerHTML =
      "La palabra correcta era: " + nuevaPalabraGenerada;
    document.getElementById("solucion").disabled = true;
    document.getElementById("nueva").disabled = false;
  }
  intentos++;
}

function finalizarJuego() {
  console.log(intentos);
  console.log(aciertos);
  var porcentajeAciertos = Math.floor((aciertos / intentos) * 10000) / 100;
  document.getElementById("porcentaje").style.visibility = "visible";
  document.getElementById("porcentaje").innerHTML =
    "Porcentaje de aciertos: " + porcentajeAciertos + "%";
  document.getElementById("resultado").classList.remove("intentos");
  document.getElementById("resultado").classList.remove("info");
  document.getElementById("solucion").disabled = true;
  document.getElementById("nueva").disabled = true;
  document.getElementById("resultado").innerHTML = "";
}

//Funcion que se ejecuta cada vez que se escribe una letra en el Input
function keyupEvent() {
  document.getElementById("palabra").value = document
    .getElementById("palabra")
    .value.toUpperCase();

  console.log(document.getElementById("palabra").value.toUpperCase());

  if (document.getElementById("palabra").value === palabraRandom) {
    console.log("correcto");
    document.getElementById("nueva").disabled = false;
    document.getElementById("solucion").disabled = true;
    document.getElementById("resultado").innerHTML =
      "Has acertado, la palabra era: " + palabraRandom;
    //El classList lo he encontrado en internet, sirve para comunicar el .js con el .css
    document.getElementById("resultado").classList.add("intentos");
    aciertos++;
  }

  if (document.getElementById("palabra").value === nuevaPalabraGenerada) {
    console.log("correcto");
    document.getElementById("nueva").disabled = false;
    document.getElementById("solucion").disabled = true;
    document.getElementById("resultado").innerHTML =
      "Has acertado, la palabra era: " + nuevaPalabraGenerada;
    //El classList lo he encontrado en internet, sirve para comunicar el .js con el .css
    document.getElementById("resultado").classList.add("intentos");
    aciertos++;
  }
}

//Eventos
document.getElementById("palabra").addEventListener("keyup", keyupEvent, false);
document
  .getElementById("finalizar")
  .addEventListener("click", finalizarJuego, false);
document
  .getElementById("nueva")
  .addEventListener("click", cambiaPalabra, false);
document
  .getElementById("solucion")
  .addEventListener("click", solucionar, false);

comenzar();
