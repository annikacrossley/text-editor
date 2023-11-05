import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database.');

  //connect to database
  const contactDb = await openDB('contact', 1);

  //create a transaction, specifiy the database and priveleges
  const tx = contactDb.transaction('contact', 'readWrite');

  //open object store
  const store = tx.objectStore('contact');

  //pass in the contect
  const request = store.add({content: content});

  //confirm request
  const result = await request;
  console.log('Data saved to database.', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from database.');

  //connect to database
  const contactDb = await openDB('contact', 1);

  //create tx
  const tx = contactDb.transaction('contact', 'readonly');

  //open store
  const store = tx.objectStore('contact');

  //get all data in database
  const request = store.getAll();

  //confirmation
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
