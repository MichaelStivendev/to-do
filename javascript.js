let form = document.getElementById("form");
const listaTareas = document.getElementById("lista-tareas");
let arrayTareas = [];

addEventListener("DOMContentLoaded", (e) => {
   arrayTareas = JSON.parse(localStorage.getItem("tareas")) || [];
  for (const [i,tarea] of arrayTareas.entries()) {
    const newLi = document.createElement("li");
    newLi.classList.add("tarea");
    if (tarea.estado) {
      newLi.classList.add('tareaLista')
    } 
    newLi.innerHTML = `<input ${ tarea.estado ? 'checked' : '' } type="checkbox" class="terminada" id="${tarea.id}"> <label for="${tarea.id}">${tarea.tarea}</label>
    <button type="button" id="${tarea.id}" class="borrar-tarea">x</button> `;
    listaTareas.appendChild(newLi);
    
  }
  const borrar = document.querySelectorAll('.borrar-tarea');
  const tereminado = document.querySelectorAll('.terminada');
  for (const element of borrar) {
    element.addEventListener('click',(e)=>{
      borrarTarea(e.target);
    }) 
  }
  for (const element of tereminado) {
   
    element.addEventListener('click',(e)=>{
      tareaTerminada(e.target);
    })
  }
 
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nuevaTarea = document.getElementById("nueva-tarea").value;
  crearTarea(nuevaTarea);
});

function crearTarea(tarea) {
   id = Math.floor(Math.random()*1000)+1;
  arrayTareas.push({id,tarea, estado: false });
    const newLi = document.createElement("li");
    newLi.classList.add("tarea");
    newLi.innerHTML = `<input type="checkbox" class="terminada" id="${id}"> <label for="${id}">${tarea}</label>
    <button type="button" id="${id}"  class="borrar-tarea">x</button> `;
    listaTareas.appendChild(newLi);
    localStorage.setItem("tareas", JSON.stringify(arrayTareas));
    const borrar = document.querySelectorAll('.borrar-tarea');
     const tereminado = document.querySelectorAll('.terminada');
  for (const element of borrar) {
    element.addEventListener('click',(e)=>{
      borrarTarea(e.target);
    }) 
  }
  for (const element of tereminado) {
    element.addEventListener('click',(e)=>{
      tareaTerminada(e.target);
    })
  }
}
function borrarTarea(boton) {
  
  boton.parentElement.remove();
  
  arrayTareas = arrayTareas.filter((e) => e.id != boton.id );
   
  localStorage.setItem('tareas',JSON.stringify(arrayTareas));

}
function tareaTerminada(params) {
    const li = params.parentElement;
    if (params.checked) {
      li.classList.add('tareaLista');
    }else{
      li.classList.remove('tareaLista');
    }
    
    let indice =  arrayTareas.findIndex(tarea => tarea.id == params.id)
    arrayTareas[indice].estado = params.checked;
    localStorage.setItem("tareas",JSON.stringify(arrayTareas)); 
     
}

