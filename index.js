const Parse = require('parse/node');

Parse.initialize('xqgMHg3qUQIT70lUraYwkkQQnag0SwGEQhndulcS', 'r2QbNQxf6yL3s1BdSdXDMwiMNvjaCTwAXlcP55pp');
Parse.serverURL = 'https://parseapi.back4app.com/'

const Event = Parse.Object.extend("Event");
const event = new Event();

// CREATE

function create() {
  const myEvent = {
    title: 'Event Name',
    description: 'Event Description'
  }

  myEvent.date = new Date();

  event.save(myEvent)
  .then(event => {
    console.log('ID:', event.id);
    console.log('Event title:', event.get('title'));
    console.log('Event date:', event.get('date'));
  })
  .catch(console.error);
}

function read() {
  const eventQuery = new Parse.Query(Event);

}

function update() {

}

function delete() {

}

// READ
// eventQuery.get('yOq15CSB5C')
// .then(obj => obj.toJSON())
// .then(event => {
//   console.info(event.name);
// })
// .catch(console.error);

// UPDATE
// eventQuery.first('Hrd2N2O18j')
// .then(eventToUpdate => {
//   if(eventToUpdate !== undefined) {
//     console.log('Event to Update:', eventToUpdate.toJSON());
//     // Here we set the new values that need to be updated
//     eventToUpdate.set('title', 'New Title1111');
//     eventToUpdate.set('description', 'New description');
//     // Save our retrieved object
//     eventToUpdate.save()
//     .then(eventUpdated => {
//       console.log('Updated Event', eventUpdated);
//     })
//     .catch(console.error);
//   }
// })
// .catch(console.error);

// DELETE
// eventQuery.first('HhRrJRPaJe')
// .then(eventToDelete => {
//   if(eventToDelete !== undefined) {
//     console.log('Event to Delete', eventToDelete.id);
//     eventToDelete.destroy()
//     .then(eventDeleted => {
//       console.log('Deleted Event', eventDeleted.id);
//     })
//     .catch(console.error)
//   }
// });
