//functions to mananage (store and get) data from indexedDB

//filter API tracks into wanted data
function filterTrackData(track) {
  track = track.track;
  return {
    trackId: track.id,
    name: track.name,
    album: track.album.name,
    artist: {
      name: track.artists[0].name,
      id: track.artists[0].id,
      link: track.artists[0].external_urls.spotify,
    },
    link: track.external_urls.spotify,
    preview: track.preview_url,
    img: track.album.images[2]
  }
}

//store given data
function storeDataInIndexedDB(data) {
  //open link with current version number
  let request = indexedDB.open('tracksDatabase', 1)

  //called everytime db is created or version is updated
  //create db schema
  request.onupgradeneeded = function(event) {
    let db = event.target.result;

    let objectStore = db.createObjectStore('tracks', { keyPath: 'trackId' });

    //create indexes for searching (change as needed)
    objectStore.createIndex('trackId', 'trackId', {unique: true})
    objectStore.createIndex('artist', 'artist', {unique: false})
    objectStore.createIndex('trackName', 'name', {unique: false})
  };

  request.onsuccess = function(event) {
    let db = event.target.result;
    let transaction = db.transaction(['tracks'], 'readwrite');
    let objectStore = transaction.objectStore('tracks');

    //add each track in to db
    data.forEach((track) => {
      objectStore.add(track);
    });

    transaction.oncomplete = function() {
      console.log("All filtered songs have been added to IndexedDB"); 
    }
    transaction.onerror = function(event) {
      console.log('Error storing songs: ', event.target.error);
    };
  };
}

function getAllTracks(callback) {
  let request = indexedDB.open('tracksDatabase', 1);

  request.onsuccess = function(event) {
    let db = event.target.result;
    let transaction = db.transaction(['tracks'], 'readonly');
    let objectStore = transaction.objectStore('tracks');

    let tracks = []
    objectStore.openCursor().onsuccess = function(event) {
      let cursor = event.target.result;
      if (cursor) {
        tracks.push(cursor.value);
        cursor.continue();
      } else {
        callback(tracks);
      }
    }
  }
  request.onerror = function() {console.log('error opening db', request.error)}
}

function getDataByIndex(indexName, query, callback) {
  let request = indexedDB.open('tracksDatabase', 1);

  request.onsuccess = function(event) {
    let db = event.target.result;
    let transaction = db.transaction(['tracks'], 'readonly');
    let objectStore = transaction.objectStore('tracks');
    let index = objectStore.index('indexName'); //our index

    let request = index.get(query);

    request.onsuccess = function(event) {
      callback(event.target.result); //initiate callback with result. 
    };

    request.onerror = function(event) {
      console.log('Error retrieving data: ', event.target.error);
    };
  };
}

function checkIndexedDBExists(dbName) {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(dbName);

    //db exists, return true
    request.onsuccess = function(event) {
      let db = event.target.result;
      db.close();
      resolve(true);
    }

    //db does not exist
    request.onerror = function(event) {
      if(event.target.error.name === 'NotFoundError') {
        resolve(false);
      } else {
        reject('Error opening database: ' + event.target.error.message);
      }
    };

    //if database does not exist or if it needs to be upgraded
    request.onupgradeneeded = function(event) {
      event.target.transaction.abort();
      resolve(false);
    };
  });
}

function clearDatabase() {
  let request = indexedDB.deleteDatabase('tracksDatabase');

  request.onsuccess = function(event) {
    console.log('Database deleted successfully');
  };

  request.onerror = function(event) {
    console.error('Error deleting database:', event.target.errorCode);
  };

  request.onblocked = function(event) {
    console.warn('Database deletion blocked');
  };
 
}

export {filterTrackData, storeDataInIndexedDB, getDataByIndex, getAllTracks, checkIndexedDBExists, clearDatabase}