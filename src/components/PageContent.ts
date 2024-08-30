export class PageContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || '';
        const content = this.getAttribute('content') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 2rem;
                }
                h1 {
                    color: #333;
                }
            </style>
            <h1>${title}</h1>
            <div>${content}</div>
        `;
    }
}

customElements.define('page-content', PageContent);