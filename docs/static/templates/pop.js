import BaseTemplate from "./baseTemplate.js";
export class Pop extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
    blockBouncer(){
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
    handlePopUp(elem){
        elem.classList.remove("closed");
        elem.querySelectorAll(".eventButton").forEach(i=>{
            i.addEventListener("click", ()=>{
                elem.classList.remove("active");
            });
        })
        setTimeout(() => {
            elem.classList.add("active");
        }, 100);
    }

    handler(){
        this.blockBouncer();
        this.handleLoadingScreen(false);
        const notification = document.querySelector("#notification");
        const newsletter = document.querySelector("#newsletter");
        const blocker = document.querySelector("#blocker");

        this.handlePopUp(notification);
        notification.querySelectorAll(".eventButton").forEach(i=>{
            i.addEventListener("click", ()=>{
                this.handlePopUp(newsletter);
            })
        });
        newsletter.addEventListener("mouseover", ()=>{
            this.handlePopUp(blocker);
        },{once: true})
        this.addNavEvent(newsletter);
    }
    async getHtml() {
        return `<div id="notification" class="notification-container">
        <div class="box-tick"></div>
        <div class="close-content eventButton">✖</div>
        <div class="logo">
            <img src="static/resources/icon-angry-large.png" alt="angry icon">
        </div>
        <h1>Turn on notifications?</h1>
        <p>Nam libero tempore, cum soluta nobis impedit quo minus id quod maxime placeat facere possimus.</p>
        <div id="notify-true" class="notification-button eventButton">Turn On</div>
        <div id="notify-false" class="notification-button eventButton">Not Now</div>
    </div>

    <div id="newsletter" class="notification-container">
        <div class="box=tick"></div>
        <a class="close-content eventButton" href="/sign-up">✖</a>
        <h1>Subscribe to our newsletter!</h1>
        <p>Cum soluta nobis impedit quo minus id quod maxime placeat facere possimus.</p>
        <hr>
        <form id="newsletter-signup"> 
            <input class="popup" placeholder="email" type="email">
            <a class="eventButton nav-link coloredButton flex-center" href="/sign-up">submit</a>
        </form>
    </div>

    <div id="blocker" class="closed pop">
        <div class="ad-blocker-message blocked-false closed">
            <h3>it looks like you're not using an adblocker</h3>
            <p>Ew. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <button class="eventButton">continue</button>
        </div>
        <div class="ad-blocker-message blocked-true closed">
            <h3>it looks like you're using an adblocker</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button class="eventButton">continue</button>
        </div>
    </div>`
    }
}