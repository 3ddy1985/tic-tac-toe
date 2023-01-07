const startGame = document.getElementById('new-game');
const gameArea = document.getElementById('game-area')
const gameDiv = gameArea.querySelector('div')

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
 }


class gameGrid {
    constructor() {
        this.cells = [];
        for(let i = 0; i < 9; i++) {
            this.cells.push(new gameCell())
        }
    }
    boardCode() {
        return `<div class="players">
                    <div id="player-1" class="player-active">Player X</div>
                    <div id="player-2" class="">Player O</div>
                </dv>    
                <table id="tic-tac">
                    <tr>
                        <td id="cell-1">${this.cells[0].cellContent()}</td>
                        <td id="cell-2">${this.cells[1].cellContent()}</td>
                        <td id="cell-3">${this.cells[2].cellContent()}</td>
                    </tr>
                    <tr>
                        <td id="cell-4">${this.cells[3].cellContent()}</td>
                        <td id="cell-5">${this.cells[4].cellContent()}</td>
                        <td id="cell-6">${this.cells[5].cellContent()}</td>
                    </tr>
                    <tr>
                        <td id="cell-7">${this.cells[6].cellContent()}</td>
                        <td id="cell-8">${this.cells[7].cellContent()}</td>
                        <td id="cell-9">${this.cells[8].cellContent()}</td>
                    </tr>
                </table>`
    }
}

class gameCell {
    constructor() {
        this.value = '';
    }
    cellContent() {
        return `<button id="" class="cell">${this.value}</button>`
    }
}

function curGridPlayer1() {
    // Get the current state of the game grid
    const currentGame = document.querySelector('table');
    const getRows = currentGame.querySelectorAll('tr');
    const currentGrid = [];
    for (let i = 0; i < getRows.length; i++) {
      const getCells = getRows[i].getElementsByTagName('td');
      const row = [];
      for (let j = 0; j < getCells.length; j++) {
        // Extract the cell value from the HTML code
        let value = getCells[j].querySelector('button').textContent;
        if(value === '' || value === 'O') {
            value = null;
        } else if(value === 'X') {
            value = 'X'
        }
        row.push(value);
      }
      currentGrid.push(row);
    }
    return currentGrid;
  }

  function curGridPlayer2() {
    // Get the current state of the game grid
    const currentGame = document.querySelector('table');
    const getRows = currentGame.querySelectorAll('tr');
    const currentGrid = [];
    for (let i = 0; i < getRows.length; i++) {
      const getCells = getRows[i].getElementsByTagName('td');
      const row = [];
      for (let j = 0; j < getCells.length; j++) {
        // Extract the cell value from the HTML code
        let value = getCells[j].querySelector('button').textContent;
        if(value === '' || value === 'X') {
            value = null
        } else if(value === 'O') {
            value === 'X'
        }
        row.push(value);
      }
      currentGrid.push(row);
    }
    return currentGrid;
  }

function checkForWinPlayer1() {
    const currentGrid = curGridPlayer1();
  for (let i = 0; i < wins.win.length; i++) {
    if (JSON.stringify(currentGrid) === JSON.stringify(wins.win[i])) {
      return true;
    }
  }
  return false;
}

function checkForWinPlayer2() {
    const currentGrid = curGridPlayer2();
  for (let i = 0; i < wins.win.length; i++) {
    if (JSON.stringify(currentGrid) === JSON.stringify(wins.win[i])) {
      return true;
    }
  }
  return false;
}

function switchPlayer() {
    const player1 = document.getElementById('player-1')
    const player2 = document.getElementById('player-2')
    player1.classList.toggle("player-active")
    player2.classList.toggle("player-active")
}

startGame.addEventListener('click', event => {
    event.preventDefault()
    const grid = new gameGrid();
    const html = grid.boardCode();
    gameDiv.innerHTML = html;
    const activeTicTacToe = document.getElementById('tic-tac');
    activeTicTacToe.addEventListener('click', event => {
        const player1 = document.getElementById('player-1')
        const player2 = document.getElementById('player-2')
            
            if(player1.classList.value === "player-active") {
                if(event.target.matches('.cell')) {
                    const cellClicked = event.target;
                    cellClicked.innerHTML = 'X';
                    cellClicked.setAttribute("id", "x");
                    const result = checkForWinPlayer1()
                    if(result === true) {
                        console.log('player 1 wins')
                    } else {
                        switchPlayer()
                        cellClicked.disabled = true;
                    }
                }
            } else if(player2.classList.value === "player-active") {
                if(event.target.matches('.cell')) {
                    const cellClicked = event.target;
                    cellClicked.innerHTML = 'O';
                    cellClicked.setAttribute("id", "xx");
                    const result = checkForWinPlayer2();
                    if(result === true) {
                        console.log('player 2 wins')
                    } else {
                        switchPlayer()
                        cellClicked.disabled = true;
                    }
                }
            }
    })
})


