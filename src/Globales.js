var pulsaciones = []; // actuales registradas

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
var entrada = entradas.pulsaciones;

var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.muriendo = 3;
estados.muerto = 4;



var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;


let nivelActual = 0;
const nivelMaximo = 2;
