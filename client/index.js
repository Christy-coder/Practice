
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

