function userLogin(username, password) {

    // Display error messages if inputs are empty
    if (!username.value || !password.value) {
        if (!username.value) {
            username.after(cr('span', null, 'class error', 'Du må fylle inn et brukernavn.'));
        }
        if (!password.value) {
            password.after(cr('span', null, 'class error', 'Du må fylle inn et passord.'));
        }
        return;
    }

    let users = aktivo.data.users;

    users.forEach(user => {
        if (username.value === user.username && password.value === user.password) {
            alert('Du ble logget inn!');
            currentUser = username.value;
            show('home');
            return;
        } else {
            alert('Brukernavnet eller passordet var feil, vennligst prøv igjen.');
            username.value = '';
            password.value = '';
        }
    });
}

