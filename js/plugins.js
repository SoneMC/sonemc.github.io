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
    
    const pluginsHTML = plugins.map(plugin => `
        <div class="plugin-item" data-category="${plugin.category}" id="${plugin.id}">
            <div class="plugin-main">
                <div class="plugin-icon">
                    <i class="${plugin.icon}"></i>
                </div>
                <div class="plugin-details">
                    <h3>${plugin.name}</h3>
                    <div class="plugin-version">
                        <i class="fas fa-tag"></i>
                        v${plugin.version}
                    </div>
                    <div class="plugin-category">${plugin.category}</div>
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
                    <div class="plugin-meta-item">
                        <i class="fas fa-star"></i>
                        <span>${plugin.stats.rating}/5</span>
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
    `).join('');
    
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

function initModal() {
    const modal = document.getElementById('version-modal');
    const closeBtn = document.getElementById('modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
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

window.showVersions = function(pluginId) {
    const plugin = pluginsData.find(p => p.id === pluginId);
    if (!plugin) return;
    
    const modal = document.getElementById('version-modal');
    const modalTitle = document.getElementById('modal-plugin-name');
    const modalVersions = document.getElementById('modal-versions');
    
    modalTitle.textContent = `${plugin.name} - Version History`;
    
    const versionsHTML = plugin.versions.map(version => `
        <div class="version-item">
            <div class="version-info">
                <h4>Version ${version.version}</h4>
                <div class="version-date">
                    <i class="fas fa-calendar"></i>
                    ${new Date(version.date).toLocaleDateString()}
                </div>
                <div class="version-changes">${version.changes}</div>
            </div>
            <a href="${version.downloadUrl}" class="btn btn-primary btn-small" onclick="trackDownload('${pluginId}', '${version.version}')">
                <i class="fas fa-download"></i>
                Download
            </a>
        </div>
    `).join('');
    
    modalVersions.innerHTML = versionsHTML;
    modal.classList.add('active');
};

// for future
// window.trackDownload = function(pluginId, version = 'latest') {
//     showNotification(`Starting download for ${pluginId} ${version}`, 'success');
//     
//     console.log(`Download tracked: ${pluginId} - ${version}`);
// };

window.trackDownload = function(pluginId, version = 'latest') {
    showNotification(`Downloading from SpigotMC `, 'success');

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