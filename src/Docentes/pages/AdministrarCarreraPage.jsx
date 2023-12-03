import React from 'react'
import { useState,useEffect } from 'react'
import { validarCampos } from './validarCampos'
import { Link, NavLink, useNavigate } from "react-router-dom";

export const AdministrarCarreraPage = () => {

    //----------HOOKS
    const [aulas, setAulas] = useState([])
    const [id_carrera, setId_Carrera] = useState()
    const [carreras, setCarreras] = useState([]);
    const [materias, setMaterias] = useState([])
    const [alumnos, setAlumnos] = useState([])
    let inputId;
    //---------HANDLERS
    const onHandleIdAula = (e) =>{
        //Capturamos el id que ingrese el usuario
        setId_Carrera(e.target.value);
    }

    //-----FUNCTIONS
    const searchAula = () =>{
      if(validarCampos(inputId)){
        const url = 'https://rest-api-production-a5bf.up.railway.app/getCarrera/' + id_carrera;
        fetch(url)
        .then(res => res.json())
        .then(data => setCarreras(data))
      }
    }

    const redirecionamientoPage = (id_aula) =>{
      console.log('Me diste click')
      window.location.href = 'modificarAula/?id='+id_aula
      
    }

    const eliminarCarrera = async (id_carrera)=>{

        let tieneHijos = false;
    
        //vamos a recorrer las materias asignadas profesor en busca del id del docente
        materias.forEach(materia=>{
          //vamos a buscar en cada materia
          if(materia.Id_Carrera==id_carrera){
            tieneHijos = true;
          }
        })
        //vamos a recorrer las materias asignadas profesor en busca del id del docente
        alumnos.forEach(alumno=>{
          //vamos a buscar en cada materia
          if(alumno.Id_Carrera==id_carrera){
            tieneHijos = true;
          }
        })
    
        //si no tiene hijos, eliminamos el registro
        if(!tieneHijos){
          
          //eliminamos
          if(confirm('Esta seguro?'))
          await fetch('https://rest-api-production-a5bf.up.railway.app/deleteCarrera/'+id_carrera, { method: 'DELETE' })
          .then(response => {
        if (response.ok) {
          console.log('Registro eliminado exitosamente');
        } else {
          console.error('Ocurrió un error al eliminar el registro');
        }
      })
      .catch(error => console.error(error));
    
      window.location.reload()
        }
        else{
          confirm('No se puede eliminar, ya que tiene hijos')
        }
    
      }
  useEffect(() => {
    inputId = document.querySelector('#id_aula')
   

      //get materia
      fetch("https://rest-api-production-a5bf.up.railway.app/getAllMaterias")
      .then((res) => res.json())
      .then((data) => setMaterias(data));
      //get all alumnos
      fetch("https://rest-api-production-a5bf.up.railway.app/getAllAlumnos")
      .then((res) => res.json())
      .then((data) => setAlumnos(data));

   }, [])
   useEffect(() => {
     inputId = document.querySelector('#id_aula')
    }, [id_carrera])

    
  return (
    <div>
    <h1>Administrar Aulas</h1>
    <hr />
    <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
      <input
        type="number"
        placeholder="Buscar por id aula"
        className="form-control"
        id='id_aula'
        onChange={(e) => onHandleIdAula(e)}
      />
      <button
        className="btn btn-primary mt-2"
        onClick={() => searchAula()}
      >
        Buscar
      </button>
    </form>
    <hr />
    <h3>Resultados</h3>
    <hr />
    <div className="table-responsive">

    <table className="table  table-bordered">
      <thead className="bg-body-secondary">
        <tr className="bg-body-dark">
          <th scope="col">Id carrera</th>
          <th scope="col">Nombre</th>
          <th>Modificar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {carreras.length >= 1 ? (
          carreras.map((carrera) => (
            <tr key={carrera}>
              <td>{carrera.Id_Carrera}</td>
              <td>{carrera.Nombre}</td>
              <td>
              <NavLink
                className={'btn btn-warning'}
                
                
                to={{
                  pathname: 'administrarCarrera',
                  search: '?id='+carrera.Id_Carrera
                }}
              >
                Modificar
              </NavLink>
                {/* <a onClick={()=> redirecionamientoPage(aula.Id_Aula)} className="btn btn-warning">
                  Modificar
                </a> xd*/}
              </td>
              <td>
                <a href="" className="btn btn-danger" onClick={()=>eliminarCarrera(carrera.Id_Carrera)}>
                  Eliminar
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td><h1>No existe esa carrera</h1></td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  </div>
  )
}
