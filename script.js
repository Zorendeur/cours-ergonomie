document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-order');
    const fakeBox = document.getElementById('cgv-box');
    
    // Interaction avec la fausse checkbox (impossible au clavier)
    fakeBox.addEventListener('click', () => {
        fakeBox.classList.toggle('checked');
    });

    // Pas de gestion de l'événement "keydown" sur Entrée car on utilise des <div>

    submitBtn.addEventListener('click', () => {
        // Simulation d'une latence réseau ans aucun loader (absence de feedback)
        setTimeout(() => {
            let hasErrors = false;
            const fields = ['prenom', 'nom', 'email', 'adresse', 'cp', 'ville'];
            
            // Nettoyage des erreurs précédentes
            fields.forEach(f => document.getElementById(f).classList.remove('error'));
            const globalErrors = document.getElementById('global-errors');
            globalErrors.style.display = 'none';

            // Validation sommaire
            fields.forEach(f => {
                const el = document.getElementById(f);
                if (!el.value.trim()) {
                    hasErrors = true;
                    el.classList.add('error'); // On change uniquement la bordure
                }
            });

            if (!fakeBox.classList.contains('checked')) {
                hasErrors = true;
            }

            if (hasErrors) {
                // Erreur affichée tout en haut de la page, loin du champ fautif
                globalErrors.innerHTML = "Une erreur est survenue dans le formulaire.";
                globalErrors.style.display = 'block';
                // On remonte la page, l'utilisateur perd son focus 
                window.scrollTo(0, 0);
            } else {
                // Succès non stylisé
                alert("Paiement validé.");
            }
        }, 3500); // Latence de 3.5 secondes très frustrante
    });
});
