# Tic Tac Toe


### Description 
This is a simple Tic Tac Toe game built with HTML, CSS, and JavaScript. The game allows two players to take turns marking spaces on a 3x3 grid with their respective symbols (X or O). The objective of the game is for a player to get three of their symbols in a row (horizontally, vertically, or diagonally) before their opponent does.
<br>
<br>
### Deployment Link
The deployed project can be found at https://3ddy1985.github.io/tic-tac-toe/
<br>
<br>
### Getting Started/Code Installation
To access the code, you can either download the project from the GitHub repository or clone it using the following command:

```
git clone https://github.com/3ddy1985/tic-tac-toe.git
```
<br>
<br>
### Timeframe & Working Team
This was an individual project that was completed within a timeframe of 6 days.
<br>
<br>
### Technologies Used
* HTML
* CSS
* JavaScript
<br>
<br>
### Brief
The brief for this project was to create a simple Tic Tac Toe game using HTML, CSS, and JavaScript. The game should allow two players to take turns marking spaces on a 3x3 grid with their respective symbols (X or O). The game should also display a message when a player wins or when the game ends in a tie.
<br>
<br>
### Planning
Before starting the project, I created a wireframe of the game board and planned out the game logic using pseudocode. I also allocated specific tasks to each day to ensure I met the deadline.
<br>
<br>
### Build/Code Process
The game logic was implemented using JavaScript, with functions for checking for a winner, checking for a tie, and switching turns between the players. The game board was created using HTML and styled using CSS.
<br>
<br>
Some of the code snippets I'm particularly proud of include:

1. Function for checking for a winner:

```javascript
function checkWin(player) {
  for (let i = 0; i < winCombos.length; i++) {
    let combo = winCombos[i];
    let count = 0;
    for (let j = 0; j < combo.length; j++) {
      if (board[combo[j]] === player) {
        count++;
      }
    }
    if (count === 3) {
      return true;
    }
  }
  return false;
}
```
This function loops through an array of winning combinations and checks if the specified player has marked all three spaces in any of those combinations.  

2. Event listener for marking spaces on the game board:
```javascript
function handleMove(e) {
  let index = parseInt(e.target.dataset.index);
  if (board[index] === '') {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      endGame(false);
    } else if (board.every((space) => space !== '')) {
      endGame(true);
    } else {
      switchTurn();
      setBoard();
    }
  }
}
```
This event listener handles the player's move by marking the selected space on the game board with the current player's symbol, checking if the game has ended in a win or tie, and switching turns if necessary.

3. Classes for generating the game board:
```javascript
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
```
The GameGrid class generates the game board by creating an array of GameCell instances and using them to populate a table in HTML. The GameCell class generates the HTML for each individual cell on the game board
<br>
<br>
### Challenges:
One of the biggest challenges I encountered was getting the game to recognize when a player had won. It took some trial and error to figure out the most efficient way to check for a winner using an array of winning combinations.
<br>
<br>
### Wins:
I'm proud of how the game turned out overall. I think the user interface is clean and simple, and the game logic works well. I'm also proud of the code snippets I highlighted earlier, as I think they demonstrate my understanding of JavaScript and programming logic.
<br>
<br>
### Key Learnings/Takeaways:
Through building this project, I learned more about working with JavaScript functions and arrays. I also gained more experience with event listeners and manipulating the DOM with JavaScript. Additionally, I learned about the importance of planning and pseudocode in the development process.
<br>
<br>
### Bugs:
I did not encounter any bugs in this project.
<br>
<br>
### Future Improvements:
One potential improvement for this project would be to add a score tracker for multiple rounds of the game. Another improvement could be to add a computer player for a single-player mode. Overall, I'm happy with the current functionality of the game, but there is always room for improvement and expansion.

