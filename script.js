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
            // Effet subtil : Latence volontaire pour simuler un manque de réactivité sans loader
            setTimeout(() => {
                const nom = document.getElementById('contact-nom').value;
                const email = document.getElementById('contact-email').value;
                const objet = document.getElementById('contact-objet').value;
                const message = document.getElementById('contact-message').value;
                const rgpdChecked = rgpdBox.classList.contains('active');

                // Réinitialisation grossière des styles d'erreur (juste la bordure passe au rouge)
                const inputs = ['contact-nom', 'contact-email', 'contact-objet', 'contact-message'];
                inputs.forEach(id => {
                    document.getElementById(id).style.borderBottom = "1px solid #ccc";
                });

                let hasError = false;

                if(!nom || !email || !objet || !message) {
                    hasError = true;
                    // On rougit vaguement les champs vides mais c'est peu visible
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
                    // Erreur éloignée des champs, très générique !
                    feedbackMsg.textContent = "Certaines informations sont manquantes ou incorrectes.";
                    feedbackMsg.style.display = 'block';
                } else {
                    feedbackMsg.textContent = "Votre message a été envoyé (enfin, simulé !).";
                    feedbackMsg.style.backgroundColor = '#e8f5e9';
                    feedbackMsg.style.color = '#2e7d32';
                    feedbackMsg.style.display = 'block';
                }

            }, 1200); // 1.2s de latence sans spinner, suffisant pour frustrer l'utilisateur

        });
    }
});
