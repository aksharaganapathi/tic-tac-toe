let gameStarted = false;
let hasWon;
let count = 0;

let playerOne = createPlayer("playerOne");
let playerTwo = createPlayer("playerTwo");

let playerOneName = prompt("What's the name of player one?");
let playerTwoName = prompt("What's the name of player two?");

const gameBoard = (() => {
    let grid = document.getElementById("grid");
    let boardArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for(let i = 0; i < 9; i++){
        let div = document.createElement("div");
        div.classList.add("test");
        div.setAttribute("id", i);

        div.addEventListener("click", function(){
            if(div.innerHTML != "" && gameStarted){
                alert("Cannot choose a spot with a marker. Please choose another one.");
                return;
            }

            if(gameStarted){
                if(count % 2 == 0 && count < 9){
                    playerOne.playerArr.push(parseInt(div.id));
                    let para = document.getElementById("player");
                    para.innerText = playerTwoName + "\'s Turn"
                    div.innerHTML = "<i class=\"fas fa-times \"></i>";
                    count++;

                    if(checkAnswer(playerOne.playerArr, boardArr)){
                        hasWon = true;
                        para.innerText = playerOneName + " Wins!"
                        gameStarted = false;
                        document.getElementById("start").disabled = false; 
                        document.getElementById("start").innerText = "Refresh";
                        return;
                    }

                } else if(count < 9) {
                    playerTwo.playerArr.push(parseInt(div.id));
                    let para = document.getElementById("player");
                    para.innerText = playerOneName + "\'s Turn"
                    
                    div.innerHTML = "<i class=\"far fa-circle\"></i>"
                    count++;

                    if(checkAnswer(playerTwo.playerArr, boardArr)){
                        hasWon = true;
                        para.innerText = playerTwoName + " Wins!"
                        gameStarted = false;
                        document.getElementById("start").disabled = false; 
                        document.getElementById("start").innerText = "New game";
                        return;
                    }
                } 
                
                if(count == 9 && checkAnswer(playerOne.playerArr, boardArr) != true && checkAnswer(playerTwo.playerArr, boardArr) != true){
                    hasWon = true;
                    let para = document.getElementById("player");
                    para.innerText = "It's a tie!"
                    gameStarted = false;
                    document.getElementById("start").disabled = false; 
                    document.getElementById("start").innerText = "Refresh";
                    return;
                }
            }
        });
    
        grid.style.gridTemplateRows = "repeat(" + 3 + "," + (400 / 3) + "px)";
        grid.style.gridTemplateColumns = "repeat(" + 3 + "," + (400 / 3) + "px)";
    
        grid.appendChild(div);
    }
});

function createPlayer(playerName) {
    return {playerName: playerName, playerArr: []};
}

function checkAnswer(arr1, winArr){
    let arr = arr1;
    
    if(arr.length < 3){
        return false;
    } else {
        for(let i = 0; i < winArr.length; i++){
          if(arr.includes(winArr[i][0]) && arr.includes(winArr[i][1]) && arr.includes(winArr[i][2])){
            return true;
        }
      }
    }
  }

document.getElementById("start").addEventListener("click", function(){
    if(gameStarted == false && hasWon){
        location.reload();
    } else {
        gameStarted = !gameStarted;
        let para = document.getElementById("player");
        para.innerText = playerOneName + "\'s Turn"
    
        let btn = document.getElementById("start");
        btn.disabled = true;
    }
});

gameBoard();