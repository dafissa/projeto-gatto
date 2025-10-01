const cellElements = document.querySelectorAll("[data-cell]"); /* Ele vai selecionar todas as divs do HTML */
const board = document.querySelector("[data-board]"); /* Vai procurar o elemnto do data-board */
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
); /* Seleciona o texto da mensagem de vitória/empate. */
const winningMessage = document.querySelector("[data-winning-message]"); /* Seleciona a mensagem de vítoria */
const restartButton = document.querySelector("[data-restart-button]"); /* Seleciona o botão de reiniciar */

let isCircleTurn; /* Seleciona de quem é a vez, se for false, vai ser X, se for true, vai ser O */

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; /* As possibilidades de vítorias */

/* Função que inicia e reinicia */
const startGame = () => {
  isCircleTurn = false; /* Sempre começa com X */

  /* Limpa todas as células e coloca o evento de clique e cada célula só pode ser clicada uma vez */
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass(); /* Atualiza o X e O a cada partida*/
  winningMessage.classList.remove("show-winning-message"); /* Esconde a tela de vítoria */
};

/* Função que finaliza o jogo */
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Venceu!"
      : "X Venceu!";
  } /* Mostra a mensagem final, de empate e vítoria */

  winningMessage.classList.add("show-winning-message"); /* Faz a tela de vítoria aparecer */
};


const checkForWin = (currentPlayer) => { /* Verifica se o jogador ganhou */
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}; /* Testa se alguma combinação está toda preenchida com X ou O. */

const checkForDraw = () => { /* Função que verifica empate. */
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}; /* Vê se todas as células estão ocupadas */

/*Coloca X ou O na célula clicada.*/ 
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

/* Limpa o hover do tabuleiro */
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  /* Mostra no tabuleiro de quem é a vez, X ou O */
  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

/*Muda entre X e O e atualiza o hover */
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

/* Função que acontece quando uma célula é clicada */
const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  /* Descobre qual célula foi clicada e qual símbolo deve ser colocado */

  placeMark(cell, classToAdd); /* Coloca o símbolo (X ou O) */

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

startGame(); /* Faz o jogo começar quando a página carrega */

restartButton.addEventListener("click", startGame); /* Quando clicar no botão de reiniciar, o jogo começa de novo */