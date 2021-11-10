let app = document.querySelector("#app");
let currentPage = aktivo.app.currentPage;
let currentUser = aktivo.app.currentUser;

// could have a setPage('pageName') function that sets the currentPage based on a string parameter and then calls show()
show();
function show() {

    app.innerHTML = '';

    // Authentication
    isUserLoggedIn();

    switch (currentPage) {
        case 'login':
            showLogin();
            break;
        
        case 'register':
            showRegister();
            break;

        case 'home':
            showFrontPage();
            break;
    
        default:
            showFrontPage();
            break;
    }

}

function showLogin() {

    let wrapper = createElem('div', app, 'class wrapper');
    
    let loginWrapper = createElem('div', wrapper, 'class login-wrapper');
    
    let header = createElem('h1', loginWrapper, '', 'Logg inn');
    
    let subHeader = createElem('h4', loginWrapper, '', 'Skriv inn ditt brukernavn og passord for å logge inn.');
    
    let form = createElem('form', loginWrapper, 'class login-form');

    let usernameDiv = createElem('div', form);
    let usernameInput = createElem('input', usernameDiv, '', '');
    usernameInput.setAttribute('type', 'text');
    usernameInput.before(createElem('span', null, null, 'Brukernavn: '));
    
    let passwordDiv = createElem('div', form);
    let passwordInput = createElem('input', passwordDiv, '', '');
    passwordInput.setAttribute('type', 'password');
    passwordInput.before(createElem('span', null, null, 'Passord: '));

    let submitDiv = createElem('div', form, 'class submit');
    let submit = createElem('input', submitDiv, 'class login-submit');
    submit.setAttribute('type', 'submit');
    submit.value = 'Logg inn';

    // Login on submit
    submit.onclick = function(e) {
        e.preventDefault();
        userLogin(usernameInput, passwordInput);
    }

}

function userLogin(username, password) {

    // Display error messages if inputs are empty
    if (!username.value || !password.value) {
        if (!username.value) {
            username.after(createElem('span', null, 'class error', 'Du må fylle inn et brukernavn.'));
        }
        if (!password.value) {
            password.after(createElem('span', null, 'class error', 'Du må fylle inn et passord.'));
        }
        return;
    }

    let users = aktivo.data.users;

    users.forEach(user => {
        if (username.value === user.username && password.value === user.password) {
            alert('Du ble logget inn!');
            currentUser = username.value;
            currentPage = 'home';
            show();
        } else {
            alert('Brukernavnet eller passordet var feil, vennligst prøv igjen.');
            username.value = '';
            password.value = '';
        }
    });

}

function showRegister() {}
function showRecoverPassword() {}
function showRecoverEmail() {}

function showFrontPage() {
    
}

// new activity
function showNewActivityGroups() {}
function showNewActivityPeople() {}
function showNewActivityMembers() {}

// new activity (fast/simple)
function showNewActivitySimple() {}

// new activity's filters and suggestions
function showNewActivityFilters() {}
function showNewActivitySuggestions() {}

// archive
function showArchive() {}

// create/edit group
function showNewGroup() {}
function showEditGroup() {}

function showNewPerson() {}
function showNewPersonFilters() {}

function showAdministerGroups() {}
function showAdministerPeople() {}

function showProfile() {}
function showChangePassword() {}
function showChangeEmail() {}
function showChangeName() {}

// If the user is not logged in (currentUser is empty) and the page requires authentication, redirect to login
function isUserLoggedIn() {
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
        currentPage = 'login';
        show();
    }
}

/**
 * Similar to the createElement function, but refactored for this app.
 * @param {string} tagName The name of an element.
 * @param {HTMLElement} parent Parent element for this new child element.
 * @param {string} attr The first word in the beginning of a sentence before and after comma will be the attribute type, the following words (separated by empty spaces) before the optional next comma will be the attribute value(s). Example: class red rectangle,id header
 * @param {html} html HTML for innerHTML.
 * @returns {HTMLElement}
 */
function createElem(tagName, parent, attr, html) {
    const element = document.createElement(tagName);
    if (html) element.innerHTML = html;
    if (attr) {
        let sentences = attr.split(",");
        sentences.forEach(sentence => {
            let words = sentence.split(" ");
            let word1 = words.shift();
            let word2 = words.join(" ");
            element.setAttribute(word1, word2);
        });
    }
    if (parent) parent.appendChild(element);
    return element;
}