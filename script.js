// Configuration des liens - À MODIFIER AVEC VOS LIENS RÉELS
const config = {
    // Liens d'écoute (streaming)
    streaming: {
        spotify: "https://open.spotify.com/intl-fr/artist/4aJ8Eny1qr91u7B4kp50Pd?si=AxeGUJWwS7K1cZaDgWGDkg",
        deezer: "https://www.deezer.com/fr/artist/387350731",
        apple: "https://music.apple.com/fr/artist/moutemoute/1895471948",
        // youtube: "https://music.youtube.com/channel/UCVOTRE_ID", // ← À REMPLACER par votre vrai lien YouTube Music
        amazon: "https://music.amazon.fr/artists/B0GYF6SZFM/moutemoute",
        // tidal: "https://tidal.com/browse/artist/VOTRE_ID_ICI"
    }
};

// Informations de l'artiste
const artistInfo = {
    name: "moutemoute",
    bio: "Moutemoute est un artiste indépendant qui transforme ses expériences personnelles en musique. À travers ses morceaux, il raconte des fragments de vie, des émotions sincères et des histoires inspirées de son quotidien. Son univers musical se construit autour de l'authenticité, avec une volonté de parler vrai et de créer une connexion directe avec ceux qui l'écoutent. Tout juste lancé dans son parcours artistique, Moutemoute avance en indépendant, libre de construire son identité à son rythme. Ses textes puisent dans ses ressentis, ses relations et les moments marquants de sa vie. Chaque morceau devient une façon d'exprimer ce qui ne se dit pas toujours avec des mots ordinaires. Entouré de nombreuses personnes qui participent à son inspiration et à son évolution, il construit sa musique comme un projet humain autant qu'artistique. Son entourage nourrit son écriture, influence ses idées et accompagne sa progression. Son titre 'Ami ou Amour' apparaît parmi ses premières sorties musicales. Moutemoute représente une nouvelle voix indépendante : sincère, proche de la réalité et portée par l'envie de raconter une histoire vraie",
    avatarUrl: "image/carré.png"
};

// Fonction pour mettre à jour les liens de streaming
function updateStreamingLinks() {
    const streamingLinks = {
        "spotify-link": config.streaming.spotify,
        "deezer-link": config.streaming.deezer,
        "apple-link": config.streaming.apple,
        "youtube-link": config.streaming.youtube,
        "amazon-link": config.streaming.amazon
    };

    for (const [id, url] of Object.entries(streamingLinks)) {
        const element = document.getElementById(id);
        if (element && url && url !== "#" && url !== "VOTRE_ID_ICI") {
            element.href = url;
        }
    }
}

// Fonction pour mettre à jour les informations de l'artiste
function updateArtistInfo() {
    // Mettre à jour le nom
    const nameElement = document.querySelector('.hero h1');
    if (nameElement) {
        nameElement.textContent = artistInfo.name;
        document.title = `${artistInfo.name} | Mes liens musicaux`;
    }

    // Mettre à jour la biographie
    const bioElement = document.querySelector('.bio');
    if (bioElement) {
        bioElement.textContent = artistInfo.bio;
    }

    // Mettre à jour l'avatar (avec gestion d'erreur)
    const avatarImg = document.querySelector('.avatar img');
    if (avatarImg) {
        avatarImg.src = artistInfo.avatarUrl;
        avatarImg.alt = `Photo de ${artistInfo.name}`;
        
        // Si l'image ne charge pas, afficher les initiales
        avatarImg.onerror = function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            parent.style.backgroundColor = '#1DB954';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            const initial = document.createElement('span');
            initial.textContent = artistInfo.name.charAt(0).toUpperCase();
            initial.style.fontSize = '3rem';
            initial.style.fontWeight = 'bold';
            initial.style.color = 'white';
            parent.appendChild(initial);
        };
    }

    // Mettre à jour le footer
    const footerYear = document.querySelector('.footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `© ${currentYear} ${artistInfo.name} - Tous droits réservés`;
    }
}

// Fonction pour le mode sombre/clair
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Vérifier si un thème est sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode clair';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode clair';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Mode sombre';
        }
    });
}

// Fonction pour ajouter des animations au scroll
function initScrollAnimations() {
    const cards = document.querySelectorAll('.link-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Fonction pour vérifier les liens
function checkLinks() {
    const allLinks = document.querySelectorAll('.link-card');
    allLinks.forEach(link => {
        if (link.href === '#' || link.href === window.location.href + '#' || link.href.includes('VOTRE_ID_ICI')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.querySelector('.card-info h3')?.textContent || 'cette plateforme';
                alert(`🔗 Le lien pour ${platform} n'est pas encore configuré.\n\nModifiez le fichier script.js pour ajouter votre lien.`);
            });
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateArtistInfo();
    updateStreamingLinks();
    initThemeToggle();
    initScrollAnimations();
    checkLinks();
});