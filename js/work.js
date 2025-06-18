import { maintenanceConfig } from '../data/maintenance.js';

document.addEventListener('DOMContentLoaded', function() {
    loadMaintenanceInfo();
    initCountdownTimer();
    addStatusIndicator();
});

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

checkMaintenanceStatus();

function formatToMonthDayYear(date) {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'long' });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
}
