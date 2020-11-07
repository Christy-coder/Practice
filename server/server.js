//require models
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const toDoController = require("./controllers/toDoController.js");
//set up global middleware to parse all request bodies as json
//run before any other routes, go to the next middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/")));
//get request to home page '/' ENTRY, server the index.html file
app.get("/", (req, res) => {
  //we're going to send back the index.html file located in the client folder
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

//get all of the tasks in the table and send back to front end
/**STEPS
 * route to controller
 * find the tasks in the database
 * send it back to the server
 * from server, send the data to the client (go to index.js!!)
 */
app.get("/task", toDoController.addRead, (req, res) => {
  res.json(res.locals.read);
});

//post request adding new task '/profile' (CREATE)
app.post("/task", toDoController.addNew, (req, res) => {
  res.json("hello");
});
//update request '/task' (UPDATE)

app.patch("/task", toDoController.update, (req, res) => {
  res.json("it worked");
});

//delete requesst '/task' (DELETE)
app.delete("/task", toDoController.delete, (req, res) => {
  res.json("deleted");
});

//route is bad -- 404 request, page not found
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

//global middleware errors
app.use((err, req, res, next) => {
  console.log("middleware error");
  return res.sendStatus(500)
});

//listens for reuqests at port 3000
app.listen(3000);
