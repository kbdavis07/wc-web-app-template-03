import { getPages } from '../utils/storage.js';

export class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const pages = await getPages();
        this.render(pages);
    }

    private render(pages: any[]) {
        const links = pages.map(page => `
            <a href="${page.path}" class="nav-link">${page.title}</a>
        `).join('');

        if(this.shadowRoot === null || this.shadowRoot.innerHTML === null) { return; }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #333;
                    position: sticky;
                    top: 0;
                }
                nav {
                    display: flex;
                    justify-content: space-around;
                    padding: 1rem;
                }
                .nav-link {
                    color: white;
                    text-decoration: none;
                }
                .nav-link.active {
                    font-weight: bold;
                }
            </style>
            <nav>${links}</nav>
        `;

        this.shadowRoot.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = (e.target as HTMLAnchorElement).getAttribute('href');
                if (path) {
                    const router = document.querySelector('spa-router') as any;
                    router.navigate(path);
                }
            });
        });
    }
}

customElements.define('nav-bar', NavBar);