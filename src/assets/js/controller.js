import { aktivo } from './model';
import { show, cr, currentPage } from './view';
import { db } from './firestore';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc, collection, query, where } from "firebase/firestore";
let user;
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

function suggestActivities() {
    const allFilters = aktivo.data.filters; // all the filters in the database.
    const selectedFilters = aktivo.inputs.newActivity.filters; // the list of all the filters that apply to this instance.
    const activities = aktivo.data.activities;
    const includedActivities = activities.filter(activity => activity.exfilters.filter(xfltr => selectedFilters.includes(xfltr)).length === 0);                    //if changing filters to an array of objects: change .includes(xfltr) to .findIndex(d => d.name === xfltr) !== -1
    const suggestedActivities = [];
    // calculating the strength of every included activity before adding it to suggestedActivities:
    includedActivities.forEach(activity => {
        let str = 0;
        let matchingFilters = activity.filters.filter(fltr => selectedFilters.includes(fltr[0]));                                                                  //if changing filters to an array of objects: clone matchingFilters with str*=multiplier and change .includes(fltr[0]) to .findIndex(df => df.name === fltr[0]) !== -1
        // sorting the matching filters such that filters with greater strength come first:
        matchingFilters.sort(function(a, b){return b[1] - a[1]});
        // ...let str = matchingFilters.map(x => x[1]); if you want an array of the strengths...(this is irrelevant unless console loging)...
        matchingFilters.forEach((x, i, m) => { // m is short for matchingFilters.
            str += x[1]; // this strength is either that of the strongest filter or it has already been corrected for overlap with every stronger filter:          //if changing filters to an array of objects: str += x[1] * selectedFilters[selectedFilters.findIndex(sf => sf.name === x[0])].multiplier;
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
    return suggestedActivities.sort(function(a, b){return b.strength - a.strength}); // must export...duh...
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
                loadTheme();
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
async function userLogin(usernameInput, passwordInput) {

    for (let x of [[usernameInput, 'loginUsername'], [passwordInput, 'empty']]) validateInput(x[0], x[1]);
    if (!usernameInput.value > 0 && !passwordInput.value > 0) return;

    const docRef = doc(db, "users", usernameInput.value);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && passwordInput.value === docSnap.data().password) {
        aktivo.app.currentUser = usernameInput.value;
        user = docSnap.data();
        loadTheme();
        show('home');
    } else {
        passwordInput.value = '';
    }

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
            options: {
                lightsOn: true,
            }
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
    let count = 0;

    let row = cr('div', form, 'class row');

    let age = cr('div', row, 'class member-count', 'Antall personer:');

    let counter = cr('div', row, 'class counter');
    let decrease = cr('div', counter, 'class decrease', '-');
    let amount = cr('input', counter, `class amount, type number, value ${count}`);
    let increase = cr('div', counter, 'class increase', '+');

    // Counter listeners
    for (let x of [
        [increase, 'click', increaseCounter],
        [decrease, 'click', decreaseCounter],
        [amount, 'change', checkCounter]
    ]) {
        x[0].addEventListener(x[1], () => {
            x[2](amount);
            // updateAgeGroupAmount(item.age, amount.value);
        });
    }


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
    else setMembercount(counter.value);
}

function increaseCounter(counter, event) {
    counter.value++;
    setMembercount(counter.value)
}

function decreaseCounter(counter) {
    if (counter.value > 0)
        counter.value--;
        setMembercount(counter.value)
}

function setMembercount(count) {
    if (count < 1) return;
    const allCountFilters = aktivo.data.filters.filter(x => x.count);
    const filters = aktivo.inputs.newActivity.filters;
    const countFilters = filters.filter(f => allCountFilters.findIndex(x => x.name === f) !== -1);
    if (countFilters.length === 1) {
        let index = filters.findIndex(i => i === countFilters[0])
        filters.splice(index, 1);
    }
    let number;
    if (count >= 6) number = '6+';
    else if (count >= 4) number = '4-5';
    else if (count == 3) number = '3';
    else if (count == 2) number = '2';
    else if (count == 1) number = '1';
    filters.push(number);
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
    if (user) {
        return user.options.lightsOn ? '<i class="fas fa-lightbulb"></i>' : '<i class="far fa-lightbulb"></i>';
    } else {
        return '<i class="fas fa-lightbulb"></i>';
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
    updateUser(user.username, user);
}

function setTheme(themeName) {
    document.documentElement.className = themeName;
}

function loadTheme() {
    if (user) {
        if (user.options.lightsOn) {
            setTheme('theme-light');
        } else {
            setTheme('theme-dark');
        }
    } else {
        setTheme('theme-light');
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

    let activities = suggestActivities();

    activities.forEach(item => {
        let row = cr('div', listContainer, 'class row');

        let subRow = cr('div', row);
        
        let title = cr('div', subRow, 'class title', item.name);

        // let moreBtnContainer = cr('div', subRow, 'class more-btn-container');
        // let moreBtnText = cr('div', moreBtnContainer, 'class more-btn-text', 'Les mer');

        let description = cr('div', row, 'class description', item.description);
    })

}


function listEditFilters(filtersContainer) {
    const person = aktivo.inputs.administer.person.temp;

    let filters = aktivo.data.filters;

    filters.filter(x => x.person).forEach(fltr => {

        generateCheckbox(filtersContainer, fltr, person.filters);

    });
}

function listActivityFilters(filtersContainer) {
    const newActivity = aktivo.inputs.newActivity;

    let filters = aktivo.data.filters;

    filters.filter(x => x.activity).forEach(fltr => {

        generateCheckbox(filtersContainer, fltr, newActivity.filters);

    });
}

function listAgegroupFilters(filtersContainer, simple) {
    const person = aktivo.inputs.administer.person.temp;

    let filters = aktivo.data.filters;

    let ageGroupInputs = [];
    filters.filter(x => x.agegroup).forEach(fltr => {

        generateCheckbox(filtersContainer, fltr, simple? aktivo.inputs.newActivity.filters : person.filters, ageGroupInputs, simple? false : true);
    });
}

function listGenderFilters(filtersContainer, simple) {
    const person = aktivo.inputs.administer.person.temp;

    let filters = aktivo.data.filters;
    let genderInputs = [];
    filters.filter(x => simple ? x.onlygender : x.gender).forEach(fltr => {

        generateCheckbox(filtersContainer, fltr, simple? aktivo.inputs.newActivity.filters : person.filters, genderInputs, true);
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
            if (spliceIndex !== -1) list.splice([spliceIndex], 1);
        }
        console.log('checked filters:');
        list.forEach(dfgh => {
            console.log('' + dfgh);
        });
    }
}

function emptyActivityFilters() {
    const filters = aktivo.inputs.newActivity.filters;
    filters.splice(0, filters.length);
}

function setActivityFilters(simple) {
    aktivo.inputs.activityFilters.returnPage = currentPage;
    const members = aktivo.inputs.newActivity.chosenPeople;
    const filters = aktivo.inputs.newActivity.filters;
    if (!simple) {
        emptyActivityFilters();
        setMembercount(members.length);        
        members.forEach(m => {
            let personIndex = user.people.findIndex(z => z.name === m.name);
            user.people[personIndex].filters.forEach(x => {
                if (!filters.includes(x)) filters.push(x); // remove if the commented out code below is used.

                // // adding object to filters instead of just names, and counting repeating filters:
                // let filterIndex = filters.findIndex(t => t.name === x);
                // if (filterIndex === -1) filters.push({
                //     name: x.name,
                //     count: 1,
                //     multiplier: 1,
                //     opposite: x.opposite
                // });
                // else filters[filterIndex].count++;
            });
        });
        for (let genders of [['Mann', 'Kvinne'],['Kvinne', 'Mann']]) {
            if (filters.includes(genders[0]) && !filters.includes(genders[1])) {
                filters.push(genders[0] === 'Mann' ? 'Kun menn' : 'Kun kvinner');
                console.log(filters);
            }
        }

        // // calculating the filter multiplier from having an opposite filter:
        // filters.filter(f => f.count && f.opposite).forEach(op1 => {
        //     if (op1.multiplier === 1) {
        //         let op2Index = filters.findIndex(op2 => op2.name === op1.opposite);
        //         if (op2Index !== -1) {
        //             let op2 = filters[op2Index];
        //             op1.multiplier = (op1.count)/(op1.count+op2.count);
        //             op2.multiplier = (op2.count)/(op1.count+op2.count);
        //         }
        //     }
        // });
    }
    console.log(filters);
    show('activityFilters');
}

export { auth, listAgegroupFilters, userLogin, userCreate, validateInput, generateList, user, generateMemberList, generateAdminList, toggleNav, toggleLights, getBulbIcon, generatePeopleList, changeEmail, generateEditGroupList, changePassword, loadTheme, generateAgeGroupForm, validateTwoCheckboxes, resetAgeGroupForm, addToTemp, listActivitySuggestions, listActivityFilters, suggestActivities, updateUser, listEditFilters, listGenderFilters, savePerson, setActivityFilters, emptyActivityFilters }
