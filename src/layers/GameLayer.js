class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.fondoVidas = new Fondo(imagenes.corazon,480*0.85,320*0.08);

        this.enemigos = [];
        this.oilPuddles = [];

        this.fondo = new Fondo(imagenes.fondo1,480*0.5,320*0.5);
        this.cargarMapa("res/"+nivelActual+".txt");
        this.vidas = new Texto(this.jugador.vidas,480*0.9,320*0.1 );
    }

    actualizar (){

        if (this.meta.colisiona(this.jugador)) {
            nivelActual++;
            if (nivelActual > nivelMaximo) {
                nivelActual = 0;
            }
            this.iniciar();
        }

        this.fondo.vx = -7;
        this.fondo.actualizar();
        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        // Colisiones
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                if(this.jugador.tiempoInvulnerable<=0){
                    reproducirEfecto(efectos.explosion);
                    this.iniciar();
                }

            }
        }
        for (var i=0; i < this.oilPuddles.length; i++){
            if ( this.jugador.colisiona(this.oilPuddles[i]) && this.jugador.tiempoInvulnerable<=0){
                reproducirEfecto(efectos.resbalar);
                this.jugador.golpeado();
                this.vidas.valor = this.jugador.vidas;
                if (this.jugador.vidas <= 0){
                    this.iniciar();
                }
            }
        }


    }
    calcularScroll(){
        this.scrollX = this.jugador.x -200;
    }
    dibujar (){

        this.calcularScroll();
        this.fondo.dibujar();
        this.meta.dibujar(this.scrollX);
        for (var i=0; i < this.oilPuddles.length; i++){
            this.oilPuddles[i].dibujar(this.scrollX);
        }
        this.jugador.dibujar(this.scrollX);
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX);
        }
        this.fondoVidas.dibujar();
        this.vidas.dibujar();

    }

    procesarControles() {
        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "1":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                break;
            case "R":
                var enemigo = new EnemigoRectilineo(x,y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                this.enemigos.push(enemigo);
                break;
            case "M":
                this.meta = new ElementoEstatico(imagenes.meta, x,y);
                this.meta.y = this.meta.y - this.meta.alto/2;
                break;
            case "O":
                var oilPuddle = new ElementoEstatico(imagenes.aceite,x,y);
                oilPuddle.y = oilPuddle.y - oilPuddle.alto/2;
                this.oilPuddles.push(oilPuddle);
                break;



        }
    }



}
