import { Intro } from "./templates/intro.js";
import { Age } from "./templates/age-verification.js";
import { Error } from "./templates/error.js";
import { Pop } from "./templates/pop.js";
import { SignUp } from "./templates/sign-up.js";
import { Privacy } from "./templates/privacy.js";
import { Verify } from "./templates/verify-humanity.js";
import { Entry } from "./templates/entry.js";
import { ErrorBig } from "./templates/big-error.js";

const routes = [
    {title: "Welcome!", route: "/", handler: Intro},
    {title: "You must be 12 or older to enter", route: "/get-age", handler: Age},
    {title: "Sign up for everything!", route: "/pop", handler: Pop},
    {title: "Give us your contact info!", route: "/sign-up", handler: SignUp},
    {title: "Privacy statement", route: "/privacy", handler: Privacy},
    {title: "Verify thyself", route: "/verify-humanity", handler: Verify},
    {title: "Almost done!", route: "/entry", handler: Entry},
    {title: "Oh no... It broke!", route: "/big-error", handler: ErrorBig},
]
async function router(){
    let path =  location.pathname;
    const match = routes.filter(i => i.route === path);

    let classItem;
    if(match.length > 0){
        classItem = new match[0].handler(match[0].title);
        }
    else {
        classItem = new Error("Error");
    }
    document.querySelector("#content-container").innerHTML = await classItem.getHtml();
    await classItem.handler();
}
export function navigateTo(url){
    history.pushState(null, null, url);
    router();
}

window.addEventListener("load", ()=> router());
window.addEventListener("popstate", (e)=>{
    router();
});