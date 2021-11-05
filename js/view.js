let app = document.querySelector("#app");

// could have a setPage('pageName') function that sets the currentPage based on a string parameter and then calls show()
show();
function show() {

    // Authentication
    let requiresAuth = false;
    if (!currentUser) currentPage = 'login';

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
    console.log('test');
}
function showRegister() {}
function showRecoverPassword() {}
function showRecoverEmail() {}

function showFrontPage() {
    
}

// new activity:
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

/**
 * Similar to the createElement function, but refactored for this app.
 * @param {string} tagName The name of an element.
 * @param {HTMLElement} parent Parent element for this new child element.
 * @param {string} attr Example: class red rectangle,id container
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