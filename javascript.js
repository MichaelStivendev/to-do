let form = document.getElementById("form");
const listaTareas = document.getElementById("lista-tareas");
let arrayTareas = [];

addEventListener("DOMContentLoaded", (e) => {
  arrayTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  for (const tarea of arrayTareas) {
  renderizarTarea(tarea);
}
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nuevaTarea = document.getElementById("nueva-tarea").value;
  crearTarea(nuevaTarea);
});

function crearTarea(tarea) {
  if (!tarea.trim()) return;

  const id = Date.now();
  const nueva = { id, tarea, estado: false };
  arrayTareas.push(nueva);
  renderizarTarea(nueva);
  localStorage.setItem("tareas", JSON.stringify(arrayTareas));
  document.getElementById("nueva-tarea").value = "";
}

function borrarTarea(boton) {
  boton.parentElement.remove();

  arrayTareas = arrayTareas.filter((e) => e.id != boton.id);

  localStorage.setItem("tareas", JSON.stringify(arrayTareas));
}
function tareaTerminada(params) {
  const li = params.parentElement;
  if (params.checked) {
    li.classList.add("tareaLista");
  } else {
    li.classList.remove("tareaLista");
  }

  let indice = arrayTareas.findIndex((tarea) => tarea.id == params.id);
  arrayTareas[indice].estado = params.checked;
  localStorage.setItem("tareas", JSON.stringify(arrayTareas));
}
function renderizarTarea(tarea) {
  const newLi = document.createElement("li");
  newLi.classList.add("tarea");
  if (tarea.estado) newLi.classList.add("tareaLista");
  newLi.innerHTML = `
    <input ${
      tarea.estado ? "checked" : ""
    } type="checkbox" class="terminada" id="${tarea.id}">
    <label for="${tarea.id}">${tarea.tarea}</label>
    <button type="button" id="${tarea.id}" class="borrar-tarea">x</button>`;

  listaTareas.appendChild(newLi);

  newLi
    .querySelector(".borrar-tarea")
    .addEventListener("click", (e) => borrarTarea(e.target));
  newLi
    .querySelector(".terminada")
    .addEventListener("click", (e) => tareaTerminada(e.target));
}
