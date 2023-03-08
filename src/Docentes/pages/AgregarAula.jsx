import React from 'react'
import { useState } from 'react'
import { json } from 'react-router-dom'
export const AgregarAula = () => {

    //HOOKS
    const [id_aula, setId_aula] = useState()
    const [nombreAula, setNombreAula] = useState()
    const [edificio, setEdificio] = useState()
    const [capacidad, setCapacidad] = useState()

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
        className="form-control"
        onChange={(event) => onHandleId(event)}
      />

      <label htmlFor="aula" className="form-label mt-3">
        Nombre Aula
      </label>

      <input
        type="text"
        name="aula"
        className="form-control"
        onChange={(event) => onHandleAula(event)}
      />
      <label htmlFor="edificio" className="form-label">
        Edificio
      </label>

      <input
        type="text"
        name="edificio"
        className="form-control"
        onChange={(event) => onHandleEdificio(event)}
      />
      <label htmlFor="capacidad" className="form-label">
        Capacidad
      </label>

      <input
        type="number"
        name="capacidad"
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
