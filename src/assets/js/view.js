import { aktivo } from "./model";
import { loadGoogleMaps } from "./maps";
import { auth, listAgegroupFilters, userLogin, userCreate, validateInput, generateList, toggleNav, toggleLights, getBulbIcon, generateMemberList, generateAdminList, user, generatePeopleList, changeEmail, generateEditGroupList, changePassword, loadTheme, generateAgeGroupForm, validateTwoCheckboxes,  resetAgeGroupForm, addToTemp, listActivitySuggestions, listActivityFilters, suggestActivities, updateUser, listEditFilters, listGenderFilters, savePerson, setActivityFilters, emptyActivityFilters } from "./controller";
let app = document.querySelector('#app');
let currentPage = aktivo.app.currentPage;
let addedGroups = aktivo.inputs.newActivity.chosenGroups;
let addedPeople = aktivo.inputs.newActivity.chosenPeople;

show("home");
function show(page, parameters) {
    if (page) currentPage = page;

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

        case 'changeemail':
            showChangeEmail();
            break;

        case 'changepassword':
            showChangePassword();
            break;

        case 'newActivitySimple':
            showNewActivitySimple();
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
    
        case 'newGroup':
            showNewGroup();
            break;
    
        case 'editGroup':
            showEditGroup();
            break;

        // Development only
        case 'map':
            showMap();
        
        case 'newEditPerson':
            showNewEditPerson();
            break;

        case 'newPersonFilters':
            showNewPersonFilters();
            break;

        case 'activitySuggestions':
            showActivitySuggestions();
            break;

        case 'activityFilters':
            showActivityFilters();
            break;
    
        default:
            showFrontPage();
            break;
    }

}

function showLogin() {

    let container = cr('div', app, 'class container login');

    let logo = cr('div', container, 'class logo');
    
    let header = cr('h6', container, '', 'Velkommen til Aktivo - appen som foreslår din neste aktivitet!');
    
    let form = cr('form', container, 'class form');

    let usernameField = cr('div', form, 'class input-field');
    let usernameInput = cr('input', usernameField, 'type text');
    usernameInput.before(cr('span', null, null, 'Brukernavn: '));
    
    let passwordField = cr('div', form, 'class input-field');
    let passwordInput = cr('input', passwordField, 'type password');
    passwordInput.before(cr('span', null, null, 'Passord: '));

    let showPasswordDiv = cr('div', form, 'class show-password checkbox-input');
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

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container register');

    let logo = cr('div', container, 'class logo');

    let form = cr('form', container, 'class form');

    let userNameDiv = cr('div', form, 'class input-field');
    let userNameInput = cr('input', userNameDiv, 'type text');
    userNameInput.before(cr('span', null, null, 'Brukernavn: '));
    
    let emailDiv = cr('div', form, 'class input-field');
    let emailInput = cr('input', emailDiv, 'type email');
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

    emptyActivityFilters();

    header('Forside');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container frontpage');

    let logo = cr('div', container, 'class logo');

    let btnContainer = cr('div', container, 'class vertical-btn-container');

    let newActivity = cr('div', btnContainer, 'class btn', '<i class="fas fa-plus"></i> Ny aktivitet');
    newActivity.onclick = function() {
        show('newactivitygroups');
    }

    let newActivitySimple = cr('div', btnContainer, 'class btn', '<i class="fas fa-plus"></i> Ny aktivitet<br>(hurtig registrering)');
    newActivitySimple.onclick = () => {
        show('newActivitySimple');
    }

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
            title = 'Legg til grupper';
            break;

        case 'people':
            btn1 = 'Ny person';
            btn2 = 'Grupper';
            searchText = 'personer';
            view2 = 'newactivitygroups';
            title = 'Legg til personer';
            break;
    
        default:
            break;
    }

    header('Ny aktivitet');
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container new-activity list-page');
    let back = cr('div', container, 'class btn top-element', 'Tilbake');
    back.onclick = function() {
        show('home');
        // add to archive
        addedGroups.splice(0, addedGroups.length);
        addedPeople.splice(0, addedPeople.length);
    }
    let btnContainer = cr('div', container, 'class btn-container');
    let newBtn = cr('div', btnContainer, 'class btn', '<i class="fa fa-plus"></i> ' + btn1);
    newBtn.onclick = function() {
        if (view === 'groups') {
            aktivo.inputs.administer.group.returnPage = currentPage;
            show('newGroup');
        }
        else {
            aktivo.inputs.administer.person.returnPage = currentPage;
            show('newEditPerson');
        }
    }
    let toggleView = cr('div', btnContainer, 'class btn', btn2);
    toggleView.onclick = function() {
        show(view2);
    }
    let search = cr('input',container, 'type text, class search, placeholder Søk i ' + searchText);
    search.addEventListener('input', function () {
        generateList(view, listContainer, search);
    });
    let directions = cr('span', container, 'class sub-title', title + ':');
    let listContainer = cr('div', container, 'class list-container');
    let next = cr('div', container, 'class btn', 'Neste');
    next.onclick = function() {
        if (addedGroups.length !== 0 || addedPeople.length !== 0) {
            aktivo.inputs.newActivity.returnPage = currentPage;
            show('newActivityMembers');
        }
    }
    generateList(view, listContainer, search);
}

