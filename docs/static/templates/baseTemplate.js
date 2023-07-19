import { navigateTo } from "../main.js";
export default class{
    constructor(a){
        this.params = a
    }
    handler(){return ""}
    setTitle(title) {
        document.title = title;
    }
    handleLoadingScreen(bool){
        const loadingScreen = document.querySelector('#loading-container');
        bool ? loadingScreen.classList.remove("closed") :
        loadingScreen.classList.add("closed");
    }
    addNavEvent(mainElem){
        document.querySelectorAll(".nav-link").forEach(i => i.addEventListener("click", (e)=>{
            e.preventDefault();
            mainElem.classList.remove("active");
            setTimeout(() => {
                this.handleLoadingScreen(true);
            }, 700);
            setTimeout(() => {
                navigateTo(e.target.href);
            }, 1400);
        }))
    }

}