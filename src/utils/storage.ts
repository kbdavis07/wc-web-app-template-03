const PAGES_CACHE_KEY = 'site_pages';

export async function getPages(): Promise<any[]> {
    const cachedPages = localStorage.getItem(PAGES_CACHE_KEY);
    
    if (cachedPages) {
        return JSON.parse(cachedPages);
    }

    try {
        const response = await fetch('/site.pages.json');
        const pages = await response.json();
        localStorage.setItem(PAGES_CACHE_KEY, JSON.stringify(pages));
        return pages;
    } catch (error) {
        console.error('Failed to load pages:', error);
        return [];
    }
}