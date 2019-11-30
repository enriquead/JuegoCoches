var cache = [];
// Lista re recursos a precargar
var imagenes = {
    deportivo : "res/deportivo_1.png",
    crash_deportivo : "res/animacion_deportivo_crash.png",
    golpe_deportivo: "res/animacion_deportivo_golpe.png",
    animacion_deportivo : "res/animacion_deportivo.png",
    fondo1 : "res/escenario_1.png",
    fondo2 : "res/escenario_2.png",
    fondo3 : "res/escenario_3.png",
    meta : "res/meta.png",
    enemigo_rectilineo: "res/cani_1.png",
    animacion_enemigo_rectilineo : "res/animacion_cani.png",
    animacion_crash_enemigo_rectilineo: "res/animacion_cani_crash.png",
    corazon: "res/corazon.png",
    aceite: "res/oil_puddle.png",
    coche_diagonal : "res/coche_1.png",
    animacion_enemigo_diagonal: "res/animacion_coche.png",
    jabali: "res/JabaliCompleto.png",
    jabali_Arriba:"res/jabalis2.png",
    jabali_Abajo:"res/Jabali1.png",
    flecha_Abajo: "res/flecha_abajo.png",
    flecha_Arriba: "res/flecha_arriba.png",
    menu_principal: "res/menu_titulo.png",
    boton_jugar: "res/boton_jugar.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
        cache[rutasImagenes[indice]] = new Image();
        cache[rutasImagenes[indice]].src = rutasImagenes[indice];
        cache[rutasImagenes[indice]].onload = function(){
            if ( indice < rutasImagenes.length-1 ){
                indice++;
                cargarImagenes(indice);
            } else {
                iniciarJuego();
            }
        }
}
