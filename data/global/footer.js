export const footerConfig = {
  sections: [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', url: 'index.html', icon: 'fas fa-home' },
        { text: 'Plugins', url: 'plugins.html', icon: 'fas fa-puzzle-piece' },
      ]
    },
    {
      title: 'Contact',
      links: [
        { text: 'GitHub', url: 'https://github.com/sonemc', icon: 'fab fa-github', external: true },
        { text: 'Discord', url: 'https://sonemcpl.pages.dev/invite', icon: 'fab fa-discord', external: true }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Modrinth', url: 'https://modrinth.com/user/SoneMC', icon: 'fa-solid fa-wrench', external: true },
        { text: 'Spigot', url: 'https://www.spigotmc.org/members/sonemc2.2323927', icon: 'fa-solid fa-faucet', external: true },
        { text: 'PCA', url: 'https://github.com/SoneMC/Plugin-Code-Archive', icon: 'fa fa-archive', external: true },
      ]
    }
  ],

  social: [
    { name: 'GitHub', url: 'https://github.com/sonemc', icon: 'fab fa-github' },
    { name: 'Discord', url: 'https://sonemcpl.pages.dev/invite', icon: 'fab fa-discord' },
    { name: 'Ko-Fi', url: 'https://ko-fi.com/sonemc', icon: 'fas fa-coffee' }
  ],

  description: '*All download counts are estimates only.',
  copyright: `© ${new Date().getFullYear()} Made with 💜 in 2025. (v. July 7)`
};