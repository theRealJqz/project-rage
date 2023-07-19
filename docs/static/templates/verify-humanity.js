import BaseTemplate from "./baseTemplate.js";

let blankPiece_url;
class PuzzlePiece{
    constructor(x, y, margin){
        this.margin = margin,
        this.x = x,
        this.y = y
    }
    createClassRule(){
        const elem = document.querySelector(`.index${this.x}${this.y}`);
        document.styleSheets[0].insertRule(`.index${this.x}${this.y} {
            left: ${this.margin+(this.x*puzzlePieces.width)+(this.x*this.margin)}px;
            top: ${this.margin+(this.y*puzzlePieces.height)+(this.y*this.margin)}px;
        }`);
        elem.style.margin = `${this.margin}px`
        elem.style.cursor = "pointer";
        elem.style.width = `${puzzlePieces.width}px`;
        elem.style.height = `${puzzlePieces.height}px`;
        if(this.x === 0 && this.y === puzzlePieces.column-1){
            const blank = document.querySelector(`[data-id="index${this.x}${this.y}"]`);
            blank.classList.add("blankPiece");
            blank.style.opacity = "0";
        }
        elem.addEventListener("click", handlePuzzlePiece);
    }
}
function solvePuzzle(){
    const puzzle = document.querySelector("#captcha-puzzle");
    const blankPiece = document.querySelector(".blankPiece");
        for(let i=0; i< puzzle.childNodes.length; i++){
            if(!puzzle.childNodes[i].classList.contains("blankPiece")){
                puzzle.childNodes[i].classList = puzzle.childNodes[i].dataset.id;
            }
            else  puzzle.childNodes[i].classList = `${puzzle.childNodes[i].dataset.id} blankPiece`;
        }
    blankPiece.style.opacity = "1";
    setTimeout(() => {
        const exit = document.querySelector("#puzzle-skip");
        exit.href = "/entry"
        exit.click();
    }, 500);
}
function puzzlePieceValidator(blankX, blankY){
    let a = [], result = [];

    function validator(axisNum, axisName){
        const maxAxis = puzzlePieces[axisName] - 1; 
        if(axisNum > 0 && axisNum < maxAxis){//if the blank piece is not on an edge
            return [`${axisNum-1}`, `${axisNum+1}`];
        }
         if(axisNum < maxAxis){  //if puzzle piece is not on the far right
            return [`${axisNum + 1}`];
        }
         if(axisNum > 0){  //if puzzle piece is not on the far left
            return [`${axisNum - 1}`];
        }
    }
    //inputs axis of blank piece and returns valid positions that it can move.
    // for example, a blank piece at 00 (top left) can move to 01 (its right) or 10( below).
    a.push(validator(blankX, "row"));
    a.push(validator(blankY, "column"));

    result = a.map((item, index) =>{
        return item.map(item2 => {
            if(index === 0){
                return `index${item2}${blankY}`
            }
            else return `index${blankX}${item2}`
        })
    })
    return result.flat(); //returns a array of valid moves
}
function handlePuzzlePiece(){//grabs individual piences using their class of index_## where ## = x / y
    const puzzle = document.querySelector("#captcha-puzzle");
    const puzzlePiece_class_string = this.classList[0];
    const puzzlePiece = document.querySelector(`.${puzzlePiece_class_string}`);
    //grabs blank piece on the board and figure out where it is.
    const blankPiece = document.querySelector(".blankPiece");
    const blankPiece_class = blankPiece.classList[0];
    const blankPiece_index = blankPiece_class.match(/[0-9]+/g); //matches only the number in index##
    const validPuzzlePieces = puzzlePieceValidator(+blankPiece_index[0][0], +blankPiece_index[0][1]); //an array of valid moves based off the location of the blank piece
    if(validPuzzlePieces.includes(puzzlePiece_class_string)){//if the piece clicked matches the set of valid moves then switch the two.
        puzzlePiece.classList = blankPiece_class;
        blankPiece.classList = `${puzzlePiece_class_string} blankPiece`;
    }
    for(let i=0; i< puzzle.childNodes.length; i++){//checks for puzzle completion
        if(puzzle.childNodes[i].classList[0] !== puzzle.childNodes[i].dataset.id){
            return; 
        }
    }
    solvePuzzle();     //if puzzle is completed
}
let puzzlePieces = {
    pieces: [],
    width: 133,
    height: 125,
    row: null,
    column: null
};
function randomizePuzzle(){
    let result = [];
    let puzzleArr = puzzlePieces.pieces.map(item=>{
        return `index${item.x}${item.y}`
    })
    while(puzzleArr.length>0){
        result.push(puzzleArr.splice(Math.floor(Math.random() * puzzleArr.length-1), 1));
    }
    return result;
}
function drawPuzzle(randomizedPuzzleArr){
    const puzzle = document.querySelector("#captcha-puzzle");
    puzzle.innerHTML = puzzlePieces.pieces.map(item=>{
        return `<div class="${randomizedPuzzleArr.shift()}" data-id="index${item.x}${item.y}"></div>`
    }).join('');
    puzzlePieces.pieces.forEach(item =>{
        item.createClassRule();
    })
}
function initializePuzzle(row, column, margin){
    puzzlePieces.row = row;
    puzzlePieces.column= column;

    for(let x=0; x<row; x++){
        for(let y=0; y<column; y++){
                puzzlePieces.pieces.push(new PuzzlePiece(x, y, margin))
        }
    }
    drawPuzzle(randomizePuzzle());
}

export class Verify extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
    handler(){
        this.handleLoadingScreen(false);
        const elemOne = document.querySelector("#verify-humanity");
        const elemTwo = document.querySelector("#puzzle-container");
        setTimeout(() => {
            elemOne.classList.add("active");
            elemOne.querySelector("button").addEventListener("click", ()=>{
                elemOne.classList.add("closed");
                elemTwo.classList.remove("closed");
            })
        }, 100);
        initializePuzzle(3, 4, 5);
        const skipButton =  document.getElementById("puzzle-skip");
        skipButton.addEventListener("click", solvePuzzle);
        this.addNavEvent(elemTwo);
    }
    async getHtml() {
        return `<div id="verify-humanity" class="">
        <div id="test"></div>
        prove your humanity<br>Complete the puzzle.
        <button class="eventButton">Okay!</button>
        </div>
        <div id="puzzle-container" class="closed">
            <div id="puzzle-instructions">
                This is Cat. complete the cat.
            </div>
            <hr>
            <div id="captcha-puzzle" class=""></div>
            <hr>
            <a id="puzzle-skip" class="">skip</a>
        </div>`
    }
}