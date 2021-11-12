// If the user is not logged in (currentUser is empty) and the page requires authentication, redirect to login
function auth() {
    let pageAuth = false;
    aktivo.data.pages.forEach(page => {
        if (page.name === currentPage) {
            if (page.requiresAuth && !currentUser) {
                pageAuth = true;
            }
        }
    });
    if (pageAuth) {
        console.log('Du må være logget inn for å få tilgang til denne siden!');
        show('login');
        return;
    }
}

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

function userCreate(username, email, password, confirmPassword) {

    let error = [];

    for (x of [[username, 'length'],[email, 'email']]) {
        validateInput(x[0], x[1], error);
    };

    if (password != confirmPassword) {
        alert("Passordene var ikke like.");
        return;
    }

    if (!error) {
        let userObject = {
            username: username.value,
            password: password.value,
            email: email.value,
        }
    }

    // {
    //     username: "demo",
    //     password: "demo",
    //     email: "",
    //     fullName: "",
    //     people: [
    //       {
    //         name: "", // unique name (functions as id)
    //         born: null,
    //         filter: [],
    //       },
    //     ],
    //     groups: [
    //       {
    //         name: "", // unique name (functions as id)
    //         members: ["name1", "name2", "name3"], // names function as ids...
    //         // do we want to add a group specific filter? if so; add an "added" filter and a "removed" filter (same as archive.filters).
    //       },
    //     ],
    //     archive: [
    //       // can be limited to a number (for example the 20 most recently modified).
    //       {
    //         // needs conditional handling if it's an old search and changes have occured to members and/or their filters.
    //         date: "", // date of last modification.
    //         members: {
    //           groups: [
    //             {
    //               name: "", // name of the group (to identify it from users[index].groups)
    //               members: [], // perhaps only added if the group isn't whole..
    //             },
    //           ],
    //           people: [], // people who aren't in the added groups.
    //           list: [], // every member is listed here. updates whenever groups or people is changed. if old this list should perhaps be moved to members.people so that people don't disappear do to originating from groups they are no longer in.
    //         },
    //         filters: {
    //           members: [], // collection of members' filters. is recreated when archive.members.list is modified (and (if old) also when reinitiated (or perhaps ask user if they want to update filters based on changes to members' filters)).
    //           added: [], // added on the activity's filter page.
    //           removed: [], // members' filters removed on the activity's filter page.
    //           list: [], // list of all the active filters (members' filters + added filters - removed filters).
    //         },
    //       },
    //     ],
    //     options: {
    //       theme: 0, // 0 for light, 1 for dark?
    //     },
    //   }

}

function validatePassword(password, confirmPassword) {
    if (password.value === confirmPassword.value || confirmPassword.value === '') {
        if (confirmPassword.classList.contains('password-error')) {
            confirmPassword.classList.remove('password-error');
        }
        if (!confirmPassword.classList.contains('password-success') && password.value === confirmPassword.value) {
            confirmPassword.classList.add('password-success');
        }
    } else {
        if (!confirmPassword.classList.contains('password-error')) {
            confirmPassword.classList.add('password-error');
        }
        if (confirmPassword.classList.contains('password-success')) {
            confirmPassword.classList.remove('password-success');
        }
    }
}

/**
 * Function for validating input fields in forms
 * @param {HTMLElement} input Form input field
 * @param {string} type length, etc.
 */
function validateInput(input, type, errorList) {

    switch (type) {
        case 'length':
            let usernameError = {
                type: 'username',
                message: 'Brukernavn mangler.'
            }
            
            if (input.value.length > 0) {
                for (let i in errorList) {
                    if (errorList[i].type === 'username') {
                        errorList.splice(i, 1);
                    }
                }
                if (input.classList.contains('input-error')) {
                    input.classList.remove('input-error');
                }
            } else {
                
                if (errorList.findIndex(x => x.type == "username") === -1) errorList.push(usernameError);
                
                if (!input.classList.contains('input-error')) {
                    input.classList.add('input-error');
                    input.addEventListener('input', function() {
                        validateInput(input, type, errorList);
                    });
                }
            }
            break;

        case 'email':
            let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            let emailError = {
                type: 'email',
                message: 'E-post mangler.'
            }

            if (input.value.match(pattern)) {   
                for (let i in errorList) {
                    if (errorList[i].type === 'email') {
                        errorList.splice(i, 1);
                    }
                }
                if (input.classList.contains('input-error')) {
                    input.classList.remove('input-error');
                }
            } else {

                if (errorList.findIndex(x => x.type == "email") === -1) errorList.push(emailError);

                if (!input.classList.contains('input-error')) {
                    input.classList.add('input-error');
                    input.addEventListener('input', function() {
                        validateInput(input, type, errorList);
                    });
                }
            }
            break;
    
        default:
            break;
    }

}

