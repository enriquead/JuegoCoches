var musicaAmbiente = new Audio("res/level1.mp3");
musicaAmbiente.loop = true;

var efectos = {
    explosion : "res/explosion.mp3",
    resbalar : "res/Reverse_Sine_Modulated.wav",
    goal : "res/goal.mp3",
    pinchazo: "res/pinchazo.mp3",
    swap: "res/swap.wav",
    lata: "res/lata+1.wav",
    vida: "res/vidaExtra.wav"
    }


function reproducirMusica() {
   // musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}

