import { aktivo } from './model';
import { show, cr, currentPage } from './view';
let currentUser = aktivo.app.currentUser;
let user = aktivo.data.users[aktivo.data.users.findIndex(x => x.username === currentUser)];
let addedGroups = aktivo.inputs.newActivity.chosenGroups;
let addedPeople = aktivo.inputs.newActivity.chosenPeople;
// If the user is not logged in (currentUser is empty) and the page requires authentication, redirect to login

// Function to log aktivo.data.activities with the filters changed from string to an array with the original string as the first element, and a 0 as the second.
// logActivities();
// function logActivities() {
//     let acitivities = [];
//     aktivo.data.activities.forEach(activity => {
//         let x = {
//             name: activity.name,
//             description: activity.description,
//             filters: [],
//             exfilters: activity.exfilters
//           };
//           let finale = [f, 0];
//           activity.filters.forEach(f => {x.filters.push(finale)});
//           asscitivities.push(x);
//     });
//     console.log(acitivities);
// }


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

    let pass = password.value;

    for (let x of [[username, 'loginUsername'], [password, 'empty']]) validateInput(x[0], x[1]);

    let users = aktivo.data.users;

    users.forEach(user => {
        if (username.value === user.username && pass === user.password) {
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
        [[password, confirmPassword], 'confirmPassword']
    ]) {
        validateInput(x[0], x[1], error);
    };

    if (error.length === 0) {
        let userObject = {
            username: username.value,
            password: password.value,
            email: email.value,
            people: [],
            groups: [],
            archive: [],
            options: [
                {
                    theme: 0,
                    virgin: true
                }
            ]
        };
        aktivo.data.users.push(userObject);
        let parameters = {
            success: true,
        }
        show('login', parameters);
    }
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
        case 'empty':

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
                removeInputError(isErrorInList, errorList, errorIndex, input);
            }
            if (usernameError) {
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            break;

        case 'loginUsername':
            if (input.value.length === 0) {
                error.message = 'Mangler brukernavn.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            else removeInputError(isErrorInList, errorList, errorIndex, input);
            break;

        case 'email':
            let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            error.message = 'Ugyldig epost-adresse.';

            if (input.value.match(emailPattern)) {
                removeInputError(isErrorInList, errorList, errorIndex, input);
            } else {
                if (input.value === '') error.message = 'Mangler epost-adresse.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            break;

        case 'checkEmail':
            let checkEmailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            let emailExists = (aktivo.data.users.filter(x => x.email === input.value).length > 0);
            error.message = 'Ugyldig epost-adresse.';

            if (emailExists) {
                error.message = 'E-post er allerede i bruk';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            } else if (input.value === user.email && !emailExists) {
                error.message = 'Du kan ikke skrive inn din nåværende adresse.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            } else if (input.value === '') {
                error.message = 'Mangler epost-adresse.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            } else if (!input.value.match(checkEmailPattern)) {
                error.message = 'Ugyldig epost-adresse';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            } else {
                removeInputError(isErrorInList, errorList, errorIndex, input);
            }
            break;

        case 'confirmEmail':
            let email = input[0], confirmEmail = input[1];
            error.message = 'Ulik e-post.';
            
            if (email.value === confirmEmail.value && email.value.length > 0) {
                removeInputError(isErrorInList, errorList, errorIndex, confirmEmail);
            } else {
                if (confirmEmail.value === '') error.message = 'Mangler gjenta e-post.';
                addInputError(isErrorInList, errorList, errorIndex, confirmEmail, error);
            }
            break;
        
        case 'password':
            let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            error.message = 'Ugyldig passord.';

            if (input.value.match(passwordPattern)) {
                removeInputError(isErrorInList, errorList, errorIndex, input);
            } else {
                if (input.value === '') error.message = 'Mangler passord.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            }
            break;

        case 'confirmPassword':
            let password = input[0], confirmPassword = input[1]; // must be in this order!
            error.message = 'Ulikt passord.';
            
            if (password.value === confirmPassword.value && password.value.length > 0) {
                removeInputError(isErrorInList, errorList, errorIndex, confirmPassword);
            } else {
                if (confirmPassword.value === '') error.message = 'Mangler bekreftet passord.';
                addInputError(isErrorInList, errorList, errorIndex, confirmPassword, error);
            }
            break;

        case 'checkPassword':
            if (input.value.length > 0 && input.value === user.password) {
                removeInputError(isErrorInList, errorList, errorIndex, input);
            } else if (!input.value.length > 0) {
                error.message = 'Mangler passord.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
            } else if (input.value !== user.password) {
                error.message = 'Feil passord.';
                addInputError(isErrorInList, errorList, errorIndex, input, error);
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

function removeInputError(isErrorInList, errorList, errorIndex, input) {
    if (isErrorInList) {
        let e = document.querySelector(`#${errorList[errorIndex].type}`);
        if (e) {
            e.parentElement.removeChild(e);
            errorList.splice(errorIndex, 1);
        }
    }
    if (input.classList.contains('input-error')) {
        input.classList.remove('input-error');
    }
}

function generateAgeGroupForm(form) {

    let ageGroups = aktivo.inputs.newActivitySimple.ageGroups;

    ageGroups.forEach(item => {
        
        let row = cr('div', form, 'class row');

        let age = cr('div', row, 'class age', item.age);

        let counter = cr('div', row, 'class counter');
        let decrease = cr('div', counter, 'class decrease', '-');
        let amount = cr('input', counter, 'class amount, type number, value ' + item.amount);
        let increase = cr('div', counter, 'class increase', '+');

        // Counter listeners
        for (let x of [
            [increase, 'click', increaseCounter],
            [decrease, 'click', decreaseCounter],
            [amount, 'change', checkCounter]
        ]) {
            x[0].addEventListener(x[1], () => {
                x[2](amount);
                updateAgeGroupAmount(item.age, amount.value);
            });
        }

    });

}

/**
 * 
 * @param {HTMLInputElement} male Male checkbox input
 * @param {HTMLInputElement} female Female checkbox input
 * @returns 
 */
function getSimpleActivityFilters(male, female) {
    let ageGroups = aktivo.inputs.newActivitySimple.ageGroups;
    let total = 0;
    let obj = {
        filters: [],
    };

    ageGroups.filter(x => x.amount > 0).forEach(x => {
        total = Number(total) + Number(x.amount);
        obj.filters.push(x.age);
    });

    obj.filters.push(total);

    if (male.checked) obj.filters.push('Kun menn');
    if (female.checked) obj.filters.push('Kun kvinner');

    return obj;
}

function updateAgeGroupAmount(ageGroup, amount) {
    let ageGroups = aktivo.inputs.newActivitySimple.ageGroups;
    ageGroups.filter(x => x.age === ageGroup ? x.amount = amount : x);
}

function checkCounter(counter) {
    if (counter.value < 0) {
        counter.value = 0;
    } else if (isNaN(counter.value)) {
        counter.value = 0;
    } else if (counter.value % 1 != 0) {
        counter.value = Math.round(counter.value);
    }
}

function increaseCounter(counter, event) {
    counter.value++;
}

function decreaseCounter(counter) {
    if (counter.value > 0)
        counter.value--;
}

function generateList(view, listContainer, search) {
    const admGroup = aktivo.inputs.administer.group;
    const admPerson = aktivo.inputs.administer.person;
    listContainer.innerHTML = '';
    let isGroups = view === 'groups';
    let list = isGroups ? addedGroups : addedPeople;
    let dataList = isGroups ? user.groups : user.people;
    dataList.filter(x => (x.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1 && list.findIndex(L => L.name === x.name) === -1)).forEach(x => {
        let itemContainer = cr('div', listContainer, 'class list-item');
        let editBtn = cr('div', itemContainer, 'class edit-btn', '<i class="far fa-edit"></i>');
        editBtn.onclick = function() {
            if (isGroups) {
                admGroup.edit = true;
                admGroup.index = user.groups.findIndex(g => g.name === x.name);
                admGroup.returnPage = currentPage;
                show('editGroup');
            } else {
                admPerson.edit = true;
                admPerson.index = user.people.findIndex(p => p.name === x.name);
                admPerson.returnPage = currentPage;
                show('newEditPerson');
            }
        };
        let item = cr('div', itemContainer, 'class item', x.name);
        let add = cr('div', itemContainer, 'class add-btn', '<i class="fas fa-plus"></i>');
        add.onclick = function() {
            list.push({name: x.name});
            if (isGroups) {
                x.members.forEach(name =>  {
                    if (addedPeople.findIndex(m => m.name === name) === -1) {
                        addedPeople.push({
                            name: name,
                            from: x.name
                        });
                    }
                });
            }
            itemContainer.parentElement.removeChild(itemContainer);
        };
    });
}

function generateMemberList(listContainer) {
    const admPerson = aktivo.inputs.administer.person;
    listContainer.innerHTML = '';
    let list = [];
    addedGroups.forEach(group => {
        list.push({name: group.name, members: addedPeople.filter(person => person.from === group.name)});
    });
    list.push({name: '', members: addedPeople.filter(person => !person.from)});
    let filteredList = list.filter(x => x.members.length > 0);

    filteredList.forEach(x => {
        if (filteredList.length > 1) cr('span', listContainer, `class origin-desc ${x.name === filteredList[0].name ? 'first-desc' : ''}` , x.name === '' ? 'Andre:' : 'Fra ' + x.name + ':');
        x.members.forEach(member => {
            let itemContainer = cr('div', listContainer, 'class list-item');
            let editBtn = cr('div', itemContainer, 'class edit-btn', '<i class="far fa-edit"></i>');
            editBtn.onclick = function() {
                admPerson.edit = true;
                admPerson.index = user.people.findIndex(x => x.name === member.name);
                admPerson.returnPage = currentPage;
                show('newEditPerson');
            }
            let item = cr('div', itemContainer, 'class item', member.name);
            let deleteBtn = cr('div', itemContainer, 'class delete-btn', '<span>✕</span>')
            deleteBtn.onclick = function() {
                itemContainer.parentElement.removeChild(itemContainer);
                addedPeople.splice(addedPeople.findIndex(x => x.name === member.name), 1);
            }
        });
    });
}

function generateAdminList(view, listContainer, search) {
    const admGroup = aktivo.inputs.administer.group;
    const admPerson = aktivo.inputs.administer.person;
    listContainer.innerHTML = '';
    let isGroups = view === 'groups';
    let dataList = isGroups ? user.groups : user.people;
    dataList.filter(x => (x.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1)).forEach(x => {
        let itemContainer = cr('div', listContainer, 'class list-item');
        let editBtn = cr('div', itemContainer, 'class edit-btn', '<i class="far fa-edit"></i>');
        editBtn.onclick = function() {
            if (isGroups) {
                admGroup.edit = true;
                admGroup.index = user.groups.findIndex(g => g.name === x.name);
                admGroup.returnPage = currentPage;
                show('editGroup');
            } else {
                admPerson.edit = true;
                admPerson.index = user.people.findIndex(p => p.name === x.name);
                admPerson.returnPage = currentPage;
                show('newEditPerson');
            }
        };
        let item = cr('div', itemContainer, 'class item', x.name);
        let deleteBtn = cr('div', itemContainer, 'class delete-btn', '<i class="far fa-trash-alt"></i>')
        deleteBtn.onclick = function() {
            itemContainer.parentElement.removeChild(itemContainer);
            dataList.splice(dataList.findIndex(y => y.name === x.name), 1);
            if (!isGroups) {
                // deleting person from all groups they are in:
                user.groups.forEach(group => {
                    let index = group.members.findIndex(name => name === x.name);
                    if (index > -1) group.members.splice(index, 1);
                });
            }
        }
    });
}

function generatePeopleList(listContainer, search) {
    console.log(aktivo.inputs.administer);
    const admGroup = aktivo.inputs.administer.group;
    const admPerson = aktivo.inputs.administer.person;
    const group = admGroup.temp;
    listContainer.innerHTML = '';

    let dataList = user.people;
    dataList.filter(x => (x.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1) && group.members.findIndex(name => name === x.name) === -1).forEach(y => {
        let itemContainer = cr('div', listContainer, 'class list-item');
        let editBtn = cr('div', itemContainer, 'class edit-btn', '<i class="far fa-edit"></i>');
        editBtn.onclick = function() {
            admPerson.edit = true;
            admPerson.index = user.people.findIndex(p => p.name === y.name);
            admPerson.returnPage = currentPage;
            show('newEditPerson');
        }
        let item = cr('div', itemContainer, 'class item', y.name);
        let add = cr('div', itemContainer, 'class add-btn', '<i class="fas fa-plus"></i>');
        add.onclick = function() {
            group.members.push(y.name);
            itemContainer.parentElement.removeChild(itemContainer);
        };
    });
}

function generateEditGroupList(listContainer) {
    const admGroup = aktivo.inputs.administer.group;
    const admPerson = aktivo.inputs.administer.person;
    const group = admGroup.temp;
    listContainer.innerHTML = '';

    group.members.forEach(person => {
        let itemContainer = cr('div', listContainer, 'class list-item');
        let editBtn = cr('div', itemContainer, 'class edit-btn', '<i class="far fa-edit"></i>');
        editBtn.onclick = function() {
            admPerson.edit = true;
            admPerson.index = user.people.findIndex(x => x.name === person);
            admPerson.returnPage = currentPage;
            show('newEditPerson');
        }
        let item = cr('div', itemContainer, 'class item', person);
        let deleteBtn = cr('div', itemContainer, 'class delete-btn', '<span>✕</span>');
        deleteBtn.onclick = function() {
            itemContainer.parentElement.removeChild(itemContainer);
            group.members.splice(group.members.findIndex(name => name === person), 1);
        }
    });
}

function addToTemp(type) {
    if (type === 'person') {
        const admPerson = aktivo.inputs.administer.person;
        if (!admPerson.addedToTemp) {
            if (!admPerson.edit) admPerson.temp = {name:'',filters:['']};
            else admPerson.temp = {...user.people[admPerson.index]};
            admPerson.addedToTemp = true;
        }
    }
    if (type === 'group') {
        const admGroup = aktivo.inputs.administer.group;
        if (!admGroup.addedToTemp) {
            if (!admGroup.edit) admGroup.temp = {name:'',members:[]};
            else admGroup.temp = {...user.groups[admGroup.index]};
            admGroup.addedToTemp = true;
        }
    }
}

function toggleNav() {
    let header = app.querySelector('.header');
    let navbar = app.querySelector('.navbar');
    let btn = app.querySelector('.nav-btn');
    let navContainer = navbar.querySelector('.nav-container');
    let navBg = header.querySelector('.bg');
    let appHeight = app.clientHeight;
    let appWidth = app.clientWidth;
    let headerHeight = header.clientHeight;

    let navBgHeight = appHeight - headerHeight + "px";
    navBg.style.width = appWidth + "px";
    navBg.style.height = navBgHeight;

    // Calculate final navbar width
    let logoutWidth = document.querySelector(".logout").clientWidth;
    let finalWidth = appWidth - logoutWidth;

    if (!aktivo.inputs.showNavBar) {
        navBg.style.visibility = "visible";
        navBg.style.opacity = "1";

        navContainer.style.opacity = "1";
        navContainer.style.transition = "width 250ms, opacity 250ms ease-in-out 250ms";

        navbar.style.visibility = "visible";
        navbar.style.height = appHeight + "px";
        navbar.style.width = finalWidth + "px";

        // btn.style.transform = "rotate(180deg)";
        setTimeout(setHTML(btn, '<i class="fas fa-times"></i>'), 250);

        aktivo.inputs.showNavBar = true;
    } else {
        navBg.style.opacity = "0";
        setTimeout(() => {
            navBg.style.visibility = "hidden";
        }, 250);

        navContainer.style.opacity = "0";
        navContainer.style.transition = "width 150ms, opacity 150ms ease-in-out";

        navbar.style.visibility = "hidden";
        navbar.style.width = "0";

        // btn.style.transform = "rotate(-180deg)";
        setTimeout(setHTML(btn, '<i class="fa fa-bars"></i>'), 250);

        aktivo.inputs.showNavBar = false;
    }
}

/**
 * Set innerHTML of element.
 * @param {HTMLElement} element HTML Element
 * @param {string} html HTML string for innerHTML
 */
function setHTML(element, html) {
    element.innerHTML = html;
}

function changeEmail(password, email, repeatEmail) {

    let error = [];

    for (let x of [
        [password, 'checkPassword'],
        [email, 'checkEmail'],
        [[email, repeatEmail], 'confirmEmail']
    ]) {
        validateInput(x[0], x[1], error);
    }

    if (!error.length > 0) {
        user.email = email.value;
        show('changeemail');
    }

}

function changePassword(oldPassword, password, repeatPassword) {

    let error = [];

    for (let x of [
        [oldPassword, 'checkPassword'],
        [password, 'password'],
        [[password, repeatPassword], 'confirmPassword']
    ]) {
        validateInput(x[0], x[1], error);
    }

    if (!error.length > 0) {
        user.password = password.value;
        show('showchangepassword');
    }

}

function getBulbIcon() {
    return user.options.lightsOn ? '<i class="fas fa-lightbulb"></i>' : '<i class="far fa-lightbulb"></i>';
}

function toggleLights(bulb) {
    if (user.options.lightsOn) {
        user.options.lightsOn = false;
        setTheme('theme-dark');
    } else {
        user.options.lightsOn = true;
        setTheme('theme-light');
    }
    setHTML(bulb, getBulbIcon());
}

function setTheme(themeName) {
    document.documentElement.className = themeName;
}

function loadTheme() {
    let lightsOn = user.options.lightsOn;
    if (lightsOn) {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

function validateTwoCheckboxes(input1, input2) {
    for (let x of [
        [input1, input2],
        [input2, input1]
    ]) {
        x[0].onclick = () => {
            if (x[1].checked) x[1].checked = false;
        }
    }
}

function resetAgeGroupForm() {
    let ageGroups = aktivo.inputs.newActivitySimple.ageGroups;
    ageGroups.filter(x => x.amount = 0);
    show('newActivitySimple');
}

function listActivitySuggestions(listContainer) {

    let activities = aktivo.data.activities;

    activities.forEach(item => {
        let row = cr('div', listContainer, 'class row');

        let subRow = cr('div', row);
        
        let title = cr('div', subRow, 'class title', item.name);

        let moreBtnContainer = cr('div', subRow, 'class more-btn-container');
        let moreBtnText = cr('div', moreBtnContainer, 'class more-btn-text', 'Les mer');

        let description = cr('div', row, 'class description', item.description);
    })

}

function listActivityFilters(filtersContainer) {

    let filters = aktivo.data.filters;

    filters.forEach(filter => {

        let filterContainer = cr('div', filtersContainer, 'class filter checkbox-input');

        let name = cr('div', filterContainer, 'class name', filter.name);

        let label = cr('label', name);
        let input = cr('input', label, 'type checkbox');
        let mark = cr('span', label, 'class checkmark');

    })

}

export { auth, userLogin, userCreate, validateInput, generateList, user, generateMemberList, generateAdminList, toggleNav, toggleLights, getBulbIcon, generatePeopleList, changeEmail, generateEditGroupList, changePassword, loadTheme, generateAgeGroupForm, validateTwoCheckboxes, getSimpleActivityFilters, resetAgeGroupForm, addToTemp, listActivitySuggestions, listActivityFilters }
