let currentEvent = 10;
let lineCanvas;
let ctx;
let lineState = {
    //canvas coordinates to draw and handle animation of dr spaceman's air-line. 
    getState(canvasWidth){
        lineCanvas.width = canvasWidth;
        const stats = lineCanvas.getBoundingClientRect();
        this.canvasWidth = stats.width;
        this.canvasHeight= stats.height;
        this.maxY = Math.floor(0.8 * this.canvasHeight);
        this.minY = Math.floor(0.2 * this.canvasHeight);

        this.x1 = Math.round(0.25 * this.canvasWidth); 
        this.y1 = Math.round(0.2 * this.canvasHeight);
        this.x2 = Math.round(0.75 * this.canvasWidth); 
        this.y2 = Math.round(0.8 * this.canvasHeight);
        this.y1Forward = true; //determines direction the line is moving (forward = y--)
        this.y2Forward = false;
    },
    setState(axis){//axis == y1 || y2
        if(this[axis] > this.maxY){
            this[axis+"Forward"] = true;
        }
        if(this[axis] < this.minY){
            this[axis+"Forward"] = false;
        }
        this[axis+"Forward"] ? this[axis]= this[axis] - 0.5 : this[axis]= this[axis]+0.5;
        return this[axis];
    }
};
const events = {
    1: {id: 1, name: "greeter", loadOnClose: true, loadOnArrival: false, timer: 1500, altAction(){
        const crosses = document.querySelectorAll(".circle-cross");
        const circle = document.querySelector(".circle");
        circle.addEventListener("animationend", ()=>{
            crosses.forEach(i => i.classList.add("active"));
            crosses[0].ontransitionend = ()=>{
                document.getElementById("icon-top").classList.add("active");
                document.getElementById("icon-right").classList.add("active");
                document.getElementById("icon-bottom").classList.add("active");
                const iconLeft = document.getElementById("icon-left")
                iconLeft.classList.add("active");
                iconLeft.ontransitionend = () =>{
                    document.querySelector("#greeter-content").classList.add("active");
                }
            }
        })
    }},
    2: {id: 2, name: "age-verification", loadOnClose: true, loadOnArrival: false, timer: 1000, altAction(){
        document.querySelector(".buttonFalse").addEventListener("click", (e)=>{
            e.target.classList.add("closed")
        })
        document.querySelector(".toggle-age-section").addEventListener("click", ()=>{
            const ageForm = document.querySelector("#ageForm");
            const ageFormTop = document.querySelector(".age-verification-top");
            ageForm.classList.add("ageFormToggle");
            ageForm.ontransitionend = () => ageFormTop.classList.add("closed");
        })
    }},
    3: {id: 3, name: "notification", loadOnClose: true, loadOnArrival: true, timer: 100},
    4: {id: 4, name: "newsletter", loadOnClose: true, loadOnArrival: true, timer: 1000, altAction(){
        const elem = document.getElementById(this.name)
        elem.addEventListener("mouseover", ()=>{
            currentEvent++;
            activateEvent(currentEvent);
        }, {once: true});
    }},
    5: {id: 5, name: "blocker", loadOnClose: true, loadOnArrival: false, timer: 50, altAction(){
        if(document.querySelector("#newsletter.closed")){//newsletter hover event failed to fire
            currentEvent++;
        }
    }},
    7: {id: 7, name: "formEvent", loadOnClose: true, loadOnArrival: false, timer: 500, counter: 10, altAction(){
        //adds a timer to skip button. then once timer hits 0 opens next event after transition
        const formElem = document.getElementById("formEvent");
        const skipButton = document.getElementById("skipButton");
        const loadingIcon = document.getElementById("skipBlocker"); //loading icon for skip button
        const counter = document.getElementById("skipCounter");
        const submitButton = document.querySelector('[type = "submit"]');
        const skipInterval = setInterval(()=>{
            if(this.counter === 0){
                skipButton.classList.add("active", "eventButton");
                loadingIcon.classList.add("inactive");
                skipButton.disabled = false;
                addCloseEvent(this.id, formElem);
                return clearTimeout(skipInterval);
            }
            counter.innerText = this.counter;
            this.counter = this.counter - 1;
        },1000);
        //creates misclick on form submit
        const shift = submitButton.offsetHeight + 10;
        let shiftLength = shift;
        let mouseEnter;
        submitButton.addEventListener("mouseenter", ()=>{
            mouseEnter = true;
            handleLoadingScreen(true);
            setTimeout(()=>{//mouse needs to be in submit button for 50 ms
                if(mouseEnter){
                    handleLoadingScreen(false);
                    formElem.style.transform = `translateY(-${shiftLength}px)`
                    shiftLength = shiftLength + shift;
                }
            },100)
        });
        submitButton.addEventListener("mouseleave", ()=>{
            handleLoadingScreen(false);
            mouseEnter = false
        })
    }},
    8: {id: 8, name: "privacy", loadOnClose: true, loadOnArrival: false, timer: 50},
    9: {id: 9, name: "verify-humanity", loadOnClose: false, loadOnArrival: false, timer: 50},
    10: {id: 10, name: "puzzle-container", loadOnClose: false, loadOnArrival: false, timer: 150, altAction(){
        initializePuzzle(3, 4, 5);
        const skipButton =  document.getElementById("puzzle-skip");
        skipButton.addEventListener("click", solvePuzzle);
    }},
    11: {id: 11, name: "enter-website", loadOnClose: false, loadOnArrival: false, timer: 150, altAction(){
        setTimeout(() => {
            confetti();
        }, 200);
    }},
    12: {id: 12, name: "error-screen", loadOnClose: false, loadOnArrival: false, timer: 1000, altAction(){
        lineCanvas = document.querySelector("#lineCanvas");
        ctx = lineCanvas.getContext("2d");
        const skyDimensions = document.getElementById("sky-wrapper").getClientRects()[0];
        const SmallestScreen = skyDimensions.width > skyDimensions.height? skyDimensions.height : skyDimensions.width;//grab the smallest screen 
        lineState.getState(SmallestScreen * 0.55);
        drawAstronautLine();
        drawStars(50);

        document.getElementById("sky-wrapper").classList.add("active");
        //handles events and space man
        const spacemanWrapper = document.querySelector("#doctor-spaceman-area");
        const contactButton = document.querySelector(".error-contact");
        contactButton.addEventListener("click", (e)=>{//contact button
            if(e.target.classList.contains("error-contact")){
                e.target.classList.add("active");
                spacemanWrapper.classList.add("active");

                spacemanWrapper.addEventListener("transitionend", (e)=>{//astronaught stuff
                    const banner = document.querySelector("#banner-content");
                    const bannerWrapper = document.querySelector("#spaceman-banner");
                    banner.addEventListener("click", (e)=>{
                        if(e.target.id === "banner-content"){
                            if(bannerWrapper.classList.contains("disabled")){
                                return
                            }
                            if(bannerWrapper.classList.contains("damaged")){
                                bannerWrapper.classList.add("disabled");
                            }
                            else bannerWrapper.classList.add("damaged");
                            const [x, y] = [e.layerX, e.layerY];
                            const crack = document.querySelector(".banner-crack.closed");
                            crack.classList.remove("closed");
                            crack.style.left = `${x-5}px`;
                            crack.style.top = `${y-10}px`;
                        }
                    })
                })
            }
        }, {once: true})
        
        //positions moon
        const moonElem = document.getElementById("loading-icon-wrapper");
        moonElem.classList.add("active");
        document.querySelector(".loading-icon-turned-moon").classList.add("active");
        function getMoonDisplacement(screenAxis, moonSize, percentage){
            return (screenAxis / 2) + (moonSize * percentage);
        }
        if(SmallestScreen > 800){
            const moonSize = 900;
            moonElem.classList.add("large");
            moonElem.style.left = `-${getMoonDisplacement(skyDimensions.width, moonSize, 0.3)}px`
            moonElem.style.top = `-${getMoonDisplacement(skyDimensions.height, moonSize, 0.2)}px`
        }
        if(SmallestScreen < 800){
            const moonSize = 400;
            moonElem.classList.add("small");
            moonElem.style.left = `-${getMoonDisplacement(skyDimensions.width, moonSize, 0.3)}px`
            moonElem.style.top = `-${getMoonDisplacement(skyDimensions.height, moonSize, 0.2)}px`
        }
    }}
}
//puzzle
let blankPiece_url;
class PuzzlePiece{
    constructor(x, y, margin, img){
        this.url = img,
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
let puzzlePieces = {
    pieces: [],
    width: null,
    height: null,
    row: null,
    column: null
};
function solvePuzzle(){
    const puzzle = document.querySelector("#captcha-puzzle");
    const blankPiece = document.querySelector(".blankPiece");
        for(let i=0; i< puzzle.childNodes.length; i++){
            if(!puzzle.childNodes[i].classList.contains("blank")){
                puzzle.childNodes[i].classList = puzzle.childNodes[i].dataset.id;
            }
        }
    blankPiece.style.background = `url(${blankPiece_url})`;
    blankPiece.style.opacity = "1";
    blankPiece.ontransitionend = (e)=> {
        if(e.propertyName === "opacity"){
            closeItem(10, document.querySelector("#puzzle-container"))
        }
    };
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
        return `<div class="${randomizedPuzzleArr.shift()} puzzle-piece" style="background: url(${item.url})" data-id="index${item.x}${item.y}"></div>`
    }).join('');
    puzzlePieces.pieces.forEach(item =>{
        item.createClassRule();
    })
}
function initializePuzzle(row, column, margin){
    puzzlePieces.width = 133;
    puzzlePieces.height = 125;
    puzzlePieces.row = row;
    puzzlePieces.column= column;

    for(let x=0; x<row; x++){
        for(let y=0; y<column; y++){
            const img = `/resources/${x}${y}.jpg`
            if(x===0 && y===column-1){
                puzzlePieces.pieces.push(new PuzzlePiece(x, y, margin, ""))
                blankPiece_url = img;
            }
            else puzzlePieces.pieces.push(new PuzzlePiece(x, y, margin, img))
        }
    }
    drawPuzzle(randomizePuzzle());
}
function drawStars(num){
    const sky = document.getElementById("sky-wrapper");
        for(let i = 0; i< num; i++){
            const star = document.createElement("div");
            star.classList.add("star", `star${i}`);
            star.style.left = `${Math.floor(Math.random()* 100)}%`;
            star.style.top = `${Math.floor(Math.random()* 100)}%`;
            const starPx = `${Math.floor(Math.random()*4)}px`;
            star.style.width = starPx;
            star.style.height = starPx;
            sky.append(star);
        }
}
function drawAstronautLine(){
        requestAnimationFrame(drawAstronautLine);
        ctx.clearRect(0, 0, lineState.canvasWidth, lineState.canvasHeight);
        
        ctx.beginPath();
        ctx.moveTo(0, lineState.canvasHeight/2);
        ctx.bezierCurveTo(lineState.x1, lineState.setState("y1"), lineState.x2, lineState.setState("y2"), lineState.canvasWidth, lineState.canvasHeight/3);     
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
}
function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
}
function blockBouncer(){
    const url = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    const requestType = {
      method: 'HEAD',
      mode: 'no-cors'
    };
    const request = new Request(url, requestType);
  
    fetch(request).then((response)=> response)
    .then(response => {
        const notBlocked = document.querySelector(".blocked-false");
        return notBlocked.classList.remove("closed");
    })
    .catch(error=>{
        const blocked = document.querySelector(".blocked-true");
        return blocked.classList.remove("closed");
    })
}
function handleLoadingScreen(bool){
    const loadingScreen = document.querySelector('#loading-container');
    bool ? loadingScreen.classList.remove("closed") :
    loadingScreen.classList.add("closed");
}
function closeItem(id, elem){
    let transition = false;
     //element transitions out
    elem.addEventListener("transitionstart", ()=>{
        transition = true;
        elem.addEventListener("transitionend", event=>{
            if(event.target === elem){
                elem.classList.add("closed");
                handleLoadingScreen(events[id].loadOnClose); 
                setTimeout(()=>{//activate next element after n seconds
                    currentEvent++; 
                    activateEvent(currentEvent); 
                    }, events[id].timer);
            }
        })  
    }, {once: true})
    elem.classList.remove("active");
    setTimeout(()=>{
        if(!transition){
            elem.classList.add("closed");
            handleLoadingScreen(events[id].loadOnClose); 
            setTimeout(()=>{//activate next element after n seconds
                currentEvent++; 
                activateEvent(currentEvent); 
                }, events[id].timer);
        }
    }, 150)
}
function addCloseEvent(id, elem){
    const eventButtons = elem.querySelectorAll(".eventButton");
    const buttonsArr = [...eventButtons];
    buttonsArr.forEach(item => {
        item.addEventListener("click", ()=> closeItem(id, elem))
})  
}
function activateEvent(id){
    if(events[id] === undefined){
        return;
    }
    const currentElement = document.querySelector(`#${events[id].name}`);
    currentElement.classList.remove("closed");
    handleLoadingScreen(events[id].loadOnArrival);
    addCloseEvent(id, currentElement);
    setTimeout(()=>{
        if(typeof events[id].altAction === "function"){
            events[id].altAction();
        }
        currentElement.classList.add("active");
    }, 200)
}
function createForm(){
    let state = [ "AK - Alaska", 
                "AL - Alabama", 
                "AR - Arkansas", 
                "AS - American Samoa", 
                "AZ - Arizona", 
                "CA - California", 
                "CO - Colorado", 
                "CT - Connecticut", 
                "DC - District of Columbia", 
                "DE - Delaware", 
                "FL - Florida", 
                "GA - Georgia", 
                "GU - Guam", 
                "HI - Hawaii", 
                "IA - Iowa", 
                "ID - Idaho", 
                "IL - Illinois", 
                "IN - Indiana", 
                "KS - Kansas", 
                "KY - Kentucky", 
                "LA - Louisiana", 
                "MA - Massachusetts", 
                "MD - Maryland", 
                "ME - Maine", 
                "MI - Michigan", 
                "MN - Minnesota", 
                "MO - Missouri", 
                "MS - Mississippi", 
                "MT - Montana", 
                "NC - North Carolina", 
                "ND - North Dakota", 
                "NE - Nebraska", 
                "NH - New Hampshire", 
                "NJ - New Jersey", 
                "NM - New Mexico", 
                "NV - Nevada", 
                "NY - New York", 
                "OH - Ohio", 
                "OK - Oklahoma", 
                "OR - Oregon", 
                "PA - Pennsylvania", 
                "PR - Puerto Rico", 
                "RI - Rhode Island", 
                "SC - South Carolina", 
                "SD - South Dakota", 
                "TN - Tennessee", 
                "TX - Texas", 
                "UT - Utah", 
                "VA - Virginia", 
                "VI - Virgin Islands", 
                "VT - Vermont", 
                "WA - Washington", 
                "WI - Wisconsin", 
                "WV - West Virginia", 
                "WY - Wyoming"];
   const dateElem = document.querySelector('[name="Date"]');
   const yearElem = document.querySelector('[name="Year"]');
   const stateElem = document.querySelector('[name="state"]');
   let currentYear = new Date();
   currentYear = currentYear.getFullYear();
   function appendToForm(item, parentEle){
        const childElem = document.createElement("option");
        childElem.innerText = item;
        parentEle.append(childElem);
   }
   for(let i = 0; i < 120; i++){
        appendToForm(currentYear - i, yearElem); //create year select
        if(i < 31){
            appendToForm(i + 1, dateElem);
        }
        if(i < state.length){
            appendToForm(state[i], stateElem);
        }
    }
}
function handlePreload(){
    blockBouncer();
    createForm();
}
document.addEventListener("DOMContentLoaded", handlePreload);
window.addEventListener("load", ()=> activateEvent(currentEvent));