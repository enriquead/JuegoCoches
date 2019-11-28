class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.deportivo , x, y);

        this.aMover = new Animacion(imagenes.animacion_deportivo,
            this.ancho, this.alto, 5, 6);
        // Ref a la animación actual
        this.animacion = this.aMover;
        this.vx = 5; //VelocidadX no controlable por el jugador
        this.vy = 0; //VelocidadY controlable por jugador
        this.vidas = 3;
    }

    actualizar(){
        if (this.tiempoInvulnerable > 0 ){
            this.tiempoInvulnerable --;
        }

        this.animacion.actualizar();
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
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
