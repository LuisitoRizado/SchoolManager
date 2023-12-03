import React from 'react'
import { useState, useEffect } from 'react'
import { validarNumeros, validarCampos } from './validarCampos';
export const CalificacionAlumnoPage = () => {
    const querystring = window.location.search;

    // usando el querystring, creamos un objeto del tipo URLSearchParams
    const params = new URLSearchParams(querystring);
    const id = params.get('id')

    console.log(id);
    const [carga, setCarga] = useState([])
    const [calificacion, setCalificacion] = useState([])

    useEffect(() => {
      fetch('https://rest-api-production-a5bf.up.railway.app/getCarga/'+id)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setCarga(data)
    })

    }, [])
    
    const onHandleCalificacion = (e) =>{
        setCalificacion(e.target.value)
    }
    const modificarCalificacion = (index) =>{
      
      alert('Me diste click')
      let inputCalificacion
      inputCalificacion = document.getElementById('fila-'+index)
      inputCalificacion.disabled;
    }
  return (
    <div>
        <h1>Calificación Alumno </h1>
        <hr />
        <div>
        <div className="table-responsive">

            <table className="table  table-bordered table-responsive table-container">
            <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Materia</th>
            <th scope="col">Alumno</th>
            <th scope="col">Horario</th>
            <th scope="col">Aula</th>
            <th scope="col">Calificación</th>
            <th scope="col"></th>


          </tr>
        </thead>
        <tbody>
            {
               carga.length > 0 ? (
                carga.map((materia,index)=>(
                    <tr>
                        <td>{materia.Nombre_Materia}</td>
                        <td>{materia.Nombre_Alumno} {materia.Ap_Paterno} {materia.Ap_Materno}</td>
                        <td>{materia.Hora_Inicio} - {materia.Hora_Final}</td>
                        <td>{materia.Nombre_Aula}</td>
                        <td><input onKeyPress={validarNumeros} type="text" name="" id={`fila-`+index} defaultValue={materia.Calificacion ? materia.Calificacion : 'No asignada' }  className={' form-control fila-'+ index} disabled onChange={(e)=>onHandleCalificacion(e)}/></td>
                        <td className={'btn-'+index}><button className={'btn btn-warning modificarButton '} id={`btn-`+index} onClick={()=>modificarCalificacion(index)}>Editar</button></td>
                    </tr>
                ))
               ) : (<tr><td>No hay materias</td></tr>)
            }
            
        </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}
