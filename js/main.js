var $photoURLInput = document.querySelector('#photo-url');
$photoURLInput.addEventListener('change', updateImgURLHandle);

var $imgEntry = document.querySelector('#img-entry');

var $formElement = document.querySelector('form');
$formElement.addEventListener('submit', saveEntryHandle);

function updateImgURLHandle(event) {
  $imgEntry.setAttribute('src', event.target.value);
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
}
