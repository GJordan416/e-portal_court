const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const clientRouters = require("./routers/clientRouters");
const AdvRouters = require("./routers/privateAdvocate")
const caoRouters=require("./routers/caoRouters")
// const { Court, CourtAdmin } = require("./models/cao")

app.use(cors({
    origin: 'http://localhost:5173', // Change this to your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (if required)
  }));
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/client", clientRouters)
// app.use("")
// app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/eportalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB!")
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err.message)
})
app.use("/client", clientRouters)
app.use("/advocate", AdvRouters);
app.use("/cao",caoRouters)
const { Court, CourtAdmin } = require('./models/cao'); // Import the models

// Suppose you have the ObjectId of an existing Court document
const courtId = '658855903eb9ee3ac6cefad2'; // Replace with your valid Court ObjectId

// Create a new CourtAdmin document referencing the Court
const newCourtAdmin = new CourtAdmin({
  firstName: 'kasoju',
  lastName: 'saiteja',
  username: 'admin123',
  password: 'Admin@123',
  email: 'admincao@gmail.com',
  phone: '7659945522',
  role: 'Court Administrative Officer',
  court: courtId, // Assign the valid ObjectId of an existing Court document
  department: 'Administration',
  experienceYears: 5,
  // Other fields as needed
});

// Save the new CourtAdmin document
newCourtAdmin.save()
  .then(savedCourtAdmin => {
    console.log('Court Admin created:', savedCourtAdmin);
  })
  .catch(error => {
    console.error('Error creating Court Admin:', error);
  });

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})