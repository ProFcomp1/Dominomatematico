// Criação do tabuleiro e das peças
const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');

let dominoes = [
    { operation: "3 + 2", result: 5 },
    { operation: "4 x 2", result: 8 },
    { operation: "6 / 2", result: 3 },
    { operation: "10 - 7", result: 3 },
    { operation: "5 + 5", result: 10 },
    { operation: "8 / 4", result: 2 },
    { operation: "7 x 1", result: 7 },
    { operation: "9 - 3", result: 6 }
];

let selectedDomino = null;
let correctMatches = 0;

// Função para desenhar as peças do dominó no tabuleiro
function drawDominoes() {
    gameBoard.innerHTML = '';
    dominoes.forEach((domino, index) => {
        const dominoElement = document.createElement('div');
        dominoElement.classList.add('domino');
        dominoElement.innerHTML = `<span>${domino.operation}</span> <span>${domino.result}</span>`;
        dominoElement.setAttribute('data-index', index);
        dominoElement.addEventListener('click', selectDomino);
        gameBoard.appendChild(dominoElement);
    });
}

// Função para selecionar uma peça do dominó
function selectDomino(e) {
    const index = e.currentTarget.getAttribute('data-index');
    if (selectedDomino === null) {
        selectedDomino = index;
        e.currentTarget.style.backgroundColor = 'lightgreen';
    } else {
        if (selectedDomino === index) {
            message.textContent = "Você já selecionou essa peça.";
        } else {
            checkMatch(selectedDomino, index);
            selectedDomino = null;
        }
        drawDominoes();
    }
}

// Verifica se as peças combinam (se o resultado de uma operação é igual ao número de outra peça)
function checkMatch(index1, index2) {
    const domino1 = dominoes[index1];
    const domino2 = dominoes[index2];

    if (domino1.result === parseInt(domino2.operation.split(' ')[0]) || domino2.result === parseInt(domino1.operation.split(' ')[0])) {
        message.textContent = "Combinação correta!";
        correctMatches++;
        dominoes.splice(index1, 1);  // Remove a peça combinada
        dominoes.splice(index2 > index1 ? index2 - 1 : index2, 1);  // Remove a outra peça combinada
    } else {
        message.textContent = "Combinação incorreta!";
    }

    if (dominoes.length === 0) {
        message.textContent = `Parabéns! Você completou o jogo com ${correctMatches} combinações corretas.`;
    }
}

// Inicializa o jogo
drawDominoes();

