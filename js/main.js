const userIn = document.querySelector('#userInput');
const input = document.querySelector('input[type="text"]')
const elementList = document.querySelector('#list')

// counter ID
let idCounter = 0;
  
//Sortable
Sortable.create(elementList, {
    animation : 150,
    chosenClass: "seleccionado",
    group : "lista-tareas",
    store: {

        // guardar elemetos en el LocalStorage
        set: (sortable) => {
            const orden = sortable.toArray();
            localStorage.setItem(sortable.options.group.name, orden.join('|'))
        },

        // Obtener el orden de la lista

        get: (sortable) =>{
            const orden = localStorage.getItem(sortable.options.group.name)
            return orden ? orden.split('|') : [];
        } 
    }
});


// Eventos
userIn.addEventListener('submit', (event)=>{
    event.preventDefault();
    addTask();
})

list.addEventListener('click', (event) =>{

    if (event.srcElement.nodeName == 'INPUT'){
        console.log(event);
        updateStats();
    } else if (event.srcElement.nodeName == 'IMG'){
        deleteTask(event.srcElement.parentNode.id);
    }
    
})



let addTask = () => {
    let newValue = input.value;

    idCounter++;


    if(input.value.length === 0){
        return alert('No puedes ecribir una tarea vacia intente de nuevo');
    }

    // Create and add ID and Class
    let newDiv = document.createElement("div");
    newDiv.setAttribute('id', `${idCounter}`);
    newDiv.setAttribute('class', `task-container`)
    newDiv.setAttribute('data-id', `${idCounter}`);


    newDiv.innerHTML = 
    `
    <label>
    <input type="checkbox" >${newValue}
    </label>
    <img src="./img/delete.png" class="closeBtn">

    `

    // add new elment 
    elementList.appendChild(newDiv);

    input.value= ''  
    updateStats();
}


let updateStats = () => {
    // contar los div del id list
    let elemtn = list.querySelectorAll('div');
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    
    // agregar cuantos pendientes
    stats.innerHTML = `<p> tareas pendiente:${elemtn.length} Completadas ${checkbox.length} </p>`
}

let deleteTask = (id) =>{
    let taskToDelete = document.getElementById(id);
    list.removeChild(taskToDelete);
    updateStats();
}