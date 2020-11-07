const query = require('../models/models.js');
const toDoController = {}

toDoController.addNew = (req, res, next) => {
  //store the body of the request
  //data should include task , description
  //data structure {task: '', description: ''}
  const data = req.body;
  console.log("we're in the addNew controller and the data is : ", data)
  //declare a queryString
  //INSERT or DELETE or other options
  const queryString = `INSERT INTO todolist (task, description) values($1, $2)`
  //declare a params array, put all of our values into that array
  const params = [data["task"], data["description"]]
  //add body to db --> invoke the query methods, passing queryString, params, callback
  query(queryString, params, (err, queryResponse) => {
    console.log("we ran a query ")
    if(err){
      console.log('error')
    }else{
      console.log(queryResponse)
    }
  })

  //handle error
  //if error --> global middleware
  return next();
}

// Read controller 
toDoController.addRead = (req, res, next) => {
  const queryRead = `SELECT * FROM todolist`;
  query(queryRead, [], (err, queryResponse) => {
    console.log("we ran a query ")
    if(err){
      console.log('error')
    }else{
      //res = response object (server can store information that it plans to send back)
      //add the response from the query to res.locals so we can access it in later middleware functions and eventually send to the client
      res.locals.read = queryResponse.rows
    }
    return next();
  })
}

toDoController.update = (req, res, next) => {
  const data = req.body;

  const queryUpdate = `UPDATE todolist SET task = $1,
  description = $2 WHERE id= $3;`
 

  const params = [data["task"], data["description"], data["id"]]
  //add body to db --> invoke the query methods, passing queryString, params, callback
  query(queryUpdate, params, (err, queryResponse) => {
    console.log("we ran a query ")
    if(err){
      console.log('error')
    }else{
      console.log(queryResponse)
    }
  })

  //handle error
  //if error --> global middleware
  return next();

}

toDoController.delete = (req, res, next) => {
  const deletedItem = req.body.id

  const queryDelete = `DELETE FROM todolist WHERE id = $1;`

  query(queryDelete, [deletedItem], (err, queryResponse) => {
    console.log("we ran a query ")
    if(err){
      console.log('error')
    }else{
      console.log(queryResponse)
    }
  })
  return next()

}



//module.exports

module.exports = toDoController