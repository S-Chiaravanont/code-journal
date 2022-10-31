var $photoURLInput = document.querySelector('#photo-url');
$photoURLInput.addEventListener('change', updateImgURL);

var $imgEntry = document.querySelector('#img-entry');
var placeholderImgEntry = 'images/placehoder-image-square.jpg';

function updateImgURL(event) {
  if (event.target.value.length === 0) {
    // $imgEntry.setAttribute('src', '');
    $imgEntry.setAttribute('src', placeholderImgEntry);
  } else {
    $imgEntry.setAttribute('src', event.target.value);
  }
}
