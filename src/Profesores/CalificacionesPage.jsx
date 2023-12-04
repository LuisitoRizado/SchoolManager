import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const CalificacionesPage = () => {
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const id = localStorage.getItem("user");
  console.log(id);
  const [docente, setDocente] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState([]);
  const [id_MateriaSeleccionada, setId_MateriaSeleccionada] = useState();
  const [alumnosCargados, setAlumnosCargados] = useState([])
  const [newCalificacion, setnewCalificacion] = useState(0)
  const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const formattedDate = `${day}/${month}/${year}`;
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
console.log(formattedDate);

  const onHandleCalificacion = (e) => {
    setnewCalificacion(e.target.value)
  }
  const modificarCalificacion = async (alumno, index)=>{
 //deshabilitamos el boton modificar
 const modificarButton = document.querySelectorAll(".modificarButton");
 modificarButton.forEach((btn) => {
   btn.classList.add("disabled");
 });

 //vamos a buscar todos los elementos con la classe fila-index
 const inputs = document.querySelectorAll(".fila-" + index);
 const mod = document.querySelector(".btn-" + index);
 const id = document.querySelector(".id-" + index).value;
 console.log(id);
 console.log(inputs);
 const okButton = document.createElement("button");
 const noButton = document.createElement("button");
 okButton.classList.add("btn", "btn-success", "m-2");
 okButton.innerText = "OK";
 noButton.classList.add("btn", "btn-danger", "m-2");
 noButton.innerText = "X";

 //obtener valores iniciales
 const valoresIniciales = [];
 valoresIniciales.push(inputs[0].value);
 
 

 //Agregamos el button
 mod.appendChild(okButton);
 mod.appendChild(noButton);

 //Habiliatamos los campos
 inputs.forEach((input) => {
   input.disabled = false;
 });

 //Evento de cancelacion
 noButton.addEventListener("click", () => {
   modificarButton.disabled = false;

   //Aquí vamos a cancelar todo, es decir solo eliminamos los dos botones
   modificarButton.forEach((btn) => {
     btn.classList.replace("disabled", "enable");
   });
   //primero deshabilitamo los inputs
   console.log(inputs[0].value);
   console.log(valoresIniciales[0]);
   inputs[0].value = valoresIniciales[0]; 
   inputs.forEach((input, index) => {
     input.disabled = true;
     //a la vez, regresamos su valores iniciales

     //por ultimo, eliminamos los botones
     noButton.remove();
     okButton.remove();
   });
 });
 //detectamos el evento del button ok
 okButton.addEventListener("click",async () => {
   modificarButton.forEach((btn) => {
     btn.classList.replace("disabled", "enable");
   });

   console.log("me diste click");
   console.log(inputs[0]);
   //guardamos los datos de los inputs
   const calificacion = inputs[0].value;
  
   //recopilamos los inputs
   const inputName = inputs[0];
   let ncontrol = parseInt(alumno)
   alert('N CONTROL: ' + ncontrol)
    //checar si te trae la materia o el grupo
    const url = 'https://rest-api-production-a5bf.up.railway.app/updateCalificacion/'+ ncontrol + '/' + id_MateriaSeleccionada;
    await fetch(url, {
      method: "PUT",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      "Calificacion": calificacion
      }),
    });
    confirm('Calificacion actualizada!')
    window.location.reload();
 //}
 });




  
  };
  
  useEffect(() => {
    //PETICION PARA DOCENTE
    fetch("https://rest-api-production-a5bf.up.railway.app/getDocente/" + id)
      .then((res) => res.json())
      .then((data) => setDocente(data));
    //Peticion para todas las materias que imparte
    fetch(
      "https://rest-api-production-a5bf.up.railway.app/getMaterias_docente/" +
        id
    )
      .then((res) => res.json())
      .then((data) => setMaterias(data));
  }, []);
  useEffect(() => {
    fetch('https://rest-api-production-a5bf.up.railway.app/getMateria/'+id_MateriaSeleccionada)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setMateriaSeleccionada(data)}
      )
      fetch('https://rest-api-production-a5bf.up.railway.app/alumnosInscritos/'+id_MateriaSeleccionada)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setAlumnosCargados(data)}
        )
        window.localStorage.setItem('id_materia', id_MateriaSeleccionada);
  }, [id_MateriaSeleccionada]);

  return (
    <div>
      <h1>Calificaciones </h1>
      <hr />
      {/* Mostrar lista de materias */}
      <label htmlFor="">Selecciona un grupo</label>
      <select
        className={"form-select mySelect "}
        id="materias"
        aria-label="Default select example"
        onChange={(e) => {
          const selectedValueAsNumber = parseInt(e.target.value);
          console.log('VALORRR' + selectedValueAsNumber)
          setId_MateriaSeleccionada(selectedValueAsNumber)
        }}
      >
        <option value=""> </option>

        {materias.length >= 1 ? (
          materias.map((materia, index) => (
            <option
              value={materia.Id_Grupo}
              className={"opcion-" + index}
              key={index}
            >
             {materia.Materia}  {materia.Hora_Inicio} - {materia.Hora_Final}
            </option>
          ))
        ) : (
          <option>No existen horarios</option>
        )}
      </select>

      <div className="reporteContainer mt-2 p-2">
        <div className="reporteInfo mt-2">
          {docente.length > 0 && (
            <p  >
              <span className="text-dark">Profesor: </span>{" "}
              <span className="border-bottom border-dark">
                {docente[0].Nombre} {docente[0].AP_PATERNO}{" "}
                {docente[0].AP_MATERNO}
              </span>{" "}
            </p>
          )}
          <p >
            Materia: {materiaSeleccionada.length > 0 ? (
              <span className="border-bottom border-dark">
                {materiaSeleccionada[0].Materia} 
              </span>
          ): (<span className="text-danger">Selecciona una materia</span>)}
          </p>
          
        </div>
        {/* Mostrar lista de alumnoss */}
        <hr />
        <div>

        <div className="table-responsive">

<table className="table  table-bordered">
  <thead className="" style={{backgroundColor:'#A9A0A0'}}>
    <tr className=" text-white">
      <th scope="col">No Control</th>
      <th scope="col">Apellido paterno</th>
      <th scope="col">Apellido Materno</th>
      <th scope="col">Nombre</th>
      <th scope="col">Calificaciones</th>
      <th scope="col">Modificar</th>

     
    </tr>
  </thead>
  <tbody>
  {
          alumnosCargados.length>0 ? (
            alumnosCargados.map((alumno, index)=>(
              <tr>
                <td>{alumno.NControl} </td>
                <td>{alumno.Ap_Paterno} </td>
                <td>{alumno.Ap_Materno}</td>
                <td>{alumno.Nombre}</td>
                <td><input disabled    type="number" className={`mt-3 form-control  fila-${index} `} onChange={(e) => onHandleCalificacion(e)} id={'calificacionInput-'+index} defaultValue={alumno.Calificacion}/></td>
                <td  className={`btn-${index}`}><button className={`btn btn-warning modificarButton btn-${index} id-${index}`}  onClick={() => {
                  modificarCalificacion(alumno.NControl, index)
                }}>Modificar</button></td>
              </tr>
            ))
          ):(<p>No existe alumnos inscritos</p>)
        }
  </tbody>
</table>
<NavLink
                className={`btn btn-warning  btnPDF ${materiaSeleccionada.length === 0 ? 'disabled' : 'enable'}`}
              
                to={{
                  pathname: 'reporteCalificacionesPDF',
                  search: '?id='+id

                }}
              >
                Ver calificaciones
              </NavLink>
</div>
        
        </div>
      </div>
     
    </div>
  );
};
