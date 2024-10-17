const palabrasConPistas = [
    { palabra: 'JAVASCRIPT', pista: 'Lenguaje de programación para la web' },
    { palabra: 'MENTIROSOS', pista: 'Le piden código a la IA y dicen que ellos lo escribieron' },
    { palabra: 'HTML', pista: 'Lenguaje de marcado para la creación de sitios web' },
    { palabra: 'PROGRAMACION', pista: 'Actividad de escribir instrucciones para computadoras' },
    { palabra: 'PIOPIO', pista: 'Sonido que hacen los pollitos' },
    { palabra: 'BACKEND', pista: 'Parte del desarrollo web que no es visible para el usuario' },
    { palabra: 'FRONTEND', pista: 'Parte visible de una aplicación web que interactúa con el usuario' }
];

const wordDisplay = document.getElementById('word');
const hintDisplay = document.getElementById('hint'); 
const lettersContainer = document.getElementById('letters');
const message = document.getElementById('message');
const livesCounter = document.getElementById('lives-counter');
const hangmanDrawing = document.getElementById('hangman-drawing');

let palabraSeleccionada = '';
let pistaSeleccionada = ''; 
let vidas = 3;
let letrasCorrectas = [];
let letrasIncorrectas = [];
let intentos = 0;
let juegoTerminado = false;

function crearMuñeco() {
    const part1 = document.createElement('img');
    part1.src = 'images/parte1.png';
    part1.classList.add('hangman-part', 'part1');
    
    const part2 = document.createElement('img');
    part2.src = 'images/parte2.png';
    part2.classList.add('hangman-part', 'part2');
    
    const part3 = document.createElement('img');
    part3.src = 'images/parte3.png';
    part3.classList.add('hangman-part', 'part3');
    
    hangmanDrawing.appendChild(part1);
    hangmanDrawing.appendChild(part2);
    hangmanDrawing.appendChild(part3);
}

function seleccionarPalabra() {
    const randomIndex = Math.floor(Math.random() * palabrasConPistas.length);
    palabraSeleccionada = palabrasConPistas[randomIndex].palabra;
    pistaSeleccionada = palabrasConPistas[randomIndex].pista;
    letrasCorrectas = Array(palabraSeleccionada.length).fill('_');
    mostrarPalabra();
    mostrarPista();
}

function mostrarPalabra() {
    wordDisplay.innerHTML = letrasCorrectas.join('&nbsp;');
}

function mostrarPista() {
    hintDisplay.innerText = 'Pista: ' + pistaSeleccionada;
}

function crearBotonesLetras() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let letra of letras) {
        const button = document.createElement('button');
        button.innerText = letra;
        button.addEventListener('click', () => manejarIntento(letra, button));
        lettersContainer.appendChild(button);
    }
}

function manejarIntento(letra, button) {
    if (juegoTerminado) return;

    if (palabraSeleccionada.includes(letra)) {
        button.classList.add('green');
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (palabraSeleccionada[i] === letra) {
                letrasCorrectas[i] = letra;
            }
        }
        mostrarPalabra();
        verificarVictoria();
    } else {
        button.classList.add('red');
        intentos++;
        vidas--;
        actualizarVidas();
        mostrarParteMuñeco();
        
        if (vidas === 0) {
            mensajeFinal('¡Perdiste! La palabra era ' + palabraSeleccionada);
            juegoTerminado = true;
        }
    }
    button.disabled = true;
}

function actualizarVidas() {
    livesCounter.innerText = vidas;
}

function mostrarParteMuñeco() {
    const parts = document.getElementsByClassName('hangman-part');
    if (intentos === 1) {
        parts[0].style.display = 'block';
    } else if (intentos === 2) {
        parts[1].style.display = 'block';
    } else if (intentos === 3) {
        parts[2].style.display = 'block';
    }
}

function verificarVictoria() {
    if (!letrasCorrectas.includes('_')) {
        juegoTerminado = true;

        hangmanDrawing.innerHTML = '';
        document.body.style.backgroundImage = 'url("images/globos-confeti.png")';
        document.body.style.backgroundSize = 'cover';

        const imgVictoria = document.createElement('img');
        imgVictoria.src = 'images/victoria.png';
        imgVictoria.alt = 'Pollito programador feliz';
        imgVictoria.classList.add('img-fluid');
        lettersContainer.innerHTML = '';
        lettersContainer.appendChild(imgVictoria);
    }
}

function mensajeFinal(texto) {
    lettersContainer.innerHTML = '';
    hangmanDrawing.innerHTML = '';

    if (texto.includes('¡Perdiste!')) {
        const imgDerrota = document.createElement('img');
        imgDerrota.src = 'images/pollito-ahorcado.png';
        imgDerrota.alt = 'Pollito ahorcado completo';
        imgDerrota.classList.add('img-fluid');
        hangmanDrawing.appendChild(imgDerrota);
        message.innerText = texto;

        const btnReinicio = document.createElement('button');
        btnReinicio.innerText = 'Reiniciar juego';
        btnReinicio.classList.add('btn', 'btn-primary', 'mt-3');
        btnReinicio.addEventListener('click', () => location.reload());
        lettersContainer.appendChild(btnReinicio);
    }
}

crearMuñeco();
seleccionarPalabra();
crearBotonesLetras();
