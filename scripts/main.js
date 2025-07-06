document.addEventListener('DOMContentLoaded', function() {
    loadPlugins();
    initializeAnimations();
});

function loadPlugins() {
    const pluginsContainer = document.getElementById('plugins-container');
    
    if (!pluginsContainer || !window.pluginsData) return;
    
    const plugins = window.pluginsData.plugins;
    
    plugins.forEach((plugin, index) => {
        const pluginCard = createPluginCard(plugin, index);
        pluginsContainer.appendChild(pluginCard);
    });
}

function createPluginCard(plugin, index) {
    const card = document.createElement('div');
    card.className = 'plugin-card loading';
    
    const mcVersionsText = plugin.mcVersions.join(', ');
    
    card.innerHTML = `
        <div class="plugin-info">
            <h2 class="plugin-name">${plugin.name}</h2>
            <div class="plugin-version-info">
                <span>v${plugin.currentVersion}</span>
                <span>MC ${mcVersionsText}</span>
            </div>
            <p class="plugin-description">${plugin.description}</p>
            <div class="plugin-buttons">
                <a href="${plugin.downloadUrl}" class="btn btn-primary" target="_blank">
                    Download v${plugin.currentVersion}
                </a>
                <a href="changelog.html?plugin=${plugin.id}" class="btn btn-secondary">Changelog</a>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        card.classList.add('loaded');
    }, index * 200);
    
    return card;
}

function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('.plugin-card').forEach(card => {
        observer.observe(card);
    });
}

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});