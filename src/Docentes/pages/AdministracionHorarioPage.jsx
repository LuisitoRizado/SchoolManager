import React from 'react'
import { useState, useEffect } from 'react';
import { validarCampos } from './validarCampos';
import { Link, NavLink, useNavigate } from "react-router-dom";

let inputId;

export const AdministracionHorarioPage = () => {
    const [id_horario, setId_horario] = useState();
    const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([])

    //---------HANDLERS
    const onHandleHorario = (e) => {
      setId_horario(e.target.value);
    };
  
    //Metodo para realizar peticion
    const mostrarHorarios = async () => {
      const url = "https://rest-api-production-a5bf.up.railway.app/getHorario/" + id_horario;

      if(validarCampos(inputId)){
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
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
        if (materia.Id_Horario === id_horario) {
          tieneHijos = true;
        }
      });
  
      if (!tieneHijos) {
        //borramos la materia
        fetch("https://rest-api-production-a5bf.up.railway.app/deleteHorario/" + id_horario, { method: "DELETE" })
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
    fetch('https://rest-api-production-a5bf.up.railway.app/getAllMaterias')
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
    <div className="table-responsive">

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
                  <NavLink
                className={'btn btn-warning'}
                
                
                to={{
                  pathname: 'modificarHorario',
                  search: '?id='+id_horario
                }}
              >
                Modificar
              </NavLink>
                    {/* <a onClick={()=> redirecionamientoPage()} className="btn btn-warning">
                      Modificar
                    </a> */}
                  </td>
                  <td>
                    <a href="" className="btn btn-danger" onClick={()=>eliminarHorario(horario.Id_Horario)}>
                      Eliminar
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td><p> No existe ese Horario</p></td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
  )
}
