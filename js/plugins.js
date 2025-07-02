import { pluginsData, getPluginsByCategory, getCategories } from '../data/plugins.js';
import { showNotification } from './global.js';

document.addEventListener('DOMContentLoaded', function() {
    loadPlugins();
    initFiltering();
    initModal();
    handleURLHash();
});

function loadPlugins(category = 'all') {
    const pluginsList = document.getElementById('plugins-list');
    if (!pluginsList) return;
    
    const plugins = getPluginsByCategory(category);
    
    if (plugins.length === 0) {
        pluginsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No plugins found</h3>
                <p>No plugins match the selected category.</p>
            </div>
        `;
        return;
    }
    
    const pluginsHTML = plugins.map(plugin => {
        let categories = Array.isArray(plugin.category) ? [...plugin.category] : [plugin.category];
        const archiveIndex = categories.indexOf('archive');
        let archiveTag = '';
        if (archiveIndex !== -1) {
            archiveTag = `<div class="plugin-version plugin-archive-tag"><i class="fas fa-archive"></i> Archive</div>`;
            categories.splice(archiveIndex, 1); 
        }
        return `
            <div class="plugin-item" data-category="${plugin.category}" id="${plugin.id}">
                <div class="plugin-main">
                    <div class="plugin-icon">
                        <i class="${plugin.icon}"></i>
                    </div>
                    <div class="plugin-details">
                        <h3>${plugin.name}</h3>
                        <div class="plugin-version-row">
                            <div class="plugin-version">
                                <i class="fas fa-tag"></i>
                                v${plugin.version}
                            </div>
                            ${archiveTag}
                            <div class="plugin-categories">
                                ${categories.map(cat => `<span class="plugin-category">${cat}</span>`).join(' ')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <p class="plugin-description">${plugin.description}</p>
                
                <div class="plugin-features">
                    <h4><i class="fas fa-star"></i> Key Features</h4>
                    <ul>
                        ${plugin.features.map(feature => `
                            <li><i class="fas fa-check"></i> ${feature}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="plugin-footer">
                    <div class="plugin-meta">
                        <div class="plugin-meta-item">
                            <i class="fas fa-download"></i>
                            <span>${plugin.stats.downloads} downloads</span>
                        </div>
                    </div>
                    <div class="plugin-actions">
                        <a href="${plugin.downloadUrl}" class="btn btn-primary btn-small" onclick="trackDownload('${plugin.id}')">
                            <i class="fas fa-download"></i>
                            Download Latest
                        </a>
                        <button class="btn btn-versions btn-small" onclick="showVersions('${plugin.id}')">
                            <i class="fas fa-history"></i>
                            All Versions
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    pluginsList.innerHTML = pluginsHTML;
    
    const pluginItems = pluginsList.querySelectorAll('.plugin-item');
    pluginItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
}

function initFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.filter;
            loadPlugins(category);
            
            const url = new URL(window.location);
            if (category === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', category);
            }
            window.history.pushState({}, '', url);
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category') || 'all';
    
    const activeButton = document.querySelector(`.filter-btn[data-filter="${initialCategory}"]`);
    if (activeButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
    
    loadPlugins(initialCategory);
}

window.showVersions = function(pluginId) {
    const plugin = getPluginById(pluginId);
    if (!plugin) return;
    const modal = document.getElementById('version-modal');
    const modalName = document.getElementById('modal-plugin-name');
    const modalVersions = document.getElementById('modal-versions');

    modalName.textContent = plugin.name + ' - Versions';
    modalVersions.innerHTML = plugin.versions.map((v, i, arr) => `
        <div class="version-item">
            <div class="version-info">
                <h4>${v.version}</h4>
                <div class="version-date">${v.date || ''}</div>
                <div class="version-changes">${v.changes || ''}</div>
            </div>
            <a href="${v.downloadUrl}" class="btn btn-primary btn-small" onclick="trackDownload('${plugin.id}', '${v.version}')">
                <i class="fas fa-download"></i> Download
            </a>
        </div>
        ${i < arr.length - 1 ? '<hr class="version-separator">' : ''}
    `).join('');
    modal.classList.add('active');
};

function initModal() {
    const modal = document.getElementById('version-modal');
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

window.trackDownload = function(pluginId, version = 'latest') {
    showNotification(`Redirecting to Modrinth `, 'success');

    console.log(`Redirect tracked: ${pluginId} - ${version}`);
};

function handleURLHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        setTimeout(() => {
            const pluginElement = document.getElementById(hash);
            if (pluginElement) {
                pluginElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                pluginElement.style.borderColor = 'var(--primary-color)';
                pluginElement.style.boxShadow = '0 0 20px var(--shadow-color)';
                
                setTimeout(() => {
                    pluginElement.style.borderColor = '';
                    pluginElement.style.boxShadow = '';
                }, 3000);
            }
        }, 500);
    }
}

function initSearch() {
    const searchInput = document.getElementById('plugin-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const pluginItems = document.querySelectorAll('.plugin-item');
        
        pluginItems.forEach(item => {
            const pluginName = item.querySelector('h3').textContent.toLowerCase();
            const pluginDescription = item.querySelector('.plugin-description').textContent.toLowerCase();
            
            if (pluginName.includes(searchTerm) || pluginDescription.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .plugin-item {
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-muted);
            grid-column: 1 / -1;
        }
        
        .empty-state i {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        .empty-state h3 {
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
        }
    `;
    document.head.appendChild(style);
});

function getPluginById(pluginId) {
    return pluginsData.find(plugin => plugin.id === pluginId);
}