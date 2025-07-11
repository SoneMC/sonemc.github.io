const pluginsData = {
    plugins: [
        {
            id: 'sonerpg',
            name: 'SoneRPG',
            description: 'Skyrim-themed (RPG-like) plugin with races, quests, shops, smithing, skills & lot more..',
            currentVersion: '1.0.0-B3_Early',
            mcVersions: ['1.20.x'],
            downloadUrl: 'https://modrinth.com/plugin/sonerpg#download',
            changelog: [
                {
                    version: '1.0.0-B3_Early',
                    date: '2025-07-10',
                    githubUrl: 'https://github.com/SoneMC/SoneRPG/releases/tag/1.0.0-B3_Early',
                    downloadUrl: 'https://modrinth.com/plugin/sonerpg/version/1.0.0-B3_Early',
                    description: `
                    ADDED | Update-checker<br>
                    ADDED | Better help command (/sonerpg help)<br>
                    FIXED | Performance<br>
                    CHANGED | Attack Particles<br>
                    REMOVED | Few items from shop`
                },
                {
                    version: '1.0.0-B2_Early',
                    date: '2025-07-08',
                    githubUrl: 'https://github.com/SoneMC/SoneRPG/releases/tag/1.0.0-B2_Early',
                    downloadUrl: 'https://modrinth.com/plugin/sonerpg/version/1.0.0-B2_Early',
                    description: `
                    ADDED | Stamina & Stamina skill upgrade<br>
                          - Stamina is draining when: Attacking mobs with weapon (-10%), attacking mobs with hand (-1%), mobs wont be hurt when player's stamina is 0%, player will be slowed down when stamina is 0%<br><br>
                    FIXED | Sometimes mob healed, when full HP`
                },
                {
                    version: '1.0.0-B1_Early',
                    date: '2025-07-07',
                    githubUrl: 'https://github.com/SoneMC/SoneRPG/releases/tag/1.0.0-B1_Early',
                    downloadUrl: 'https://modrinth.com/plugin/sonerpg/version/1.0.0-B1_Early',
                    description: 'First public version. There may be a lot of problems but on testing, everything was fine. Keep in mind that fron this version, there will be even more updates with more "drastic" changes. If you want to test this plugin, feel free. If you want to use it, use it, but I recommend to use it for fun/testing and not for public servers'
                }
            ]
        },
    ]
};

window.pluginsData = pluginsData;
