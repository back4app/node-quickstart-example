const Parse = require('parse/node');

const APP_ID = 'xqgMHg3qUQIT70lUraYwkkQQnag0SwGEQhndulcS';
const JAVASCRIPT_KEY = "r2QbNQxf6yL3s1BdSdXDMwiMNvjaCTwAXlcP55pp";

console.info("Initializing Application", APP_ID);
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/'

const Event = Parse.Object.extend("Event");
const event = new Event();
const eventQuery = new Parse.Query(Event);

create();

function create() {
  const rockEvent = {
    title: 'Rock\'n Rio',
    description: 'Rock\ in Rio is a recurring music festival originating in Rio de Janeiro.'
  };
  console.info('Creating an object', rockEvent);
  event.save(rockEvent)
  .then(obj => obj.toJSON())
  .then(event => {
    console.log('Object saved:\n', event);
    read(event.objectId);
  })
  .catch(console.error);
}

function read(id) {
  // Retrieving object
  console.info('Retrieving object with id', id);
  eventQuery.get(id)
  .then(obj => obj.toJSON())
  .then(event => {
    console.info('Object retrieved', event.title);
    update(event.objectId);
  })
  .catch(console.error);
}

function update(id) {
  console.info('Updating object id:', id);
  eventQuery.first(id)
  .then(eventToUpdate => {
    if(eventToUpdate !== undefined) {
      console.log('Updating event:', eventToUpdate.toJSON());
      // Here we set the new values that need to be updated
      eventToUpdate.set('title', 'New Title Edited');
      eventToUpdate.set('description', 'New description');
      // Save our retrieved object
      eventToUpdate.save()
      .then(eventUpdated => {
        console.log('Updated Event', eventUpdated);

        destroy(eventUpdated.id)
      })
      .catch(console.error);
    }
  })
  .catch(console.error);
}

function destroy(id) {
  console.info('Destroying object id', id);
  eventQuery.first(id)
  .then(eventToDelete => {
    if(eventToDelete !== undefined) {
      console.log('Event to Delete', eventToDelete.id);
      eventToDelete.destroy()
      .then(eventDeleted => {
        console.log('Deleted Event', eventDeleted.id);
      })
      .catch(console.error)
    }
  });
}
