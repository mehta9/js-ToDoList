//TODO List
let ihtml = `<form id=todoForm>
  <div class="form-group">
    <label for="title">Title:</label><br>
    <textarea id="title" name="title" cols="50">
    </textarea>
  </div>
  <div class="form-group">
    <label for="description">Description:</label><br>
    <textarea id="description" name="description" rows="5" cols="50">
    </textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`;
document.getElementById("addToDo").innerHTML = ihtml;

//event listener for form submission
document.getElementById("todoForm").addEventListener('submit', function(e){
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    if (title && description) {
        let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
        toDoList.push({ title: title, description: description });
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
        displayToDoList();
        document.getElementById('todoForm').reset();  // Clear the form
    }
});

function displayToDoList() {
    let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
    const toDoListContainer = document.getElementById('toDoList');
    toDoListContainer.innerHTML = "";  // Clear existing list
    toDoList.forEach((item) => {
        // let listItem = `<li><strong>${item.title}:</strong> ${item.description}</li>`;
        listItem = `<div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <button class="btn btn-primary mark-complete" onClick="removeFromList('${item.title}')">Mark Completed</button>
                </div>
            </div>`
        toDoListContainer.innerHTML += listItem;
    });
}


window.onload = displayToDoList;

function removeFromList(title){
    let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
    toDoList = toDoList.filter((item) => item.title !== title);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));  // Update localStorage
    displayToDoList();  // Re-render the list
}
