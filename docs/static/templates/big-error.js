import BaseTemplate from "./baseTemplate.js";
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
export class ErrorBig extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
    handler(){
        lineCanvas = document.querySelector("#lineCanvas");
        ctx = lineCanvas.getContext("2d");
        const skyDimensions = document.getElementById("sky-wrapper").getClientRects()[0];
        const SmallestScreen = skyDimensions.width > skyDimensions.height? skyDimensions.height : skyDimensions.width;//grab the smallest screen 
        lineState.getState(SmallestScreen * 0.55);

        drawAstronautLine();
        drawStars(50);
        // this.handleLoadingScreen(false);

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
        
        //positions moon skyDimensions
        const moonElem = document.getElementById("loading-icon-wrapper");
        moonElem.style.left = `${skyDimensions.width / 2 - 50}px`;
        moonElem.style.top = `${skyDimensions.height / 2 - 50}px`;
        moonElem.classList.add("active");
        document.querySelector(".loading-icon-turned-moon").classList.add("active");
        setTimeout(() => {
            if(SmallestScreen > 800){
                const moonSize = 900;
                moonElem.classList.add("large");
                moonElem.style.left = `-${moonSize * 0.3}px`;
                moonElem.style.top = `-${moonSize * 0.2}px`;
            }
            if(SmallestScreen < 800){
                const moonSize = 400;
                moonElem.classList.add("small");
                moonElem.style.left = `-${moonSize * 0.3}px`;
                moonElem.style.top = `-${moonSize * 0.2}px`;
            }
        }, 150);
    }
    async getHtml() {
        return `<div id="error-screen" class="">
        <div id="loading-icon-wrapper">
            <div id="moon-text" class="flex-center">
                <h1>404</h1>
                <p>Oh no...<br>Something broke.</p>
                <div class="error-contact flex-center">Contact us</div>
            </div>
            <div id="crater1" class="crater"></div>
            <div id="crater2" class="crater"></div>
            <div id="crater3" class="crater"></div>
            <div class="loading-icon-turned-moon">
            </div>
        </div>
       
        
        <div id="space">
            <div id="sky-wrapper" class="">
                <div id="doctor-spaceman-area">
                    <div id="doctor-spaceman-wrapper">
                        <div id="spaceman-banner">
                            <div id="banner-content" class="flex-center">
                                Backup Contact
                                <div class="banner-crack closed">*</div>
                                <div class="banner-crack closed">*</div>
                            </div>
                            <div id="spaceman-hand-left" class="spaceman-hand"></div>
                            <div id="spaceman-hand-right" class="spaceman-hand"></div>
                        </div>
                        <div>
                            <div id="spaceman-helmet">
                                <div id="spaceman-visor"></div>
                            </div>
                            <div id="spaceman-backpack"></div>
                            <div id="spaceman-torso">
                                <div id="spaceman-pouch"></div>
                            </div>
                            <div id="spaceman-legs">
                                <span id="spaceman-leg-left">
                                    <div class="spaceman-feet"></div>
                                </span>
                                <span id="spaceman-leg-right">
                                    <div class="spaceman-feet"></div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id="doctor-spaceman-line">
                        <canvas id="lineCanvas" width="600px" height="200px" ></canvas>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    </div>`
    }
}