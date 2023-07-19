import BaseTemplate from "./baseTemplate.js";
export class Entry extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
    handler(){
        this.handleLoadingScreen(false);
        const elemOne = document.querySelector("#enter-website");
        setTimeout(() => {
            elemOne.classList.add("active");
           
        }, 100);

        this.addNavEvent(elemOne);
    }
    async getHtml() {
        return `<div id="enter-website" class="">
        <h2>You're all set!</h2>
        <a class="eventButton coloredButton" href="/big-error">Enter Website</a>
        </div>`
    }
}