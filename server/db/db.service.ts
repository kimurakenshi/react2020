import * as fs from 'fs';

// The db is an static JSON file. This should be replaced with a real DB implementation in the future.
const DB_FILE_PATH = './server/db/db.json';

const getDB = () => {
  try {
    const dbRawData = fs.readFileSync(DB_FILE_PATH);

    // @ts-ignore
    return JSON.parse(dbRawData);
  } catch (e) {
    throw new Error('There was an error while trying to read the DB.');
  }
};

export const getTasks = () => {
  return getDB();
};
