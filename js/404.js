import { loadFooter } from './global.js';

document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
    initErrorAnimations();
    addDynamicSuggestions();
    trackErrorPage();
});

function initErrorAnimations() {
    const errorTitle = document.querySelector('.error-title');
    if (errorTitle) {

        errorTitle.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 30px rgba(139, 92, 246, 0.8), 2px 2px 0 rgba(236, 72, 153, 0.5)';
        });
        
        errorTitle.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
        });
    }
}

function addDynamicSuggestions() {
    const currentPath = window.location.pathname;
    const suggestions = document.querySelector('.error-suggestions ul');
    if (!suggestions) return;
    
    const pathSegments = currentPath.split('/').filter(segment => segment);
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    if (lastSegment) {
        const corrections = {
            'plugin': 'plugins.html',
            'home': 'index.html',
            'about': 'index.html#about'
        };
        
        const correction = corrections[lastSegment.toLowerCase()];
        if (correction) {
            const suggestionItem = document.createElement('li');
            suggestionItem.innerHTML = `
                <i class="fas fa-lightbulb"></i>
                Did you mean <a href="${correction}">${correction}</a>?
            `;
            suggestions.insertBefore(suggestionItem, suggestions.firstChild);
        }
    }
}

function trackErrorPage() {
    const referrer = document.referrer;
    const currentURL = window.location.href;
    const userAgent = navigator.userAgent;
    
    console.log('404 Error Tracked:', {
        url: currentURL,
        referrer: referrer,
        userAgent: userAgent,
        timestamp: new Date().toISOString()
    });
}

document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'h':
        case 'H':
            window.location.href = 'index.html';
            break;
        case 'b':
        case 'B':
            history.back();
            break;
        case 'r':
        case 'R':
            location.reload();
            break;
    }
});