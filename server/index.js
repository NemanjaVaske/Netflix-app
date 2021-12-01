const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
const movieRoute = require('./routes/movies.js');
const listRoute = require('./routes/lists.js');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Connected to DB!'))
.catch((err)=>console.log(err));

//middleware
app.use(express.json({ limit: "30mb", extended: "30mb"}));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running")
})