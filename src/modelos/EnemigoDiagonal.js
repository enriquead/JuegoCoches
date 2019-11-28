class EnemigoDiagonal extends Modelo {

    constructor(x, y) {
        super(imagenes.coche_diagonal, x, y)
        this.aMover = new Animacion(imagenes.animacion_enemigo_diagonal,
            this.ancho, this.alto, 5, 6);
        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 2;
        this.vx = 3;
    }

    actualizar (){
        this.animacion.actualizar();
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        // Evitar que se salga de pantalla
        if(this.y - this.alto/2 <0){
            this.vy = - (this.vy);
        }
        if(this.y + this.alto/2 > 320){
            this.vy = - (this.vy);
        }
    }
    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }




}