function showNewActivityMembers() {
    header('Ny aktivitet');
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container new-activity-members list-page');
    let back = cr('div', container, 'class btn top-element', 'Tilbake');
    back.onclick = function() {
        show(aktivo.inputs.newActivity.returnPage);
    }
    let directions = cr('span', container, 'class sub-title', 'Medlemsliste:');
    let listContainer = cr('div', container, 'class list-container');
    let seeActivityFilters = cr('div', container, 'class btn', 'Legg til filtre');
    seeActivityFilters.onclick = function() {
        setActivityFilters();
    }
    generateMemberList(listContainer);
}

// new activity (fast/simple)
function showNewActivitySimple() {

    header('Ny aktivitet (hurtig)');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container new-activity-simple');

    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = function() {
        show('home');
    }

    let form = cr('div', container, 'class form');
    generateAgeGroupForm(form);

    let genderRow = cr('div', form, 'class gender-row');

    let genderTitle = cr('div', genderRow, 'class gender-title', 'Velg det som passer: ');

    let genderInputRow = cr('div', genderRow, 'class gender-input-row');

    listGenderFilters(genderInputRow, true);

    listAgegroupFilters(genderInputRow, true);

    let next = cr('div', container, 'class btn next', 'Neste');
    next.onclick = () => {
        if (aktivo.inputs.newActivity.filters.length >= 2) {
            setActivityFilters(true);
        }
    }

}

// activity filters and suggestions
function showActivityFilters() {

    header('Ny aktivitet (filtre)');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container activity-filters');

    let btnContainer = cr('div', container, 'class btn-container');

    // TODO: Only display back btn if there is a return page (?)
    let back = cr('div', btnContainer, 'class btn back', 'Tilbake');
    back.onclick = () => {
        show(aktivo.inputs.activityFilters.returnPage);
    }

    let suggestions = cr('div', btnContainer, 'class btn suggestions', 'Se forslag');
    suggestions.onclick = () => {
        show('activitySuggestions');
    }

    let filtersContainer = cr('div', container, 'class filters-container');
    listActivityFilters(filtersContainer);

}

function showActivitySuggestions() {

    header("Ny aktivitet (forslag)");

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container activity-suggestions');

    let btnContainer = cr('div', container, 'class btn-container');

    let back = cr('div', btnContainer, 'class btn back', 'Tilbake');
    back.onclick = () => {
        show(aktivo.inputs.activityFilters.returnPage);
    }

    let filters = cr('div', btnContainer, 'class btn filters', 'Filtre');
    filters.onclick = () => {
        show('activityFilters');
    }

    let activitiesContainer = cr('div', container, 'class activities-container');
    listActivitySuggestions(activitiesContainer);

}

// create/edit group
function showNewGroup() {
    addToTemp('group');
    const admGroup = aktivo.inputs.administer.group;
    header(admGroup.edit?'Rediger gruppe':'Ny gruppe');
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container new-group list-page');
    let back = cr('div', container, 'class btn top-element', admGroup.edit?'Medlemsliste':'Avbryt');
    back.onclick = function() {
        if (!admGroup.edit) {
            admGroup.addedToTemp = false;
            show(admGroup.returnPage);
            admGroup.returnPage = '';
        } else show('editGroup');
    }
    let newBtn = cr('div', container, 'class btn', '<i class="fa fa-plus"></i> Ny person');
    newBtn.onclick = function() {
        aktivo.inputs.administer.person.returnPage = currentPage;
        show('newEditPerson');
    };
    let search = cr('input',container, 'type text, class search, placeholder Søk i personer');
    search.addEventListener('input', function () {
        generatePeopleList(listContainer, search);
    });
    let directions = cr('span', container, 'class sub-title', 'Legg til medlemmer:');
    let listContainer = cr('div', container, 'class list-container');

    if (!admGroup.edit) {
        let next = cr('div', container, 'class btn', 'Neste');
        next.onclick = function() {
            const group = admGroup.temp;
            if (!admGroup.edit && group.members.length > 0) show('editGroup');
        }
    }
    else {
        let btnContainer = cr('div', container, 'class btn-container');
        let cancel = cr('div', btnContainer, 'class btn', 'Avbryt');
        let save = cr('div', btnContainer, 'class btn', 'Lagre');
        cancel.onclick = function() {
            admGroup.edit = false;
            admGroup.addedToTemp = false;
            show(admGroup.returnPage);
            admGroup.returnPage = '';
        }
        save.onclick = function() {
            const group = admGroup.temp;
            if (group.members.length > 0 && group.name !== '') { // save group function (use the other one)..
                let gnIndex = user.groups.findIndex(x => x.name === group.name);
                if (gnIndex < 0 || gnIndex === admGroup.index) {
                    user.groups[admGroup.index] = {...group};
                    admGroup.edit = false;
                    admGroup.addedToTemp = false;
                    show(admGroup.returnPage);
                    admGroup.returnPage = '';
                }
            }
        }
    }
    generatePeopleList(listContainer, search);
}

