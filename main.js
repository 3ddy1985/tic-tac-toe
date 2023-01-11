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
 const wins = {
    win: [
        [
            ['X', 'X', 'X'],
            [null, null, null],
            [null, null, null]
        ], [
            [null, null, null],
            ['X', 'X', 'X'],
            [null, null, null]
        ], [
            [null, null, null],
            [null, null, null],
            ['X', 'X', 'X']
        ], [
            ['X', null, null],
            ['X', null, null],
            ['X', null, null]
        ], [
            [null, 'X', null],
            [null, 'X', null],
            [null, 'X', null]
        ],  [
            [null, null, 'X'],
            [null, null, 'X'],
            [null, null, 'X']
        ], [
            ['X', null, null],
            [null, 'X', null],
            [null, null, 'X']
        ], [
            [null, null, 'X'],
            [null, 'X', null],
            ['X', null, null]
        ]
    ]
 };



class GameGrid {
    constructor() {
        this.cells = [];
        for(let i = 0; i < 9; i++) {
            this.cells.push(new GameCell())
        }
    }
    boardCode() {
        return ` 
                <table id="tic-tac">
                    <tr>
                        <td id="cell-1" class="game-td">${this.cells[0].cellContent()}</td>
                        <td id="cell-2" class="game-td">${this.cells[1].cellContent()}</td>
                        <td id="cell-3" class="game-td">${this.cells[2].cellContent()}</td>
                    </tr>
                    <tr>
                        <td id="cell-4" class="game-td">${this.cells[3].cellContent()}</td>
                        <td id="cell-5" class="game-td">${this.cells[4].cellContent()}</td>
                        <td id="cell-6" class="game-td">${this.cells[5].cellContent()}</td>
                    </tr>
                    <tr>
                        <td id="cell-7" class="game-td">${this.cells[6].cellContent()}</td>
                        <td id="cell-8" class="game-td">${this.cells[7].cellContent()}</td>
                        <td id="cell-9" class="game-td">${this.cells[8].cellContent()}</td>
                    </tr>
                </table>`
    }
};

class GameCell {
    constructor() {
        this.value = '';
    }
    cellContent() {
        return `<button id="" class="cell">${this.value}</button>`
    }
};

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
        if(player === 'player-1') {
            if(value === '' || value === 'O') {
            value = null
        } else if(value === 'X') {
            value = 'X'
        }
        row.push(value);
        } else {
            if(value === '' || value === 'X') {
            value = null
        } else if(value === 'O') {
            value = 'X'
        }
        row.push(value);
        }
      }
      currentGrid.push(row);
    }
    return currentGrid;
};

const checkForWin = function() {
    const currentGrid = activePlayerTurn()
    for(let i = 0; i < wins.win.length; i++) {
        if(JSON.stringify(currentGrid) === JSON.stringify(wins.win[i])) {
            return true;
        }
    }
    return false;
};


function updateScoreBoard() {
    let currentPlayer = activePlayer();
    let player1Results = document.getElementById('player-1-results');
    let player2Results = document.getElementById('player-2-results');
    let isAWin = checkForWin();
    if(isAWin === true) {
        if(currentPlayer === 'player-1') {
            player1Score++;
            player1Results.textContent = player1Score;
        } else {
            player2Score++;
            player2Results.textContent = player2Score;
        }
    }
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
            console.log(`${activePlayer} wins!`)
            updateScoreBoard()
            showWinMessage()
            player1.classList.toggle('player-active');
            player2.classList.toggle('player-active');
        } else {
            cellClicked.disabled = true;
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

const resetLocalStorage = document.getElementById("reset-button")
resetLocalStorage.addEventListener("click", event => {
    event.preventDefault()
    localStorage.removeItem("bodyHTML")
    location.reload()
});

const closeWinMessage = document.getElementById('close-button');
closeWinMessage.addEventListener('click', event => {
    event.preventDefault()
    const winMessageBox = document.getElementById('win-message-box');
    const winMessage = document.getElementById('win-message');
    winMessageBox.classList.remove('border-animation');
    winMessageBox.classList.add('hidden');
    winMessage.classList.remove('win-text-animation');
})






saveData.addEventListener("unload", event => {
    event.preventDefault()
    PSM.save()
})




