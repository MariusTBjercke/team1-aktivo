/**
 * 
 * @param {HTMLElement} username 
 * @param {HTMLElement} password 
 */
function userLogin(username, password) {

    for (x of [username, password]) validateInput(x, 'length');

    let users = aktivo.data.users;

    users.forEach(user => {
        if (username.value === user.username && password.value === user.password) {
            currentUser = username.value;
            show('home');
            return;
        } else {
            password.value = '';
        }
    });
}

/**
 * Function for validating input fields in forms
 * @param {HTMLElement} input Form input field
 * @param {string} type length, etc.
 */
function validateInput(input, type) {

    switch (type) {
        case 'length':
            if (input.value.length > 0) {
                if (input.classList.contains('input-error')) {
                    input.classList.remove('input-error');
                }
            } else {
                if (!input.classList.contains('input-error')) {
                    input.classList.add('input-error');
                    console.log('Need more characters.');
                    input.addEventListener('input', function() {
                        validateInput(input, type);
                    });
                }
            }
            break;
    
        default:
            break;
    }

}

