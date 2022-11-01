var $photoURLInput = document.querySelector('#photo-url');
$photoURLInput.addEventListener('change', updateImgURLHandle);

var $imgEntry = document.querySelector('#img-entry');

var $formElement = document.querySelector('form');
$formElement.addEventListener('submit', saveEntryHandle);

var $entryViewList = document.querySelector('#entry-view-ul');

window.addEventListener('DOMContentLoaded', loadEntries);

window.addEventListener('DOMContentLoaded', onLoadSite);

var $entryNavButton = document.querySelector('#to-entries');
$entryNavButton.addEventListener('click', entriesPage);

var $viewEntry = document.querySelector('#view-entry');
var $createEntry = document.querySelector('#create-entry');

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', createEntryPage);

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
    entryId: data.nextEntryId
  };
  data.entries.unshift(formDataObj);
  data.nextEntryId++;
  $imgEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formElement.reset();
  entriesPage(event);
}

function displayEntries(entry) {
  var $notesElement = document.createElement('p');
  $notesElement.textContent = entry.notes;
  var $titleElement = document.createElement('h2');
  $titleElement.textContent = entry.title;
  var $divEntryText = document.createElement('div');
  $divEntryText.setAttribute('class', 'column-half');
  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.imgURL);
  var $entryImgFrame = document.createElement('div');
  $entryImgFrame.setAttribute('class', 'img-frame');
  var $divEntryImg = document.createElement('div');
  $divEntryImg.setAttribute('class', 'column-half');
  var $listElement = document.createElement('li');
  $listElement.setAttribute('class', 'row');
  $listElement.appendChild($divEntryImg);
  $listElement.appendChild($divEntryText);
  $divEntryImg.appendChild($entryImgFrame);
  $entryImgFrame.appendChild($entryImg);
  $divEntryText.appendChild($titleElement);
  $divEntryText.appendChild($notesElement);
  return $listElement;
}

function loadEntries() {
  $entryViewList.innerHTML = '';
  for (var i = 0; i < data.entries.length; i++) {
    var $entry = displayEntries(data.entries[i]);
    $entryViewList.appendChild($entry);
  }
}

function entriesPage() {
  // go to entries
  $viewEntry.setAttribute('class', 'view');
  $createEntry.setAttribute('class', 'view hidden');
  loadEntries();
  data.view = 'entries';
}

function createEntryPage() {
  // go to create entry
  $viewEntry.setAttribute('class', 'view hidden');
  $createEntry.setAttribute('class', 'view');
  data.view = 'entry-form';
}

function onLoadSite() {
  if (data.view === 'entry-form') {
    createEntryPage();
  } else {
    entriesPage();
  }
}
