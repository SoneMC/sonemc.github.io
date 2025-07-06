document.addEventListener('DOMContentLoaded', function() {
    loadChangelog();
    initializeChangelogAnimations();
});

function loadChangelog() {
    const changelogContainer = document.getElementById('changelog-container');
    
    if (!changelogContainer || !window.pluginsData) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const pluginId = urlParams.get('plugin');
    
    if (pluginId) {
        const plugin = window.pluginsData.plugins.find(p => p.id === pluginId);
        if (plugin) {
            displayPluginChangelog(plugin, changelogContainer);
        }
    } else {
        window.pluginsData.plugins.forEach(plugin => {
            displayPluginChangelog(plugin, changelogContainer);
        });
    }
}

function displayPluginChangelog(plugin, container) {
    const pluginSection = document.createElement('div');
    pluginSection.className = 'changelog-plugin';
    
    const title = document.createElement('h2');
    title.className = 'changelog-plugin-title';
    title.textContent = plugin.name;
    pluginSection.appendChild(title);
    
    const table = document.createElement('table');
    table.className = 'changelog-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Version</th>
            <th>Description</th>
            <th>Download</th>
        </tr>
    `;
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    plugin.changelog.forEach(version => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <a href="${version.githubUrl}" class="version-link" target="_blank">
                    v${version.version}
                </a>
            </td>
            <td class="changelog-description">
                ${version.description}
            </td>
            <td>
                <a href="${version.downloadUrl}" class="changelog-download-btn" target="_blank">
                    Download
                </a>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    pluginSection.appendChild(table);
    container.appendChild(pluginSection);
}

function initializeChangelogAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    setTimeout(() => {
        document.querySelectorAll('.changelog-table').forEach((table, index) => {
            setTimeout(() => {
                table.classList.add('loaded');
            }, index * 150);
            
            observer.observe(table);
        });
    }, 100);
}