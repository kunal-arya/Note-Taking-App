const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");
const addNoteBtn = document.getElementById("addBtn");
const clearAllNotesBtn = document.getElementById("clearBtn");
const allNotes = document.getElementById("all-notes");
const searchEl = document.getElementById("search");

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

    // Setting the local Storage
    settingLocalStorage();

    // clearing the title and body
    titleEl.value = "";
    bodyEl.value = "";

    // Show Notes
    showNotes();
}


// Show Notes
function showNotes() {
    // Getting the objects from local Storage
    getLocalStorageData();


    let html = "";
    bodyObj.forEach((body,index) => {
        html += `
        <div class="notes notecard">
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
        allNotes.innerHTML = `            <p class="search-text search-hide">
        No Result to Show....
    </p>` + html;
    }
}

// Delete button click Handler
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

// clearBtn click Handler
function clearAllNotesClickHandler() {
    // clear local storage
    localStorage.clear();

    // show notes 
    showNotes();
}

// SearchEl click Handler
function searchClickHandler() {
    const search = searchEl.value.toLowerCase();
    const noteCard = document.querySelectorAll(".notecard");
    let totalNotes = noteCard.length;
    for(let note of noteCard) {
        // body of all the note Cards
        const body = note.getElementsByTagName('p')[0].textContent.toLowerCase();

        // title of all the note Cards
        const title = note.getElementsByTagName("h2")[0].textContent.toLowerCase();
        
        // If either body or title includes search Input, show that note only
        if(body.includes(search) || title.includes(search)) {
            note.style.display = "block";
            totalNotes++;
        } else {
            note.style.display = "none";
            totalNotes--;
        }
    }


// If search result has no Notes to show
    if(totalNotes == 0) {
        document.querySelector(".search-text").classList.remove("search-hide");
    } else {
        document.querySelector(".search-text").classList.add("search-hide");
    }
}

addNoteBtn.addEventListener("click", addNoteClickHandler);
clearAllNotesBtn.addEventListener("click", clearAllNotesClickHandler);
searchEl.addEventListener("input",searchClickHandler);

