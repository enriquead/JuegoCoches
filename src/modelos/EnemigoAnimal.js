class EnemigoAnimal extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.jabali, x, y);
        this.estado = estados.moviendo;
        this.aMoverArriba = new Animacion(imagenes.jabali_Arriba,
            this.ancho, this.alto, 2, 3);
        // Ref a la animación actual
        this.aMoverAbajo = new Animacion(imagenes.jabali_Abajo,
            this.ancho, this.alto, 2, 3);
        this.aExplosion = new Animacion(imagenes.animacion_crash,this.ancho,
            this.alto,5,6,this.finAnimacionMorir.bind(this));
        this.animacion = this.aMoverAbajo;

        this.vy = 3;

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
        this.y = this.y + this.vy;
        // Evitar que se salga de pantalla
        if(this.y - this.alto/2 <0){
            this.vy = - (this.vy);
            this.cambiarAnimacionEjeY();
        }
        if(this.y + this.alto/2 > 320){
            this.vy = - (this.vy);
            this.cambiarAnimacionEjeY();
        }
    }

    cambiarAnimacionEjeY(){
        if(this.animacion == this.aMoverAbajo)
            this.animacion = this.aMoverArriba;
        else
            this.animacion = this.aMoverAbajo;

    }

    cambiarSentidoAnimacion(){

    }




}