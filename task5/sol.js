// В Контест нужно отправлять index.html, а не sol.js
// JS код - не единственные измениния изначального index.html, предложенного авторами задачи
// Изначальный index.html находится в папке stub

let dropTargets = document.querySelectorAll(".Droppable");
let tagElements = document.querySelectorAll(".Tag");
let letterElements = document.querySelectorAll(".Letter");
let lettersElement = document.querySelector(".Letters");
let tagsElement = document.querySelector(".Tags");

let draggableElement = this;
let elementDragsFrom = this.parentElement;

function tagDragStartHandler(event) {
    let target = event.target;
    target.classList.add("Tag_dragged");
    lettersElement.classList.toggle("Letters_dropzone");
    if (target.closest(".Letters") == lettersElement) {
    tagsElement.classList.toggle("Tags_dropzone");
    }

    draggableElement = this;
    elementDragsFrom = this.parentElement;
    event.dataTransfer.effectAllowed = "copyMove";
    event.dataTransfer.setData("text/html", this.innerHTML);
}

function dragOverHandler(event) {
    event.preventDefault();
    return false;
}

function tagsDragEnterHandler(event) {
    let target = event.target;

    console.log(target);

    if ( target.classList.contains("Tags") && elementDragsFrom.classList.contains("Letter") ) {
    if (!target.classList.contains("Tags_dragovered")) {
        target.classList.add("Tags_dragovered");
    }
    }
}

function letterDragEnterHandler(event) {
    let target = event.target;

    console.log(target);

    if ( target.classList.contains("Letter") && !isLetterContainsTag(target, draggableElement) ) {
    if (!target.classList.contains("Letter_dragovered")) {
        target.classList.add("Letter_dragovered");
    }
    }
}

// function tagDragLeaveHandler(event) {} 
// По хорошему, нужно написать обработчик dragleave для удаления классов, которые добавляются на событии dragenter

function tagDragEndHandler(event) {
    lettersElement.classList.toggle("Letters_dropzone");
    tagsElement.classList.toggle("Tags_dropzone");
    event.target.classList.remove("Tag_dragged");
    letterElements.forEach((elem) => {
    elem.classList.remove("Letter_dragovered");
    });
    tagsElement.classList.remove("Tags_dragovered");
}

function dropHandler(event) {
    event.stopPropagation();
    target = event.target;
    
    if ( !isLetterContainsTag(target, draggableElement) ) {
    if ( target.classList.contains("Letter") ) {
        target.append(draggableElement.cloneNode(true));
        let letterTagsData = data.letters[getLetterIndexById(this.dataset.letterId)].tags;
        letterTagsData.push(draggableElement.dataset.tagId);
    }
    
    if ( elementDragsFrom.classList.contains("Letter") && draggableElement !== target ) {
        draggableElement.remove();
        let letter = data.letters[getLetterIndexById(elementDragsFrom.dataset.letterId)];
        tagIndex = letter.tags.indexOf(draggableElement.dataset.tagId);
        letter.tags.splice(tagIndex, 1);
    }
    }
}

tagElements.forEach(element => {
    element.addEventListener("dragstart", tagDragStartHandler);
    element.addEventListener("dragend", tagDragEndHandler);
    element.addEventListener("dragover", dragOverHandler);
});
dropTargets.forEach(element => {
    element.addEventListener("dragover", dragOverHandler);
    element.addEventListener("drop", dropHandler);
})
tagsElement.addEventListener("dragenter", tagsDragEnterHandler);
letterElements.forEach(element => element.addEventListener("dragenter", letterDragEnterHandler));

function getLetterIndexById(letterId) { return data.letters.findIndex((l) => l.id === letterId); }

function isLetterContainsTag(letterElement, tagElement) {
    let letterId = letterElement.dataset.letterId;
    let tagId = tagElement.dataset.tagId;
    let letterTags = data.letters[getLetterIndexById(letterId)]?.tags;
    return letterTags.includes(tagId);
}