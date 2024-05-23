//functions to mananage (store and get) data from indexedDB

function getACLData() {
  return [
    "Dua Lipa", "Tyler, the Creator", "Chris Stapleton", "Blink-182", "Sturgill Simpson", "Pretty Lights", "Khruangbin", "Leon Bridges", "Carin León", "Norah Jones", "Reneé Rapp", 
    "Foster The People", "Kehlani", "Teddy Swims", "Benson Boone", "Caamp", "Dominic Fike", "The Marías", "Jungle", "Dom Dolla", "Chappell Roan", "Porter Robinson", "Fletcher", 
    "Red Clay Strays", "Orville Peck", "Still Woozy", "Vince Staples", "Cannons", "Remi Wolf", "Something Corporate", "Jeezy", "San Holo", "Kevin Abstract", "Stephen Sanchez", 
    "Elderbrook", "Tyla", "Jess Glynne", "Catfish and The Bottlemen", "Hermanos Gutiérrez", "That Mexican OT", "Barry Can't Swim", "Santigold", "Qveen Herby", "Medium Build", 
    "Kenny Beats", "The Beaches", "flipturn", "David Shaw", "Movements", "Royel Otis", "wave to earth (웨이브 투 어스)", "Connor Price", "Malcolm Todd", "Flo", "Bakar", "SPINAL", 
    "Eggy", "Say She She", "MisterWives", "Eyedress", "Elyanna", "Geese", "Grand Funk Railroad", "Mickey Guyton", "Petey", "Dasha", "Mannequin Pussy", "Penny & Sparrow", "Chance Peña", 
    "Sir Chloe", "Dexter and The Moonrocks", "The Paper Kites", "Glass Beams", "BALTHVS", "Dustin Kensrue", "Valencia Grace", "Lola Young", "Joe P", "Myles Smith", "I Dont Know How But They Found Me (iDKHOW)", 
    "Jonah Kagen", "JORDY", "Bob Schneider", "Thee Sinseers", "Goldie Boutilier", "Asleep at the Wheel", "Richy Mitch & The Coal Miners", "Katie Pruitt", "Billy Allen", "The Pollies", "Brittany Davis", 
    "Paco Versailles", "PawPaw Rod", "Nico Vega", "Rett Madison", "WhooKilledKenny", "Tanner Adell", "Emily Nenni", "Emei", "Kalu and the Electric Joint", "The Droptines", "Tyler Halverson", 
    "Mon Rovîa", "The Criticals", "Braxton Keith", "Sawyer Hill", "Jon Muq", "DAIISTAR", "Rickshaw Billie's Burger Patrol", "The Telescreens", "late night drive home", "Théo Lawrence", "Chief Cleopatra", 
    "West 22nd", "Chaparelle", "promqueen", "Being Dead", "Midnight Navy", "Cale Tyson", "Godly The Ruler", "Molecular Steve", "The Tiarras", "Zach Person", "Marley Bleu", "Obed Padilla", "Deyaz", 
    "Amira Elfeky", "The Levites", "The Moriah Sisters", "The Huston-Tillotson University Jazz Collective", "Lucy Kalantari & The Jazz Cats", "Uncle Jumbo", "Q Brothers", "Mister G", "Homescool", 
    "Miss Tutti And The Fruity Band", "Andrew & Polly", "School of Rock", "The Barton Hills Choir"
  ]
}


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

export {filterTrackData, storeDataInIndexedDB, getDataByIndex, getAllTracks, checkIndexedDBExists, getACLData}