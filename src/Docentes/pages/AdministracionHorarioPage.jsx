import React from 'react'
import { useState, useEffect } from 'react';
import { validarCampos } from './validarCampos';

export const AdministracionHorarioPage = () => {
    const [id_horario, setId_horario] = useState([]);
    const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([])

    let inputId;
    //---------HANDLERS
    const onHandleHorario = (e) => {
      setId_horario(e.target.value);
    };
  
    //Metodo para realizar peticion
    const mostrarHorarios = () => {
      if(validarCampos(inputId)){

      const url = "http://localhost:3030/getHorario/" + id_horario;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setHorarios(data);
        });
      }
    };
  
    const redirecionamientoPage = () =>{
          window.location.href = "modificarHorario/?id="+id_horario;
    }
  
    const eliminarHorario = (id_horario) =>{
      //vamos a buscar entre todas las materias si es que coincide
      let tieneHijos = false;
      console.log("clikeaste");
      materias.forEach((materia) => {
        if (materia.ID_HORARIO === id_horario) {
          tieneHijos = true;
        }
      });
  
      if (!tieneHijos) {
        //borramos la materia
        fetch("http://localhost:3030/deleteHorario/" + id_horario, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              console.log("Registro eliminado exitosamente");
            } else {
              console.error("Ocurrió un error al eliminar el registro");
            }
          })
          .catch((error) => console.error(error));
          confirm('Horario eliminada con exito')
      } else {
        confirm("No se puede eliminar, tiene hijos");
      }
  
    }
  
    
    useEffect(() => {
      inputId = document.querySelector('#id_horario');
       //traemos todas las materias
    fetch('http://localhost:3030/getAllMaterias')
    .then(res=>res.json())
    .then(data=>setMaterias(data));
    }, [])
    useEffect(() => {
      inputId = document.querySelector('#id_horario');
    }, [id_horario])
    
    
    return (
      <div>
        <h1>Administrar horarios</h1>
        <hr />
        <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Buscar por id horario"
            className="form-control"
            id='id_horario'
            onChange={(e) => onHandleHorario(e)}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={() => mostrarHorarios()}
          >
            Buscar
          </button>
        </form>
        <hr />
        <h3>Resultados</h3>
        <hr />
        <table className="table  table-bordered">
          <thead className="bg-body-secondary">
            <tr className="bg-body-dark">
              <th scope="col">Id docente</th>
              <th scope="col">Hora inicio</th>
              <th scope="col">Hora Final</th>

              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {horarios.length >= 1 ? (
              horarios.map((horario) => (
                <tr key={horario}>
                  <td>{horario.Id_Horario}</td>
                  <td>{horario.Hora_Inicio_Lunes}</td>
                  <td>{horario.Hora_Final_Lunes}</td>
                  <td>
                    <a onClick={()=> redirecionamientoPage()} className="btn btn-warning">
                      Modificar
                    </a>
                  </td>
                  <td>
                    <a href="" className="btn btn-danger" onClick={()=>eliminarHorario(horario.Id_Horario)}>
                      Eliminar
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <h1>No existe ese Docente</h1>
            )}
          </tbody>
        </table>
      </div>
  )
}
