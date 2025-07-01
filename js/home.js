import { siteConfig } from '../data/global/config.js';
import { getFeaturedPlugins } from '../data/plugins.js';
import { formatNumber } from './global.js';

document.addEventListener('DOMContentLoaded', function() {
    loadStats();
    loadAboutContent();
    loadFeaturedPlugins();
    initHeroAnimations();
});

function loadStats() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;
    
    const statsHTML = siteConfig.stats.map(stat => `
        <div class="stat-card">
            <div class="stat-icon">
                <i class="${stat.icon}"></i>
            </div>
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
    
    statsContainer.innerHTML = statsHTML;
    
    animateCounters();
}

function loadAboutContent() {
    const aboutContent = document.getElementById('about-content');
    if (!aboutContent) return;
    
    const aboutHTML = `
        <div class="about-text">
            ${siteConfig.about.description.split('\n\n').map(paragraph => 
                `<p>${paragraph.trim()}</p>`
            ).join('')}
        </div>
        
        <div class="about-features">
            ${siteConfig.about.features.map(feature => `
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="${feature.icon}"></i>
                    </div>
                    <h4 class="feature-title">${feature.title}</h4>
                    <p class="feature-description">${feature.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    aboutContent.innerHTML = aboutHTML;
}

function loadFeaturedPlugins() {
    const featuredContainer = document.getElementById('featured-plugins');
    if (!featuredContainer) return;
    
    const featuredPlugins = getFeaturedPlugins();
    
    const pluginsHTML = featuredPlugins.map(plugin => `
        <div class="plugin-card">
            <div class="plugin-header">
                <div class="plugin-icon">
                    <i class="${plugin.icon}"></i>
                </div>
                <div class="plugin-info">
                    <h3>${plugin.name}</h3>
                    <div class="plugin-version">v${plugin.version}</div>
                </div>
            </div>
            
            <p class="plugin-description">${plugin.description}</p>
            
            <div class="plugin-stats">
                <div class="plugin-stat">
                    <i class="fas fa-download"></i>
                    <span>${plugin.stats.downloads}</span>
                </div>
            </div>
            
            <div class="plugin-actions">
                <a href="${plugin.downloadUrl}" class="btn btn-primary btn-small">
                    <i class="fas fa-download"></i>
                    Download
                </a>
                <a href="plugins.html#${plugin.id}" class="btn btn-secondary btn-small">
                    <i class="fas fa-info-circle"></i>
                    Details
                </a>
            </div>
        </div>
    `).join('');
    
    featuredContainer.innerHTML = pluginsHTML;
}

function initHeroAnimations() {
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach((cube, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 3;
        
        cube.style.left = randomX + '%';
        cube.style.top = randomY + '%';
        cube.style.animationDelay = randomDelay + 's';
        
        cube.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(45deg)';
            this.style.opacity = '0.3';
        });
        
        cube.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.opacity = '0.1';
        });
    });
}

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = element.textContent;
                const isNumber = /^\d+\.?\d*/.test(target);
                
                if (isNumber) {
                    const numericValue = parseFloat(target);
                    let current = 0;
                    const increment = numericValue / 30; // 30 steps
                    const suffix = target.replace(/[\d\.]/g, ''); // Get K, + etc.
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            current = numericValue;
                            clearInterval(timer);
                        }
                        element.textContent = Math.floor(current) + suffix;
                    }, 15);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cubes');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = 'var(--secondary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--secondary-color)';
            }
        });
    });
});