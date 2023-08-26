# Simple dashboard
This project aims to manage a simple dashboard to handle following entities:
- Users
- Items
- Notes

Under the hood it uses mongo as non-relational database.  
Backend is a simple application written in nodejs with express.

## Pre-check
Edit .env file in backend project to define some custom secret.

# Database
To easily deploy database use docker compose file. Use command to start it:
```
$ docker compose up -d
```
This will bring up database and initialize it with default documents.