function showEditGroup() {
    addToTemp('group');
    const admGroup = aktivo.inputs.administer.group;
    const group = admGroup.temp;
    header(admGroup.edit?'Rediger gruppe':'Ny gruppe');
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container edit-group list-page');
    let back = cr('div', container, 'class btn top-element', admGroup.edit?'<i class="fa fa-plus"></i> Medlemmer':'Tilbake');
    back.onclick = function() {show('newGroup');}
    let nameInput = cr('input',container, 'type text, class search, placeholder Navn på gruppen');
    nameInput.value = group.name;
    nameInput.addEventListener('input', function() {
        group.name = nameInput.value;
    });
    let directions = cr('span', container, 'class sub-title', 'Medlemsliste:');
    let listContainer = cr('div', container, 'class list-container');

    let save;
    let cancel;
    if (!admGroup.edit) save = cr('div', container, 'class btn', 'Lagre');
    else {
        let btnContainer = cr('div', container, 'class btn-container');
        cancel = cr('div', btnContainer, 'class btn', 'Avbryt');
        save = cr('div', btnContainer, 'class btn', 'Lagre');
        cancel.onclick = function() {
            admGroup.edit = false;
            admGroup.addedToTemp = false;
            show(admGroup.returnPage);
            admGroup.returnPage = '';
        }
    }
    save.onclick = function() {
        if (group.members.length > 0 && group.name !== '') { // save group function..
            let gnIndex = user.groups.findIndex(x => x.name === group.name);
            if (gnIndex < 0 || (admGroup.edit && gnIndex === admGroup.index)) {
                admGroup.addedToTemp = false;
                if (admGroup.edit) {
                    user.groups[admGroup.index] = {...group};
                    show(admGroup.returnPage);
                    admGroup.returnPage = '';
                    admGroup.edit = false;
                }
                else {
                    if (admGroup.returnPage === 'newactivitygroups') {
                        const activityGroups = aktivo.inputs.newActivity.chosenGroups;
                        const activityMembers = aktivo.inputs.newActivity.chosenPeople;
                        activityGroups.push({name: group.name});
                        group.members.filter(m => activityMembers.findIndex(am => am.name === m) === -1).forEach(p => {
                            activityMembers.push({name: p, from: group.name});
                        });
                    }
                    user.groups.push(group);
                    show(admGroup.returnPage);
                    admGroup.returnPage = '';
                }
            }
            updateUser(user.username, user);
        }
    }
    generateEditGroupList(listContainer);
}

function showNewEditPerson() {
    addToTemp('person');
    const admPerson = aktivo.inputs.administer.person;
    const person = admPerson.temp;
    console.log(person.filters);

    header(admPerson.edit ? 'Rediger person' : 'Ny person');
    let wrapper = cr('div', app, 'class wrapper');
    let container = cr('div', wrapper, 'class container new-person list-page');
    let cancel = cr('div', container, 'class btn top-element', 'Avbryt');
    cancel.onclick = function() {
        admPerson.addedToTemp = false;
        admPerson.edit = false;
        show(admPerson.returnPage);
        admPerson.returnPage = '';
    }

    let nameInput = cr('input', container, 'type text, placeholder Navn på personen');
    nameInput.value = person.name;
    
    let ageGroupsContainer = cr('div', container, 'class age-groups-container');

    listGenderFilters(ageGroupsContainer);

    listAgegroupFilters(ageGroupsContainer);

    nameInput.addEventListener('input', function() {
        person.name = nameInput.value;
    });

    let filterBtn = cr('div', container, 'class btn', 'Filtre');
    filterBtn.onclick = function() {
        show('newPersonFilters');
    }

    let save = cr('div', container, 'class btn', 'Lagre');
    save.onclick = () => {
        savePerson();
    }
}

