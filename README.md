# Project 1 - Tic Tac Toe

### Description
This is a simple Tic Tac Toe game built with HTML, CSS, and JavaScript. The game allows two players to take turns marking spaces on a 3x3 grid with their respective symbols (X or O). The objective of the game is for a player to get three of their symbols in a row (horizontally, vertically, or diagonally) before their opponent does.   
  
### Deployment Link
The deployed project can
be found at https://3ddy1985.github.io/tic-tac-toe/   
   
### Getting Started/Code Installation
To access the code, you can either download the project from the GitHub repository or clone it using
the following command:  
```sh
git clone https://github.com/3ddy1985/tic-tac-toe.git 
```  
 
   
   
### Timeframe & Working Team
This was an individual project that was completed within a timeframe of 6 days.   
  
    
    
### Technologies Used
* HTML
* CSS
* JavaScript   
   
   
   
### Brief
* Render a game board in the browser
* Switch turns between X and O (or whichever markers you select)
* Visually display which side won if a player gets three in a row, or show a draw if neither player wins
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
* Use JavaScript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* You can use GitHub Pages for deploying your project
* Use semantic markup for HTML and CSS (adhere to best practices)
* Have well-formatted and well-commented code
   
   
### Build/Code Process
The game logic was implemented using JavaScript, with functions for checking for a winner,
checking for a tie, and switching turns between the players. The game board was
created using HTML and styled using CSS.

I didn't spend a lot of time planning this project as there wasn't much complexity to the app. However, I did create some pseudocode to guide me through the implementation process. The pseudocode provided a basic outline for the Tic-Tac-Toe game logic and helped me ensure that I covered all the necessary functionality. From there, I was able to implement the game logic and create the user interface to display the game board and accept user input. Overall, the project was a fun exercise in using JavaScript to create a simple game.

    
### Pseudocode 
* Initialize the game board:  
  * Create a 3x3 matrix of empty spaces
* Display the game board to the user
* Repeat until the game is over:
  * Player X's turn:
    - Ask the user to input a row and column number to place their X
    - Check if the selected cell is empty
    - If it is, update the board with the X and display the updated board
    - If it isn't, ask the user to choose another cell
    - Check if Player X has won
    - If yes, end the game and declare Player X as the winner
    - If no, continue to the next turn
  * Player O's turn:
    - Ask the user to input a row and column number to place their O
    - Check if the selected cell is empty
    - If it is, update the board with the O and display the updated board
    - If it isn't, ask the user to choose another cell
    - Check if Player O has won
    - If yes, end the game and declare Player O as the winner
    - If no, continue to the next turn
  * If there are no empty cells left and no player has won, declare the game as a tie

### Some of the code snippets I'm particularly proud of include:

1. Function for checking for a winner:
```js
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
```js
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
```js
class GameGrid {
    constructor() {
    this.cells= [];
        for (let i = 0; i < 9; i++) {
            this.cells.push(new GameCell())
        }
    }
    boardCode() {
    let table = '<tr>';
        for(let i = 0; i < 9; i++) {
            let col = i % 3;
            table += `<td id="cell-${i+1}"
            class="game-td">${this.cells[i].cellContent(i)}</td>`;
            if (col === 2) {
                table += '</tr><tr>';
            }
        }
        table += '</tr>';
        return`<table id="tic-tac">${table}</table>`;
    }
};
 
class GameCell {
    constructor() {
        this.value = '';
    }
    cellContent(index){
        return `<button id="cell-${index+1}"
        class="cell">${this.value}</button>`
    }
};
```

The GameGrid class generates the game board by creating an array of GameCell instances and using them to populate a table in HTML. The GameCell class generates the HTML for each individual cell on the game board

### Challenges:
One of the biggest challenges I encountered was getting the game to recognize when a player had won. It took some trial and error to figure out the most efficient way to check for a winner using an array of winning combinations. Another challenge or should I say setback was that at some point I broke the code. Unfortunately, I
had no idea when I had done it so it took quite a while to fix it and ended up re-writing over half of the JavaScript.


### Wins:
I am proud of how the game turned out overall. The user interface is clean and simple, and the game logic works well. I am proud of the code snippets I highlighted earlier, as they demonstrate my understanding of JavaScript and programming logic. Getting the game completed was a big win, especially after having to re-write a lot of my code towards the end of the project timeline.

### Key Learnings/Takeaways:
I learned to implement more advanced JavaScript functions and arrays through building this project. I gained more experience with event listeners and manipulating the DOM with JavaScript. Planning and pseudocode became essential parts of my development process, and I learned their importance through this project.


### Bugs:
No major bugs other than me breaking the code, which has been fixed.


### Future Improvements:
* Finish making the app more responsive
* Add an option to play against AI
* Incorporate the ability for users to play over the internetusing WebSockets
* Allow users to add their names and choose icons
 

