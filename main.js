console.log('js connected')

const startGame = document.getElementById('new-game');
const gameArea = document.getElementById('game-area')
const gameDiv = gameArea.querySelector('div')

//  const wins = {
//     win: [
//         [
//             [x, x, x],
//             [0, 0, 0],
//             [0, 0, 0]
//         ], [
//             [0, 0, 0],
//             [x, x, x],
//             [0, 0, 0]
//         ], [
//             [0, 0, 0],
//             [0, 0, 0],
//             [x, x, x]
//         ], [
//             [x, 0, 0],
//             [x, 0, 0],
//             [x, 0, 0]
//         ], [
//             [0, x, 0],
//             [0, x, 0],
//             [0, x, 0]
//         ],  [
//             [0, 0, x],
//             [0, 0, x],
//             [0, 0, x]
//         ], [
//             [x, 0, 0],
//             [0, x, 0],
//             [0, 0, x]
//         ], [
//             [0, 0, x],
//             [0, x, 0],
//             [x, 0, 0]
//         ]
//     ]
//  }


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
                    <div id="player-2">Player O</div>
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
        return `<button class="cell">${this.value}</button>`
    }
}

function checkWins() {
    const currentGame = document.querySelector('table');
    const getRows = currentGame.querySelectorAll('tr');
        const currentGrid = {
        grid: []
    };
    for(let i = 0; i < getRows.length; i++) {
        const getCells = getRows[i].getElementsByTagName('td');
        const row = [];
        for(let j = 0; j < getCells.length; j++) {
            // const value = getCells[j].getAttribute('id');
            const value = getCells[j].innerHTML;
            row.push(value);
        }
        currentGrid.grid.push(row)
    }
    console.log(currentGrid)
}

startGame.addEventListener('click', event => {
    event.preventDefault()

    const grid = new gameGrid();
    const html = grid.boardCode();

    gameDiv.innerHTML = html;

    const activeTicTacToe = document.getElementById('tic-tac');

    activeTicTacToe.addEventListener('click', event => {
       
        
        if(event.target.matches('.cell')) {

            const cellClicked = event.target;
            cellClicked.innerHTML = 'X'
        }
        
    })
})


