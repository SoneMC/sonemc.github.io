document.addEventListener('DOMContentLoaded', function() {
    if (typeof touContent !== 'undefined') {
        document.getElementById('tou-content').textContent = touContent;
    }
    
    if (typeof pcaContent !== 'undefined') {
        document.getElementById('pca-content').textContent = pcaContent;
    }
    
    if (typeof disclaimerContent !== 'undefined') {
        document.getElementById('disclaimer-content').textContent = disclaimerContent;
    }
    
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
});

function handleHashChange() {
    const hash = window.location.hash.substring(1); 
    const validSections = ['tou', 'pca', 'disclaimer'];
    
    if (hash && validSections.includes(hash)) {
        showSection(hash);
    } else {
        showSection('tou');
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    
    const activeButton = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    if (window.location.hash !== `#${sectionId}`) {
        history.replaceState(null, null, `#${sectionId}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            window.location.hash = sectionId;
        });
    });
});