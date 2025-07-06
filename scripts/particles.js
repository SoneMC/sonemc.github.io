class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles-container');
        this.maxParticles = 50;
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 10 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        const delay = Math.random() * 20;
        particle.style.animationDelay = `${delay}s`;
        
        const opacity = Math.random() * 0.1 + 0.05;
        particle.style.setProperty('--particle-opacity', opacity);
        
        const colors = ['#ff69b4', '#9a4dd6', '#ff1493', '#7b2fb8'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                const index = this.particles.indexOf(particle);
                if (index > -1) {
                    this.particles.splice(index, 1);
                }
                this.createParticle();
            }
        }, (duration + delay) * 1000);
    }
    
    animate() {
        let mouseTimeout;
        document.addEventListener('mousemove', (e) => {
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                if (Math.random() < 0.1) { // 10% 
                    this.createMouseParticle(e.clientX, e.clientY);
                }
            }, 100);
        });
    }
    
    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = '#ff69b4';
        particle.style.opacity = '0.3';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = 'mouseParticle 2s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes mouseParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystem();
});