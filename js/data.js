/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousJournalEntries = localStorage.getItem('javascript-local-storage');
if (previousJournalEntries !== null) {
  data.entries = JSON.parse(previousJournalEntries);
  data.nextEntryId += data.entries.length;
}

window.addEventListener('beforeunload', beforeUnloadHandle);

function beforeUnloadHandle(event) {
  var dataJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
