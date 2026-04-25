// Configuration des liens - À MODIFIER AVEC VOS LIENS RÉELS
const config = {
    // Liens d'écoute (streaming)
    streaming: {
        spotify: "https://open.spotify.com/intl-fr/artist/4aJ8Eny1qr91u7B4kp50Pd?si=AxeGUJWwS7K1cZaDgWGDkg",
        deezer: "https://www.deezer.com/fr/artist/387350731",
        apple: "https://music.apple.com/fr/artist/moutemoute/1895471948",
        youtube: "https://music.youtube.com/channel/VOTRE_ID_ICI",
        amazon: "https://music.amazon.fr/artists/B0GYF6SZFM/moutemoute",
        // tidal: "https://tidal.com/browse/artist/VOTRE_ID_ICI"
    },
    // Liens des boutiques (achat)
/*     shops: {
        itunes: "https://itunes.apple.com/fr/album/VOTRE_ID_ICI",
        bandcamp: "https://VOTRE_NOM.bandcamp.com",
        google: "https://play.google.com/store/music/artist/VOTRE_ID_ICI",
        qobuz: "https://www.qobuz.com/fr-fr/interpreter/VOTRE_NOM/XXXXX"
    }
 */};

// Informations de l'artiste - À MODIFIER
const artistInfo = {
    name: "moutemoute",
    bio: "Moutemoute est un artiste indépendant qui transforme ses expériences personnelles en musique. À travers ses morceaux, il raconte des fragments de vie, des émotions sincères et des histoires inspirées de son quotidien. Son univers musical se construit autour de l'authenticité, avec une volonté de parler vrai et de créer une connexion directe avec ceux qui l'écoutent. Tout juste lancé dans son parcours artistique, Moutemoute avance en indépendant, libre de construire son identité à son rythme. Ses textes puisent dans ses ressentis, ses relations et les moments marquants de sa vie. Chaque morceau devient une façon d'exprimer ce qui ne se dit pas toujours avec des mots ordinaires. Entouré de nombreuses personnes qui participent à son inspiration et à son évolution, il construit sa musique comme un projet humain autant qu'artistique. Son entourage nourrit son écriture, influence ses idées et accompagne sa progression. Son titre 'Ami ou Amour' apparaît parmi ses premières sorties musicales. Moutemoute représente une nouvelle voix indépendante : sincère, proche de la réalité et portée par l'envie de raconter une histoire vraie",
    avatarUrl: "image/carré.png" // Remplacez par votre vrai photo URL
};

// Fonction pour mettre à jour les liens de streaming
function updateStreamingLinks() {
    const streamingLinks = {
        "spotify-link": config.streaming.spotify,
        "deezer-link": config.streaming.deezer,
        "apple-link": config.streaming.apple,
        "youtube-link": config.streaming.youtube,
        "amazon-link": config.streaming.amazon,
        "tidal-link": config.streaming.tidal
    };

    for (const [id, url] of Object.entries(streamingLinks)) {
        const element = document.getElementById(id);
        if (element && url && url !== "#") {
            element.href = url;
        }
    }
}

// Fonction pour mettre à jour les liens des boutiques
/* function updateShopLinks() {
    const shopLinks = {
        "itunes-link": config.shops.itunes,
        "bandcamp-link": config.shops.bandcamp,
        "google-link": config.shops.google,
        "qobuz-link": config.shops.qobuz
    };

    for (const [id, url] of Object.entries(shopLinks)) {
        const element = document.getElementById(id);
        if (element && url && url !== "#") {
            element.href = url;
        }
    }
 }
*/
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

    // Mettre à jour l'avatar
    const avatarImg = document.querySelector('.avatar img');
    if (avatarImg) {
        avatarImg.src = artistInfo.avatarUrl;
        avatarImg.alt = `Photo de ${artistInfo.name}`;
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
    const icon = themeToggle.querySelector('i');
    
    // Vérifier si un thème est sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode clair';
    } else {
        // Par défaut, mode clair
        document.body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Mode sombre';
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

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Fonction pour afficher un message si un lien n'est pas configuré
function checkLinks() {
    const allLinks = document.querySelectorAll('.link-card');
    allLinks.forEach(link => {
        if (link.href === '#' || link.href === window.location.href + '#') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.warn('Lien non configuré pour cette plateforme');
                // Optionnel: Afficher une notification
                alert('Ce lien n\'est pas encore configuré. Veuillez vérifier la configuration dans le fichier script.js');
            });
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateArtistInfo();      // Mettre à jour les infos de l'artiste
    updateStreamingLinks();  // Mettre à jour les liens de streaming
    // updateShopLinks();       // Mettre à jour les liens des boutiques
    initThemeToggle();       // Initialiser le mode sombre
    initScrollAnimations();  // Initialiser les animations au scroll
    checkLinks();           // Vérifier les liens manquants

    // Ajouter un effet de suivi de souris subtil (optionnel)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const hero = document.querySelector('.hero');
            if (hero) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                hero.style.background = `linear-gradient(135deg, rgba(102, 126, 234, ${0.95 - mouseY * 0.1}) 0%, rgba(118, 75, 162, ${0.95 - mouseX * 0.1}) 100%)`;
            }
        });
    }
});

// Exporter les configurations pour faciliter la modification (utile pour debugging)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { config, artistInfo };
}