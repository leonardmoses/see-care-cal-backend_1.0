if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const EventModel = require('./models/events')

const cors = require('cors')

app.use(express.json())
app.use(cors());

mongoose.connect(process.env.DATABASE_URL)


//Get Request
app.get("/getEvents", (req, res) => {
    EventModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})


//Post Request
app.post("/createEvent", async (req, res) => {
    const event = req.body
    const newEvent = new EventModel(event)
    await newEvent.save()

    res.json(event)
})

//#region Update Requests
app.put("/updateEventName", async (req, res) => {
    const newEventName = req.body.newEventName;
    const id = req.body.id;
    try {
        await EventModel.findById(id, (error, eventToUpdate) => {
            eventToUpdate.eventName = newEventName;
            eventToUpdate.save();
        });
    } catch(err) {
        console.log(err);
    }
    res.send("Updated");
})


app.put("/updateparticipants", async (req, res) => {
    const newParticipants = req.body.newParticipants;
    const id = req.body.id;
    try {
        await EventModel.findById(id, (error, eventToUpdate) => {
            eventToUpdate.participants = newParticipants;
            eventToUpdate.save();
        });
    } catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

app.put("/updatedescription", async (req, res) => {
    const newDescription = req.body.newDescription;
    const id = req.body.id;
    try {
        await EventModel.findById(id, (error, eventToUpdate) => {
            eventToUpdate.description = newDescription;
            eventToUpdate.save();
        });
    } catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

//#endregion

app.delete('/deleteEvent/:id', async (req, res) => {
    const id = req.params.id
    await EventModel.findByIdAndRemove(id).exec();
    res.send("Event Deleted")
})

//Port Listening
app.listen(4000, ()=> {
    const port = 4000
    console.log(`Server running on Port: ${port}`)
}) 