function showNewPersonFilters() {

    const admPerson = aktivo.inputs.administer.person;
    const person = admPerson.temp;

    header(admPerson.edit ? 'Rediger person' : 'Ny person');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container edit-filters');

    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = () => {
        show('newEditPerson');
    }

    let filtersContainer = cr('div', container, 'class filters-container');
    listEditFilters(filtersContainer);

}

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
    let container = cr('div', wrapper, 'class container administer list-page');
    let back = cr('div', container, 'class btn top-element', 'Tilbake');
    back.onclick = function() {show('home');}
    let newBtn = cr('div', container, 'class btn', '<i class="fa fa-plus"></i> ' + btn);
    newBtn.onclick = function() {
        if (view === 'groups') {
            aktivo.inputs.administer.group.returnPage = currentPage;
            show('newGroup');
        }
        else {
            aktivo.inputs.administer.person.returnPage = currentPage;
            show('newEditPerson');
        }
    }
    let search = cr('input',container, 'type text, class search, placeholder Søk i ' + searchText);
    search.addEventListener('input', function () {
        generateAdminList(view, listContainer, search);
    });
    let listContainer = cr('div', container, 'class list-container');
    generateAdminList(view, listContainer, search);
}

function showProfile() {

    header('Min profil');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container profile');

    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = () => {
        aktivo.inputs.myProfile.returnPage === currentPage ? show('home') : show(aktivo.inputs.myProfile.returnPage);
    }

    let btnContainer = cr('div', container, 'class vertical-btn-container');

    let editEmail = cr('div', btnContainer, 'class btn', 'Endre epostadresse');
    editEmail.onclick = () => {
        show('changeemail');
    }

    let editPassword = cr('div', btnContainer, 'class btn', 'Endre passord');
    editPassword.onclick = () => {
        show('changepassword');
    }

}
function showChangePassword() {

    header('Endre passord');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container profile');

    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = () => {
        show('profile');
    }

    let form = cr('div', container, 'class form');

    let oldPassword = cr('div', form, 'class input-field');
    let oldPasswordLabel = cr('span', oldPassword, '', 'Gammelt passord: ');
    let oldPasswordInput = cr('input', oldPassword, 'type password');

    let newPassword = cr('div', form, 'class input-field');
    let newPasswordLabel = cr('span', newPassword, '', 'Nytt passord: ');
    let newPasswordInput = cr('input', newPassword, 'type password');

    let repeatPassword = cr('div', form, 'class input-field');
    let repeatPasswordLabel = cr('span', repeatPassword, '', 'Bekreft passord: ');
    let repeatPasswordInput = cr('input', repeatPassword, 'type password');

    let submit = cr('div', form, 'class submit');
    let submitBtn = cr('div', submit, 'class btn', 'Endre');
    submitBtn.onclick = () => {
        changePassword(oldPasswordInput, newPasswordInput, repeatPasswordInput);
    }

}
function showChangeEmail() {

    header('Endre e-post');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container profile');

    let back = cr('div', container, 'class btn', 'Tilbake');
    back.onclick = () => {
        show('profile');
    }

    let form = cr('div', container, 'class form');

    let currentEmail = cr('div', form, '');
    let currentEmailTxt = cr('div', currentEmail, '', 'Din epostadresse: ' + user.email);

    let password = cr('div', form, 'class input-field');
    let passwordLabel = cr('span', password, '', 'Ditt passord: ');
    let passwordInput = cr('input', password, 'type password');

    let email = cr('div', form, 'class input-field');
    let emailLabel = cr('span', email, '', 'Ny e-post: ');
    let emailInput = cr('input', email, 'type email');

    let repeat = cr('div', form, 'class input-field');
    let repeatLabel = cr('span', repeat, '', 'Gjenta e-post: ');
    let repeatInput = cr('input', repeat, 'type email');

    let submit = cr('div', form, 'class submit');
    let submitBtn = cr('div', submit, 'class btn', 'Endre');
    submitBtn.onclick = () => {
        changeEmail(passwordInput, emailInput, repeatInput);
    }

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
        aktivo.app.currentUser = '';
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

// Page for development purposes only
function showMap() {

    header('Google Maps');

    let wrapper = cr('div', app, 'class wrapper');

    let container = cr('div', wrapper, 'class container maps');

    let map = cr('div', container, 'class map');

    let mapMarkerContent = `<span>Sandefjord</span><p>Her finnes det et hav av aktiviteter.</p>`;

    let position = { lat: 59.13461716996314, lng: 10.21596468687774 }
    loadGoogleMaps(map, position, mapMarkerContent);

}

export { currentPage, show, cr }