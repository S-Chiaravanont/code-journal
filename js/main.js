var $photoURLInput = document.querySelector('#photo-url');
$photoURLInput.addEventListener('change', updateImgURLHandle);

var $imgEntry = document.querySelector('#img-entry');
var $formTitle = document.querySelector('#form-title');

var $formElement = document.querySelector('form');
$formElement.addEventListener('submit', saveEntryHandle);

var $entryViewList = document.querySelector('#entry-view-ul');
$entryViewList.addEventListener('click', editHandle);

window.addEventListener('DOMContentLoaded', loadEntries);

var $entryNavButton = document.querySelector('#to-entries');
$entryNavButton.addEventListener('click', showEntriesList);

var $viewEntry = document.querySelector('#view-entry');
var $createEntry = document.querySelector('#create-entry');

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', showEntryForm);

var $saveDivElement = document.querySelector('#save-div');
var $deleteAnchor = document.createElement('a');
$deleteAnchor.textContent = 'Delete Entry';
$deleteAnchor.setAttribute('id', 'delete-button');

function updateImgURLHandle(event) {
  if (event.target.value === '') {
    $imgEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $imgEntry.setAttribute('src', event.target.value);
  }
}

function saveEntryHandle(event) {
  event.preventDefault();
  var formDataObj = {
    title: $formElement.elements.title.value,
    imgURL: $formElement.elements.photo.value,
    notes: $formElement.elements.notes.value
  };
  if (data.editing === null) {
    formDataObj.entryId = data.nextEntryId;
    data.entries.unshift(formDataObj);
    data.nextEntryId++;
    var $newEntry = renderEntry(formDataObj);
    $entryViewList.prepend($newEntry);
  } else {
    formDataObj.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = formDataObj.title;
        data.entries[i].imgURL = formDataObj.imgURL;
        data.entries[i].notes = formDataObj.notes;
        break;
      }
    }
    var $editedEntry = renderEntry(formDataObj);
    var $itemNodes = document.querySelectorAll('i');
    for (var j = 0; j < $itemNodes.length; j++) {
      if (parseInt($itemNodes[j].getAttribute('data-entry-id')) === formDataObj.entryId) {
        var $itemToBeReplaced = $itemNodes[j].closest('.entry-list-item');
        break;
      }
    }
    $itemToBeReplaced.replaceWith($editedEntry);
  }
  $imgEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formElement.reset();
  data.editing = null;
  showEntriesList();
  $formTitle.textContent = 'New Entry';
  $deleteAnchor.remove();
  $saveDivElement.setAttribute('class', 'column-full flex-right');
}

function renderEntry(entry) {
  var $notesElement = document.createElement('p');
  $notesElement.textContent = entry.notes;
  $notesElement.setAttribute('class', 'parag-margin');
  var $penEditElement = document.createElement('i');
  $penEditElement.setAttribute('class', 'fa-solid fa-pen edit-pos');
  $penEditElement.setAttribute('data-entry-id', entry.entryId);
  var $titleElement = document.createElement('h2');
  $titleElement.textContent = entry.title;
  $titleElement.setAttribute('class', 'inline-block');
  var $divEntryText = document.createElement('div');
  $divEntryText.setAttribute('class', 'column-half pos-rel');
  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.imgURL);
  var $entryImgFrame = document.createElement('div');
  $entryImgFrame.setAttribute('class', 'img-frame');
  var $divEntryImg = document.createElement('div');
  $divEntryImg.setAttribute('class', 'column-half');
  var $listElement = document.createElement('li');
  $listElement.setAttribute('class', 'row entry-list-item');
  $listElement.appendChild($divEntryImg);
  $listElement.appendChild($divEntryText);
  $divEntryImg.appendChild($entryImgFrame);
  $entryImgFrame.appendChild($entryImg);
  $divEntryText.appendChild($titleElement);
  $divEntryText.appendChild($penEditElement);
  $divEntryText.appendChild($notesElement);
  return $listElement;
}

function loadEntries() {
  if (data.entries.length === 0) {
    var $noEntries = document.createElement('p');
    $noEntries.textContent = 'No Entries have been recorded.';
    $noEntries.setAttribute('class', 'no-entries');
    $entryViewList.appendChild($noEntries);
  }
  for (var i = 0; i < data.entries.length; i++) {
    var $entry = renderEntry(data.entries[i]);
    $entryViewList.appendChild($entry);
  }
  if (data.view === 'entry-form') {
    showEntryForm();
  } else {
    showEntriesList();
  }
}

function showEntriesList() {
  // go to entries
  $viewEntry.setAttribute('class', 'view');
  $createEntry.setAttribute('class', 'view hidden');
  data.view = 'entries';
  data.editing = null;
  $imgEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formElement.reset();
  $formTitle.textContent = 'New Entry';
  $deleteAnchor.remove();
  $saveDivElement.setAttribute('class', 'column-full flex-right');
}

function showEntryForm(isEdit) {
  // go to create entry
  $viewEntry.setAttribute('class', 'view hidden');
  $createEntry.setAttribute('class', 'view');
  data.view = 'entry-form';
}

function editHandle(event) {
  if (event.target.nodeName !== 'I') {
    return;
  }
  $formTitle.textContent = 'Edit Entries';
  showEntryForm();
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(event.target.getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
    }
  }
  $formElement.elements.title.value = data.editing.title;
  $formElement.elements.photo.value = data.editing.imgURL;
  $formElement.elements.notes.value = data.editing.notes;
  $imgEntry.setAttribute('src', data.editing.imgURL);

  $saveDivElement.prepend($deleteAnchor);
  $saveDivElement.setAttribute('class', 'column-full display-between');
}
