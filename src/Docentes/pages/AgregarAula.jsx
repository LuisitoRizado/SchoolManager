import React from 'react'
import { useState, useEffect } from 'react'
import { json } from 'react-router-dom'
import { validarCampos } from './validarCampos'
export const AgregarAula = () => {

    //HOOKS
    const [id_aula, setId_aula] = useState()
    const [nombreAula, setNombreAula] = useState()
    const [edificio, setEdificio] = useState()
    const [capacidad, setCapacidad] = useState()
    let inputId;
    let inputAula;
    let inputEdificio;
    let inputCapacidad;
    //handlers
    const onHandleId = (e)=>{
        setId_aula(e.target.value);
    }
    const onHandleAula = (e)=>{
        setNombreAula(e.target.value);
    }
    const onHandleEdificio = (e)=>{
        setEdificio(e.target.value);
    }
    const onHandleCupo = (e)=>{
        setCapacidad(e.target.value);
    }

    //Functions
    const addAula = () =>{
        //Damos fetcha  nuestra api
        if(validarCampos(inputAula, inputId, inputEdificio, inputCapacidad)){
        const url = 'http://localhost:3030/addAula';
        fetch(url, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "ID_AULA": id_aula,
              "NOMBRE": nombreAula,
              "EDIFICIO": edificio,
              "CAPACIDAD": capacidad,
            }),
          })
          //Recargamos la pagina
          window.prompt("Aula agregada con exito")
          window.location.reload();
        }
    }

    useEffect(() => {
    inputId = document.querySelector('#id_aula')
    inputAula = document.querySelector('#aula')
    inputEdificio = document.querySelector('#edificio')
    inputCapacidad = document.querySelector('#capacidad')
    }, [])
    useEffect(() => {
      inputId = document.querySelector('#id_aula')
      inputAula = document.querySelector('#aula')
      inputEdificio = document.querySelector('#edificio')
      inputCapacidad = document.querySelector('#capacidad')
    }, [id_aula, nombreAula, edificio, capacidad])
    
    
  return (
    <div>
    <h1>Agregar Aula </h1>
    <hr />
    <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="id_aula" className="form-label">
        Id Aula
      </label>
      <input
        type="number"
        name="id_aula"
        id='id_aula'
        className="form-control"
        onChange={(event) => onHandleId(event)}
      />

      <label htmlFor="aula" className="form-label mt-3">
        Nombre Aula
      </label>

      <input
        type="text"
        name="aula"
        id='aula'
        className="form-control"
        onChange={(event) => onHandleAula(event)}
      />
      <label htmlFor="edificio" className="form-label">
        Edificio
      </label>

      <input
        type="text"
        name="edificio"
        id='edificio'
        className="form-control"
        onChange={(event) => onHandleEdificio(event)}
      />
      <label htmlFor="capacidad" className="form-label">
        Capacidad
      </label>

      <input
        type="number"
        name="capacidad"
        id='capacidad'
        className="form-control"
        onChange={(event) => onHandleCupo(event)}
      />

      <button className="btn btn-danger">Cancelar</button>
      <button
        className="btn btn-success m-4"
        //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
        onClick={() =>
          addAula()
        }
      >
        Agregar!
      </button>
    </form>
  </div>
  )
}
