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
  const contactDb = await openDB('jate', 1);

  //create a transaction, specifiy the database and priveleges
  const tx = contactDb.transaction('jate', 'readwrite');

  //open object store
  const store = tx.objectStore('jate');

  //pass in the content - store.put
  const request = store.put({id:1, value: content});

  //confirm request
  const result = await request;
  console.log('Data saved to database.', result.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from database.');

  //connect to database
  const contactDb = await openDB('jate', 1);

  //create tx
  const tx = contactDb.transaction('jate', 'readonly');

  //open store
  const store = tx.objectStore('jate');

  //get all data in database
  const request = store.getAll();

  //confirmation
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
