document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.querySelector('textarea[name="message"]').value;
    const name = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;

    const botToken = '8228123903:AAFWYau5mNMC1xbsoVEk8bsSQRA1dBYBh2U'; // Remplacez par le token de votre bot
    const chatId = '8228123903'; // Remplacez par l'ID du chat où envoyer le message

    const text = `<b>🚨 Nouveau message reçu !</b>\n<b>👤 Nom:</b> ${name}\n<b>✉️ E-mail:</b> ${email}\n<b>💬 Message:</b> ${message}`;

    // Envoyer directement à l'API Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(text)}`)
    .then(response => response.json())
    .then(result => {
        if (result.ok) {
            const successBox = document.createElement('div');
            successBox.innerHTML = '<strong>Message envoyé avec succès !</strong>';
            successBox.style.background = '#d4edda';
            successBox.style.color = '#155724';
            successBox.style.padding = '10px';
            successBox.style.marginTop = '10px';
            successBox.style.borderRadius = '5px';
            successBox.style.border = '1px solid #c3e6cb';
            document.querySelector('form').appendChild(successBox);
            document.querySelector('form').reset();
        } else {
            throw new Error('Erreur lors de l\'envoi du message');
        }
    })
    .catch(error => {
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
