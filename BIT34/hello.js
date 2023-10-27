const express = require('express');
const app = express();
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>EA1 Finals</title>
      <link rel="stylesheet" href="EA4.css">
    </head>
    <body>
      <center><img src="dolist.png"></center>
      <center><h1>Web Based To-Do List</h1></center>
  
      <center><input type="text" id="taskInput" placeholder="Add a task"></center>
      <center><button onclick="addTask()">Add</button></center>
      <center><button id="removeButton">Remove</button></center>
  
      <ul id="taskList"></ul>
  
      <script>
        let todoList = [];
 
        function addTask() {
          const input = document.getElementById("taskInput");
          const task = input.value.trim();
  
          if (task !== "") {
            addItem(task);
            displayList();
            input.value = "";
          }
        }
  
        function addItem(item) {
          todoList.push({ task: item, completed: false });
          console.log(\`Added "\${item}" to the to-do list.\`);
        }
  
        function removeItem() {
          const checkedCheckboxes = document.querySelectorAll(".task-checkbox:checked");
          checkedCheckboxes.forEach((checkbox) => {
            const listItem = checkbox.closest("li");
            const task = listItem.textContent.trim().substring(3); // Extract the task text
  
            const index = findItemIndex(task);
            if (index > -1) {
              todoList.splice(index, 1);
              console.log(\`Removed "\${task}" from the to-do list.\`);
            }
          });
  
          displayList();
        }
  
        function displayList() {
          const taskList = document.getElementById("taskList");
          taskList.innerHTML = "";
  
          if (todoList.length === 0) {
            taskList.innerHTML = "<li>The list is empty.</li>";
          } else {
            todoList.forEach((todo, index) => {
              const { task, completed } = todo;
              const listItem = document.createElement("li");
  
              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.classList.add("task-checkbox");
              checkbox.checked = completed;
              checkbox.addEventListener("change", () => completeTask(task, checkbox));
  
              const label = document.createElement("label");
              label.appendChild(checkbox);
              label.appendChild(document.createTextNode(\`\${index+1}. \${task}\`));
  
              listItem.appendChild(label);
              taskList.appendChild(listItem);
            });
          }
        }
  
        function findItemIndex(item) {
          return todoList.findIndex((todo) => todo.task === item);
        }
  
        // Add event listeners to the buttons
        document.getElementById("removeButton").addEventListener("click", removeItem);
  
        displayList();
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
