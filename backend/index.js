require("dotenv").config();
const express = require("express");
const mongoose  = require("mongoose")
const morgan = require('morgan');
const DB_URL = process.env.DB_URL
const path = require("path"); 
const routes = require("./routes/routes");
// create express app
const app = express();

// DB connection
const PORT = process.env.PORT || 3000;
mongoose.connect(DB_URL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
    console.log("Connected to Database")
  }) // listen for requests only when cluster is connected
  .catch((error) => console.error("Connection Error:", error))

// Middleware 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); //converts the incoming URL-encoded form data into a JavaScript object


// Connect to Frontend
app.set('view engine', 'ejs');
// Define the path for your views (EJS templates)
app.set('views', path.join(__dirname, '../frontend'));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', routes);


app.use((req, res) => {
  res.status(404).render('404', {title: "Error"})
})