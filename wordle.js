
var height = 6; //height
var width = 5; //width
var row = 0; //row
var col = 0; //column

var gameOver = false;


var word = "ZOHOJ";
console.log(word);

window.onload = function(){
    intialize();
}


function intialize() {

    // Create the grid box
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let box = document.createElement("span");
            box.id = r.toString() + "-" + c.toString();
            box.classList.add("box");
            box.innerText = "";
            document.getElementById("board").appendChild(box);
        }
    }

    //key board
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keybox = document.createElement("div");

            let key = currRow[j];
            keybox.innerText = key;
            if (key == "Enter") {
                keybox.id = "Enter";
            }
            else if (key == "⌫") {
                keybox.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keybox.id = "Key" + key; // "Key" + "A";
            } 

            keybox.addEventListener("click", processKey);

            if (key == "Enter") {
                keybox.classList.add("enter-key-box");
            }
            else if(key == "⌫"){
                keybox.classList.add("back-key-box");
            }
            else {
                keybox.classList.add("key-box");
            }
            keyboardRow.appendChild(keybox);
        }
        document.body.appendChild(keyboardRow);
    }
    

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function processKey() {
    e = { "code" : this.id };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return; 

    
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currbox = document.getElementById(row.toString() + '-' + col.toString());
            if (currbox.innerText == "") {
                currbox.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currbox = document.getElementById(row.toString() + '-' + col.toString());
        currbox.innerText = "";
    }

    else if (e.code == "Enter") {
        if(col==width){
        update();
    }}

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText ="Sorry answer is "+ word;
    }
}

function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";

    //to store current letter to guess
    for (let c = 0; c < width; c++) {
        let currbox = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currbox.innerText;
        guess += letter;
    }

    

 
    
    //count the letter and initialize count as 1
    let correct = 0;

    let letterCount = {}; 
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
            
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }

    console.log(letterCount);

    //is check letter present in currernt position 
    for (let c = 0; c < width; c++) {
        let currbox = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currbox.innerText;

        if (word[c] == letter) {
            currbox.classList.add("correct");

            let keybox = document.getElementById("Key" + letter);
            keybox.classList.remove("present");
            keybox.classList.remove("absent");
            keybox.classList.add("correct");

            correct += 1;
            letterCount[letter] -= 1;         }

        if (correct == width) {

            gameOver = true;
            document.getElementById("answer").innerText ="Congratulation "+ "Answer is "+word+" !!!";
            
            
        }
    }

    console.log(letterCount);
    //is check letters are present in the letter
    for (let c = 0; c < width; c++) {
        let currbox = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currbox.innerText;

        // skip the letter if it has been marked correct
        if (!currbox.classList.contains("correct")) {
            
            if (word.includes(letter) && letterCount[letter] > 0) {
                currbox.classList.add("present");
                
                let keybox = document.getElementById("Key" + letter);
                if (!keybox.classList.contains("correct") ) {
                    keybox.classList.remove("absent");
                    keybox.classList.add("present");
                }
                letterCount[letter] -= 1;
            } // Not in the word 
            else {
                currbox.classList.add("absent");
                let keybox = document.getElementById("Key" + letter);
                if (keybox.classList.contains("correct") ) {
                    
                   
                    keybox.classList.add("correct");
                }
                else if(keybox.classList.contains("present") ){
                    keybox.classList.add("present");
                }
                else{
                    keybox.classList.add("absent");
                }
            }
        }
    }

    row += 1; //start new row
    col = 0; //start at 0 for new row
}