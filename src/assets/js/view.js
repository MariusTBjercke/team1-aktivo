import { aktivo } from "./model";
import { auth, userLogin, userCreate, validateInput, generateList, toggleNav, toggleLights, getBulbIcon, generateMemberList, generateAdminList } from "./controller";
let app = document.querySelector('#app');
let currentPage = aktivo.app.currentPage;
let currentUser = aktivo.app.currentUser;
let addedGroups = aktivo.inputs.newActivity.chosenGroups;
let addedPeople = aktivo.inputs.newActivity.chosenPeople;

show("home");
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

        case 'profile':
            showProfile();
            break;

        case 'newactivitygroups':
            showNewActivity('groups');
            break;
        
        case 'newactivitypeople':
            showNewActivity('people');
            break;

        case 'newActivityMembers':
            showNewActivityMembers();
        break;

        case 'administerGroups':
            showAdminister('groups');
        break;
    
        case 'administerPeople':
            showAdminister('people');
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
    groups.onclick = function() {
        show('administerGroups');
    }

    let people = cr('div', btnContainer, 'class btn', 'Administrer personer');
    people.onclick = function() {
        show('administerPeople');
    }

}

// new activity
function showNewActivity(view) {
    let btn1;
    let btn2;
    let view2;
    let searchText;
    let title;
    switch (view) {
        case 'groups':
            btn1 = 'Ny gruppe';
            btn2 = 'Personer';
            searchText = 'grupper';
            view2 = 'newactivitypeople';
            title = 'Legg til gruppe(r)';
            break;

        case 'people':
            btn1 = 'Ny person';
            btn2 = 'Grupper';
            searchText = 'personer';
            view2 = 'newactivitygroups';
            title = 'Legg til person(er)';
            break;
    
        default:
            break;
    }

    header(title);
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container new-activity');
    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = function() {
        show('home');
        // add to archive
        addedGroups.splice(0, addedGroups.length);
        addedPeople.splice(0, addedPeople.length);
    }
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
    next.onclick = function() {
        if (addedGroups.length !== 0 || addedPeople.length !== 0) show('newActivityMembers'); // could be a controller function that gives an error-message.
    }
    generateList(view, listContainer, search);
}

function showNewActivityMembers() {
    header('Medlemsliste');
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container new-activity-members');
    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = function() {
        show("newactivitygroups"); // should be changed to remember if last page was groups or people..
    }
    let listContainer = cr('div', container, 'class list-container');
    let seeActivities = cr('div', container, 'class btn', 'Se forslag');
    seeActivities.onclick = function() {
        show('newActivitySuggestions');
    }
    generateMemberList(listContainer);
}

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

function showAdminister(view) {
    let btn;
    let searchText;
    let title;
    switch (view) {
        case 'groups':
            btn = 'Ny gruppe';
            searchText = 'grupper';
            title = 'Administrer grupper';
            break;

        case 'people':
            btn = 'Ny person';
            searchText = 'personer';
            title = 'Administrer personer';
            break;
    
        default:
            break;
    }

    header(title);
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container administer');
    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = function() {show('home');}
    let newBtn = cr('div', container, 'class btn', '<i class="fa fa-plus"></i> ' + btn);
    let search = cr('input',container, 'type text, class search, placeholder Søk i ' + searchText);
    search.addEventListener('input', function () {
        generateAdminList(view, listContainer, search);
    });
    let listContainer = cr('div', container, 'class list-container');
    generateAdminList(view, listContainer, search);
}

function showProfile() {

    header('Min profil');

    let container = cr('div', app, 'class profile-container');

    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = () => {
        aktivo.inputs.myProfile.returnPage === currentPage ? show('home') : show(aktivo.inputs.myProfile.returnPage);
    }

    let btnContainer = cr('div', container, 'class btn-container');

    let editEmail = cr('div', btnContainer, 'class btn', 'Endre epostadresse');
    editEmail.onclick = () => {
        show('showChangeEmail');
    }

    let editPassword = cr('div', btnContainer, 'class btn', 'Endre passord');

}
function showChangePassword() {}
function showChangeEmail() {

    header('Endre e-post');

    let container = cr('div', app, 'class profile-container');

    let formContainer = cr('div', container, 'class form');

    let emailInput = cr('input', formContainer);

}
function showChangeName() {}

function header(title) {
    let header = cr('div', app, 'class header');
    let navBg = cr('div', header, 'class bg');
    navBg.onclick = () => {
        toggleNav();
    }
    let navbar = cr('div', header, 'class navbar');
    let topRow = cr('div', navbar, 'class top-row');
    let navContainer = cr('div', navbar, 'class nav-container');

    let profile = cr('div', navContainer, 'class nav-item', 'Min profil');
    profile.onclick = () => {
        aktivo.inputs.showNavBar = false;
        if (currentPage !== 'profile') aktivo.inputs.myProfile.returnPage = currentPage;
        show('profile');
    }

    let theme = cr('div', navContainer, 'class nav-item', getBulbIcon());
    theme.onclick = () => {
        toggleLights(theme);
    }

    let row = cr('div', header, 'class row');
    let btn = cr('div', row, 'class nav-btn');
    btn.onclick = function() {
        toggleNav();
    }
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