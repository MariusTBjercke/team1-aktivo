import { aktivo } from "./model";
import { auth, userLogin, userCreate, validateInput, generateList } from "./controller";
let app = document.querySelector('#app');
let currentPage = aktivo.app.currentPage;
let currentUser = aktivo.app.currentUser;

show("newactivitygroups");
function show(page, parameters) {
    if (page) currentPage = page;
    console.log(aktivo.data.users);

    // Authentication
    auth();

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

        case 'newactivitygroups':
            showNewActivity('groups');
            break;
        
        case 'newactivitypeople':
            showNewActivity('people');
            break;
    
        default:
            showFrontPage();
            break;
    }

}

function showLogin() {

    let container = cr('div', app, 'class login-container');

    let logo = cr('div', container, 'class logo');
    
    let header = cr('h6', container, '', 'Velkommen til Aktivo - appen som foreslår din neste aktivitet!');
    
    let form = cr('form', container, 'class login-form');

    let usernameField = cr('div', form, 'class input-field');
    let usernameInput = cr('input', usernameField, 'type text');
    usernameInput.before(cr('span', null, null, 'Brukernavn: '));
    
    let passwordField = cr('div', form, 'class input-field');
    let passwordInput = cr('input', passwordField, 'type password');
    passwordInput.before(cr('span', null, null, 'Passord: '));

    let showPasswordDiv = cr('div', form, 'class show-password');
    let showPasswordText = cr('span', showPasswordDiv, '', 'Vis passord:');
    let showPasswordLabel = cr('label', showPasswordDiv);
    let showPassword = cr('input', showPasswordLabel, 'type checkbox');
    let showPasswordMark = cr('span', showPasswordLabel, 'class checkmark');

    showPassword.onchange = function() {
        if (showPassword.checked) {
            passwordInput.setAttribute("type", "text");
        } else {
            passwordInput.setAttribute("type", "password");
        }
    }

    let submitDiv = cr('div', form, 'class submit');
    let submit = cr('button', submitDiv, 'class login-submit btn,type submit', 'Logg inn');

    let registerDiv = cr('div', form, 'class submit');
    let registerBtn = cr('button', registerDiv, 'class btn register-btn', 'Registrer deg');

    registerBtn.onclick = function() {
        show("register");
    }

    // Login on submit
    submit.onclick = function(e) {
        e.preventDefault();
        userLogin(usernameInput, passwordInput);
    }

}

function showRegister() {

    let container = cr('div', app, 'class register-container');

    let logo = cr('div', container, 'class logo');

    let form = cr('form', container, 'class register-form');

    let userNameDiv = cr('div', form, 'class input-field');
    let userNameInput = cr('input', userNameDiv, 'type text');
    userNameInput.before(cr('span', null, null, 'Brukernavn: '));
    
    let emailDiv = cr('div', form, 'class input-field');
    let emailInput = cr('input', emailDiv, 'type text');
    emailInput.before(cr('span', null, null, 'Epost-adresse: '));

    let passwordDiv = cr('div', form, 'class input-field');
    let passwordInput = cr('input', passwordDiv, 'type password');
    passwordInput.before(cr('span', null, null, 'Velg passord: '));

    let confirmPasswordDiv = cr('div', form, 'class input-field');
    let confirmPasswordInput = cr('input', confirmPasswordDiv, 'type password');
    confirmPasswordInput.before(cr('span', null, null, 'Bekreft passord: '));

    // confirmPasswordInput.addEventListener('input', function() {
    //     validatePassword(passwordInput, confirmPasswordInput);
    // });

    let submitDiv = cr('div', form, 'class submit');
    let submit = cr('button', submitDiv, 'class register-submit btn', 'Registrer');

    let loginText = cr('p', form, 'class login-text', 'Har du allerede en bruker? ');
    let login = cr('span', loginText, '', 'Logg inn');

    login.onclick = function() {
        show('login');
    }

    submit.onclick = function(e) {
        e.preventDefault();
        userCreate(userNameInput, emailInput, passwordInput, confirmPasswordInput);
    }
}
function showRecoverPassword() {}
function showRecoverEmail() {}

function showFrontPage() {
    
    header('Forside');

    let container = cr('div', app, 'class frontpage-container');

    let logo = cr('div', container, 'class logo');

    let btnContainer = cr('div', container, 'class btn-container');

    let newActivity = cr('div', btnContainer, 'class btn', '<i class="fas fa-plus"></i> Ny aktivitet');
    newActivity.onclick = function() {
        show('newactivitygroups');
    }

    let newActivityFast = cr('div', btnContainer, 'class btn', '<i class="fas fa-plus"></i> Ny aktivitet<br>(hurtig registrering)');

    let archive = cr('div', btnContainer, 'class btn', 'Arkiv');

    let groups = cr('div', btnContainer, 'class btn', 'Administrer grupper');

    let people = cr('div', btnContainer, 'class btn', 'Administrer personer');

}

// new activity
function showNewActivity(view) {
    let btn1;
    let btn2;
    let view2;
    let searchText;
    switch (view) {
        case 'groups':
            btn1 = 'Ny gruppe';
            btn2 = 'Personer';
            searchText = 'grupper';
            view2 = 'newactivitypeople';
            break;

        case 'people':
            btn1 = 'Ny person';
            btn2 = 'Grupper';
            searchText = 'personer';
            view2 = 'newactivitygroups';
            break;
    
        default:
            break;
    }

    header('Legg til gruppe(r)');
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class new-activity-container');
    let back = cr('div', container, 'class btn', 'Tilbake');
    let btnContainer = cr('div', container, 'class btn-container');
    let newBtn = cr('div', btnContainer, 'class btn', '<i class="fa fa-plus"></i> ' + btn1);
    let toggleView = cr('div', btnContainer, 'class btn', btn2);
    toggleView.onclick = function() {
        show(view2);
    }
    let search = cr('input',container, 'type text, class search, placeholder Søk i ' + searchText);
    search.addEventListener('input', function () {
        generateList(view, listContainer, search);
    });
    let listContainer = cr('div', container, 'class list-container');
    let next = cr('div', container, 'class btn', 'Neste');
    next.onclick = function() {}
    generateList(view, listContainer, search);
}

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

function header(title) {
    let header = cr('div', app, 'class header');
    let row = cr('div', header, 'class row');
    let btn = cr('div', row, 'class nav-btn');
    let bars = cr('i', btn, 'class fa fa-bars');
    let pageDescr = cr('div', row, 'class page-description', title);
    let logOut = cr('div', row, 'class logout', 'Logg ut');
    logOut.onclick = function() {
        currentUser = '';
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

export { currentPage, currentUser, show, cr }