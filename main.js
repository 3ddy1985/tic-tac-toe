console.log('js connected')

class gameGrid {
    constructor() {
        this.cells = [];
        for(let i = 0; i < 9; i++) {
            this.cells.push(new gameCell())
        }
    }
    boardCode() {
        return `<div class="row players">
                    <div id="player-1">Player X</div>
                    <div id="player-2">Player O</div>
                    
                    <table class="tic-tac">
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