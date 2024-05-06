const newGameBtn = document.getElementById("new-game");
const easyBtn = document.getElementById("easy");
const hardBtn = document.getElementById("hard");
const mediumBtn = document.getElementById("medium");
let cells = document.querySelectorAll('[class^="cell"]');
const deleteBtn = document.getElementById("delete");
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let currentDiff = "none";
let answer = null;
let deleting = false;
let numberOfEmptyCells = 81;
let selectedNum = null;
let isDarkMode = false;
var coll = document.getElementsByClassName("collapsible");
let selectedCell = null;
// function toggleDarkMode(){
//     isDarkMode = !isDarkMode;
//     const body = document.body;
//     body.classList.toggle('dark-mode', isDarkMode);

//     cells.forEach(cell => {
//         cell.classList.toggle('dark-cell', isDarkMode);
//     });

//     const h2 = document.querySelector('.content h2');
//     h2.classList.toggle('dark-mode', isDarkMode);

//     const containerInner = document.getElementsByClassName('container-inner');
//     for (let i = 0; i < containerInner.length; i++) {
//         containerInner[i].classList.toggle('dark-mode', isDarkMode);
//     }
// }
// const darkModeToggleBtn = document.getElementById('darkModeToggleBtn');
// darkModeToggleBtn.addEventListener('click', toggleDarkMode);
newGameBtn.addEventListener("click", function () {
    if (currentDiff !== "none"){
        resetStopwatch();
        startStopwatch();
        answer = generateSudokuPuzzle();
        sudokuPuzzle = JSON.parse(JSON.stringify(answer));
        sudokuPuzzle = deleteNumbers(sudokuPuzzle);
        updateHtml(sudokuPuzzle);
    }

});

easyBtn.addEventListener("click", function () {
    changeDiff("easy");
    easyBtn.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target === mediumBtn || event.target === hardBtn) {
            easyBtn.style.border = "0";
        }
    });
});

mediumBtn.addEventListener("click", function () {
    changeDiff("medium");
    mediumBtn.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target === easyBtn || event.target === hardBtn) {
            mediumBtn.style.border = "0";
        }
    });
});

hardBtn.addEventListener("click", function () {
    changeDiff("hard");
    hardBtn.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target === easyBtn || event.target === mediumBtn) {
            hardBtn.style.border = "0";
        }
    });
});

deleteBtn.addEventListener("click", deleteNum);
deleteBtn.addEventListener("click", function(){
    this.classList.add("pressed");

    setTimeout(() => {
        this.classList.remove("pressed");
    }, 130); 
})
const numbers = document.querySelectorAll(".number");
let winCount = 0;
const winCounter = document.getElementById("win-counter");

function incrementWinCount() {
  winCount++;
  winCounter.textContent = winCount;
}

numbers.forEach(number => {
    number.addEventListener("click", function() {
    this.classList.add("pressed");

    setTimeout(() => {
        this.classList.remove("pressed");
    }, 100); 
    cellAnswer = findAnswerToCell(selectedCell);
    if (selectedCell.textContent.trim() === "") {
        selectedCell.textContent = this.textContent;
        // console.log(parseInt(selectedCell.textContent));
        // console.log(parseInt(cellAnswer));
        if (parseInt(selectedCell.textContent) === parseInt(cellAnswer)) {
            selectedCell.classList.remove("selected");
            selectedCell.style.backgroundColor = "#c0f7db";
            selectedCell.removeEventListener('click', handleClick);
            selectedCell.contentEditable = "false"; 
            selectedCell.classList.add("filled");
        }else{
            selectedCell.classList.remove("selected");
            selectedCell.style.backgroundColor = "#FAA0A0";
        }
    } else {
          if (!this.classList.contains("filled")){
            selectedCell.textContent = this.textContent;
          }

          if (parseInt(selectedCell.textContent) === parseInt(cellAnswer)) {
            selectedCell.classList.remove("selected");
            selectedCell.style.backgroundColor = "#c0f7db";
            selectedCell.contentEditable = "false"; 
            selectedCell.classList.add("filled");
          }
      }

      if (isPuzzleComplete()){
          stopStopwatch();
          flashCellsGreen();
          incrementWinCount();
          setTimeout(function() {
              newGameBtn.click(); 
          }, 1000);
      }
    });
  });

  
  if (isPuzzleComplete()) {
    stopStopwatch();
    flashCellsGreen();
  
    setTimeout(function() {
      newGameBtn.click(); 
    }, 1000);
  }


function generateSudokuPuzzle() {
    const validBoard = Array.from({ length: 9 }, () => Array(9).fill(0));


    function generateLastRowRandom(){
        const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (y === 0){
                    const randomNum = numberList[Math.floor(Math.random() * numberList.length)];
                    validBoard[y][x] = randomNum;
                    const randomNumIndex = numberList.indexOf(randomNum);
                    numberList.splice(randomNumIndex, 1);
                }
            }
        }
    }
    generateLastRowRandom()
    function isValid(y, x, n) {
        for (let i = 0; i < 9; i++) {
            if (validBoard[y][i] === n || validBoard[i][x] === n) {
                return false;
            }
        }

        const x0 = Math.floor(x / 3) * 3;
        const y0 = Math.floor(y / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (validBoard[y0 + i][x0 + j] === n) {
                    return false;
                }
            }
        }

        return true;
    }
    function solve() {
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (validBoard[y][x] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(y, x, num, validBoard)) {
                            validBoard[y][x] = num;
                            if (solve()) {
                                return true;
                            }
                            validBoard[y][x] = 0; 
                        }
                    }
                    return false;
                }
            }
        }
        return true; 
    }

    solve();
    return validBoard;
}

  


