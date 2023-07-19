import BaseTemplate from "./baseTemplate.js";
export class Age extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
    handler(){
        this.handleLoadingScreen(false);
        const mainElem = document.querySelector("#age-verification");
        mainElem.classList.add("active");

        document.querySelector(".buttonFalse").addEventListener("click", (e)=>{
            e.target.classList.add("closed");
        });
        document.querySelector(".toggle-age-section").addEventListener("click", ()=>{
            const ageForm = document.querySelector("#ageForm");
            const ageFormTop = document.querySelector(".age-verification-top");
            ageForm.classList.add("ageFormToggle");
            ageForm.ontransitionend = () => ageFormTop.classList.add("closed");
        });
        this.addNavEvent(mainElem);
    }
    async getHtml() {
        return `<div id="age-verification" >
        <div id="ageForm" class="">     
            <div class="age-sub-box age-verification-top">
                <h2 class="titleText">Are you over 18?</h2>
                <p>In order to access this content you must be over 18</p>
                <div>
                    <button class="toggle-age-section coloredButton">Yes</button>
                    <button class="buttonFalse greyButton">No</button>
                </div>
            </div>
            <div class="age-sub-box age-verification-bottom">
                <h2 class="titleText">Please enter your age</h2>
                <div>
                    <input class="popup" type="number" placeholder="mm" min="1" max="12">
                    <input class="popup" type="number" placeholder="dd" min="1" max="31">
                    <input class="popup" type="number" placeholder="yyyy" min="1900" max="2022">
                </div>
                <a class="nav-link eventButton coloredButton" href="/pop">Enter</a>
            </div>
        </div>       
    </div>`
    }
}