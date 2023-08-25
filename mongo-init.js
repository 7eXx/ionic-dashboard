db.createUser(
  {
    user: "root",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "dashboard"
      }
    ]
  }
);
db.createCollection('users');
db.createCollection('items');
db.createCollection('notes');