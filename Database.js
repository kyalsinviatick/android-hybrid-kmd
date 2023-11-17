// Database.js
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'mhike.db', location: 'default'});

const Database = {
  initDatabase: () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS hikes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, date TEXT, difficulty TEXT, parkingStatus BOOLEAN, lengthOfHike TEXT, elevation TEXT, description TEXT, timeToComplete TEXT)',
          [],
          () => {
            // Create observations table
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS observations (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, comment TEXT, time TEXT, hikeId INTEGER, FOREIGN KEY (hikeId) REFERENCES hikes (id))',
              [],
              () => resolve(),
              (_, error) => reject(error),
            );
          },
          (_, error) => reject(error),
        );
      });
    });
  },

  addHike: hike => {
    console.log(hike);
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO hikes (name, location, date, difficulty, parkingStatus, lengthOfHike, elevation, description, timeToComplete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            hike.name,
            hike.location,
            hike.date,
            hike.difficulty,
            hike.parkingStatus,
            hike.lengthOfHike,
            hike.elevation,
            hike.description,
            hike.timeToComplete,
          ],
          (_, result) => resolve(result),
          (_, error) => {
            console.log(error);
            reject(error);
          },
        );
      });
    });
  },

  getAllHikes: () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM hikes',
          [],
          (_, result) => resolve(result.rows.raw()),
          (_, error) => reject(error),
        );
      });
    });
  },

  searchHikes: query => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM hikes WHERE name LIKE ? OR location LIKE ? OR date LIKE ? OR difficulty LIKE ? OR parkingStatus LIKE ? OR lengthOfHike LIKE ? OR elevation LIKE ? OR description LIKE ? OR timeToComplete LIKE ?',
          [
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
          ],
          (_, result) => resolve(result.rows.raw()),
          (_, error) => reject(error),
        );
      });
    });
  },

  getHikeById: hikeId => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM hikes WHERE id = ?',
          [hikeId],
          (_, result) => resolve(result.rows.item(0)),
          (_, error) => reject(error),
        );
      });
    });
  },

  editHike: hike => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE hikes SET name = ?, location = ?, date = ?, difficulty = ?, parkingStatus = ?, lengthOfHike = ?, elevation = ?, description = ?, timeToComplete = ? WHERE id = ?',
          [
            hike.name,
            hike.location,
            hike.date,
            hike.difficulty,
            hike.parkingStatus,
            hike.lengthOfHike,
            hike.elevation,
            hike.description,
            hike.timeToComplete,
            hike.id,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  deleteHike: hikeId => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM hikes WHERE id = ?',
          [hikeId],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  addObservation: observation => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO observations (title, comment, time, hikeId) VALUES (?, ?, ?, ?)',
          [
            observation.title,
            observation.comment,
            observation.time,
            observation.hikeId,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  getObservationsForHike: hikeId => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM observations WHERE hikeId = ?',
          [hikeId],
          (_, result) => resolve(result.rows.raw()),
          (_, error) => reject(error),
        );
      });
    });
  },

  getObservationById: observationId => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM observations WHERE id = ?',
          [observationId],
          (_, result) => resolve(result.rows.item(0)),
          (_, error) => reject(error),
        );
      });
    });
  },

  editObservation: observation => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE observations SET title = ?, comment = ?, time = ? WHERE id = ?',
          [
            observation.title,
            observation.comment,
            observation.time,
            observation.id,
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  deleteObservation: observationId => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM observations WHERE id = ?',
          [observationId],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },
};

export default Database;
