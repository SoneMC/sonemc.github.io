class AnimationManager {
    constructor() {
        this.animations = [];
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);
        
        document.querySelectorAll('.plugin-card, .changelog-version').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    
    setupHoverEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', this.animateButtonHover.bind(this));
            btn.addEventListener('mouseleave', this.animateButtonLeave.bind(this));
        });
        
        document.querySelectorAll('.plugin-visual').forEach(visual => {
            visual.addEventListener('mouseenter', this.animatePluginHover.bind(this));
            visual.addEventListener('mouseleave', this.animatePluginLeave.bind(this));
        });
    }
    
    animateElement(element) {
        if (element.classList.contains('plugin-card')) {
            this.animatePluginCard(element);
        } else if (element.classList.contains('changelog-version')) {
            this.animateChangelogVersion(element);
        }
    }
    
    animatePluginCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
        
        const children = card.querySelectorAll('.plugin-name, .plugin-description, .btn');
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                child.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }
    
    animateChangelogVersion(version) {
        version.style.opacity = '0';
        version.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            version.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            version.style.opacity = '1';
            version.style.transform = 'translateY(0)';
        }, 100);
    }
    
    animateButtonHover(event) {
        const btn = event.target;
        const ripple = document.createElement('div');
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'all 0.3s ease';
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 300);
    }
    
    animateButtonLeave(event) {
        const ripples = event.target.querySelectorAll('div');
        ripples.forEach(ripple => {
            if (ripple.style.position === 'absolute') {
                ripple.remove();
            }
        });
    }
    
    animatePluginHover(event) {
        const visual = event.target;
        visual.style.transform = 'translateY(-10px) scale(1.02)';
        visual.style.boxShadow = '0 25px 50px rgba(255, 105, 180, 0.4)';
    }
    
    animatePluginLeave(event) {
        const visual = event.target;
        visual.style.transform = 'translateY(0) scale(1)';
        visual.style.boxShadow = '0 4px 20px rgba(255, 105, 180, 0.3)';
    }
    
    createAnimation(element, keyframes, options = {}) {
        return element.animate(keyframes, {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'both',
            ...options
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});