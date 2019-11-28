class EnemigoAnimal extends Modelo {

    constructor(x, y) {
        super(imagenes.jabali, x, y)
        this.aMoverArriba = new Animacion(imagenes.jabali_Arriba,
            this.ancho, this.alto, 2, 3);
        // Ref a la animación actual
        this.aMoverAbajo = new Animacion(imagenes.jabali_Abajo,
            this.ancho, this.alto, 2, 3);
        this.animacion = this.aMoverAbajo;

        this.vy = 3;

    }

    actualizar (){
        this.animacion.actualizar();
        this.y = this.y + this.vy;
        // Evitar que se salga de pantalla
        if(this.y - this.alto/2 <0){
            this.vy = - (this.vy);
            this.cambiarAnimacion();
        }
        if(this.y + this.alto/2 > 320){
            this.vy = - (this.vy);
            this.cambiarAnimacion();
        }
    }
    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }

    cambiarAnimacion(){
        if(this.animacion == this.aMoverAbajo)
            this.animacion = this.aMoverArriba;
        else
            this.animacion = this.aMoverAbajo;

    }




}