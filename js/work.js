// 1000ms    = 1 second
// 60000ms = 1 minute
import { maintenanceConfig } from '../data/maintenance.js';

document.addEventListener('DOMContentLoaded', function() {
    loadMaintenanceInfo();
    initCountdownTimer();
    initProgressBar();
    addStatusIndicator();
});

function loadMaintenanceInfo() {
    const infoContainer = document.getElementById('maintenance-info');
    if (!infoContainer) return;
    
    const config = maintenanceConfig;
    const startTime = new Date(config.info.startTime);
    const endTime = new Date(config.info.estimatedEnd);
    
    const infoHTML = `
        <h3>Maintenance Information</h3>
        <div class="info-grid">
            ${config.infoItems.map(item => {
                let value = item.value;
                
                if (value === 'format-start-time') {
                    value = formatToMonthDayYear(startTime);
                } else if (value === 'format-end-time') {
                    value = formatToMonthDayYear(endTime);
                } else if (value === 'format-progress') {
                    value = `${config.progress}%`;
                }
                
                return `
                    <div class="info-item">
                        <i class="${item.icon}"></i>
                        <div class="info-label">${item.label}</div>
                        <div class="info-value">${value}</div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <div class="status-indicator ${config.status}">
            <div class="status-dot"></div>
            ${config.statusMessages[config.status]}
        </div>
        
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${config.progress}%"></div>
        </div>
    `;
    
    infoContainer.innerHTML = infoHTML;
}

function initCountdownTimer() {
    const timerContainer = document.getElementById('maintenance-timer');
    if (!timerContainer) return;
    
    const endTime = new Date(maintenanceConfig.info.estimatedEnd);
    
    const timerHTML = `
        <h3>Estimated Time Remaining</h3>
        <div class="timer-display" id="timer-display">
            <!-- Timer units will be populated by updateTimer -->
        </div>
    `;
    
    timerContainer.innerHTML = timerHTML;
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;
    
    const now = new Date();
    const endTime = new Date(maintenanceConfig.info.estimatedEnd);
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        timerDisplay.innerHTML = `
            <div class="timer-unit">
                <span class="timer-number">00</span>
                <span class="timer-label">Completed</span>
            </div>
        `;
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    const timerHTML = `
        ${days > 0 ? `
            <div class="timer-unit">
                <span class="timer-number">${days.toString().padStart(2, '0')}</span>
                <span class="timer-label">Days</span>
            </div>
        ` : ''}
        <div class="timer-unit">
            <span class="timer-number">${hours.toString().padStart(2, '0')}</span>
            <span class="timer-label">Hours</span>
        </div>
        <div class="timer-unit">
            <span class="timer-number">${minutes.toString().padStart(2, '0')}</span>
            <span class="timer-label">Minutes</span>
        </div>
        <div class="timer-unit">
            <span class="timer-number">${seconds.toString().padStart(2, '0')}</span>
            <span class="timer-label">Seconds</span>
        </div>
    `;
    
    timerDisplay.innerHTML = timerHTML;
}

function initProgressBar() {
    setTimeout(() => {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${maintenanceConfig.progress}%`;
        }
    }, 500);
    
    simulateProgress();
}

function simulateProgress() {
    let currentProgress = maintenanceConfig.progress;
    const progressFill = document.querySelector('.progress-fill');
    
    if (!progressFill) return;
    
    const interval = setInterval(() => {
        if (currentProgress >= 100) {
            clearInterval(interval);
            const container = document.querySelector('.maintenance-content');
            if (container) {
                container.innerHTML = `
                    <div class="maintenance-complete">
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                        <h1>Maintenance Complete!</h1>
                        <p>We're back online. Redirecting you to the homepage...</p>
                    </div>
                `;
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            }
            return;
        }
        
        const increase = Math.random() * 2;
        currentProgress = Math.min(100, currentProgress + increase);
        
        progressFill.style.width = `${currentProgress}%`;
        
        const progressInfo = document.querySelector('.info-item .info-value');
        if (progressInfo && progressInfo.textContent.includes('%')) {
            progressInfo.textContent = `${Math.floor(currentProgress)}%`;
        }
        
    }, 30000); // 30 seconds
}

function addStatusIndicator() {
    const statusIndicator = document.querySelector('.status-indicator');
    if (!statusIndicator) return;
    
    if (maintenanceConfig.status === 'maintenance') {
        statusIndicator.style.animation = 'pulse 2s infinite';
    }
    
    statusIndicator.addEventListener('click', function() {
        showMaintenanceDetails();
    });
}

function showMaintenanceDetails() {
    const modal = document.createElement('div');
    modal.className = 'maintenance-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Maintenance Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <h4>What we're working on:</h4>
                <ul>
                    <li>Server performance optimizations</li>
                    <li>Database maintenance and cleanup</li>
                    <li>Security updates and patches</li>
                    <li>New feature deployment</li>
                    <li>Bug fixes and improvements</li>
                </ul>
                
                <h4>Expected improvements:</h4>
                <ul>
                    <li>Faster page load times</li>
                    <li>Better plugin performance</li>
                    <li>Enhanced security</li>
                    <li>New features and functionality</li>
                </ul>
                
                <p><strong>We apologize for any inconvenience and appreciate your patience!</strong></p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    const modalStyles = `
        .maintenance-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .maintenance-modal .modal-content {
            background: var(--bg-secondary);
            border-radius: 1rem;
            border: 1px solid var(--border-color);
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .maintenance-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .maintenance-modal .modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.25rem;
            transition: all 0.3s ease;
        }
        
        .maintenance-modal .modal-close:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }
        
        .maintenance-modal .modal-body {
            padding: 2rem;
        }
        
        .maintenance-modal .modal-body h4 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            margin-top: 1.5rem;
        }
        
        .maintenance-modal .modal-body h4:first-child {
            margin-top: 0;
        }
        
        .maintenance-modal .modal-body ul {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        
        .maintenance-modal .modal-body li {
            margin-bottom: 0.5rem;
        }
    `;
    
    if (!document.querySelector('#maintenance-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'maintenance-modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
}

function checkMaintenanceStatus() {
    const endTime = new Date(maintenanceConfig.info.estimatedEnd);
    const now = new Date();
    
    if (now > endTime) {
        const container = document.querySelector('.maintenance-content');
        if (container) {
            container.innerHTML = `
                <div class="maintenance-complete">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                    <h1>Maintenance Complete!</h1>
                    <p>We're back online. Redirecting you to the homepage...</p>
                </div>
            `;
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
}

setInterval(checkMaintenanceStatus, 60000);
checkMaintenanceStatus();

function formatToMonthDayYear(date) {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'long' });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
}
