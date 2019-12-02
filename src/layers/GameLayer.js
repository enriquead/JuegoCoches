class GameLayer extends Layer {

    constructor() {
        super();
        this.mensaje = new Boton(imagenes.como_jugar,480/2,320/2);
        this.pausa = true;
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.botonArriba = new Boton(imagenes.flecha_Arriba,480*0.1,320*0.3);
        this.botonAbajo = new Boton(imagenes.flecha_Abajo,480*0.1,320*0.7);

        this.fondoVidas = new Fondo(imagenes.corazon,480*0.85,320*0.08);
        this.fondoPuntos = new Fondo(imagenes.lata,480*0.5,320*0.08);

        this.enemigosDestructores = [];
        this.oilPuddles = [];
        this.bombas = [];
        this.vidasExtra = [];
        this.latas=[];
        this.cambiosSentido = [];
        this.pinchos = [];

        this.marcadorNivel = new Texto("Nivel: "+(nivelActual+1),480*0.1,320*0.1);


        this.cargarMapa("res/"+nivelActual+".txt");
        switch (nivelActual) {
            case 0:
                this.fondo = new Fondo(imagenes.fondo1,480*0.5,320*0.5);
                this.jugador.vx = 6;
                break;
            case 1:
                this.fondo = new Fondo(imagenes.fondo2,480*0.5,320*0.5);
                this.jugador.vx = 8;
                break;
            case 2:
                this.fondo = new Fondo(imagenes.fondo3,480*0.5,320*0.5);
                this.jugador.vx = 10;
                break;
        }
        this.vidas = new Texto(this.jugador.vidas,480*0.9,320*0.1 );
        this.puntos = new Texto(this.jugador.puntos,480*0.55,320*0.1);
    }

    actualizar (){
        if(this.pausa){
            return;
        }

        if (this.meta.colisiona(this.jugador)) {
            reproducirEfecto(efectos.goal);
            this.pausa = true;
            nivelActual++;
            if (nivelActual > nivelMaximo) {
                nivelActual = 0;
                this.mensaje = new Boton(imagenes.victoria,480/2,320/2);
            }
            else{
                this.mensaje = new Boton(imagenes.has_ganado,480/2,320/2);
            }
            this.iniciar();
        }

        this.fondo.vx = -7;
        this.fondo.actualizar();
        this.jugador.actualizar();
        for (let i=0; i < this.enemigosDestructores.length; i++){
            this.enemigosDestructores[i].actualizar();
        }
        // Colisiones
        for (let i=0; i < this.enemigosDestructores.length; i++){
            if ( this.jugador.colisiona(this.enemigosDestructores[i]) &&
                this.enemigosDestructores[i].estado == estados.moviendo){
                    this.pausa = true;
                    this.mensaje = this.mensaje = new Boton(imagenes.has_perdido,480/2,320/2);
                    reproducirEfecto(efectos.explosion);
                    this.iniciar();
            }
        }
        for (let i=0; i < this.oilPuddles.length; i++){
            if ( this.jugador.colisiona(this.oilPuddles[i]) && this.jugador.tiempoInvulnerable<=0){
                reproducirEfecto(efectos.resbalar);
                this.jugador.golpeado();
                this.vidas.valor = this.jugador.vidas;
                this.oilPuddles.splice(i,1);
                i = i-1;
                if (this.jugador.vidas <= 0){
                    this.pausa = true;
                    this.mensaje = this.mensaje = new Boton(imagenes.has_perdido,480/2,320/2);
                    this.iniciar();
                }

            }
        }
        for (let i=0; i < this.enemigosDestructores.length; i++){
            for  (var j=0; j < this.enemigosDestructores.length; j++){
                if ( this.enemigosDestructores[i].colisiona(this.enemigosDestructores[j]) &&
                    this.enemigosDestructores[i]!== this.enemigosDestructores[j] &&
                    this.enemigosDestructores[j].estado == estados.moviendo
                    &&  this.enemigosDestructores[i].estado == estados.moviendo){
                        this.enemigosDestructores[i].vy *= -1;
                        this.enemigosDestructores[i].cambiarAnimacionEjeY();
                        //Para evitar enganchones con coches que circulan en linea recta, si no quedarían enganchados
                        // Ya que cambiaría su velocidad en el eje Y constantemente (siempre en colisión)
                        if(this.enemigosDestructores[i] instanceof EnemigoAnimal || this.enemigosDestructores[i] instanceof EnemigoDiagonal){
                            if(this.enemigosDestructores[i].vy >0)
                                this.enemigosDestructores[i].y+=1;
                            else
                                this.enemigosDestructores[i].y-=1;
                        }
                }
            }
        }
        for (let i=0; i < this.vidasExtra.length; i++){
            if ( this.jugador.colisiona(this.vidasExtra[i])){
                reproducirEfecto(efectos.vida);
                this.jugador.vidas++;
                this.vidas.valor = this.jugador.vidas;
                this.vidasExtra.splice(i,1);
                i = i-1;
            }
        }
        for (let i=0; i < this.latas.length; i++){
            if ( this.jugador.colisiona(this.latas[i])){
                reproducirEfecto(efectos.lata);
                this.jugador.puntos++;
                this.puntos.valor = this.jugador.puntos;
                this.latas.splice(i,1);
                i = i-1;
            }
        }
        for (let i=0; i < this.pinchos.length; i++){
            if ( this.jugador.colisiona(this.pinchos[i])){
                reproducirEfecto(efectos.pinchazo);
                this.jugador.pinchado();
                this.pinchos.splice(i,1);
                i = i-1;
            }
        }
        for (let i=0; i < this.cambiosSentido.length; i++){
            if ( this.jugador.colisiona(this.cambiosSentido[i])){
                reproducirEfecto(efectos.swap);
                for(let j=0;j<this.enemigosDestructores.length;j++){
                    this.enemigosDestructores[j].vx *=-1;
                    this.enemigosDestructores[j].cambiarSentidoAnimacion();
                }

                this.cambiosSentido.splice(i,1);
                i = i-1;
            }
        }
        for (let i=0; i < this.bombas.length; i++){
            if ( this.bombas[i] != null && this.jugador.colisiona(this.bombas[i])) {
                reproducirEfecto(efectos.explosion);
                for (var j=0; j < this.enemigosDestructores.length; j++){
                    if(this.enemigosDestructores[j].estaEnPantalla()){
                        this.enemigosDestructores[j].explotado();
                    }
                }
                this.bombas.splice(i, 1);
                i = i-1;
            }
        }
        for (let i=0; i < this.enemigosDestructores.length; i++){
            if ( this.enemigosDestructores[i] != null &&
                this.enemigosDestructores[i].estado == estados.muerto ) {
                this.enemigosDestructores.splice(i, 1);
                i = i-1;
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
        for (let i=0; i < this.oilPuddles.length; i++){
            this.oilPuddles[i].dibujar(this.scrollX);
        }
        this.jugador.dibujar(this.scrollX);
        for (let i=0; i < this.enemigosDestructores.length; i++){
            this.enemigosDestructores[i].dibujar(this.scrollX);
        }
        for (let i=0; i < this.vidasExtra.length; i++){
            this.vidasExtra[i].dibujar(this.scrollX);
        }
        for (let i=0; i < this.latas.length; i++){
            this.latas[i].dibujar(this.scrollX);
        }
        for (let i=0; i < this.bombas.length; i++){
            this.bombas[i].dibujar(this.scrollX);
        }
        for (let i=0;i<this.cambiosSentido.length;i++){
            this.cambiosSentido[i].dibujar(this.scrollX);
        }
        for (let i=0;i<this.pinchos.length;i++){
            this.pinchos[i].dibujar(this.scrollX);
        }
        //HUD
        this.fondoVidas.dibujar();
        this.fondoPuntos.dibujar();
        this.vidas.dibujar();
        this.puntos.dibujar();
        this.marcadorNivel.dibujar();
        if ( !this.pausa && entrada == entradas.pulsaciones) {
            this.botonArriba.dibujar();
            this.botonAbajo.dibujar();
        }
        if(this.pausa){
            this.mensaje.dibujar();
        }


    }

    procesarControles() {
        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }

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
                this.enemigosDestructores.push(enemigo);
                break;
            case "M":
                this.meta = new ElementoEstatico(imagenes.meta, x,y);
                //this.meta.y = this.meta.y - this.meta.alto/2;
                break;
            case "O":
                var oilPuddle = new ElementoEstatico(imagenes.aceite,x,y);
                oilPuddle.y = oilPuddle.y - oilPuddle.alto/2;
                this.oilPuddles.push(oilPuddle);
                break
            case "D":
                var enemigoDiagonal = new EnemigoDiagonal(x,y);
                enemigoDiagonal.y = enemigoDiagonal.y - enemigoDiagonal.alto/2;
                this.enemigosDestructores.push(enemigoDiagonal);
                break;
            case "V":
                var vidaExtra = new ElementoEstatico(imagenes.corazon,x,y);
                vidaExtra.y = vidaExtra.y - vidaExtra.alto/2;
                this.vidasExtra.push(vidaExtra);
                break;
            case "A":
                var animal = new EnemigoAnimal(x,y);
                animal.y = animal.y - animal.alto/2;
                this.enemigosDestructores.push(animal);
                break;
            case "B":
                var bomba = new ElementoEstatico(imagenes.bomba,x,y);
                bomba.y = bomba.y - bomba.alto/2;
                this.bombas.push(bomba);
                break;
            case "L":
                var lata = new ElementoEstatico(imagenes.lata,x,y);
                lata.y = lata.y - lata.alto/2;
                this.latas.push(lata);
                break;
            case "S":
                var cambioSentido = new ElementoEstatico(imagenes.cambio_sentido,x,y);
                cambioSentido.y = cambioSentido.y - cambioSentido.alto/2;
                this.cambiosSentido.push(cambioSentido);
                break;
            case "P":
                var pincho = new ElementoEstatico(imagenes.pincho,x,y);
                pincho.y = pincho.y - pincho.alto/2;
                this.pinchos.push(pincho);
                break;
        }
    }
    calcularPulsaciones(pulsaciones){
        // Suponemos botones no estan pulsados
        this.botonArriba.pulsado = false;
        this.botonAbajo.pulsado = false;
        // Suponemos a false
        controles.continuar = false;


        for(var i=0; i < pulsaciones.length; i++){
            // MUY SIMPLE SIN BOTON cualquier click en pantalla lo activa
            if(pulsaciones[i].tipo == tipoPulsacion.inicio){
                controles.continuar = true;
            }

            if (this.botonArriba.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonArriba.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = 1;
                }
            }

            if (this.botonAbajo.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonAbajo.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = -1;
                }
            }

        }
        if ( !this.botonAbajo.pulsado && !this.botonArriba.pulsado ){
            controles.moverY = 0;
        }


    }




}
