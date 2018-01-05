// Declare my columns which will be empty arrays 
// that will take a task object
var toDoList = [
  {
    title: 'Task 1',
    description: 'Do task 1',
    assignee: 'Kob',
    id: 0,
    type: 'todo'
  }
];
var inProgressList = [
  {
    title: 'Task 2',
    description: 'Do task 2',
    assignee: 'Kob',
    id: 1,
    type: 'inprogress'
  }
];
var completedList = [
  {
    title: 'Task 3',
    description: 'Do task 3',
    assignee: 'Kob',
    id: 2,
    type: 'completed'
  }
];
var acceptedList = [
  {
    title: 'Task 4',
    description: 'Do task 4',
    assignee: 'Kob',
    id: 3,
    type: 'accepted'
  }
];
var archiveList = [
  {
    title: 'Task 5',
    description: 'Do task 5',
    assignee: 'Kob',
    id: 4,
    type: 'archive'
  }
];
var uniqueIdCounter = 0;

var toDoColumn = document.getElementById('todo');
var inProgressColumn = document.getElementById('inprogress');
var completedColumn = document.getElementById('completed');
var acceptedColumn = document.getElementById('accepted');
var archiveColumn = document.getElementById('archive');
var formContainer = document.getElementById('formcontainer');

function renderColumns() {
  toDoColumn.innerHTML = '<h3>To do</h3>';
  inProgressColumn.innerHTML = '<h3>In progress</h3>';
  completedColumn.innerHTML = '<h3>Completed</h3>';
  acceptedColumn.innerHTML = '<h3>Accepted</h3>';
  archiveColumn.innerHTML = '<h3>Archive</h3>';
  for (var i = 0; i < toDoList.length; i++) {
    var newToDoCard = createCardElement(toDoList[i].title,
                                        toDoList[i].description,
                                        toDoList[i].assignee,
                                        toDoList[i].id,
                                        toDoList[i].type);

    toDoColumn.appendChild(newToDoCard);
  }
  for (var j = 0; j < inProgressList.length; j++) {
    var newInProgressCard = createCardElement(inProgressList[j].title,
                                        inProgressList[j].description,
                                        inProgressList[j].assignee,
                                        inProgressList[j].id,
                                        inProgressList[j].type);

    inProgressColumn.appendChild(newInProgressCard);
  }
  for (var k = 0; k < completedList.length; k++) {
    var newCompletedCard = createCardElement(completedList[k].title,
                                        completedList[k].description,
                                        completedList[k].assignee,
                                        completedList[k].id,
                                        completedList[k].type);

    completedColumn.appendChild(newCompletedCard);
  }
  for (var l = 0; l < acceptedList.length; l++) {
    var newAcceptedCard = createCardElement(acceptedList[l].title,
                                        acceptedList[l].description,
                                        acceptedList[l].assignee,
                                        acceptedList[l].id,
                                        acceptedList[l].type);

    acceptedColumn.appendChild(newAcceptedCard);
  }
  for (var m = 0; m < archiveList.length; m++) {
    var newArchiveCard = createCardElement(archiveList[m].title,
                                        archiveList[m].description,
                                        archiveList[m].assignee,
                                        archiveList[m].id,
                                        archiveList[m].type);

    archiveColumn.appendChild(newArchiveCard);
  }
}

renderColumns();

