import BaseTemplate from "./baseTemplate.js";
export class SignUp extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
        this.counter = 10;
    }
    createForm(){
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
    handler(){
        this.handleLoadingScreen(false);
        const formElem = document.querySelector("#formEvent");
        setTimeout(() => {
            this.createForm();
            const skipButton = document.getElementById("skipButton");
            const counter = document.getElementById("skipCounter");
            const submitButton = document.querySelector('[type = "submit"]');
            const skipInterval = setInterval(()=>{
                if(this.counter === 0){
                    skipButton.classList.add("active", "eventButton");
                    skipButton.href = "/privacy"
                    skipButton.textContent = "Skip";
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
                this.handleLoadingScreen(true);
                setTimeout(()=>{//mouse needs to be in submit button for 50 ms
                    if(mouseEnter){
                        this.handleLoadingScreen(false);
                        formElem.style.transform = `translateY(-${shiftLength}px)`
                        shiftLength = shiftLength + shift;
                    }
                },100)
            });
            submitButton.addEventListener("mouseleave", ()=>{
                this.handleLoadingScreen(false);
                mouseEnter = false
            })
            }, 300);
            this.addNavEvent(formElem);
    }
    async getHtml() {
        return `<div id="formEvent" class="">
        <form action="">
            <h1>We need more Info!</h1>
            <hr>
            <h1>Personal info</h1>
                <div class="formDiv">
                    <div>
                        <label for="fname">First name:</label>
                        <input type="text" id="fname" name="fname">
                    </div>
                    <div>
                        <label for="lname">Last name:</label>
                        <input type="text" id="lname" name="lname">
                    </div>
                    <div>
                        <label for="birthDate">Date of Birth:</label>
                            <select name="Month" id="birthDate">
                            <option>Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                            </select>
                        <select name="Date" id="birthDate">
                            <option>Date</option>
                        </select>
                        <select name="Year" id="birthDate">
                            <option>Year</option>
                        </select>
                    </div>
                    <div>
                        <label for="gender">Gender:</label>
                        <select name="gender" id="gender">
                            <option>Choose a gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
            <h1>Contact information</h1>
                <div class="formDiv">
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email">
                    </div>
                    <div>
                        <label for="address">Address:</label>
                        <input type="text" id="address" name="address">
                    </div>
                    <div>
                        <label for="city">City:</label>
                        <input type="text" id="city" name="city">
                    </div>
                    <div>
                        <label for="state">State:</label>
                        <select name="state" id="state">
                            <option>Choose a state</option>
                        </select>
                    </div>
                    <div>
                        <label for="zipCode">Zip Code:</label>
                        <input type="number" id="zipCode" name="zipCode">
                    </div>
                    <div>
                        <label for="phone">Phone:</label>
                        <input type="number" id="phone" name="phone">
                    </div>
                </div>  
                <span>
                    <input type="submit" disabled> 
                    <input type="reset">    
                </span>
        </form>
        <a id="skipButton" class="">
            Skip: <span id="skipCounter" class="active">10</span> s
        </a>
    </div>`
    }
}