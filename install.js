let deferredPrompt;

// Prüfen ob Install möglich ist
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('App wurde installiert');
                } else {
                    console.log('Installation abgelehnt');
                }

                installButton.style.display = 'none';
                deferredPrompt = null;
            });
        });
    }
});

// Prüfen, ob App schon als PWA läuft → Button gar nicht erst anzeigen
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    console.log("PWA-Modus aktiv");
    document.getElementById('installButton')?.remove();
}
