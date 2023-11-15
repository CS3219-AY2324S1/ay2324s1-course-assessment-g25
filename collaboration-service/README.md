# The Collaboration Service

This service is for a collaborative code editor with [Liveblocks](https://liveblocks.io), [Yjs](https://docs.yjs.dev), [CodeMirror](https://codemirror.net/), and [Next.js](https://nextjs.org/).

As users edit the code, changes will be automatically persisted and synced—allowing for collaborative code editing experience. Users will also be able to see who else is currently online and each others cursors.

## Setup

### Work Directory

Run `cd collaboration-service` to the collaboration-service directory.

### Install dependencies

Run `npm install` to install all dependencies specified in `package.json`.

Run `npm ci` to make sure Continuous Integration.

### Start the server in development mode

Run `npm run dev` to start the server in development mode using `nodemon`. 

The server will be running on port 3001.

### Run tests

Run `npm test` to run all tests.
