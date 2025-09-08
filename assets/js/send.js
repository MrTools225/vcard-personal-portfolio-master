// Ce fichier JavaScript envoie le message à Telegram via une requête fetch

// Les identifiants Telegram sont désormais gérés côté serveur pour plus de sécurité.

// Attendre la soumission du formulaire pour récupérer le message
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.querySelector('textarea[name="message"]').value;
    const name = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;

    // Ajouter le nom et l'email au message
    const text = `<b>🚨 Nouveau message reçu !</b>\n<b>👤 Nom:</b> ${name}\n<b>✉️ E-mail:</b> ${email}\n<b>💬 Message:</b> ${message}`;

    // Envoyer la requête à votre serveur qui gère l'envoi à Telegram
    fetch('/api/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.ok) {
            // Afficher un message de succès dans une boîte stylée
            const successBox = document.createElement('div');
            successBox.innerHTML = '<strong>Message envoyé avec succès !</strong>';
            successBox.style.background = '#d4edda';
            successBox.style.color = '#155724';
            successBox.style.padding = '10px';
            successBox.style.marginTop = '10px';
            successBox.style.borderRadius = '5px';
            successBox.style.border = '1px solid #c3e6cb';
            document.querySelector('form').appendChild(successBox);
            // Réinitialiser le formulaire
            document.querySelector('form').reset();
        } else {
            throw new Error('Erreur lors de l\'envoi du message');
        }
    })
    .catch(error => {
        // Afficher un message d'erreur dans une boîte stylée
        const errorBox = document.createElement('div');
        errorBox.innerHTML = `<strong>Erreur :</strong> ${error.message}`;
        errorBox.style.background = '#f8d7da';
        errorBox.style.color = '#721c24';
        errorBox.style.padding = '10px';
        errorBox.style.marginTop = '10px';
        errorBox.style.borderRadius = '5px';
        errorBox.style.border = '1px solid #f5c6cb';
        document.querySelector('form').appendChild(errorBox);
        console.error('Erreur:', error);
    });
});
