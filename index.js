const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connection setup with database with secure password on environment variable
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ssysl0x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Create dynamic data transaction to/from the database
async function run() {
    try {
        await client.connect();
        const eventCollection = client.db('volunteerNetwork').collection('event');

        // get all event data (json format) from database | create a event API of get method
        app.get('/event', async (req, res) => {
            const query = {};
            const cursor = eventCollection.find(query);
            const events = await cursor.toArray();
            res.send(events);
        });

        // POST a new event from server-side to database | Create a new event POST API
        app.post('/event', async(req, res) => {
            const newEvent = req.body;
            console.log('Adding a new Event = ', newEvent);
            const result = await eventCollection.insertOne(newEvent);
            res.send(result);
        });

        // Load a particular event data from database to server-side | (id-wise data load)
        app.get('/event/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await eventCollection.findOne(query);
            res.send(result);
        });
    }
    finally {
        // await client.close(); // commented, if I want to keep connection active;
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Volunteer-Network Server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
});