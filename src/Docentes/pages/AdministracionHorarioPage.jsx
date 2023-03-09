import React from 'react'
import { useState, useEffect } from 'react';
import { validarCampos } from './validarCampos';

export const AdministracionHorarioPage = () => {
    const [id_horario, setId_horario] = useState([]);
    const [horarios, setHorarios] = useState([]);
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
  
    const eliminarHorario = (Id_horario) =>{
      //vamos a pedir la peticion al http de delte en la base de datos
      //Nos va a pasar como parametros el numero de control del alumno
      //Ok ahora podemos hacer la peticion al servidor
      const url = 'http://localhost:3030/deleteHorario/'+Id_horario;
      
      //hacemos el fetch a la api
  
      //Primero preguntamos si esta seguo de que quiere elimnar el alumno
      if(confirm('¿Estás seguro de que quieres eliminar este horario?'))
      {
        //En caso de que diga que si , entonces, lo eliminamos
        fetch(url, { method: 'DELETE' })
        .then((res) => res.json())
        .then((data)=>console.log('Eliminado : ' + data))
  
        window.location.reload();
      }
      else{
        //De lo contrario no hacemos nada
        return;
      }
    
  
    }
    
    useEffect(() => {
      inputId = document.querySelector('#id_horario');
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
