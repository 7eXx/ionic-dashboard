# Simple dashboard
This project aims to manage a simple dashboard to handle following entities:
- Users
- Items
- Notes

Under the hood it uses mongo as non-relational database.


Backend is a simple application written in nodejs with express with some libraries for validation and handle orm.


Webappp is an Angular app with IONIC for UI components.

## Pre-check
Edit .env file in backend project to define some custom secret.

# Database
To easily deploy database use docker compose file. Use command to start it:
```
$ docker compose up -d
```
This will bring up database and initialize it with default documents.  
There is a simple interface to interact with mongo accessible at following address:
``
localhost:8081
``

# Backend
To start backend app, move to ***backend*** folder and execute:
```
$ cd backend
$ npm i
$ node index.js
```
This will expose node server to port 8080.

# Frontend
To start webapp, move to ***frontend*** folder and execute:
```
$ cd frontend
$ npm i
$ npm run start --port 8100 
```
OR
```
$ cd frontend
$ npm i
$ ionic serve --port 8100 
```
OR
```
$ cd frontend
$ npm i
$ ng serve --port 8100 
```

# Usage
First when login interface is prompted, click on ***not a user***  
This behavior will allow to create a new user.  
Then you can log with credential provided.

