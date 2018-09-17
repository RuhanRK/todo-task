// Define out UI Variables
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// Set task to local storage
const setTask = function(task){
    let tasks;
    if(!localStorage.getItem('tasks')){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// create li
const createLi = function(value){
    //create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create textnode and append to li
    li.appendChild(document.createTextNode(value));
    // Create delete link element
    const link = document.createElement('a');
    //Add class name
    link.className = 'delete-item secondary-content';
    // Add Delete icon
    link.innerHTML = '<i class="fas fa-times"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
}

// load all event listener
const addTask = function(e){
    if(!taskInput.value){
        alert('Add Valid Input')
    }
    else{
        //create li
        createLi(taskInput.value)

        //set to local storage
        setTask(taskInput.value);
    }
    

    //clear input
    taskInput.value = '';

    e.preventDefault();
};

// const remove task from local storage
const removeTaskFrmLocal = function(taskItem){
    let tasks;
    if(!localStorage.getItem('tasks')){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })
    
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

// Remove task
const removeTask = function(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            removeTaskFrmLocal( e.target.parentElement.parentElement);
        }
    }
};

//Clear task
const clearTask = function(){
    if(confirm('Are you sure to Clear All ?')){
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
    
        localStorage.clear();
    }
};

//FIlter task
const filterTask = function(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
};

//get tasks
const getTasks = function(){
    let tasks;
    if(!localStorage.getItem('tasks')){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        createLi(task)
    })
}

const loadEventListener = function(){
    //DOM Loaded
    document.addEventListener('DOMContentLoaded', getTasks)

    //Add Task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTask);

    //filter task event
    filter.addEventListener('keyup', filterTask);
};

// call all listener
loadEventListener();

