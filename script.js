document.addEventListener('DOMContentLoaded', () => {
    
    // --- Comportement de la fausse checkbox ---
    const rgpdBox = document.getElementById('rgpd-checkbox');
    if(rgpdBox) {
        rgpdBox.addEventListener('click', () => {
            rgpdBox.classList.toggle('active');
        });
        // Absence totale d'événement clavier (keydown) pour cette checkbox
    }

    // --- Comportement du formulaire de contact ---
    const btnEnvoyer = document.getElementById('btn-envoyer');
    const feedbackMsg = document.getElementById('form-feedback');

    if(btnEnvoyer) {
        btnEnvoyer.addEventListener('click', () => {
            // Empêcher les clics multiples pendant le chargement
            if (btnEnvoyer.classList.contains('loading')) return;
            
            // État d'attente visible (Loading)
            btnEnvoyer.classList.add('loading');
            const originalText = btnEnvoyer.textContent;
            btnEnvoyer.textContent = "Traitement en cours...";
            btnEnvoyer.style.backgroundColor = "#777";
            feedbackMsg.style.display = 'none';

            // Effet d'attente insupportable (3 secondes pleines)
            setTimeout(() => {
                // Rétablir le bouton
                btnEnvoyer.classList.remove('loading');
                btnEnvoyer.textContent = originalText;
                btnEnvoyer.style.backgroundColor = "#333";

                const nom = document.getElementById('contact-nom').value;
                const email = document.getElementById('contact-email').value;
                const objet = document.getElementById('contact-objet').value;
                const message = document.getElementById('contact-message').value;
                const rgpdChecked = rgpdBox.classList.contains('active');

                // Réinitialisation grossière des styles d'erreur
                const inputs = ['contact-nom', 'contact-email', 'contact-objet', 'contact-message'];
                inputs.forEach(id => {
                    document.getElementById(id).style.borderBottom = "1px solid #ccc";
                });

                let hasError = false;

                if(!nom || !email || !objet || !message) {
                    hasError = true;
                    // On rougit vaguement les champs vides
                    inputs.forEach(id => {
                        if(!document.getElementById(id).value) {
                            document.getElementById(id).style.borderBottom = "1px solid #e74c3c";
                        }
                    });
                }

                if(!rgpdChecked) {
                    hasError = true;
                }

                if(hasError) {
                    // L'erreur est injectée tout en haut de la page, hors de l'écran visible !
                    feedbackMsg.textContent = "Attention : Certaines informations sont manquantes.";
                    feedbackMsg.style.backgroundColor = '#ffebee';
                    feedbackMsg.style.color = '#c62828';
                    feedbackMsg.style.display = 'block';
                    
                    // On NE force PAS le scroll. L'utilisateur doit deviner l'erreur ou scroller de lui-même.
                } else {
                    feedbackMsg.textContent = "Merci, votre message a bien été envoyé.";
                    feedbackMsg.style.backgroundColor = '#e8f5e9';
                    feedbackMsg.style.color = '#2e7d32';
                    feedbackMsg.style.display = 'block';
                }

            }, 3000); // 3 secondes
        });
    }
});
