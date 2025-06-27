export const changelogData = [

        {
        id: 'coinflip',
        plugin: 'Coinflip',
        version: '1.0.0-alpha',
        date: '2025-06-26',
        type: 'alpha', // 'major', 'minor', 'patch', 'beta', 'alpha'
        description: 'Simple coin flip game plugin.',
        changes: {
            added: [
                'GUI-based gameplay',
                'Heads or Tails'
            ]
        },
    },
        {
        id: 'minesweeper',
        plugin: 'Minesweeper',
        version: '1.0.0-alpha',
        date: '2025-06-24',
        type: 'alpha', // 'major', 'minor', 'patch', 'beta', 'alpha'
        description: 'Working Minesweeper plugin with 6x9 GUI with all functions like real minesweeper.',
        changes: {
            added: [
                'GUI-based gameplay',
                '6x9 grid',
                'Flags',
                '"Mines detection"'
            ]
        },
    },
    {
        id: 'tictactoe',
        plugin: 'TicTacToe',
        version: '1.0.0-beta',
        date: '2025-06-22',
        type: 'beta', // 'major', 'minor', 'patch', 'beta', 'alpha'
        description: 'Working TicTacToe plugin with GUI and customizable settings.',
        changes: {
            added: [
            'GUI-based gameplay',
            'Leaderboard system',
            'Config.yml for customization'
            ]
        },
    }

    
];

export function getChangelogByPlugin(pluginName) {
    if (pluginName === 'all') return changelogData;
    return changelogData.filter(entry => entry.plugin === pluginName);
}

export function getPluginNames() {
    const plugins = [...new Set(changelogData.map(entry => entry.plugin))];
    return plugins.sort();
}

export function getChangelogById(id) {
    return changelogData.find(entry => entry.id === id);
}

export function getRecentChangelog(limit = 5) {
    return changelogData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}