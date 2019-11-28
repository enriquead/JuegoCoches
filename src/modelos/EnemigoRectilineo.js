class EnemigoRectilineo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo_rectilineo, x, y)
        this.aMover = new Animacion(imagenes.animacion_enemigo_rectilineo,
            this.ancho, this.alto, 5, 6);
        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 2;
    }

    actualizar (){
        this.animacion.actualizar();
        this.x = this.x + this.vx;
    }
    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }




}
