function postTask() {
  //get & store the task and description
  //document query selector for the input boxes
  const task = document.querySelector("#input1").value;
  const description = document.querySelector("#input2").value;
  //fetch request
  fetch("/task", {
    //post
    method: "POST", // or 'PUT'
    //the headers specify what kind of info we are sending to the server
    headers: {
      "Content-Type": "application/json",
    },
    //send {task: task, description: description}
    body: JSON.stringify({ task: task, description: description }),
  })
    //the server has responded! convert the response to json
    .then((response) => response.json())
    //if the server responds with data, we will console log it here
    .then((data) => {
      console.log("Success:", data);
    })
    //if server sent an error, log it!
    .catch((error) => {
      console.error("Error:", error);
    });

  // '/profile'
  //send it the task and description
  //error handling & result handling after the fetch request
}

//function that does a fetch request to '/task'
function items() {
  fetch("/task")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((el, index) => {
        singleItems(el);
      });
    });
}

//function to create the div + info
function singleItems(object) {
  //create div
  let div = document.createElement("div");
  //create a p element
  let para = document.createElement("p");
  //assign the inner html
  para.innerHTML = `Task:${object.task} , Description: ${object.description}`;
  //create a button
  let button = document.createElement("button");
  //assign inner html
  button.innerHTML = `delete item`;
  //set onclick attribute
  button.onclick = deleteItem;
  //set the id of the button to be the id of the object
  button.setAttribute('id', object.id);
  //append the p, button to div
  div.append(para, button);
  //append the div to the container (a div prev. set up on the index.html page)
  let container = document.querySelector(".container");
  container.append(div);
}

//create a delete function
function deleteItem(event) {
  //fetch request, pass id in body
  //endpoint is task, method is delete, specifying that we're sending json data, send the id in the body as an object: ex// {id: 4}
  fetch('/task', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({id: event.target.id}) 
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))
  console.log(event.target.id);
}
