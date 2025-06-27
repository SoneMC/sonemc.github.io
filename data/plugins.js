export const pluginsData = [
    {
        id: 'tictactoe',
        name: 'TicTacToe',
        version: '1.0.0-beta',
        category: 'fun',
        icon: 'fa-solid fa-gamepad',
        description: 'Working TicTacToe plugin with GUI and customizable settings. Just like on paper.',
        features: [
            'GUI-based gameplay',
            'Leaderboard system',
            'Config.yml for customization'
        ],
        stats: {
            downloads: '0',
            rating: '0',
        },
        featured: true,
        downloadUrl: 'https://www.spigotmc.org/resources/tictactoe.126376/download?version=595076',
        versions: [
            {
                version: '1.0.0-beta',
                date: '2025-06-22',
                changes: 'No changes. First release.',
                downloadUrl: 'https://www.spigotmc.org/resources/tictactoe.126376/download?version=595076'
            }
        ]
    },
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        version: '1.0.0-alpha',
        category: 'fun',
        icon: 'fa-solid fa-gamepad',
        description: 'Working Minesweeper plugin with 6x9 GUI with all functions like real minesweeper.',
        features: [
            'GUI-based gameplay',
            '6x9 grid',
            'Flags',
            '"Mines detection"'
        ],
        stats: {
            downloads: '0',
            rating: '0',
        },
        featured: true,
        downloadUrl: 'https://www.spigotmc.org/resources/minesweeper.126377/download?version=595077',
        versions: [
            {
                version: '1.0.0-alpha',
                date: '2025-06-24',
                changes: 'No changes. First release.',
                downloadUrl: 'https://www.spigotmc.org/resources/minesweeper.126377/download?version=595077'
            }
        ]
    },
    {
        id: 'coinflip',
        name: 'Coinflip',
        version: '1.0.0-alpha',
        category: 'fun',
        icon: 'fa-solid fa-gamepad',
        description: 'Simple coin flip game plugin. Alias "/cf", in-GUI "reflip" button.ㅤㅤㅤㅤㅤㅤㅤ',
        features: [
            'GUI-based gameplay',
            'Heads or Tails',
        ],
        stats: {
            downloads: '0',
            rating: '0',
        },
        featured: true,
        downloadUrl: 'https://www.spigotmc.org/resources/coinflip.126409/download?version=595220',
        versions: [
            {
                version: '1.0.0-alpha',
                date: '2025-06-26',
                changes: 'No changes. First release.',
                downloadUrl: 'https://www.spigotmc.org/resources/coinflip.126409/download?version=595220'
            }
        ]
    },
//    {
//        id: 'plugin3',
//        name: 'Plugin3',
//        version: '1.0.0',
//        category: 'moderation',
//        icon: 'fas fa-chart-line',
//        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//        features: [
//            'Description text',
//            'Description text',
//            'Description text',
//            'Description text',
//            'Description text'
//        ],
//        stats: {
//            downloads: 'Unknown',
//            rating: 'Unknown',
//        },
//        featured: true,
//        downloadUrl: '#',
//        versions: [
//            {
//                version: '1.0.0',
//                date: 'YYYY-MM-DD',
//                changes: 'Changes in this version',
//                downloadUrl: '#'
//            }
//        ]
//    }
];

// Filter plugins by category
export function getPluginsByCategory(category) {
    if (category === 'all') return pluginsData;
    return pluginsData.filter(plugin => plugin.category === category);
}

// Get featured plugins
export function getFeaturedPlugins() {
    return pluginsData.filter(plugin => plugin.featured);
}

// Get plugin by ID
export function getPluginById(id) {
    return pluginsData.find(plugin => plugin.id === id);
}

// Get all categories
export function getCategories() {
    const categories = [...new Set(pluginsData.map(plugin => plugin.category))];
    return categories.map(cat => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }));
}
