const startGame = document.getElementById('new-game');
const gameArea = document.getElementById('game-area')
const gameDiv = gameArea.querySelector('div')
const activePlayer = function() {
    let getPlayer = document.getElementById('player-1')
    if(getPlayer.classList.contains('player-active')) {
        return 'player-1';
    } else {
        return 'player-2';
    }
}

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

class GameGrid {
    constructor() {
        this.cells = [];
        for(let i = 0; i < 9; i++) {
            this.cells.push(new GameCell())
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

class GameCell {
    constructor() {
        this.value = '';
    }
    cellContent() {
        return `<button id="" class="cell">${this.value}</button>`
    }
}

const activePlayerTurn = function() {
    let player = activePlayer();
    const currentGame = document.querySelector('table');
    const getRows = currentGame.querySelectorAll('tr');
    const player1 = document.getElementById('player-1');
    const player2 = document.getElementById('player-2');
    const currentGrid = [];
    for (let i = 0; i < getRows.length; i++) {
      const getCells = getRows[i].getElementsByTagName('td');
      const row = [];
      for (let j = 0; j < getCells.length; j++) {
        let value = getCells[j].querySelector('button').textContent;
        if(player === 'player-1') {
            player1.classList.toggle('player-active');
            player2.classList.toggle('player-active');
            if(value === '' || value === 'O') {
            value = null
        } else if(value === 'X') {
            value = 'X'
        }
        row.push(value);
        } else {
            player2.classList.toggle('player-active');
            player1.classList.toggle('player-active');
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
}

const checkForWin = function() {
    const currentGrid = activePlayerTurn()
    for(let i = 0; i < wins.win.length; i++) {
        if(JSON.stringify(currentGrid) === JSON.stringify(wins.win[i])) {
            return true;
        }
    }
    return false;
}

startGame.addEventListener('click', event => {
    event.preventDefault()
    const grid = new GameGrid();
    const html = grid.boardCode();
    gameDiv.innerHTML = html;
})

function cellClicks(activePlayer) {
    if(event.target.matches('.cell')) {
        const cellClicked = event.target;
        cellClicked.innerHTML = activePlayer;
        cellClicked.setAttribute("id", activePlayer);
        const result = checkForWin();
        if(result === true) {
            console.log(`${activePlayer} wins!`)
        } else {
            cellClicked.disabled = true;
        }
    }
}

gameArea.addEventListener('click', event => {
    event.preventDefault()
    if(activePlayer() === 'player-1') {
        cellClicks('X')
    } else {
        cellClicks('O')
    }
})

