// Form
var $photoURLInput = document.querySelector('#photo-url');
$photoURLInput.addEventListener('change', updateImgURLHandle);

var $imgEntry = document.querySelector('#img-entry');
var $formTitle = document.querySelector('#form-title');

var $formElement = document.querySelector('form');
$formElement.addEventListener('submit', saveEntryHandle);

// Entries
var $entryViewList = document.querySelector('#entry-view-ul');
$entryViewList.addEventListener('click', editHandle);

window.addEventListener('DOMContentLoaded', loadEntries);

var $entryNavButton = document.querySelector('#to-entries');
$entryNavButton.addEventListener('click', showEntriesList);

var $viewEntry = document.querySelector('#view-entry');
var $createEntry = document.querySelector('#create-entry');

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', showEntryForm);

// Delete
var $deleteAnchor = document.querySelector('#delete-button');
$deleteAnchor.addEventListener('click', deleteModalHandler);

var $deleteModalDiv = document.querySelector('#delete-modal-div');
var $cancelModalButton = document.querySelector('#cancel-button');
$cancelModalButton.addEventListener('click', cancelDeleteHandler);
var $confirmDeleteModalButton = document.querySelector('#confirm-delete-button');
$confirmDeleteModalButton.addEventListener('click', confirmDeleteModalHandler);

// Search
var $searchBoxElement = document.querySelector('#search-box');
$searchBoxElement.addEventListener('input', searchResultHandler);

// TAGs
var $tagIconDisplay = document.querySelectorAll('.tag-icon-div');
var $tagSelect = document.querySelector('#tag');

$tagSelect.addEventListener('change', updateTagIconHandler);

var $tagSelectionDiv = document.querySelector('.tag-selection');
var $tagIconElements = $tagSelectionDiv.querySelectorAll('I');

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
    notes: $formElement.elements.notes.value,
    tag: $formElement.elements.tag.value
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
        data.entries[i].tag = formDataObj.tag;
        break;
      }
    }
    var $editedEntry = renderEntry(formDataObj);
    var $itemNodes = document.querySelectorAll('i');
    for (var j = 0; j < $itemNodes.length; j++) {
      if (parseInt($itemNodes[j].getAttribute('data-entry-id')) === formDataObj.entryId) {
        var $itemToBeReplaced = $itemNodes[j].closest('#entry-list-item');
        break;
      }
    }
    $itemToBeReplaced.replaceWith($editedEntry);
  }
  showEntriesList();
}

function renderEntry(entry) {
  var $notesElement = document.createElement('p');
  $notesElement.textContent = entry.notes;
  $notesElement.setAttribute('class', 'parag-margin');
  var $tagIconElement = document.createElement('i');
  $tagIconElement.setAttribute('class', tagSelector(entry.tag));
  $tagIconElement.className += ' tag-icon-style';
  var $penEditElement = document.createElement('i');
  $penEditElement.setAttribute('class', 'fa-solid fa-pen edit-pos');
  $penEditElement.setAttribute('data-entry-id', entry.entryId);
  $penEditElement.setAttribute('id', 'edit-icon');
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
  $listElement.setAttribute('class', 'row');
  $listElement.setAttribute('id', 'entry-list-item');
  $listElement.appendChild($divEntryImg);
  $listElement.appendChild($divEntryText);
  $divEntryImg.appendChild($entryImgFrame);
  $entryImgFrame.appendChild($entryImg);
  $divEntryText.appendChild($titleElement);
  $divEntryText.appendChild($penEditElement);
  $divEntryText.appendChild($tagIconElement);
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
  $deleteAnchor.setAttribute('class', 'vis-hidden');
  $deleteModalDiv.setAttribute('class', 'hidden');
  renderIcon('');
}

function showEntryForm(isEdit) {
  // go to create entry
  $viewEntry.setAttribute('class', 'view hidden');
  $createEntry.setAttribute('class', 'view');
  data.view = 'entry-form';
}

function editHandle(event) {
  if (event.target.getAttribute('id') !== 'edit-icon') {
    return;
  }
  $formTitle.textContent = 'Edit Entries';
  $deleteAnchor.setAttribute('class', '');
  showEntryForm();
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(event.target.getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
    }
  }
  $formElement.elements.title.value = data.editing.title;
  $formElement.elements.photo.value = data.editing.imgURL;
  $formElement.elements.notes.value = data.editing.notes;
  $formElement.elements.tag.value = data.editing.tag;
  renderIcon(data.editing.tag);
  $imgEntry.setAttribute('src', data.editing.imgURL);
}

function deleteModalHandler() {
  $deleteModalDiv.setAttribute('class', 'bg-gray');
}

function cancelDeleteHandler() {
  $deleteModalDiv.setAttribute('class', 'hidden');
}

function confirmDeleteModalHandler() {
  var $itemNodes = document.querySelectorAll('i');
  for (var j = 0; j < $itemNodes.length; j++) {
    if (parseInt($itemNodes[j].getAttribute('data-entry-id')) === data.editing.entryId) {
      var $itemToBeDeleted = $itemNodes[j].closest('#entry-list-item');
      break;
    }
  }
  $itemToBeDeleted.remove();
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      var indexToBeSplice = i;
      break;
    }
  }
  data.entries.splice(indexToBeSplice, 1);
  showEntriesList();
}

function searchResultHandler(event) {
  var $entryItems = document.querySelectorAll('#entry-list-item');
  if (event.target.value.length < 1) {
    for (var i = 0; i < $entryItems.length; i++) {
      $entryItems[i].attributes.class.value = 'row';
    }

  }
  for (var j = 0; j < $entryItems.length; j++) {
    if (!$entryItems[j].textContent.toLowerCase().includes(event.target.value)) {
      $entryItems[j].attributes.class.value = 'row hidden';
    }
  }
}

function updateTagIconHandler(event) {
  for (var i = 0; i < $tagIconDisplay.length; i++) {
    if (event.target.value === $tagIconDisplay[i].firstElementChild.getAttribute('id')) {
      $tagIconDisplay[i].setAttribute('class', 'tag-icon-div');
    } else {
      $tagIconDisplay[i].setAttribute('class', 'tag-icon-div hidden');
    }
  }
}

function tagSelector(id) {
  for (var i = 0; i < $tagIconElements.length; i++) {
    if (id === $tagIconElements[i].getAttribute('id')) {
      return $tagIconElements[i].getAttribute('class');
    }
  }
}

function renderIcon(value) {
  for (var i = 0; i < $tagIconDisplay.length; i++) {
    if (value === $tagIconDisplay[i].firstElementChild.getAttribute('id')) {
      $tagIconDisplay[i].setAttribute('class', 'tag-icon-div');
    } else {
      $tagIconDisplay[i].setAttribute('class', 'tag-icon-div hidden');
    }
  }
}