// create a function to create a card element
function createCardElement(title, description, assignee, id, type) {
  var card = document.createElement('div');
  card.className = 'card';
  
  var cardTitle = document.createElement('p');
  cardTitle.innerHTML = title;
  
  var cardDesc = document.createElement('p');
  cardDesc.innerHTML = description;
  
  var cardAssignee = document.createElement('p');
  cardAssignee.innerHTML = assignee;
  
  var cardId = document.createElement('p');
  cardId.innerHTML = id;
  
  card.id = id;
  
  // Create delete task form
  var deleteTaskForm = document.createElement('form');
  deleteTaskForm.onsubmit = deleteCard;
  
  // Create delete task id input field to hold the task's id 
  // number for when we want to delete the task.
  var deleteTaskIdInput = document.createElement('input');
  deleteTaskIdInput.value = id;
  deleteTaskIdInput.name = 'id'
  deleteTaskIdInput.type = 'hidden';
  
  // Create delete task type input field to hold the task's type 
  // this will tell us which array the task is located.
  var deleteTaskTypeInput = document.createElement('input');
  deleteTaskTypeInput.value = type;
  deleteTaskTypeInput.name = 'type';
  deleteTaskTypeInput.type = 'hidden';
  
  // Create delete task button to use as a submit button.
  var deleteTaskButton = document.createElement('button');
  deleteTaskButton.innerHTML = '&#215;';  // multiplication sign
  deleteTaskButton.type = 'submit';
  deleteTaskButton.className = 'deleteTaskButton';
  
  deleteTaskForm.appendChild(deleteTaskIdInput);
  deleteTaskForm.appendChild(deleteTaskTypeInput);
  deleteTaskForm.appendChild(deleteTaskButton);
  
  var moveTaskForm = document.createElement('form');
  moveTaskForm.onsubmit = moveCard;
  
  var moveTaskIdInput = document.createElement('input');
  moveTaskIdInput.value = id;
  moveTaskIdInput.name = 'id';
  moveTaskIdInput.type = 'hidden';
  
  var moveTaskTypeInput = document.createElement('input');
  moveTaskTypeInput.value = type;
  moveTaskTypeInput.name = 'type';
  moveTaskTypeInput.type = 'hidden';
  
  var moveTaskButton = document.createElement('button');
  moveTaskButton.innerHTML = '&#8594;';  //right arrow
  moveTaskButton.type = 'submit';
  moveTaskButton.className = 'moveTaskButton';

  moveTaskForm.appendChild(moveTaskIdInput);
  moveTaskForm.appendChild(moveTaskTypeInput);
  moveTaskForm.appendChild(moveTaskButton);

//   var editButton = document.createElement('button');
//   editButton.innerHTML = 'edit';
//   editButton.onclick = editCard;
  
  card.appendChild(cardTitle);
  card.appendChild(cardDesc);
  card.appendChild(cardAssignee);
  card.appendChild(cardId);
  card.appendChild(deleteTaskForm);
  if (type != 'archive') {
    card.appendChild(moveTaskForm);
  }
//   card.appendChild(editButton);

  
  return card;
}

// create a function to move a task
function moveCard(event) {
  event.preventDefault();
  switch(event.target.type.value) {
    case 'todo':
      var todoTaskToMove = toDoList.find(function(task) {
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      todoTaskToMove.type = 'inprogress';
      inProgressList.push(todoTaskToMove);
      break;
    case 'inprogress':
      var inProgressTaskToMove = inProgressList.find(function(task) {
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      inProgressTaskToMove.type = 'completed';
      completedList.push(inProgressTaskToMove);
      break;
    case 'completed':
      var completedTaskToMove = completedList.find(function(task) {
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      completedTaskToMove.type = 'accepted';
      acceptedList.push(completedTaskToMove);
      break;
    case 'accepted':
      var acceptedTaskToMove = acceptedList.find(function(task) {
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      acceptedTaskToMove.type = 'archive';
      archiveList.push(acceptedTaskToMove);
      break;
    case 'archive':
      break;
  }
  
  renderColumns();
}

// create a function to move a task
function deleteCard(event) {
  event.preventDefault();
 
  switch(event.target.type.value) {
    case 'todo':
      toDoList = toDoList.filter(function(task) {
        return task.id != event.target.id.value;
      });
      break;
    case 'inprogress':
      inProgressList = inProgressList.filter(function(task) {
        return task.id != event.target.id.value;
      });
      break;
    case 'completed':
      completedList = completedList.filter(function(task) {
        return task.id != event.target.id.value;
      });
      break;
    case 'accepted':
      acceptedList = acceptedList.filter(function(task) {
        return task.id != event.target.id.value;
      });
      break;
    case 'archive':
      archiveList = archiveList.filter(function(task) {
        return task.id != event.target.id.value;
      });
      break;
  }
  
  renderColumns();
}

// create a form function to handle when a new 
// task is submitted

function handleSubmit(event) {
  event.preventDefault();

  var newTaskObject = {
    title: event.target.title.value,
    description: event.target.description.value,
    assignee: event.target.assignee.value,
    id: 'task' + uniqueIdCounter,
    type: 'todo'
  }
  
  uniqueIdCounter++;
  toDoList.push(newTaskObject);

  renderColumns();
}

function editCard() {
  event.preventDefault();
  console.log('edit task');
}


var newTaskForm = document.createElement('form');
newTaskForm.onsubmit = handleSubmit;

var titleInput = document.createElement('input');
titleInput.placeholder = 'title';
titleInput.name = 'title';
titleInput.id = 'title';
titleInput.required = true;

var descInput = document.createElement('input');
descInput.placeholder = 'description'
descInput.name = 'description';
descInput.id = 'description';
descInput.required = true;

var assigneeInput = document.createElement('input');
assigneeInput.placeholder = 'assignee';
assigneeInput.name = 'assignee';
assigneeInput.id = 'assignee';
assigneeInput.required = true;

var submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.innerHTML = 'add task';

newTaskForm.appendChild(titleInput);
newTaskForm.appendChild(descInput);
newTaskForm.appendChild(assigneeInput);
newTaskForm.appendChild(submitButton);

formContainer.appendChild(newTaskForm);

