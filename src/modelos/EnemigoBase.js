class EnemigoBase extends Modelo {


    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    explotado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }

    cambiarAnimacionEjeY(){

    }

    cambiarSentidoAnimacion(){
        if(this.estado == estados.moviendo && this.animacion == this.aMover){
            this.animacion = this.aMoverInversa;
        }
        else if(this.estado == estados.moviendo && this.animacion == this.aMoverInversa){
            this.animacion = this.aMover;
        }
    }
}