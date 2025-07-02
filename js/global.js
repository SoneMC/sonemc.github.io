import { footerConfig } from '../data/global/footer.js';

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    loadFooter();
    initScrollAnimations();
    initLoadingStates();
});

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            }
        });
    }
}

export function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    ${footerConfig.sections.map(section => `
                        <div class="footer-section">
                            <h3>${section.title}</h3>
                            <ul>
                                ${section.links.map(link => `
                                    <li>
                                        <a href="${link.url}" ${link.external ? 'target="_blank" rel="noopener"' : ''}>
                                            <i class="${link.icon}"></i>
                                            ${link.text}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <div class="footer-bottom">
                    <p class="footer-description">${footerConfig.description}</p>
                    <div class="social-links">
                        ${footerConfig.social.map(social => `
                            <a href="${social.url}" class="social-link" target="_blank" rel="noopener" title="${social.name}">
                                <i class="${social.icon}"></i>
                            </a>
                        `).join('')}
                    </div>
                    <p>${footerConfig.copyright}</p>
                </div>
            </div>
        </footer>
    `;
    
    footerContainer.innerHTML = footerHTML;
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.stat-card, .plugin-card, .feature-card, .plugin-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initLoadingStates() {
    const loadingElements = document.querySelectorAll('[data-loading]');
    loadingElements.forEach(element => {
        element.style.opacity = '0.5';
        element.style.pointerEvents = 'none';
    });
}

export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    return spinner;
}

export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

const loadingStyles = `
    .loading-spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        color: var(--primary-color);
        font-size: 1.5rem;
    }
    
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success { border-color: #10b981; }
    .notification-error { border-color: #ef4444; }
    .notification-info { border-color: var(--primary-color); }
    
    .notification i {
        color: var(--primary-color);
    }
    
    .notification-success i { color: #10b981; }
    .notification-error i { color: #ef4444; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);  