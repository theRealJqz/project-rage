import BaseTemplate from "./baseTemplate.js";

export class Error extends BaseTemplate{
    constructor(p) {
        super(p);
        this.setTitle(p);
    }
    async getHtml() {
        return `
        <h1 class="error">
        Whoops. This page doesn't exist.<br>
        Move along. Nothing to see here!
        </h1>
        `;
    }
}
