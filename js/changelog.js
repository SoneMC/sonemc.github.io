import { changelogData, getChangelogByPlugin, getPluginNames } from '../data/changelog.js';
import { formatDate } from './global.js';

document.addEventListener('DOMContentLoaded', function() {
    initPluginFilter();
    loadChangelog();
});

function initPluginFilter() {
    const filterSelect = document.getElementById('plugin-filter');
    if (!filterSelect) return;
    
    const pluginNames = getPluginNames();
    
    pluginNames.forEach(plugin => {
        const option = document.createElement('option');
        option.value = plugin;
        option.textContent = plugin;
        filterSelect.appendChild(option);
    });
    
    filterSelect.addEventListener('change', function() {
        const selectedPlugin = this.value;
        loadChangelog(selectedPlugin);
        
        const url = new URL(window.location);
        if (selectedPlugin === 'all') {
            url.searchParams.delete('plugin');
        } else {
            url.searchParams.set('plugin', selectedPlugin);
        }
        window.history.pushState({}, '', url);
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const initialPlugin = urlParams.get('plugin') || 'all';
    filterSelect.value = initialPlugin;
    loadChangelog(initialPlugin);
}

function loadChangelog(pluginFilter = 'all') {
    const timelineContainer = document.getElementById('changelog-timeline');
    if (!timelineContainer) return;
    
    const entries = getChangelogByPlugin(pluginFilter);
    
    if (entries.length === 0) {
        timelineContainer.innerHTML = `
            <div class="changelog-empty">
                <i class="fas fa-history"></i>
                <h3>No changelog entries found</h3>
                <p>No changelog entries match the selected filter.</p>
            </div>
        `;
        return;
    }
    
    const timelineHTML = entries.map((entry, index) => `
        <div class="changelog-entry" style="animation-delay: ${index * 0.1}s">
            <div class="changelog-card">
                <div class="changelog-header">
                    <div class="changelog-title">
                        <h3>${entry.plugin}</h3>
                        <div class="changelog-version">
                            <i class="fas fa-tag"></i>
                            v${entry.version}
                        </div>
                    </div>
                    <div class="changelog-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(entry.date)}
                    </div>
                </div>
                
                <div class="changelog-type ${entry.type}">${getTypeLabel(entry.type)}</div>
                
                <div class="changelog-content">
                    <p>${entry.description}</p>
                </div>
                
                ${generateChangesHTML(entry.changes)}
                
            </div>
        </div>
    `).join('');
    
    timelineContainer.innerHTML = timelineHTML;
}

function generateChangesHTML(changes) {
    if (!changes) return '';
    
    let changesHTML = '<div class="changelog-changes">';
    
    if (changes.added && changes.added.length > 0) {
        changesHTML += `
            <h4><i class="fas fa-plus"></i> Added</h4>
            <ul class="changelog-list added">
                ${changes.added.map(item => `
                    <li><i class="fas fa-plus-circle"></i> ${item}</li>
                `).join('')}
            </ul>
        `;
    }
    
    if (changes.changed && changes.changed.length > 0) {
        changesHTML += `
            <h4><i class="fas fa-edit"></i> Changed</h4>
            <ul class="changelog-list changed">
                ${changes.changed.map(item => `
                    <li><i class="fas fa-edit"></i> ${item}</li>
                `).join('')}
            </ul>
        `;
    }
    
    if (changes.fixed && changes.fixed.length > 0) {
        changesHTML += `
            <h4><i class="fas fa-bug"></i> Fixed</h4>
            <ul class="changelog-list fixed">
                ${changes.fixed.map(item => `
                    <li><i class="fas fa-bug"></i> ${item}</li>
                `).join('')}
            </ul>
        `;
    }
    
    if (changes.removed && changes.removed.length > 0) {
        changesHTML += `
            <h4><i class="fas fa-minus"></i> Removed</h4>
            <ul class="changelog-list removed">
                ${changes.removed.map(item => `
                    <li><i class="fas fa-minus-circle"></i> ${item}</li>
                `).join('')}
            </ul>
        `;
    }
    
    changesHTML += '</div>';
    return changesHTML;
}

function getTypeLabel(type) {
    const labels = {
        major: 'Major Release',
        minor: 'Minor Update',
        patch: 'Bug Fix',
        beta: 'Beta Release',
        alpha: 'Alpha Release'
    };
    return labels[type] || 'Update';
}

function initChangelogSearch() {
    const searchInput = document.getElementById('changelog-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const entries = document.querySelectorAll('.changelog-entry');
        
        entries.forEach(entry => {
            const content = entry.textContent.toLowerCase();
            if (content.includes(searchTerm)) {
                entry.style.display = 'block';
            } else {
                entry.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const changelogCards = document.querySelectorAll('.changelog-card');
    
    changelogCards.forEach(card => {
        const changes = card.querySelector('.changelog-changes');
        if (changes && changes.children.length > 3) {

            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'btn btn-outline btn-small changelog-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More';
            
            changes.style.maxHeight = '200px';
            changes.style.overflow = 'hidden';
            changes.style.position = 'relative';
            
            const fadeOverlay = document.createElement('div');
            fadeOverlay.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 50px;
                background: linear-gradient(transparent, var(--bg-secondary));
                pointer-events: none;
            `;
            changes.appendChild(fadeOverlay);
            
            toggleBtn.addEventListener('click', function() {
                if (changes.style.maxHeight === '200px') {
                    changes.style.maxHeight = 'none';
                    fadeOverlay.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
                } else {
                    changes.style.maxHeight = '200px';
                    fadeOverlay.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-chevron-down"></i> Show More';
                }
            });
            
            card.appendChild(toggleBtn);
        }
    });
});

function addTimelineNavigation() {
    const timeline = document.getElementById('changelog-timeline');
    if (!timeline) return;
    
    const nav = document.createElement('div');
    nav.className = 'timeline-nav';
    nav.innerHTML = `
        <button class="btn btn-outline btn-small" onclick="scrollToTop()">
            <i class="fas fa-arrow-up"></i>
            Back to Top
        </button>
    `;
    
    timeline.appendChild(nav);
}

window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};