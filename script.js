const newGameBtn = document.getElementById("new-game");
const easyBtn = document.getElementById("easy");
const hardBtn = document.getElementById("hard");
const mediumBtn = document.getElementById("medium");
let cells = document.querySelectorAll('[class^="cell"]');
const nums = document.querySelectorAll('[class^="num"]');
const deleteBtn = document.getElementById("delete");
// let answer = Array.from({ length: 9 }, () => Array(9).fill(0));
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let currentDiff = "none";
let answer = null;
let deleting = false;
let numberOfEmptyCells = 81;
let selectedNum = null;
let allCellsHaveText = false;
newGameBtn.addEventListener("click", function () {
    if (currentDiff !== "none"){
        resetStopwatch();
        startStopwatch();
        answer = generateSudokuPuzzle();
        sudokuPuzzle = JSON.parse(JSON.stringify(answer));
        sudokuPuzzle = deleteNumbers(sudokuPuzzle);
        updateHtml(sudokuPuzzle);
        allCellsHaveText == false;
    }
});



if (currentDiff !== "none" && allCellsHaveText){
    resetStopwatch();
    startStopwatch();
    answer = generateSudokuPuzzle();
    sudokuPuzzle = JSON.parse(JSON.stringify(answer));
    sudokuPuzzle = deleteNumbers(sudokuPuzzle);
    updateHtml(sudokuPuzzle);
}

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

const num1 = document.getElementById("num1")

num1.addEventListener('click', function() {
    selectedNum = num1.innerText
    num1.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num1) {
            num1.style.border = "2px solid #fff";
        }
    });
});

const num2 = document.getElementById("num2")

num2.addEventListener('click', function() {
    selectedNum = num2.innerText
    num2.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num2) {
            num2.style.border = "2px solid #fff";
        }
    });
});

const num3 = document.getElementById("num3")

num3.addEventListener('click', function() {
    selectedNum = num3.innerText
    num3.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num3) {
            num3.style.border = "2px solid #fff";
        }
    });
});

const num4 = document.getElementById("num4")

num4.addEventListener('click', function() {
    selectedNum = num4.innerText
    num4.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num4) {
            num4.style.border = "2px solid #fff";
        }
    });
});

const num5 = document.getElementById("num5")

num5.addEventListener('click', function() {
    selectedNum = num5.innerText
    num5.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num5) {
            num5.style.border = "2px solid #fff";
        }
    });
});

const num6 = document.getElementById("num6")

num6.addEventListener('click', function() {
    selectedNum = num6.innerText
    num6.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num6) {
            num6.style.border = "2px solid #fff";
        }
    });
});

const num7 = document.getElementById("num7")

num7.addEventListener('click', function() {
    selectedNum = num7.innerText
    num7.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num7) {
            num7.style.border = "2px solid #fff";
        }
    });
});

const num8 = document.getElementById("num8")

num8.addEventListener('click', function() {
    selectedNum = num8.innerText
    num8.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num8) {
            num8.style.border = "2px solid #fff";
        }
    });
});

const num9 = document.getElementById("num9")

num9.addEventListener('click', function() {
    selectedNum = num9.innerText
    num9.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== num9) {
            num9.style.border = "2px solid #fff";
        }
    });
});

function generateSudokuPuzzle() {
    const validBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

    function generateLastRowRandom(){
        const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (y === 8){
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
        for (let y = 0; y < 8; y++) {
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
                    // var events = getEventListeners(cell);

                    // if (events && Object.keys(events).length > 0){
                    //     var clonedCell = cell.cloneNode(true);

                    //     cell.parentNode.replaceChild(clonedCell, cell);
                    // }
                } else {
                    cell.style.backgroundColor = "#ffffff";
                    cell.textContent = ''; 
                    cell.addEventListener('click', function() {
                        if (selectedNum !== null && cell.innerHTML.trim() === ''){
                            cell.textContent = selectedNum.toString()
                        }
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
                        if (selectedNum === cellAnswer.toString()){
                            cell.style.backgroundColor = "#99CCFF";
                        }
                        if (cell.innerHTML.trim() === ''){
                            document.addEventListener("click", function(event) {
                                if (event.target !== cell) {
                                    cell.style.backgroundColor = "white";
                                }
                            });
                        }
                        if (cell.style.backgroundColor !== "#EBEBEB" && deleting === true){
                            cell.innerHTML = "";
                            deleting = false;
                        }
                    });
                }
            }
        }
    }


function changeDiff(diff){
    currentDiff = diff;
    if (currentDiff === "easy"){
        numberOfEmptyCells = 60; 
    }

    if (currentDiff === "medium"){
        numberOfEmptyCells = 80;
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
    if (selectedNum !== null){
        deleting = true;
    }
    deleteBtn.style.border = "2.3px solid #004D9B";
    document.addEventListener("click", function(event) {
        if (event.target !== deleteBtn) {
            deleteBtn.style.border = "2px solid #fff";
        }
    });
}

var coll = document.getElementsByClassName("collapsible");
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



// TODO: Stopwatch
// TODO: Success animation
// TODO: Able to delete multiple without having to click again
// TODO: Add pointer cursor to all buttons
// TODO: Dark Neon theme
// TODO: Candidate
// TODO: Buttons change color when pressed