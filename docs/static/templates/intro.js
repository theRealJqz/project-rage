import BaseTemplate from "./baseTemplate.js";

export class Intro extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
   async handler(){
    this.handleLoadingScreen(false);
        const mainElem = document.querySelector("#greeter");
        mainElem.classList.add("active");
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
        this.addNavEvent(mainElem);
}
    async getHtml() {
        return `
        <div id="greeter">
            <div class="logo">
                <div class="circle-container flex-center">
                    <div class="circle-wrapper flex-center">
                        <div class="circle-cross circle-cross-one"></div>
                        <div class="circle-cross circle-cross-two"></div>
                    </div>
                    <div class="half-circle-container left">
                        <div class="circle circle-left active"></div>
                    </div>
                    <div class="half-circle-container right">
                        <div class="circle circle-right active"></div>
                    </div>
                    <div id="icon-top" class="icon">
                        <i class="far fa-keyboard"></i>
                    </div>
                    <div id="icon-right" class="icon">
                        <i class="far fa-user"></i>
                    </div>
                    <div id="icon-bottom" class="icon">
                        <i class="fas fa-gamepad"></i>
                    </div>
                    <div id="icon-left" class="icon">
                        <i class="fas fa-mouse"></i>
                    </div>
                </div>
            </div>
            <div id="greeter-content" class="inactive">
                <h2>A very annoying website</h2>
                <div>
                    <a class="nav-link coloredButton" href="/get-age">Enter</a></button>
                </div>
            </div>
        </div>
        `;
    }
}
