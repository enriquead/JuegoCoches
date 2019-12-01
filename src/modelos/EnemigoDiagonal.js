class EnemigoDiagonal extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.coche_diagonal, x, y)
        this.estado = estados.moviendo;
        this.aMover = new Animacion(imagenes.animacion_enemigo_diagonal,
            this.ancho, this.alto, 5, 6);
        this.aExplosion = new Animacion(imagenes.animacion_crash,this.ancho,
            this.alto,5,6,this.finAnimacionMorir.bind(this));
        this.aMoverInversa = new Animacion(imagenes.diagonal_izda,
            this.ancho, this.alto, 5, 6);

        // Ref a la animación actual
        this.animacion = this.aMover;


        this.vy = 2;
        this.vx = 3;
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
        this.y = this.y + this.vy;

        // Evitar que se salga de pantalla
        if(this.y - this.alto/2 <0){
            this.vy = - (this.vy);
        }
        if(this.y + this.alto/2 > 320){
            this.vy = - (this.vy);
        }
    }

}