var musicaAmbiente = new Audio("res/level1.mp3");
musicaAmbiente.loop = true;

var efectos = {
    explosion : "res/explosion.mp3",
    resbalar : "res/Reverse_Sine_Modulated.wav",
    goal : "res/goal.mp3"
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

