# Volunteer-Network-Server

## Table of Contents

- [Basic Client Project Setup Steps](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#basic-client-project-setup-steps "Basic Client Project Setup Steps - 04crud-product-management.md")
- [Basic Server Setup Steps](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#basic-server-setup-steps "Basic Server Setup Steps - 04crud-product-management.md")
- [Create mongodb atlas account and Connect to the database](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module65-Mongodb-Database-integration-CRUD/00mongodb-database_integration-CRUD.md#652-create-mongodb-atlas-account-and-connect-to-database "00mongodb-database_integration-CRUD.md")
- [Connect to the database with a secure password on an environment variable](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#connect-to-database-with-secure-password-on-environment-variable "04crud-product-management.md")


``` JavaScript
// In .env | username and password form MongoDB Database

DB_USER=volunteerUser
DB_PASS=x7NfVIpH6MpNLRK0
```

``` JavaScript
// In index.js | get connection string from MongoDB Database

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://volunteerUser:<password>@cluster0.ssysl0x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
```

``` JavaScript
// In index.js | username and password replaced by environment variable and checked database is connected or not

// connection setup with database with secure password on environment variable
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ssysl0x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('volunteerNetwork database connected');
  // perform actions on the collection object
  client.close();
});
```

``` JSON
// In event.json

[
    {
        "title": "Child Support",
        "description": "Child Support Event",
        "date": "23-12-2022",
        "bannerImg": "https://i.ibb.co/yg4J4dh/toyota-corolla.png"
    },
    {
        "title": "Food Charity",
        "description": "Food Charity Event",
        "date": "25-10-2022",
        "bannerImg": "https://i.ibb.co/P5ykgjn/toyota-camry.png"
    }
]
```


