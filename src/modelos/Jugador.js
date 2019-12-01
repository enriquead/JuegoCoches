class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.deportivo , x, y);

        this.aMover = new Animacion(imagenes.animacion_deportivo,
            this.ancho, this.alto, 5, 6);
        // Ref a la animación actual
        this.animacion = this.aMover;
        this.vx = 6; //VelocidadX no controlable por el jugador
        this.vy = 0; //VelocidadY controlable por jugador
        this.vidas = 3;
        this.puntos = 0;
        this.tiempoInvulnerable = 0;
    }

    actualizar(){
        if (this.tiempoInvulnerable > 0 ){
            this.tiempoInvulnerable --;
        }
        this.animacion.actualizar();
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        // Controlar que el jugador no se sale
        if(this.y - this.alto/2 <0){
            this.y = (this.alto/2);
        }
        if(this.y + this.alto/2 > 320){
            this.y = 320 - this.alto/2;
        }
    }

    moverY(direccion){
        this.vy = direccion * 4;
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        if ( this.tiempoInvulnerable > 0) {
            contexto.globalAlpha = 0.5;
            this.animacion.dibujar(this.x - scrollX, this.y);
            contexto.globalAlpha = 1;
        } else {
            this.animacion.dibujar(this.x - scrollX, this.y);
        }

    }

    golpeado (){
        if (this.tiempoInvulnerable <= 0) {
            if (this.vidas > 0) {
                this.vidas--;
                this.tiempoInvulnerable = 100;
            }
        }
    }


}
