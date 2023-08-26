const listaTareasDiv = document.getElementById("lista-tareas");
const crearTareaInput = document.getElementById("crear-tarea");

if (!localStorage.getItem("id")) {
  localStorage.setItem("id", "0");
}
let id = parseInt(localStorage.getItem("id"));

function crearTarea() {
  if (crearTareaInput.value != "") {
    id++;
    localStorage.setItem("id", id);
    let tarea = crearTareaInput.value;
    localStorage.setItem(id, tarea);
    crearTareaInput.value = "";
    mostrarTareas();
    crearTareaInput.focus(); //devuelve el cursor al input//
  }
}

crearTareaInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    crearTarea();
  }
});

function mostrarTareas() {
  let tareas = "";

  for (let i = id; i >= 1; i--) {
    const valor = localStorage.getItem(i.toString());

    if (valor !== null) {
      tareas += ` 
            <div class="tarea">
              <article>
                <input type="checkbox">
                <p>${valor}</p>
              </article>  
              <div>    
                <button class="borrar" onclick="borrar('${i.toString()}')">Borrar</button>
                <button class="editar" onclick="editar('${i.toString()}')">Editar</button>
              </div>
            </div>`;
    }
  }

  listaTareasDiv.innerHTML = tareas;
}

function editar(id) {
  tareaModificada = crearTareaInput.value;
  localStorage.setItem(id, tareaModificada);
  mostrarTareas();
}

function borrarTodo() {
  localStorage.clear();
  mostrarTareas();
}

function borrar(id) {
  localStorage.removeItem(id);
  mostrarTareas();
}

mostrarTareas();
