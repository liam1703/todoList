const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list');
const filterOption = document.querySelector(".filter-task");




document.addEventListener('DOMContentLoaded', gettasks);
taskButton.addEventListener('click', addtask);
taskList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filtertask);






function addtask(event){
    event.preventDefault()   //This will prevent the browser from refreshing the page


    //task Div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    //task LI
    const newtask = document.createElement('li');
    newtask.innerText = taskInput.value
    newtask.classList.add('task-item');
    taskDiv.appendChild(newtask);
    //add to do to local storage
    saveLocaltasks(taskInput.value);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
    /// delete buttom
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    taskDiv.appendChild(deleteButton);

    //append to pages list
    taskList.appendChild(taskDiv);

    //clear input value
    taskInput.value = "";



}


function deleteCheck(e){
    //e.target will allow your code to see what has been clicked
    const item = e.target
    //delete task
    if(item.classList[0] === "trash-btn"){
        const task = item.parentElement
        task.classList.add("fall")
        removeLocaltasks(task);
        task.addEventListener('transitionend', function(){
            task.remove();
        })
        
    }

    //completed

    if(item.classList[0]==="complete-btn"){
        const task = item.parentElement;
        task.classList.toggle('completed');
        
    }

}


function filtertask(e){
    const tasks = taskList.childNodes;
    tasks.forEach(function(task){
        switch(e.target.value){
            case "all":
                task.style.display = "flex"
                break;
            case "completed":
                if(task.classList.contains("completed")){
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!task.classList.contains('completed')){
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;                    
        }
    });
}




function saveLocaltasks(task){
    //check local storage 
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function gettasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //task Div
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        //task LI
        const newtask = document.createElement('li');
        newtask.innerText = task
        newtask.classList.add('task-item');
        taskDiv.appendChild(newtask);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        taskDiv.appendChild(completedButton);
        /// delete buttom
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("trash-btn");
        taskDiv.appendChild(deleteButton);

        //append to pages list
        taskList.appendChild(taskDiv);
    });
}

function removeLocaltasks(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}





///1. GET SELECTORS 2. EVENT LISTENERS 3.FUNCTIONS