function deleteNumbers(sudokuPuzzle){
    for (let i = 0; i < numberOfEmptyCells; i++) {
        const randomX = Math.floor(Math.random() * 9);
        const randomY = Math.floor(Math.random() * 9);
        sudokuPuzzle[randomY][randomX] = 0;
    }
    return sudokuPuzzle
}

function updateHtml(sudokuPuzzle) {
    for (let i = 0; i < sudokuPuzzle.length; i++) {
        for (let j = 0; j < sudokuPuzzle[i].length; j++) {
            const cell = document.querySelector(`.row${i + 1} .cell${j + 1}`);
            if (sudokuPuzzle[j][i] !== 0) {
                cell.textContent = sudokuPuzzle[j][i].toString();
                cell.style.backgroundColor = "#E6F2FF";
                cell.removeEventListener('click', handleClick);
            } else {
                cell.style.backgroundColor = "#ffffff";
                cell.textContent = ''; 
                cell.addEventListener('click', handleClick);
            }
        }
    }
}


function handleClick(){
    const cell = this;
        removeHighlights();
        highlightSquare(cell);
        highlightRow(cell);
        highlightColumn(cell);
        if (selectedCell !== null) {
            selectedCell.classList.remove("selected");
          }
          if (selectedCell !== cell) {
            cell.classList.add("selected");
            selectedCell = cell;
          } else {
            selectedCell = null;
          }

    if (cell.style.backgroundColor !== "rgb(235, 235, 235)" && deleting === true && cell.style.backgroundColor !== "rgb(192, 247, 219)"){
        cell.innerHTML = "";
        cell.style.backgroundColor = "#fff";
        deleting = false;
    }
}

  function highlightSquare(selectedCell) {
    const cellIndex = Array.from(cells).indexOf(selectedCell);
    const squareStartIndex = Math.floor(cellIndex / 9) * 9; 
    for (let i = squareStartIndex; i < squareStartIndex + 9; i++) {
      if (cells[i] !== selectedCell && cells[i].style.backgroundColor !== "rgb(250, 160, 160)") {
        cells[i].classList.add("highlight");
      }
    }
  }

  function highlightRow(selectedCell) {
    const cellIndex = Array.from(cells).indexOf(selectedCell);
    const rowIndex = Math.floor(cellIndex / 9); 
    for (let i = rowIndex * 9; i < rowIndex * 9 + 9; i++) {
      if (cells[i] !== selectedCell && cells[i].style.backgroundColor !== "rgb(250, 160, 160)") {
        cells[i].classList.add("highlight-row");
      }
    }
  }

  function highlightColumn(selectedCell) {
    const cellIndex = Array.from(cells).indexOf(selectedCell);
    const colIndex = cellIndex % 9;
    for (let i = colIndex; i < cells.length; i += 9) {
      if (cells[i] !== selectedCell && cells[i].style.backgroundColor !== "rgb(250, 160, 160)") {
        cells[i].classList.add("highlight-column");
      }
    }
  }

  function removeHighlights() {
    cells.forEach(cell => {
      cell.classList.remove("highlight", "highlight-row", "highlight-column");
    });
  }
function findAnswerToCell(cell){
    cellClasses = cell.classList;
    cellParentClasses = cell.parentElement.classList;
    var cellRow = null;
    var cellNum = null;

    for (var i = 0; i < cellClasses.length; i++){
        let currentClass = cellClasses[i];
        if (currentClass && currentClass.startsWith("cell")){
            cellNum = parseInt(currentClass.replace("cell",""));
        }
    }

    for (var i = 0; i < cellParentClasses.length; i++){
        let currentClass = cellParentClasses[i];
        if (currentClass && currentClass.startsWith("row")){
            cellRow = parseInt(currentClass.replace("row",""));
        }
    }

    cellAnswer = answer[cellNum - 1][cellRow - 1]
    return cellAnswer
}

function isPuzzleComplete() {
    for (let cell of cells) {
        if (cell.style.backgroundColor === "rgb(255, 255, 255)") { 

            return false;
        }
    }
    return true;
}

function flashCellsGreen() {
    cells.forEach(function(cell) {
        cell.style.backgroundColor = "#c0f7db"; 
    });

    setTimeout(function() {
        cells.forEach(function(cell) {
            cell.style.backgroundColor = ""; 
        });
    }, 1000);
}

function changeDiff(diff){
    currentDiff = diff;
    if (currentDiff === "easy"){
        numberOfEmptyCells = 40; 
    }

    if (currentDiff === "medium"){
        numberOfEmptyCells = 60;
    }
    if (currentDiff === "hard"){
        numberOfEmptyCells = 95;
    } 
}

function startStopwatch(){
    interval = setInterval(updateStopwatch, 1000);
}

function stopStopwatch(){
    clearInterval(interval);
}

function resetStopwatch(){
    stopStopwatch();
    seconds = 0;
    minutes = 0;
    updateStopwatch();
}

function updateStopwatch(){
    seconds++;

    if(seconds ===  60) {
        seconds = 0;
        minutes++;
    }

    const formattedTime  = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('stopwatch').innerText = formattedTime;
}

function deleteNum(){
    if (!this.classList.contains("filled")){
        selectedCell.textContent = "";
        selectedCell.style.backgroundColor = "#fff";
    }
}


var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("mouseenter", function() {
    this.classList.add("active");
    var content = this.nextElementSibling;
    content.style.maxHeight = content.scrollHeight + "px";
  });

  coll[i].addEventListener("mouseleave", function() {
    this.classList.remove("active");
    var content = this.nextElementSibling;
    content.style.maxHeight = null;
  });
}



// TODO: Dark Neon theme
// TODO: Candidate