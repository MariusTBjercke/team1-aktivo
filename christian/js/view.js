let app = document.querySelector("#app");
let currentPage = aktivo.app.currentPage;
let currentUser = aktivo.app.currentUser;

// could have a setPage('pageName') function that sets the currentPage based on a string parameter and then calls show()
show("home");
function show(page) {
    if (page) currentPage = page;
    
    // Authentication
    isUserLoggedIn();
    app.innerHTML = '';

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

    let wrapper = cr('div', app, 'class wrapper');
    
    let loginWrapper = cr('div', wrapper, 'class login-wrapper');
    
    let header = cr('h1', loginWrapper, '', 'Logg inn');
    
    let subHeader = cr('h4', loginWrapper, '', 'Skriv inn ditt brukernavn og passord for å logge inn.');
    
    let form = cr('form', loginWrapper, 'class login-form');

    let usernameDiv = cr('div', form);
    let usernameInput = cr('input', usernameDiv, '', '');
    usernameInput.setAttribute('type', 'text');
    usernameInput.before(cr('span', null, null, 'Brukernavn: '));
    
    let passwordDiv = cr('div', form);
    let passwordInput = cr('input', passwordDiv, '', '');
    passwordInput.setAttribute('type', 'password');
    passwordInput.before(cr('span', null, null, 'Passord: '));

    let submitDiv = cr('div', form, 'class submit');
    let submit = cr('input', submitDiv, 'class login-submit');
    submit.setAttribute('type', 'submit');
    submit.value = 'Logg inn';

    // Login on submit
    submit.onclick = function(e) {
        e.preventDefault();
        userLogin(usernameInput, passwordInput);
    }

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
        show('login');
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
function cr(tagName, parent, attr, html) {
    const element = document.createElement(tagName);
    if (html) element.innerHTML = html;
    if (attr) {
        let sentences = attr.split(",");
        sentences.forEach(sentence => {
            let words = sentence.trim().split(" ");
            let word1 = words.shift();
            let word2 = words.join(" ");
            element.setAttribute(word1, word2);
        });
    }
    if (parent) parent.appendChild(element);
    return element;
}