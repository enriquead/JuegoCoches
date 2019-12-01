class EnemigoRectilineo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo_rectilineo, x, y);
        this.estado = estados.moviendo;
        this.aMover = new Animacion(imagenes.animacion_enemigo_rectilineo,
            this.ancho, this.alto, 5, 6);
        this.aExplosion = new Animacion(imagenes.animacion_crash,this.ancho,
            this.alto,5,6,this.finAnimacionMorir.bind(this));

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 2;
    }

    actualizar (){
        this.animacion.actualizar();
        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aExplosion;
                break;
        }
        this.x = this.x + this.vx;
    }
    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }
    cambiarAnimacion(){

    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    explotado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }




}
