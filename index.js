let myTasks = [];
let taskId = 0;

window.onload = function()
{
    document.getElementById("taskInput").onkeydown = function(event)
    {
        if(event.key == "Enter")
        {
            event.preventDefault();
            CreateTask(taskInput.value);
            taskInput.value = "";
        }
    }

    document.getElementById("showAllTasks").onchange = function()
    {
        DisplayAllTasks();
    }
    
    document.getElementById("showActiveTasks").onchange = function()
    {
        DisplayActiveTasks();
    }

    document.getElementById("showCompletedTasks").onchange = function()
    {
        DisplayCompletedTasks();
    }

    document.getElementById("clearCompletedTasks").onclick = function()
    {
        RemoveAllCompletedTasks();
    }

}

function ToDoItem(toDo)
{
    this.isComplete = false;
    this.task = toDo;
    this.Id = taskId.toString();
}

function CreateTask(taskToDo)
{
    let task = new ToDoItem(taskToDo);
    myTasks.push(task);
    taskId++;
    DisplayTask(task);
}

function DisplayTask(ToDoItem)
{
    let toDoList = document.getElementById("toDoList");

    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    li.setAttribute("id", "listItem" + ToDoItem.Id);

    let div = document.createElement("div");
    div.setAttribute("class", "custom-control custom-checkbox");

    let ipt = document.createElement("input");
    ipt.setAttribute("type", "checkbox");
    ipt.setAttribute("class", "custom-control-input");
    ipt.setAttribute("id", "CheckForTask" + ToDoItem.Id);
    ipt.onclick = function(){
        MarkTaskComplete(ToDoItem);
    }

    let lbl = document.createElement("label");
    lbl.setAttribute("class", "custom-control-label");
    lbl.setAttribute("for", "CheckForTask" + ToDoItem.Id);
    lbl.setAttribute("id", "LabelForTask" + ToDoItem.Id);
    lbl.innerText = ToDoItem.task;

    if(ToDoItem.isComplete)
    {
        lbl.setAttribute("style", "text-decoration: line-through;");
        ipt.setAttribute("checked", "");
    }

    div.appendChild(ipt);
    div.appendChild(lbl);
                
    li.appendChild(div);

    toDoList.appendChild(li);

    UpdateItemCount();
}

function UpdateItemCount()
{
    let taskTableHeader = document.getElementById("taskTableHeader");
    let taskCount = 0;

    for(let i = 0; i < myTasks.length; i++)
    {
        if(!myTasks[i].isComplete)
        {
            taskCount++;
        }
    }

    taskTableHeader.innerText = taskCount + " items left"
}

function MarkTaskComplete(ToDoItem)
{
    let lbl = document.getElementById("LabelForTask" + ToDoItem.Id);

    if(!ToDoItem.isComplete)
    {
        ToDoItem.isComplete = true;
        lbl.setAttribute("style", "text-decoration: line-through;");
    }
    else
    {
        ToDoItem.isComplete = false;
        lbl.removeAttribute("style");
    }

    UpdateItemCount();
}

function DisplayAllTasks()
{
    document.getElementById("toDoList").innerHTML = "";
    for(let i = 0; i < myTasks.length; i++)
    {
        DisplayTask(myTasks[i]);
    }   
}

function DisplayActiveTasks()
{
    document.getElementById("toDoList").innerHTML = "";
    for(let i = 0; i < myTasks.length; i++)
    {
        if(!myTasks[i].isComplete)
        {
            DisplayTask(myTasks[i]);
        }
    }   
}

function DisplayCompletedTasks()
{
    document.getElementById("toDoList").innerHTML = "";
    for(let i = 0; i < myTasks.length; i++)
    {
        if(myTasks[i].isComplete)
        {
            DisplayTask(myTasks[i]);
        }
    }   
}

function RemoveAllCompletedTasks()
{
    for(let i = 0; i < myTasks.length; i++)
    {
        if(myTasks[i].isComplete)
        {
            RemoveCompletedTask(myTasks[i]);
        }
    }
}

function RemoveCompletedTask(ToDoItem)
{
    let li = document.getElementById("listItem" + ToDoItem.Id);
    li.parentNode.removeChild(li);
    myTasks.pop(ToDoItem);
}