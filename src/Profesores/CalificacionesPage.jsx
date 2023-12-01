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
    const url = 'https://rest-api-production-a5bf.up.railway.app/updateCalificacion/'+ alumno + '/' + id_MateriaSeleccionada;
    await fetch(url, {
      method: "PUT",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      "Calificacion": 0
      }),
    });
    confirm('Aula actualizada!')
    window.location.reload();
 //}
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
      <h1>Calificaciones xddd</h1>
      <hr />
      {/* Mostrar lista de materias */}
      <label htmlFor="">Selecciona una materia</label>
      <select
        className={"form-select mySelect "}
        id="materias"
        aria-label="Default select example"
        onChange={(e) => {
          const selectedValueAsNumber = parseInt(e.target.value);
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
              {materia.Materia}
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
                <td><input type="number" className='mt-3 form-control' oonChange={(e) => onHandleCalificacion(e)} id={'calificacionInput-'+index} defaultValue={alumno.Calificacion}/></td>
                <td><button className='btn btn-warning'  onClick={async() => {
                  modificarCalificacion(alumno.Ncontrol, index)
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
