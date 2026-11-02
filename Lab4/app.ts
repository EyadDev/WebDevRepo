function AddNewTask(){
    const textBar = document.getElementById("textBar") as HTMLInputElement;
    const taskList = document.getElementById("taskList")as HTMLElement;

    tasks.push(new Task(textBar.value, false));
    updateItemCount();

    textBar.value = ""
    refreshTasks();
}

function refreshTasks(){
    const taskList = document.getElementById("taskList")as HTMLElement;
    taskList.innerHTML = "";

    tasks.forEach( (e) => {
        if(filter === "all" || (filter === "active" && !e.completed) || (filter === "completed" && e.completed)){
            const task = `<li id="${e.id}" class="task">
                            <input type="checkbox" class="task_check" ${e.completed ? "checked": ""}>
                            <h2>${e.name}</h2>
                            <button class="btn-del">🗑</button>
                        </li>`;

            taskList.innerHTML += task;
        }
    })

    const deleteButtons = document.querySelectorAll(".btn-del") as NodeListOf<HTMLButtonElement>;

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            button.closest(".task")?.remove();

            const id = Number(button.closest(".task")?.id);
            tasks = tasks.filter(e => e.id !== id);
            refreshTasks()
        })
    })

    const checkBoxes = document.querySelectorAll(".task_check") as NodeListOf<HTMLInputElement>;

    checkBoxes.forEach(input => {
        input.addEventListener("click", (event) => {
            const id = Number(input.closest(".task")?.id);
            const task: Task[] = tasks.filter(e => e.id === id);
            task[0].completed = !task[0].completed;
            refreshTasks();
        })
    })

    updateItemCount()
}

function clearCompleted(){
    tasks = tasks.filter(e => !e.completed)
    refreshTasks()
}

function clearAll(){ 
    tasks = []
    refreshTasks()
}

function updateItemCount(){
    const itemsText = document.getElementById("itemsText") as HTMLElement; 

    const non_comp_tasks = tasks.filter(e => !e.completed);
    itemsText.textContent = `${non_comp_tasks.length} items left` 
}

class Task{
    id: number;
    name: string;
    completed: boolean;

    constructor(name: string, completed: boolean) {
        this.id = idNum++;
        this.name = name; 
        this.completed = completed;
    }
}

let idNum = 0;
let tasks: Task[] = [];
let filter = "all"

const addButton = document.getElementById("add") as HTMLButtonElement;
addButton.addEventListener("click", () => AddNewTask());

const allButton = document.getElementById("all") as HTMLButtonElement;
const activeButton = document.getElementById("active") as HTMLButtonElement;
const completedButton = document.getElementById("completed") as HTMLButtonElement;
const clearComp = document.getElementById("clear-comp") as HTMLButtonElement;
const clearall = document.getElementById("clear-all") as HTMLButtonElement;

allButton.addEventListener("click", () => {
    filter = "all";
    allButton.className = "btn-filter active";
    activeButton.className = "btn-filter";
    completedButton.className = "btn-filter"
    refreshTasks()
})

activeButton.addEventListener("click", () => {
    filter = "active";
    allButton.className = "btn-filter";
    activeButton.className = "btn-filter active";
    completedButton.className = "btn-filter"
    refreshTasks()
})

completedButton.addEventListener("click", () => {
    filter = "completed";
    allButton.className = "btn-filter";
    activeButton.className = "btn-filter";
    completedButton.className = "btn-filter active"
    refreshTasks()
})

clearComp.addEventListener("click", () => {
    clearCompleted()
})

clearall.addEventListener("click", () => {
    clearAll()
})

refreshTasks();