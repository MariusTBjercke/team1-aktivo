import { aktivo } from './model';
import { show, cr, currentPage } from './view';
import { db } from './firestore';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc, collection, query, where } from "firebase/firestore";
let user;
const ref = doc(db, "aktivo", "data");
let addedGroups = aktivo.inputs.newActivity.chosenGroups;
let addedPeople = aktivo.inputs.newActivity.chosenPeople;

// If the user is not logged in (aktivo.app.currentUser is empty) and the page requires authentication, redirect to login

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
//           acitivities.push(x);
//     });
//     console.log(acitivities);
// }
suggestActivities();
function suggestActivities() {
    const allFilters = aktivo.data.filters; // all the filters in the database.
    const selectedFilters = ['2','3']; // the list of all the filters that apply to this instance.     ...UNFINISHED TASK...
    const activities = aktivo.data.activities;
    const includedActivities = activities.filter(activity => activity.exfilters.filter(xfltr => selectedFilters.includes(xfltr)).length === 0);
    const suggestedActivities = [];
    // calculating the strength of every included activity before adding it to suggestedActivities:
    includedActivities.forEach(activity => {
        let str = 0;
        let matchingFilters = activity.filters.filter(fltr => selectedFilters.includes(fltr[0]));
        // sorting the matching filters such that filters with greater strength come first:
        matchingFilters.sort(function(a, b){return b[1] - a[1]});
        // ...let str = matchingFilters.map(x => x[1]); if you want an array of the strengths...(this is irrelevant unless console loging)...
        matchingFilters.forEach((x, i, m) => { // m is short for matchingFilters.
            str += x[1]; // this strength is either that of the strongest filter or it has already been corrected for overlap with every stronger filter:
            let overlapfilters = allFilters[allFilters.findIndex(f => f.name === x[0])].overlap;
            // reducing the strength of successive filters if they overlap with the stronger filter x:
            m.slice(i+1).forEach((y, j) => { 
                let yIndex = overlapfilters.findIndex(ovrlp => ovrlp[0] === y[0]);
                if (yIndex !== -1) {
                    let overlap = overlapfilters[yIndex][1];
                    m[i+1+j][1] *= (1-overlap);  // index in m is i+1+j. (example i=0 + 1 + j=0 means index is 1) or (i=2 + 1 + j=2 means index is 5)
                }
            });
        });
        suggestedActivities.push({
            name: activity.name,
            description: activity.description,
            strength: str,
        })
    });
    console.log(suggestedActivities.sort(function(a, b){return b.strength - a.strength})); // must export...duh...
}


function auth() {
    let pageAuth = false;
    aktivo.data.pages.forEach(page => {
        if (page.name === currentPage) {
            if (page.requiresAuth && !aktivo.app.currentUser) {
                pageAuth = true;
            }
        }
    });
    if (pageAuth) {
        console.log('Du må være logget inn for å få tilgang til denne siden!');
        show('login');
        return;
    }

    // TODO: Delete below code
    // DEV ONLY, REMOVE LATER - START
    if (!user) {

        const userQ = query(collection(db, 'users'), where('username', '==', aktivo.app.currentUser));

        onSnapshot(userQ, (querySnapshot) => {
            querySnapshot.forEach(doc => {
                aktivo.data.user = doc.data();
                user = aktivo.data.user;
            });
        });
        // DEV ONLY, REMOVE LATER - END

        const q = query(collection(db, "users"));

        onSnapshot(q, (x) => {
            const users = [];
            x.forEach(doc => {
                aktivo.data.allUsers.push(doc.data().username);
            });
        });

    }

}

/**
 * 
 * @param {HTMLElement} usernameInput Input field from form where value can be retrieved
 * @param {HTMLElement} passwordInput Input field from form where value can be retrieved
 */
