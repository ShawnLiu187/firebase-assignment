const key = "liu00415";
let contacts = [];
let teams;
let players;
let archetypes;

let init = function () {

    const firestore = firebase.firestore();
    const settings = { /* your settings... */
        timestampsInSnapshots: true
    };
    firestore.settings(settings);

    let db = firebase.firestore();
    teams = db.collection("teams");
    players = db.collection("players");
    archetypes = db.collection("archetypes");

//    teams.onSnapshot(function (snapShot) {
//        console.log("something changed");
////        snapShot.docChanges.forEach(function (change) {
////            if (change.type == 'added') {
////                console.log('team madded');
////            }
////            if (change.type == 'modified') {
////                console.log('team modified');
////            }
////            if (change.type == 'removed') {
////                console.log('team removed');
////            }
////        })
//    });

    document.querySelector(".fab").addEventListener("click", showForm);
    document.getElementById("btnCancel").addEventListener("click", hideForm);
    document.getElementById("btnSave").addEventListener("click", newContact);
    document.getElementById("btnEdit").addEventListener("click", newEditContact);
    document.getElementById("editbtnCancel").addEventListener("click", hideForm);

    displayTeams();
    displayPlayers();
    displayTypes();

}

//ASYNC Version 1

//let displayTeams = async function () {
//    let ul = document.querySelector(".teams");
//
//    while (ul.hasChildNodes()) {
//        ul.removeChild(ul.firstChild)
//    };
//
//    let resultsDF = (await function () {
//        let df = document.createDocumentFragment();
//
//        if (function () {
//                return 'content' in document.createElement('template');
//            }) {
//            let temp = document.getElementById('myTemplate');
//            let content = temp.content;
//            console.log('template is working', content);
//
//            teams.get().then((querySnapshot) => {
//                querySnapshot.forEach(doc => {
//                    console.log("Testing", doc.data());
//                    let document = doc.data();
//
//                    let unit = content.cloneNode(true);
//                    let fullname = unit.querySelector('h3');
//                    let spanX = unit.querySelector('span');
//                    let edit = unit.querySelector('.edit');
//
//                    fullname.textContent = document.name;
//                    spanX.addEventListener("click", deleteItem);
//                    spanX.setAttribute("data-email", document.docName);
//                    edit.addEventListener("click", editItem);
//                    edit.setAttribute("data-email", document.docName);
//
//                    df.appendChild(unit);
//
//                });
//            })
//        } else {
//            console.log('content is not working')
//        }
//
//        return df;
//
//    })();
//    
//    console.log("results: ", resultsDF);
//    ul.appendChild(resultsDF);
//}


//ASYNC version 2

let displayTeams = async function () {
    let ul = document.querySelector(".teams");
    let df = document.createDocumentFragment();

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild)
    };

    if (function () {
            return 'content' in document.createElement('template');
        }) {
        let temp = document.getElementById('myTemplate');
        let content = temp.content;

        await teams.get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log("Teams: ", doc.data());
                let document = doc.data();

                let unit = content.cloneNode(true);
                let fullname = unit.querySelector('h3');
                let spanX = unit.querySelector('span');
                let edit = unit.querySelector('.edit');

                fullname.textContent = document.name;
                spanX.addEventListener("click", deleteItem);
                spanX.setAttribute("data-id", document.docName);
                spanX.setAttribute("data-category", "teams");
                edit.addEventListener("click", editItem);
                edit.setAttribute("data-id", document.docName);
                edit.setAttribute("data-name", document.name);
                edit.setAttribute("data-category", "teams");

                df.appendChild(unit);

            });
        })
    } else {
        console.log('content is not working')
    }

    ul.appendChild(df);
}



let displayPlayers = async function () {
    let ul = document.querySelector(".players");
    let df = document.createDocumentFragment();

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild)
    };

    if (function () {
            return 'content' in document.createElement('template');
        }) {
        let temp = document.getElementById('myTemplate');
        let content = temp.content;

        await players.get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log("Players", doc.data());
                let document = doc.data();

                let unit = content.cloneNode(true);
                let fullname = unit.querySelector('h3');
                let spanX = unit.querySelector('span');
                let edit = unit.querySelector('.edit');

                fullname.textContent = document.name;
                spanX.addEventListener("click", deleteItem);
                spanX.setAttribute("data-id", document.docName);
                spanX.setAttribute("data-category", "players");
                edit.addEventListener("click", editItem);
                edit.setAttribute("data-id", document.docName);
                edit.setAttribute("data-name", document.name);
                edit.setAttribute("data-category", "players");

                df.appendChild(unit);

            });
        })
    } else {
        console.log('content is not working')
    }
    ul.appendChild(df);
}

