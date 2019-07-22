# Chat system

Chat room excercise with express and socket.io

## How to init

To install dependencies: `npm run init` if it gives error, use `npm i` then `npm i --prefix frontend`

To initialize database use the script `scripts/chatDB.sql` this file was generated with Navicat, first create the *chatDB* db then run the script using the database created.

The file `scripts/generate-hash.json` have all user passwords, the react frontend login has hardcoded the very first user credentials.

To run use `npm run build`, then `npm start`

There is two *.env* files, at the root and frontend folder this files are included to let us know which enviroment variables I'm using

Navigate to `http://localhost:4000` to see the resultant system


## TODO

 - stock command