function userLogin(usernameInput, passwordInput) {

    let success = 0;

    for (let x of [[usernameInput, 'loginUsername'], [passwordInput, 'empty']]) validateInput(x[0], x[1]);
    
    const loginQuery = query(collection(db, 'users'), where('username', '==', usernameInput.value));

    onSnapshot(loginQuery, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let xUsername = doc.data().username;
            let xPassword = doc.data().password;
            if (usernameInput.value === xUsername && passwordInput.value === xPassword) {
                aktivo.app.currentUser = usernameInput.value;
                user = doc.data();
                success = 1;
            } else {
                success = 2;
            }
        });
    });
    
    // Did we have to move show() out of snapshot because of some kind of eventlistener?? Who knows? Only time knows. Only time.
    let eternal = setInterval(() => {
        if (success !== 0) {
            if (success == 1) {
                show('home');
            } else {
                passwordInput.value = '';
            }
            clearInterval(eternal);
        }
    }, 100);
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

        // Insert data to Firestore
        updateUser(username.value, userObject);

        // aktivo.data.users.push(userObject);
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
            let users = aktivo.data.allUsers;

            if (input.value.length === 0) {
                error.message = 'Mangler brukernavn.';
            }
            else if (users.includes(input.value)) {
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
            error.message = 'Ugyldig passord.';

            if (input.value.length > 3) {
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
                console.log('CurrentPage: ' + currentPage);
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
            updateUser(aktivo.app.currentUser, user);
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
            if (!admPerson.edit) admPerson.temp = {name:'',filters:[]};
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

function savePerson() {
    const admPerson = aktivo.inputs.administer.person;
    const person = admPerson.temp;
    if ((admPerson.edit || person.filters.length > 0) && person.name !== '') {
        if (admPerson.returnPage === 'newactivitypeople' || admPerson.returnPage === 'newActivityMembers') {
            const activityMembers = aktivo.inputs.newActivity.chosenPeople;
            if (!admPerson.edit) activityMembers.push({name: person.name});                    
            if (admPerson.returnPage === 'newActivityMembers') {
                activityMembers[activityMembers.findIndex(x => x.name === user.people[admPerson.index].name)].name = person.name;
            }
        }
        if (admPerson.returnPage === 'newGroup' || admPerson.returnPage === 'editGroup') {
            const groupMembers = aktivo.inputs.administer.group.temp.members;
            if (!admPerson.edit) groupMembers.push(person.name);
            if (admPerson.returnPage === 'editGroup') {
                groupMembers[groupMembers.findIndex(x => x === user.people[admPerson.index].name)] = person.name;
            }
        }

        if (admPerson.edit) {
            user.groups.forEach(g => {
                let gIndex = g.members.findIndex(member => member === user.people[admPerson.index].name);
                if (gIndex > -1) g.members[gIndex] = person.name;
            });
            user.people[admPerson.index] = {...admPerson.temp};
        }
        else user.people.push(admPerson.temp);
        admPerson.edit = false;
        admPerson.addedToTemp = false;
        console.log(admPerson.returnPage);
        updateUser(user.username, user);
        show(admPerson.returnPage);
        admPerson.returnPage = '';
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

        updateUser(aktivo.app.currentUser, user);

        show('changeemail');

    }

}

function updateUser(username, object) {
    const docRef = doc(db, "users", username);
    setDoc(docRef, object);
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
        updateUser(aktivo.app.currentUser, user);
        show('showchangepassword');
    }

}

function getBulbIcon() {
    if (aktivo.data.user) {
        return aktivo.data.user.lightsOn ? '<i class="fas fa-lightbulb"></i>' : '<i class="far fa-lightbulb"></i>';
    } else {
        return aktivo.data.lightsOn ? '<i class="fas fa-lightbulb"></i>' : '<i class="far fa-lightbulb"></i>';
    }
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
    let lightsOn = () => {
        if (user) {
            return user.options.lightsOn;
        } else {
            return aktivo.data.lightsOn;
        }
    }
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

    });

}

function listEditFilters(filtersContainer) {
    const person = aktivo.inputs.administer.person.temp;

    let filters = aktivo.data.filters;

    filters.filter(x => !x.agegroup && !x.count && !x.gender).forEach(fltr => {

        generateCheckbox(filtersContainer, fltr, person.filters);

    });
}

function listAgegroupFilters(filtersContainer) {
    const person = aktivo.inputs.administer.person.temp;

    let filters = aktivo.data.filters;

    let ageGroupInputs = [];
    filters.filter(x => x.agegroup).forEach(fltr => {

        generateCheckbox(filtersContainer, fltr, person.filters, ageGroupInputs, true);

    });
}

function listGenderFilters(filtersContainer) {
    const person = aktivo.inputs.administer.person.temp;

    let filters = aktivo.data.filters;
    let genderInputs = [];
    filters.filter(x => x.gender).forEach(fltr => {

        generateCheckbox(filtersContainer, fltr, person.filters, genderInputs, true);

    });
}

function generateCheckbox(filtersContainer, fltr, list, inputs, maxOne) {

    let filterContainer = cr('div', filtersContainer, 'class filter checkbox-input');

    let name = cr('div', filterContainer, 'class name', fltr.name);

    let label = cr('label', name);
    let input = cr('input', label, 'type checkbox');
    let mark = cr('span', label, 'class checkmark');
    input.checked = list.includes(fltr.name) ? true : false;
    if (inputs) {
        inputs.push({inpt: input, name: fltr.name})
    }

    input.onchange = () => {
        console.log('onchange');
        if (input.checked) {
            if (inputs) console.log('inputs.length before: ' + inputs.filter(xx => xx.inpt.checked).length);
            if (maxOne && inputs.filter(xx => xx.inpt.checked).length > 1) {
                let indx = inputs.findIndex(i => i.inpt.checked === true && i.name !== fltr.name);
                console.log('indx ' +indx);
                if (indx !== -1) {
                    inputs[indx].inpt.checked = false;
                    list.splice([list.findIndex(name => name === inputs[indx].name)], 1);
                }
            }
            list.push(fltr.name);
            if (inputs) console.log('inputs.length after: ' + inputs.filter(xx => xx.inpt.checked).length);
            
        } else {
            let spliceIndex = list.findIndex(name => name === fltr.name);
            console.log('spliceIndex, filter: ' + spliceIndex, list[spliceIndex]);
            if (spliceIndex !== -1) list.splice([spliceIndex], 1);
        }
        console.log('checked filters:');
        list.forEach(dfgh => {
            console.log('' + dfgh);
        });
    }
}

export { auth, listAgegroupFilters, userLogin, userCreate, validateInput, generateList, user, generateMemberList, generateAdminList, toggleNav, toggleLights, getBulbIcon, generatePeopleList, changeEmail, generateEditGroupList, changePassword, loadTheme, generateAgeGroupForm, validateTwoCheckboxes, getSimpleActivityFilters, resetAgeGroupForm, addToTemp, listActivitySuggestions, listActivityFilters, suggestActivities, updateUser, listEditFilters, listGenderFilters, savePerson }
