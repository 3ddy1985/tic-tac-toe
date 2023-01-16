const body = document.querySelector("body");
body.addEventListener("DOMSubtreeModified", function(){
  localStorage.setItem("bodyHTML", body.innerHTML);
});
if(localStorage.getItem("bodyHTML")) {
  body.innerHTML = localStorage.getItem("bodyHTML");
}
const startGame = document.getElementById('new-game'); 
const gameArea = document.getElementById('game-area');
let player1Score = 0;
let player2Score = 0;
const activePlayer = function() {
    let getPlayer = document.getElementById('player-1')
    if(getPlayer.classList.contains('player-active')) {
        return 'player-1';
    } else {
        return 'player-2';
    }
};

class GameGrid {
    constructor() {
        this.cells = [];
        for(let i = 0; i < 9; i++) {
            this.cells.push(new GameCell())
        }
    }
    boardCode() {
        let table = '<tr>';
        for(let i = 0; i < 9; i++) {
            let col = i % 3;
            table += `<td id="cell-${i+1}" class="game-td">${this.cells[i].cellContent(i)}</td>`;
            if (col === 2) {
                table += '</tr><tr>';
            }
        }
        table += '</tr>';
        return `<table id="tic-tac">${table}</table>`;
    }
};

class GameCell {
    constructor() {
        this.value = '';
    }
    cellContent(index) {
        return `<button id="cell-${index+1}" class="cell">${this.value}</button>`
    }
};

const newGame = function(){
    turnsPlayed = 0;
    gameOver = false;
    const cells = document.getElementsByClassName("cell");
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
    }
    document.getElementById('player-1').classList.add("player-active");
    document.getElementById('player-2').classList.remove("player-active");
}

const activePlayerTurn = function() {
    let player = activePlayer();
    const currentGame = document.querySelector('table');
    const getRows = currentGame.querySelectorAll('tr');
    const currentGrid = [];
    for (let i = 0; i < getRows.length; i++) {
        const getCells = getRows[i].getElementsByTagName('td');
        const row = [];
        for (let j = 0; j < getCells.length; j++) {
          let value = getCells[j].querySelector('button').textContent;
          if(player === 'player-1' || player === 'player-2') {
              if(value === '') {
              value = ''
          } else if(value === 'O') {
              value = 'O'
          } else if(value === 'X') {
              value = 'X'
          }
          row.push(value);
          }
        }
        for (let j = 0; j < getCells.length; j++) {
          const cell = document.getElementById(`cell-${j+1}`);
          cell.addEventListener("click", function(){
              if(cell.innerHTML === ''){
                  if(player === 'player-1'){
                      cell.innerHTML = 'X';
                      player = 'player-2';
                      document.getElementById('player-1').classList.remove("player-active");
                      document.getElementById('player-2').classList.add("player-active");
                  }else{
                      cell.innerHTML = 'O';
                      player = 'player-1';
                      document.getElementById('player-2').classList.remove("player-active");
                      document.getElementById('player-1').classList.add("player-active");
                  }
                  turnsPlayed++;
                  if(turnsPlayed > 4){
                      if(checkForWin()){
                          updateScoreBoard();
                          alert("Player "+ activePlayer()+ " Won");
                          newGame();
                      }else if(checkForDraw()){
                          alert("Its a Draw");
                          newGame();
                      }
                  }
              }
          });
        } 
      currentGrid.push(row);
    }
    return currentGrid;
};

let turnsPlayed = 0;
let gameOver = false;

const checkForWin = function() {
        const currentBoard = activePlayerTurn();
        for (let i = 0; i < 3; i++) {
            let count = 0;
            for (let j = 1; j < 3; j++) {
                if (currentBoard[i][j] === currentBoard[i][j-1] && currentBoard[i][j-1] !== '') {
                    count++;
                }
            }
            if (count === 2) {
                gameOver = true;
                updateScoreBoard();
                alert("Player "+ activePlayer()+ " Won");
                newGame();
                return true;
            }
        }
         for (let i = 0; i < 3; i++) {
            let count = 0;
            for (let j = 1; j < 3; j++) {
                if (currentBoard[j][i] === currentBoard[j-1][i] && currentBoard[j-1][i] !== '') {
                    count++;
                }
            }
            if (count === 2) {
                gameOver = true;
                return true;
            }
        }
        if (currentBoard[0][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][2] && currentBoard[1][1] !== '') {
            gameOver = true;
            return true;
        }

        if (currentBoard[0][2] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][0] && currentBoard[1][1] !== '') {
            gameOver = true;
            return true;
        }
    
    return false;
};

const checkForDraw = function(){
    if(turnsPlayed === 9){
        const winMessageBox = document.getElementById('win-message-box');
        const winMessage = document.getElementById('win-message')
        winMessageBox.classList.remove('hidden')
        winMessageBox.classList.add('border-animation')
        winMessage.classList.add('win-text-animation')
        winMessage.innerText = `It's a draw!`
        turnsPlayed = 0
      return true;
    }
    return false;
  }

startGame.addEventListener('click', event => {
    event.preventDefault()
    const grid = new GameGrid();
    const html = grid.boardCode();
    gameArea.innerHTML = html;
});

function showWinMessage() {
    const winMessageBox = document.getElementById('win-message-box');
    const winMessage = document.getElementById('win-message')
    const currentPlayer = activePlayer();
    winMessageBox.classList.remove('hidden')
    winMessageBox.classList.add('border-animation')
    winMessage.classList.add('win-text-animation')
    if(currentPlayer === 'player-1') {
    winMessage.innerText = `player X won this round!`
    } else {
    winMessage.innerText = `Player O won this round!`
    }
}

function cellClicks(activePlayer) {
    const player1 = document.getElementById('player-1');
    const player2 = document.getElementById('player-2');
    if(event.target.matches('.cell')) {
        const cellClicked = event.target;
        cellClicked.innerHTML = activePlayer;
        cellClicked.setAttribute("id", activePlayer);
        const result = checkForWin();
        if(result === true) {
            cellClicked.disabled = true;
            turnsPlayed = 0
            console.log(`${activePlayer} wins!`)
            // updateScoreBoard()
            showWinMessage()
            player1.classList.toggle('player-active');
            player2.classList.toggle('player-active');
        } else {
            cellClicked.disabled = true;
            turnsPlayed++
            checkForDraw()
            player2.classList.toggle('player-active');
            player1.classList.toggle('player-active');
        }
    }
};

gameArea.addEventListener('click', event => {
    event.preventDefault()
    if(activePlayer() === 'player-1') {
        cellClicks('X')
    } else {
        cellClicks('O')
    }
});

const closeWinMessage = document.getElementById('close-button');
closeWinMessage.addEventListener('click', event => {
    event.preventDefault()
    const winMessageBox = document.getElementById('win-message-box');
    const winMessage = document.getElementById('win-message');
    winMessageBox.classList.remove('border-animation');
    winMessageBox.classList.add('hidden');
    winMessage.classList.remove('win-text-animation');
    startGame.click()
})

const resetLocalStorage = document.getElementById("reset-button")
resetLocalStorage.addEventListener("click", event => {
    event.preventDefault()
    localStorage.removeItem("bodyHTML")
    location.reload()
});







