import React from 'react'
import { useState } from 'react';
export const AdministrarAula = () => {
    //------HOOKS
    const [aula, setAula] = useState([])

    //Handlers


    

  return (

    <div>
        <h1>Modificación de Aula</h1>
        <hr />

        {/*Mostraremos la información del docente en un formulario */}
        {docente.map((doc) => {
        return (
          <form action="" className="mt-4" onSubmit={(e)=>e.preventDefault()}>
            {/*Id de la materia */}
            <label htmlFor="" className="form-label">
              Id materia
            </label>
            <input
              type="number"
              name="id"
              id="id"
              placeholder={doc.Id_Docente}
              defaultValue = {doc.Id_Docente}
              className="form-control disabled"

              disabled={true}
            />
            {/*Nombre de la materia. */}
            <label htmlFor="" className="form-label">
              Nombre 
            </label>
            <input
              type="text"
              name="materia"
              id="materia"
              className="form-control"
              defaultValue = {doc.Nombre}
              onChange= {(e)=>onHandleNombre(e)}
              placeholder={doc.Nombre}
            />
            {/*Profesor que imparte la materia */}
            <label htmlFor="" className="form-label">
              Apellido paterno
            </label>
            <input
              type="text"
              name="profesor"
              id="profesor"
              className="form-control"
              defaultValue = {doc.AP_PATERNO}
              onChange= {(e)=>onHandleAp_Paterno(e)}

              placeholder={
               doc.AP_PATERNO
              }
             
            />
            {/*Hora de la materia */}
            <label htmlFor="" className="form-label">
              Apellido materno
            </label>
            <input
              type="text"
              name="hora"
              id="hora"
              className="form-control"
              defaultValue = {doc.AP_MATERNO}

              placeholder={doc.AP_MATERNO}

              onChange= {(e)=>onHandleAp_Materno(e)}
              

            />
            {/*Aula donde se imparte la materia */}
            
            <button
              className="btn btn-danger m-2"
              onClick={() => guardarCambios()}
            >
              Cancelar
            </button>
            <button className="btn btn-success m-2"
              onClick={() => guardarDatos(doc.ID_Docente, nombre, AP_PATERNO, AP_MATERNO)}
            
            >Confirmar</button>
          </form>
        );
      })}
    </div>
  )
}
