// Global site configuration
export const siteConfig = {
    name: 'SoneMC',
    author: 'SoneMC',
    contact: {
        github: 'https://github.com/somemc',
        discord: 'https://discord.gg/yourdiscord',
        kofi: 'https://ko-fi.com/somemc'
    },
    
    // About section content
    about: {
        title: 'About SoneMC',
        description: `Hey there! Welcome to SoneMC, where I'm trying to make plugins for fun. My focus is on "Fun" and GUI-based as you can see in every plugin.

        Every plugin will get an update atleast once per 2 weeks to keep it stable and not boring. If you want to support me, just download one plugin, play it and rate it. And if you run
        into any problem, just contact me on Discord!`,
        
        features: [
            {
                icon: 'fas fa-rocket',
                title: 'Performance',
                description: 'Optimized plugins with AI assistance for speed and efficiency'
            },
            {
                icon: 'fas fa-heart',
                title: 'Community',
                description: 'If you run into any issues, you can always reach out'
            },
        ]
    },
    
    // Site statistics
    stats: [
        {
            icon: 'fas fa-download',
            number: '~100',
            label: 'Downloads'
        },
        {
            icon: 'fas fa-puzzle-piece',
            number: '4',
            label: 'Plugins'
        },
        {
            icon: 'fas fa-users',
            number: 'Unknown',
            label: 'Happy Users'
        },
        {
            icon: 'fas fa-star',
            number: 'Unknown',
            label: 'Average Rating'
        }
    ]
};