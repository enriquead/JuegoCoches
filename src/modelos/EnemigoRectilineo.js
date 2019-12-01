class EnemigoRectilineo extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_rectilineo, x, y);
        this.estado = estados.moviendo;
        this.aMover = new Animacion(imagenes.animacion_enemigo_rectilineo,
            this.ancho, this.alto, 5, 6);
        this.aExplosion = new Animacion(imagenes.animacion_crash,this.ancho,
            this.alto,5,6,this.finAnimacionMorir.bind(this));
        this.aMoverInversa = new Animacion(imagenes.rectilineo_izda,
            this.ancho, this.alto, 5, 6);

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 2;
    }

    actualizar (){
        this.animacion.actualizar();
        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.animacion;
                break;
            case estados.muriendo:
                this.animacion = this.aExplosion;
                break;
        }
        this.x = this.x + this.vx;
    }





}
