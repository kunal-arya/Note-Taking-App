const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");
const addNoteBtn = document.getElementById("addBtn");
const clearAllNotesBtn = document.getElementById("clearBtn");
const allNotes = document.getElementById("all-notes");

let titleObj,bodyObj;

// Show notes at the start
showNotes();

// setting title and body obj by getting data from local storage
function getLocalStorageData() {
    // getting data from the local storage
    const title = localStorage.getItem("title");
    const body = localStorage.getItem("body");


    // Parsing the JSON Data
    if(title !== null) {
        titleObj = JSON.parse(title);
        bodyObj = JSON.parse(body);
    } else {
        titleObj = [];
        bodyObj = [];
    }
} 

function settingLocalStorage() {
    // Storing the current Data to Local Storage
    localStorage.setItem("title",JSON.stringify(titleObj));
    localStorage.setItem("body",JSON.stringify(bodyObj));
}


// Adding the notes
function addNoteClickHandler() {
    // Getting the objects from local Storage
    getLocalStorageData();

    // Pushing current Title and body
    bodyObj.push(bodyEl.value);
    if(titleEl.value === "") {
        titleEl.value = "UNTITLED";
    }
    titleObj.push(titleEl.value);

    console.log(titleEl.value, bodyEl.value);

    // Setting the local Storage
    settingLocalStorage();

    // clearing the title and body
    titleEl.value = "";
    bodyEl.value = "";

    // Show Notes
    showNotes();
}



function showNotes() {
    // Getting the objects from local Storage
    getLocalStorageData();


    let html = "";
    bodyObj.forEach((body,index) => {
        html += `
        <div class="notes">
                <h2 class="notes-title">${titleObj[index]}</h2>
                <p class="notes-body">${body}</p>
                <button class="btn btn-secondary" id="${index}" onclick="deleteBtn(this.id)">Delete Note</button>
        </div>
        `
    });

    if(html === "") {
        allNotes.innerHTML = `<p class="start-text">
            Nothing to show right now...
        </p>`
    } else {
        allNotes.innerHTML = html;
    }
}

function deleteBtn(index) {
    // Getting the objects from local Storage
    getLocalStorageData();
    
    // Deleting the Index
    titleObj.splice(index,1);
    bodyObj.splice(index,1);


    // setting the local storage
    settingLocalStorage();

    // show notes
    showNotes();
}

function clearAllNotesClickHandler() {
    localStorage.clear();
    showNotes();
}

addNoteBtn.addEventListener("click", addNoteClickHandler);
clearAllNotesBtn.addEventListener("click", clearAllNotesClickHandler);