let displayTypes = async function () {
    let ul = document.querySelector(".archetypes");
    let df = document.createDocumentFragment();

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild)
    };

    if (function () {
            return 'content' in document.createElement('template');
        }) {
        let temp = document.getElementById('myTemplate');
        let content = temp.content;

        await archetypes.get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log("Archetypes", doc.data());
                let document = doc.data();

                let unit = content.cloneNode(true);
                let fullname = unit.querySelector('h3');
                let spanX = unit.querySelector('span');
                let edit = unit.querySelector('.edit');

                fullname.textContent = document.name;
                spanX.addEventListener("click", deleteItem);
                spanX.setAttribute("data-id", document.docName);
                spanX.setAttribute("data-category", "archetypes");
                edit.addEventListener("click", editItem);
                edit.setAttribute("data-id", document.docName);
                edit.setAttribute("data-name", document.name);
                edit.setAttribute("data-category", "archetypes");

                df.appendChild(unit);
            });
        })
    } else {
        console.log('content is not working')
    }
    ul.appendChild(df);
}

let showForm = function () {
    document.querySelector(".overlay").classList.remove("not");
    document.querySelector(".formContainer").classList.remove("not");
}

let showEditForm = function () {
    document.querySelector(".overlay").classList.remove("not");
    document.querySelector(".editformContainer").classList.remove("not");
}

let hideForm = function () {
    document.querySelector(".overlay").classList.add("not");
    document.querySelector(".formContainer").classList.add("not");
    document.querySelector(".editformContainer").classList.add("not");
    document.querySelector(".contactform").reset();
}


let newEditContact = function (ev) {
    ev.preventDefault();

    let category = document.getElementById('editCategory').value.trim();
    let newName = document.getElementById('editinput-name').value.trim();
    let docName = ev.target.getAttribute("data-id");

    if (newName) {

        switch (category) {
            case "teams":
                teams.doc(docName).set({
                    name: newName
                }, {
                    merge: true
                }).then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
                displayTeams();
                break;
            case "players":
                players.doc(docName).set({
                    name: newName
                }, {
                    merge: true
                }).then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
                displayPlayers();
                break;
            case "archetypes":
                archetypes.doc(docName).set({
                    name: newName
                }, {
                    merge: true
                }).then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
                displayTypes();
                break;
            default:
                console.log("something is wrong");
        }
        hideForm();
    } else {
        alert("Please fill out the form!");
    }

}

let newContact = function (ev) {
    ev.preventDefault();
    let category = document.getElementById('candidate').value.trim();
    let name = document.getElementById('input-name').value.trim();

    if (category && name) {

        switch (category) {
            case "teams":
                teams.doc(name).set({
                    name: name,
                    docName: name
                }).then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
                displayTeams();
                break;
            case "players":
                players.doc(name).set({
                    name: name,
                    docName: name
                }).then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
                displayPlayers();
                break;
            case "archetypes":
                archetypes.doc(name).set({
                    name: name,
                    docName: name
                }).then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
                displayTypes();
                break;
            default:
                console.log("something is wrong");
        }
        hideForm();
    } else {
        alert("Please fill out the form!");
    }

}

let deleteItem = function (ev) {
    ev.preventDefault();
    let docName = ev.target.getAttribute("data-id");
    let category = ev.target.getAttribute("data-category");
    switch (category) {
        case "teams":
            teams.doc(docName).delete()
                .then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
            displayTeams();
            break;
        case "players":
            players.doc(docName).delete()
                .then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
            displayPlayers();
            break;
        case "archetypes":
            archetypes.doc(docName).delete()
                .then(console.log("works")).catch(function (error) {
                    console.log('error', error);
                })
            displayTypes();
            break;
        default:
            console.log("something is wrong");
    }

}

let editItem = function (ev) {
    ev.preventDefault();
    let docName = ev.target.getAttribute("data-id");
    let oldName = ev.target.getAttribute("data-name");
    let category = ev.target.getAttribute("data-category");

    console.log(docName, oldName, category);
    showEditForm();

    document.getElementById('editinput-oldname').value = oldName;
    document.getElementById('editCategory').value = category;
    document.getElementById("btnEdit").setAttribute("data-id", docName);
}



document.addEventListener('DOMContentLoaded', init);

//Questions:
//1. async version 1
//2. form control name =''
//3. Weird form Reload???
//4. onSnapshot what's wrong?
