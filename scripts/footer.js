document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});

function loadFooter() {
    const footer = document.querySelector('.footer .container');
    
    if (!footer || !window.footerData) return;
    
    footer.innerHTML = '';
    
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';
    
    window.footerData.sections.forEach(section => {
        const sectionElement = createFooterSection(section);
        footerContent.appendChild(sectionElement);
    });
    
    footer.appendChild(footerContent);
    
    const footerBottom = document.createElement('div');
    footerBottom.className = 'footer-bottom';
    footerBottom.innerHTML = `<p>${window.footerData.copyright}</p>`;
    
    footer.appendChild(footerBottom);
}

function createFooterSection(section) {
    const sectionElement = document.createElement('div');
    sectionElement.className = 'footer-section';
    
    const title = document.createElement('h3');
    title.textContent = section.title;
    sectionElement.appendChild(title);
    
    if (section.links) {
        const linksContainer = document.createElement('div');
        linksContainer.className = 'footer-links';
        
        section.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.textContent = link.text;
            linkElement.href = link.url;
            
            if (link.external) {
                linkElement.target = '_blank';
                linkElement.rel = 'noopener';
            }
            
            linksContainer.appendChild(linkElement);
        });
        
        sectionElement.appendChild(linksContainer);
    } else if (section.description) {
        const description = document.createElement('p');
        description.className = 'footer-description';
        description.textContent = section.description;
        sectionElement.appendChild(description);
    }
    
    return sectionElement;
}