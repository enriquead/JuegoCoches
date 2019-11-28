class Modelo {

    constructor(imagenRuta, x, y) {
        this.imagen = cache[imagenRuta];
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        contexto.drawImage(this.imagen,
            this.x - this.imagen.width/2 - scrollX,
            this.y - this.imagen.height/2);
    }

    colisiona (modelo){
        var colisiona = false;
        const margenError = 10;
        if ( modelo.x - modelo.ancho/2 <=  (this.x + this.ancho/2) + margenError
            && (modelo.x + modelo.ancho/2) + margenError >= (this.x - this.ancho/2)
            && this.y + this.alto/2  >= (modelo.y - modelo.alto/2) + margenError
            && (this.y - this.alto/2) + margenError<= (modelo.y + modelo.alto/2) ){
               colisiona = true;
        }
        return colisiona;
    }



}
