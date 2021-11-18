import { aktivo } from './model';
import { currentPage, currentUser, show, cr } from './view';
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
 * @param {HTMLElement} username Input field from form where value can be retrieved
 * @param {HTMLElement} password Input field from form where value can be retrieved
 */
function userLogin(username, password) {

    let error = [];

    for (let x of [username, password]) validateInput(x, 'empty');

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

    for (let x of [
        [username, 'username'],
        [email, 'email'],
        [password, 'password'],
        [[password, confirmPassword], 'confirmPassword']]) {
            validateInput(x[0], x[1], error);
        };

    if (!error) {
        let userObject = { // er kun deklarert inne i if-setningen, må appendes..
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

/**
 * Function for validating input fields in forms
 * @param {HTMLElement} input Form input field
 * @param {string} type length, etc.
 */
function validateInput(input, type, errorList = []) {
    let errorIndex = errorList.findIndex(x => x.input === input);
    let isErrorInList = (errorIndex !== -1);
    let error = {
        type: type,
        input: input,
    }
    
    switch (type) {
        case 'empty': // må lages pga login-siden...

            if (input.value.length === 0) {
                if (!input.classList.contains('input-error')) {
                    input.classList.add('input-error');
                }
                input.addEventListener('input', function () {
                    validateInput(input, type);
                });
            }
            else {
                if (input.classList.contains('input-error')) {
                    input.classList.remove('input-error');
                }
            }
            break;

        case 'username':
            let usernameError = true;

            if (input.value.length === 0) {
                error.message = 'Mangler brukernavn.';
            }
            else if (aktivo.data.users.findIndex(x => x.username === input.value) !== -1) {
                error.message = 'Brukernavnet er tatt.';
            }
            else {
                usernameError = false;
                removeInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            if (usernameError) {
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            break;

        case 'email':
            let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            error.message = 'Ugyldig epost-adresse.';

            if (input.value.match(emailPattern)) {
                removeInputError(isErrorInList, errorList, errorIndex, input, error);
            } else {
                if (input.value === '') error.message = 'Mangler epost-adresse.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            break;
        
        case 'password':
            let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            error.message = 'Ugyldig passord.';

            if (input.value.match(passwordPattern)) {
                removeInputError(isErrorInList, errorList, errorIndex, input, error);
            } else {
                if (input.value === '') error.message = 'Mangler passord.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            break;

        case 'confirmPassword':
            let password = input[0], confirmPassword = input[1]; // must be in this order!
            error.message = 'Ulikt passord.';
            
            if (password.value === confirmPassword.value && password.value.length > 0) {
                removeInputError(isErrorInList, errorList, errorIndex, confirmPassword, error);
            } else {
                if (confirmPassword.value === '') error.message = 'Mangler bekreftet passord.';
                addInputError(isErrorInList, errorList, errorIndex, confirmPassword, error);
            }
            break;

        default:
            break;
    }
    if (errorList.length>0) console.log(errorList);
}

function addInputError(isErrorInList, errorList, errorIndex, input, error) {
    if (isErrorInList) {
        errorList[errorIndex].message = error.message;
    }
    else {
        errorList.push(error);
        errorIndex = errorList.length -1;
        input.addEventListener('input', function () {
            validateInput(error.input, error.type, errorList);
        });
    }
    if (!input.classList.contains('input-error')) {
        input.classList.add('input-error');
    }
    if (!document.querySelector(`#${errorList[errorIndex].type}`)) {
        input.before(cr('span', null, `id ${errorList[errorIndex].type}, class errorMsg`, error.message));
    }
    document.querySelector(`#${errorList[errorIndex].type}`).innerHTML = error.message;
}
function removeInputError(isErrorInList, errorList, errorIndex, input, error) {
    if (isErrorInList) {
        let e = document.querySelector(`#${errorList[errorIndex].type}`);
        e.parentElement.removeChild(e);
        errorList.splice(errorIndex, 1);
    }
    if (input.classList.contains('input-error')) {
        input.classList.remove('input-error');
    }
}


export { auth, userLogin, userCreate, validateInput }