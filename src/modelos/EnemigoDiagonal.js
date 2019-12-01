class EnemigoDiagonal extends Modelo {

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

    cambiarSentidoAnimacion(){
        console.log("Cambiando animacion");
        if(this.estado == estados.moviendo && this.animacion == this.aMover){
            this.animacion = this.aMoverInversa;
        }
        else if(this.estado == estados.moviendo && this.animacion == this.aMoverInversa){
            this.animacion = this.aMover;
        }

    }



}