var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch (event.keyCode) {
            case 38:
                controles.moverY = 1;
                break;
            case 40:
                controles.moverY = -1
                break;
        }
    }


}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch (event.keyCode) {
        case 38:
            controles.moverY = 0;
            break;
        case 40:
            controles.moverY = 0;
            break;
    }
}
