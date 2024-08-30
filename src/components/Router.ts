export class Router extends HTMLElement {
    private routes: Map<string, typeof HTMLElement>;
    private currentRoute: string;

    constructor() {
        super();
        this.routes = new Map();
        this.currentRoute = '';
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        window.addEventListener('popstate', this.handleRouteChange.bind(this));
        this.handleRouteChange();
    }

    addRoute(path: string, component: typeof HTMLElement) {
        this.routes.set(path, component);
    }

    navigate(path: string) {
        history.pushState(null, '', path);
        this.handleRouteChange();
    }

    private handleRouteChange() {
        const path = window.location.pathname;
        const Component = this.routes.get(path) || this.routes.get('*');
        
        if (Component && this.currentRoute !== path) {
            this.currentRoute = path;
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(new Component());
            this.updateActiveLink();
        }
    }

    private updateActiveLink() {
        const links = document.querySelectorAll('nav-bar a');
        links.forEach(link => {
            if (link.getAttribute('href') === this.currentRoute) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

customElements.define('spa-router', Router);