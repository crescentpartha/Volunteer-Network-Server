Table of Contents
---

- [Volunteer-Network-Server](#volunteer-network-server)
  - [Basic Setup of Client-Side & Server-Side](#basic-setup-of-client-side--server-side)
    - [`Basic Client Project Setup Steps`](#basic-client-project-setup-steps)
    - [`Basic Server Setup Steps`](#basic-server-setup-steps)
  - [Create mongodb atlas account and Connect to the database with a secure password on an environment variable](#create-mongodb-atlas-account-and-connect-to-the-database-with-a-secure-password-on-an-environment-variable)
    - [`username and password form MongoDB Database`](#username-and-password-form-mongodb-database)
    - [`get connection string from MongoDB Database`](#get-connection-string-from-mongodb-database)
    - [`username and password replaced by environment variable and checked database is connected or not`](#username-and-password-replaced-by-environment-variable-and-checked-database-is-connected-or-not)
    - [`Insert the document to the database` (JSON data inserted)](#insert-the-document-to-the-database-json-data-inserted)
  - [All events data Load from Database and Create a event API of get method](#all-events-data-load-from-database-and-create-a-event-api-of-get-method)
    - [`Demo links of 04crud-product-management`](#demo-links-of-04crud-product-management)
    - [`Load all events from database to server-side`](#load-all-events-from-database-to-server-side)
    - [`Display all events in client-side`](#display-all-events-in-client-side)
  - [Implement Dynamic Nested Routing](#implement-dynamic-nested-routing)
    - [`App.js`](#appjs)
    - [`Admin.js`](#adminjs)
  - [Add a new event to the database and Create a add new event POST API](#add-a-new-event-to-the-database-and-create-a-add-new-event-post-api)
    - [`Demo links of 04crud-product-management`](#demo-links-of-04crud-product-management-1)
    - [`Create a Form using react-hook-form to add a new event`](#create-a-form-using-react-hook-form-to-add-a-new-event)
    - [`POST a new event from client-side to server-side`](#post-a-new-event-from-client-side-to-server-side)
    - [`POST a new event from server-side to database`](#post-a-new-event-from-server-side-to-database)
  - [Setup Dynamic Route and Access route params](#setup-dynamic-route-and-access-route-params)
  - [Get a particular event from database and Create a GET API to get a particular event (___id-wise___)](#get-a-particular-event-from-database-and-create-a-get-api-to-get-a-particular-event-id-wise)
    - [`Demo links of 04crud-product-management`](#demo-links-of-04crud-product-management-2)
    - [`Get a particular event from database to server-side`](#get-a-particular-event-from-database-to-server-side)
    - [`Create a custom hook with dependency to load individual event data` - (___id-wise___)](#create-a-custom-hook-with-dependency-to-load-individual-event-data---id-wise)
    - [`Create a Controlled Inputs Form using React-Bootstrap`](#create-a-controlled-inputs-form-using-react-bootstrap)
  - [Add a new volunteerActivity to the database and Create a POST API to add a new volunteerActivity](#add-a-new-volunteeractivity-to-the-database-and-create-a-post-api-to-add-a-new-volunteeractivity)
    - [`POST a new volunteerActivity from server-side to database`](#post-a-new-volunteeractivity-from-server-side-to-database)
    - [`POST a new volunteerActivity from client-side to server-side`](#post-a-new-volunteeractivity-from-client-side-to-server-side)
  - [All volunteerActivity data Load from Database and Create a volunteerActivity GET API to load volunteerActivities data](#all-volunteeractivity-data-load-from-database-and-create-a-volunteeractivity-get-api-to-load-volunteeractivities-data)
    - [`Load all volunteerActivity data (json format) from database to server-side`](#load-all-volunteeractivity-data-json-format-from-database-to-server-side)
    - [`Create a custom hook with dependency to load all volunteerActivity data`](#create-a-custom-hook-with-dependency-to-load-all-volunteeractivity-data)
    - [`Display all volunteerActivities data by dynamically creating a table using React-Boostrap`](#display-all-volunteeractivities-data-by-dynamically-creating-a-table-using-react-boostrap)

# Volunteer-Network-Server

## Basic Setup of Client-Side & Server-Side

### `Basic Client Project Setup Steps`

- [Basic Client Project Setup Steps](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#basic-client-project-setup-steps "Basic Client Project Setup Steps - 04crud-product-management.md")

**[🔼Back to Top](#table-of-contents)**

### `Basic Server Setup Steps`

- [Basic Server Setup Steps](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#basic-server-setup-steps "Basic Server Setup Steps - 04crud-product-management.md")

**[🔼Back to Top](#table-of-contents)**

## Create mongodb atlas account and Connect to the database with a secure password on an environment variable

- [Create mongodb atlas account and Connect to the database](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module65-Mongodb-Database-integration-CRUD/00mongodb-database_integration-CRUD.md#652-create-mongodb-atlas-account-and-connect-to-database "00mongodb-database_integration-CRUD.md")
- [Connect to the database with a secure password on an environment variable](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#connect-to-database-with-secure-password-on-environment-variable "04crud-product-management.md")

### `username and password form MongoDB Database`

``` JavaScript
// In .env | username and password form MongoDB Database

DB_USER=volunteerUser
DB_PASS=x7NfVIpH6MpNLRK0
```

**[🔼Back to Top](#table-of-contents)**

### `get connection string from MongoDB Database`

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

**[🔼Back to Top](#table-of-contents)**

### `username and password replaced by environment variable and checked database is connected or not`

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

**[🔼Back to Top](#table-of-contents)**

### `Insert the document to the database` (JSON data inserted)

``` JSON
// In event.json | Insert the document to the database

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

**[🔼Back to Top](#table-of-contents)**

## All events data Load from Database and Create a event API of get method

### `Demo links of 04crud-product-management`

- [Load all products from database by creating a product API of get method](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#load-all-products-from-database-by-creating-a-product-api-of-get-method "04crud-product-management.md")
  - [All products data Load from Database](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#all-products-data-load-from-database "04crud-product-management.md")

**[🔼Back to Top](#table-of-contents)**

### `Load all events from database to server-side`

``` JavaScript
// In Index.js

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
    }
    finally {
        // await client.close(); // commented, if I want to keep connection active;
    }
}
run().catch(console.dir);
```

**[🔼Back to Top](#table-of-contents)**

### `Display all events in client-side`

``` JavaScript
// In Home.js

import React from 'react';
import { Row } from 'react-bootstrap';
import useDisplayEvents from '../../../hooks/useDisplayEvents';
import EventDetail from '../EventDetail/EventDetail';

const Home = () => {
    const [events] = useDisplayEvents();
    return (
        <div>
            <Row xs={1} md={2} lg={3} xl={4} className="g-4 mx-5 mb-5 mt-2">
                {
                    events.map(event => <EventDetail
                        key={event._id}
                        event={event}
                    ></EventDetail>)
                }
            </Row>
        </div>
    );
};

export default Home;
```

``` JavaScript
// In EventDetail.js

import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventDetail = ({ event }) => {
    const { title, bannerImg } = event;
    return (
        <Col>
            <Card className='position-relative border-0 shadow-sm'>
                <Card.Img variant="top" src={bannerImg} alt={title} />
                <Card.Body className='bg-primary rounded-bottom position-absolute bottom-0 w-100'>
                    {/* <Card.Title className='text-light'>{title}</Card.Title> */}
                    <Link className='text-light text-decoration-none' to='/volunteerRegistration'>{title}</Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default EventDetail;
```

**[🔼Back to Top](#table-of-contents)**

## Implement Dynamic Nested Routing

- [Dynamic Nested Routing UI looks](https://69-5-volunteer-network-crescentpartha.netlify.app/admin/volunteerRegisterList "Dynamic Nested Routing UI looks in Admin Panel")

### `App.js`

``` JavaScript
// App.js

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin/Admin';
import AddEvent from './components/Admin/AddEvent/AddEvent';
import VolunteerRegisterList from './components/Admin/VolunteerRegisterList/VolunteerRegisterList';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/admin' element={<Admin></Admin>}>
          <Route path='addEvent' element={<AddEvent></AddEvent>}></Route>
          <Route path='volunteerRegisterList' element={<VolunteerRegisterList></VolunteerRegisterList>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
```

**[🔼Back to Top](#table-of-contents)**

### `Admin.js`

``` JavaScript
// In Admin.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import CustomLink from '../../Shared/CustomLink/CustomLink';

const Admin = () => {
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '250px auto' }}>
                <div className='bg-light position-sticky border-end' style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
                    <nav className='home-hover d-flex flex-column flex-wrap text-start'>
                        <h5 style={{ backgroundColor: '#04AA6D' }} className='py-2 px-3 m-0 fw-semibold text-light text-center'>Admin</h5>
                        <CustomLink className='py-1 pt-3 px-3 d-block fw-semibold' to='volunteerRegisterList'>
                            <FontAwesomeIcon className='me-2' icon={faUserGroup} />
                            Volunteer Register List
                        </CustomLink>
                        <CustomLink className='py-1 px-3 d-block fw-semibold' to='addEvent'>
                            <FontAwesomeIcon className='me-2' icon={faPlus} />
                            Add Event
                        </CustomLink>
                    </nav>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
```

**[🔼Back to Top](#table-of-contents)**

## Add a new event to the database and Create a add new event POST API

### `Demo links of 04crud-product-management`

- [POST a product from server-side to database](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#post-a-product-from-server-side-to-database)
  - [Full Code Example](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#full-code-example)

**[🔼Back to Top](#table-of-contents)**

### `Create a Form using react-hook-form to add a new event`

- [AddEvent UI Looks](https://69-5-volunteer-network-crescentpartha.netlify.app/admin/addEvent "User Interface design looks of AddEvent component's Form")

``` JavaScript
// In AddEvent.js

import React from 'react';
import { useForm } from 'react-hook-form';
import cloudUpload from '../../../images/cloud-upload-outline.png';
import './AddEvent.css';

const AddEvent = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div className='p-4 border-bottom'>
            <h2 className='text-start'>Add Event</h2>
            <form className='d-flex flex-column gap-2' onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-row flex-wrap gap-2 align-items-top justify-content-between bg-light rounded p-4'>
                    <div className='' style={{ width: '48%' }}>
                        <div className='text-start pb-3'>
                            <label className='fw-semibold pb-2' htmlFor="">Event Title</label> <br />
                            <input style={{ border: '1px solid #d6d6d6'}} className='d-block w-100 px-2 py-1 rounded' placeholder='Event Title' {...register("title", { required: true, maxLength: 20 })} />
                        </div>
                        <div className='text-start'>
                            <label className='fw-semibold pb-2' htmlFor="">Description</label> <br />
                            <textarea style={{ border: '1px solid #d6d6d6' }} className='d-block w-100 px-2 py-1 rounded' placeholder='Description' type="textarea" rows="5" {...register("description", { required: true, maxLength: 30 })} />
                        </div>
                    </div>
                    <div className='' style={{ width: '48%' }}>
                        <div className='text-start pb-3'>
                            <label className='fw-semibold pb-2' htmlFor="">Event Date</label> <br />
                            <input style={{ border: '1px solid #d6d6d6' }} className='d-block w-100 px-2 py-1 rounded' placeholder='Event Date' type="date" {...register("date", { required: true })} />
                        </div>
                        <div className='text-start'>
                            <label className='fw-semibold pb-2' htmlFor="">Banner</label> <br />
                            <div className='d-flex flex-column gap-2'>
                                <button className='upload-button p-1 px-3 rounded d-block' disabled style={{ border: '1px solid #0084FF', backgroundColor: '#E8F0FE', width: '' }}>
                                    <img className='pe-2' src={cloudUpload} width='30px' alt="Cloud Upload" />
                                    <span style={{ color: '#0084FF' }}>Upload image</span>
                                </button>
                                <input style={{ border: '1px solid #d6d6d6' }} className='d-block w-100 px-2 py-1 rounded' placeholder='Photo URL' type="url" {...register("bannerImg", { required: true })} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-end'>
                    <input className='d-block btn btn-primary' type="submit" value="Add Event" />
                </div>
            </form>
        </div>
    );
};

export default AddEvent;
```

**[🔼Back to Top](#table-of-contents)**

### `POST a new event from client-side to server-side`

``` JavaScript
// In AddEvent.js

import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);

        // POST a new event from client-side to server-side (database) | Create a new event POST API
        const url = `http://localhost:5000/event`;
        fetch(url, {
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
        navigate('/home');
    }

    <form className='d-flex flex-column gap-2' onSubmit={handleSubmit(onSubmit)}>
};
```

**[🔼Back to Top](#table-of-contents)**

### `POST a new event from server-side to database`

``` JavaScript
// In index.js

// Create dynamic data transaction to/from the database
async function run() {
    try {
        await client.connect();
        const eventCollection = client.db('volunteerNetwork').collection('event');

        // POST a new event from server-side to database | Create a new event POST API
        app.post('/event', async(req, res) => {
            const newEvent = req.body;
            console.log('Adding a new Event = ', newEvent);
            const result = await eventCollection.insertOne(newEvent);
            res.send(result);
        });
    }
    finally {
        // await client.close(); // commented, if I want to keep connection active;
    }
}
run().catch(console.dir);
```

**[🔼Back to Top](#table-of-contents)**

## Setup Dynamic Route and Access route params

- [Setup Dynamic Route and Access route params](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone10/module60-responsive-react-website-and-react-recap/00module-overview-and-react-review.md#612-setup-dynamic-route-and-access-route-params "Setup Dynamic Route and Access route params - module60-responsive-react-website-and-react-recap")

**[🔼Back to Top](#table-of-contents)**

## Get a particular event from database and Create a GET API to get a particular event (___id-wise___)

### `Demo links of 04crud-product-management`

- [Load single product data by using id and Setup form's field value](https://github.com/crescentpartha/projectsHero/blob/main/milestone-module/milestone11/module66.5-CRUD-Update-and-Product-Management/04crud-product-management.md#load-single-product-data-by-using-id-and-setup-forms-field-value "Load single product data by using id and Setup form's field value - 04crud-product-management.md")
- [Controlled Components - reactjs.org](https://reactjs.org/docs/forms.html#controlled-components "Controlled Components - reactjs.org")
- [Controlled Inputs (forms) - The Net Ninja](https://www.youtube.com/watch?v=IkMND33x0qQ "Controlled Inputs (forms) - The Net Ninja | YouTube Video")

**[🔼Back to Top](#table-of-contents)**

### `Get a particular event from database to server-side`

``` JavaScript
// In index.js

// Create dynamic data transaction to/from the database
async function run() {
    try {
        await client.connect();
        const eventCollection = client.db('volunteerNetwork').collection('event');

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
```

**[🔼Back to Top](#table-of-contents)**

### `Create a custom hook with dependency to load individual event data` - (___id-wise___)

``` JavaScript
// In useLoadSingleEvent.js

import { useEffect, useState } from "react"

const useLoadSingleEvent = (id) => {
    const [event, setEvent] = useState({});

    useEffect( () => {
        const url = `http://localhost:5000/event/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setEvent(data));
    }, [id]);
    
    return [event, setEvent];
}

export default useLoadSingleEvent;
```

**[🔼Back to Top](#table-of-contents)**

### `Create a Controlled Inputs Form using React-Bootstrap`

``` JavaScript
// In VolunteerRegistration.js

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useLoadSingleEvent from '../../../hooks/useLoadSingleEvent';

const VolunteerRegistration = () => {
    const { eventDetailId } = useParams();
    const [event] = useLoadSingleEvent(eventDetailId);
    const { title, description, bannerImg } = event;
    // console.log(event, title);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventTitle, setEventTitle] = useState('');

    useEffect( () => {
        setEventDescription(description);
        setEventTitle(title);
    }, [description, title]);

    const handleRegistration = (e) => {
        e.preventDefault();
        const registration = { name, email, date, eventDescription, eventTitle, bannerImg };

        console.log(registration);
        navigate('/admin/volunteerRegisterList');
    }

    return (
        <div>
            <div style={{ width: '500px' }} className='mt-5 mb-5 mx-auto p-4 border rounded shadow-md'>
                <h2 className='text-start'>Register as a Volunteer</h2>
                <Form onSubmit={handleRegistration} className='w-100 mx-auto'>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="name"
                        placeholder="Full Name"
                        className='my-4 fw-semibold border-top-0 border-start-0 border-end-0 rounded-0 px-0'
                        required
                    />
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Username or Email"
                        className='my-4 fw-semibold border-top-0 border-start-0 border-end-0 rounded-0 px-0'
                        required
                    />
                    <Form.Control
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        placeholder="Date"
                        className='my-4 fw-semibold border-top-0 border-start-0 border-end-0 rounded-0 px-0'
                        required
                    />
                    <Form.Control
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        type="text"
                        placeholder="Description"
                        className='my-4 fw-semibold border-top-0 border-start-0 border-end-0 rounded-0 px-0'
                        required
                    />
                    <Form.Control
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        type="text"
                        placeholder="Event Name"
                        className='my-4 fw-semibold border-top-0 border-start-0 border-end-0 rounded-0 px-0'
                        required
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        className='rounded-0 w-100 fw-semibold my-2'
                    >Registration</Button>
                </Form>
            </div>
        </div>
    );
};

export default VolunteerRegistration;
```

**[🔼Back to Top](#table-of-contents)**

## Add a new volunteerActivity to the database and Create a POST API to add a new volunteerActivity 

### `POST a new volunteerActivity from server-side to database`

``` JavaScript
// In index.js

// Create dynamic data transaction to/from the database
async function run() {
    try {
        await client.connect();
        const activityCollection = client.db('volunteerNetwork').collection('volunteerActivity');

        // POST a new volunteerActivity from server-side to database | Create a new volunteerActivity POST API
        app.post('/activity', async(req, res) => {
            const newVolunteerActivity = req.body;
            console.log('Adding a new volunteerActivity = ', newVolunteerActivity);
            const result = await activityCollection.insertOne(newVolunteerActivity);
            res.send(result);
        });
    }
    finally {
        // await client.close(); // commented, if I want to keep connection active;
    }
}
run().catch(console.dir);
```

**[🔼Back to Top](#table-of-contents)**

### `POST a new volunteerActivity from client-side to server-side`

``` JavaScript
// In VolunteerRegistration.js

import { useNavigate } from 'react-router-dom';

const VolunteerRegistration = () => {    
    const navigate = useNavigate();

    const handleRegistration = (e) => {
        e.preventDefault();
        const registration = { name, email, date, eventDescription, eventTitle, bannerImg };
        // console.log(registration);

        // POST a new volunteerActivity from client-side to database
        const url = `http://localhost:5000/activity`;
        fetch(url, {
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(registration)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
        navigate('/admin/volunteerRegisterList');
    }

    <Form onSubmit={handleRegistration} className='w-100 mx-auto'>
};

export default VolunteerRegistration;
```

**[🔼Back to Top](#table-of-contents)**

## All volunteerActivity data Load from Database and Create a volunteerActivity GET API to load volunteerActivities data

### `Load all volunteerActivity data (json format) from database to server-side`

``` JavaScript
// In index.js

// Create dynamic data transaction to/from the database
async function run() {
    try {
        await client.connect();
        const activityCollection = client.db('volunteerNetwork').collection('volunteerActivity');

        // get all volunteerActivity data (json format) from database | create a volunteerActivity Get API to load all volunteerActivities data
        app.get('/activity', async(req, res) => {
            const query = {};
            const cursor = activityCollection.find(query);
            const activities = await cursor.toArray();
            res.send(activities);
        });
    }
    finally {
        // await client.close(); // commented, if I want to keep connection active;
    }
}
run().catch(console.dir);
```

**[🔼Back to Top](#table-of-contents)**

### `Create a custom hook with dependency to load all volunteerActivity data`

``` JavaScript
// In useDisplayActivities.js | Custom hooks with dependency

import { useEffect, useState } from 'react';

const useDisplayActivities = () => {
    const [activities, setActivities] = useState([]);

    useEffect( () => {
        const url = `http://localhost:5000/activity`;
        fetch(url)
        .then(res => res.json())
        .then(data => setActivities(data));
    }, [activities]);

    return [activities, setActivities];
}

export default useDisplayActivities;
```

**[🔼Back to Top](#table-of-contents)**

### `Display all volunteerActivities data by dynamically creating a table using React-Boostrap`

``` JavaScript
// In VolunteerRegisterList.js

import React from 'react';
import { Table } from 'react-bootstrap';
import useDisplayActivities from '../../../hooks/useDisplayActivities';
import DisplayRegisterVolunteer from './DisplayRegisterVolunteer';

const VolunteerRegisterList = () => {
    const [activities] = useDisplayActivities();

    return (
        <div className='p-4 border-bottom'>
            <h2 className='text-start'>Volunteer Register List</h2>
            <div>
                <Table responsive>
                    <thead className='bg-light'>
                        <tr className='text-start'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registering Date</th>
                            <th>Event Title</th>
                            <th>Event Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activities.map(activity => <DisplayRegisterVolunteer
                                key={activity._id}
                                activity={activity}
                            ></DisplayRegisterVolunteer>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default VolunteerRegisterList;
```

``` JavaScript
// In DisplayRegisterVolunteer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const DisplayRegisterVolunteer = ({ activity }) => {
    const { name, email, date, eventTitle, eventDescription } = activity;

    return (
        <tr className='text-start'>
            <td>{name}</td>
            <td>{email}</td>
            <td>{date}</td>
            <td>{eventTitle}</td>
            <td>{eventDescription}</td>
            <td><FontAwesomeIcon className='bg-danger p-2 rounded text-light text-center' icon={faTrashCan} /></td>
        </tr>
    );
};

export default DisplayRegisterVolunteer;
```

**[🔼Back to Top](#table-of-contents)**