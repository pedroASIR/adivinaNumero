var seleccionJugador;
var numeroIntentos;
var numero;
var contador;

$(document).ready(function () {
    $("#enviar").click(play);
});
//Función para iniciar el juego, desactiva select de intentos, genera el numero aleatorio
function iniciar_juego() {
    $("#enviar").removeAttr("disabled"); //activa el boton enviar
    $("#numIntentos").attr("disabled", "disabled"); //desactiva el seleccionador de dificultad
    $("#mensaje").html(""); //vacía los mensajes de ayuda de la anterior partida
    $("#mostrarIntentos").html("") //vacía el mensaje que indica el numero de intentos que lleva utilizados el jugador
    contador = 0; //inicializa el contador a 0
    numeroIntentos = $("#numIntentos option:selected").val(); //obtiene el atributo value de las opciones del select para seleccionar el numero de intentos
    numero_aleatorio(); //llamada a la funcion
}
//Función que crea el número aleatorio
function numero_aleatorio() {
    numero = Number(Math.ceil(Math.random() * 100));
}
//Función que recoge en una variable el número escogido por el jugador
function userChoose() {
    seleccionJugador = Number($("#userChoice").val());
}
//Función para validar que la elección del jugador es un número comprendido entre 1 y 100
function validar_seleccion() {
    if (isNaN(seleccionJugador)) {
        $("#mensaje").html("¡Introduce un número!");
        $("#userChoice").val("");
        return false;
    } else if (seleccionJugador < 1 || seleccionJugador > 100) {
        $("#mensaje").html("¡Introduce un número comprendido entre 1 y 100!");
        $("#userChoice").val("");
        return false;
    } else {
        return true;
    }
}
//Función principal del juego, comprueba el número generado aleatoriamente con el número que selecciona el jugador
function play() {
    userChoose();
    var valido = validar_seleccion();
    if (contador < numeroIntentos && valido == true) {
        if (seleccionJugador < numero) {
            $("#mensaje").html("El número es mayor, pruebe otra vez.");
        } else if (seleccionJugador > numero) {
            $("#mensaje").html("El número es menor, pruebe otra vez.");
        } else if (numero == seleccionJugador) {
            gameOver();
            $("#mensaje").html("¡Has ganado con " + (contador + 1) + " intentos!"); //se le suma + 1 al contador para que indique el número correcto de 
                                                                                    //intentos porque al terminar el juego contador++ no se ejecutaría y no lo sumaría
        }
        contador++;
    }
    //if solo para indicar 'intento' en singular cuando contador es 1 (para perfeccionar código)
    if (contador == 1) {
        $("#mostrarIntentos").html("Llevas " + contador + " intento.")
    } else {
        $("#mostrarIntentos").html("Llevas " + contador + " intentos.")
    }
    //if que indica que el jugador ha perdido por superar el número de intentos
    if (contador == numeroIntentos && seleccionJugador != numero) {
        $("#mensaje").html("Has superado el número de intentos. GAME OVER.")
        gameOver();
    }
}
//Función utilizada al finalizar el juego
function gameOver() {
    $("#enviar").attr("disabled", 'disabled'); //desactiva el botón enviar
    $("#numIntentos").removeAttr("disabled"); //activa el seleccionador de dificultad
    $("#userChoice").val(""); //borra cualquier valor que hubiese en el input text
}
