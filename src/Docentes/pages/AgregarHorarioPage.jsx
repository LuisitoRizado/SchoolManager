import React from 'react'
import { useState, useEffect } from 'react'
import { validarCampos } from './validarCampos'
export const AgregarHorarioPage = () => {
    //-------------HOOKS
    const [id_horario, setId_horario] = useState()
    const [hora_inicio, setHora_inicio] = useState()
    const [hora_fin, setHora_fin] = useState()
    let inputHorario, inputInicio, inputFin;

    //---------------HANDLERS
    const onHandleId = (e) =>{
        setId_horario(e.target.value);
    }
    const onHandleHora_Inicio = (e) =>{
        setHora_inicio(e.target.value);
    }
    const onHandleHora_Fin = (e) =>{
        setHora_fin(e.target.value);
    }

    
    //---------------FUNCTIONS
    const addHorario = () =>{
        //En esta funcion vamos a aagregar al horario que se seleciones

        const url = 'http://localhost:3030/addHorario';
        if(validarCampos(inputInicio, inputHorario, inputFin)){
        fetch(url, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "ID_HORARIO": id_horario,
              "HORA_INICIO_LUNES": hora_inicio,
              "HORA_FINAL_LUNES": hora_fin,
            }),
          })
          //Recargamos la pagina
          window.confirm("Horario agregada con exito")
          window.location.reload();
        }
        
    }
    useEffect(() => {
      inputHorario = document.querySelector('#id_horario')
      inputInicio = document.querySelector('#horaInicio')
      inputFin = document.querySelector('#horaFin')
    }, [])
    
    useEffect(() => {
      inputHorario = document.querySelector('#id_horario')
      inputInicio = document.querySelector('#horaInicio')
      inputFin = document.querySelector('#horaFin')
    }, [id_horario, hora_inicio, hora_fin])
  return (
    <div>
    <h1>Agregar Horario </h1>
    <hr />
    <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="id_aula" className="form-label">
        Id Horario
      </label>
      <input
        type="number"
        name="id_horario"
        id='id_horario'
        className="form-control"
        onChange={(event) => onHandleId(event)}
      />

      <label htmlFor="aula" className="form-label mt-3">
        Hora inicio 
      </label>

      <input
        type="text"
        name="horaInicio"
        id='horaInicio'
        className="form-control"
        onChange={(event) => onHandleHora_Inicio(event)}
      />
      <label htmlFor="edificio" className="form-label">
        Hora fin
      </label>

      <input
        type="text"
        name="horaFin"
        id='horaFin'
        className="form-control"
        onChange={(event) => onHandleHora_Fin(event)}
      />
     

      <button className="btn btn-danger">Cancelar</button>
      <button
        className="btn btn-success m-4"
        //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
        onClick={() =>
          addHorario()
        }
      >
        Agregar!
      </button>
    </form>
  </div>
  )
}
