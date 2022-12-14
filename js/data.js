/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousJournalEntries = localStorage.getItem('javascript-local-storage');
if (previousJournalEntries !== null) {
  data = JSON.parse(previousJournalEntries);
}

window.addEventListener('beforeunload', beforeUnloadHandle);

function beforeUnloadHandle(event) {
  data.editing = null;
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
