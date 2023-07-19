import BaseTemplate from "./baseTemplate.js";
export class Privacy extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
    handler(){
        this.handleLoadingScreen(false);
        const formElem = document.querySelector("#privacy");
        setTimeout(() => {
            formElem.classList.add("active");
        }, 200);
        this.addNavEvent(formElem);
    }
    async getHtml() {
        return `<div id="privacy" class="">
        <h3>Privacy notice</h3>
        <p>Aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <a class="coloredButton eventButton" href="verify-humanity">continue</a>
        </div>`
    }
}