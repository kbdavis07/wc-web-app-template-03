import { Router } from './components/Router';
import { NavBar } from './components/NavBar';
import { PageContent } from './components/PageContent';
import { getPages } from './utils/storage';

async function initializeApp() {
    const router = new Router();
    const pages = await getPages();

    pages.forEach(page => {
        class PageComponent extends PageContent {
            constructor() {
                super();
                this.setAttribute('title', page.title);
                this.setAttribute('content', page.content);
            }
        }
        customElements.define(`${page.name}-page`, PageComponent);
        router.addRoute(page.path, PageComponent);
    });

    // Add a 404 route
    class NotFoundPage extends PageContent {
        constructor() {
            super();
            this.setAttribute('title', '404 - Page Not Found');
            this.setAttribute('content', 'The page you are looking for does not exist.');
        }
    }
    customElements.define('not-found-page', NotFoundPage);
    router.addRoute('*', NotFoundPage);

    document.body.appendChild(router);
}

initializeApp();