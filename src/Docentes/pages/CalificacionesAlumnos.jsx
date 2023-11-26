import React from 'react'
import { useState, useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const CalificacionesAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [alumno, setAlumno] = useState([]);

  useEffect(() => {
    const url = "https://rest-api-production-a5bf.up.railway.app/getAllAlumnos";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAlumno(data)
      });

  }, [])

  return (
    <div>
        <h1>Calificaciones</h1>
        <hr />
        <h5>Selecciona un alumno</h5>
        <hr />
        <div className="table-responsive">
      <table className="table  table-bordered table-responsive table-container">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Numero de control</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Semestre</th>
            <th scope="col"></th>

          </tr>
        </thead>
        <tbody>
          {alumno.length >= 1 ? (
            alumno.map((alumno, index) => (
              <tr key={index}>
                <td>
                  <input
                    className={`id-${index} form-control`}
                    defaultValue={alumno.NControl}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Nombre}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Ap_Paterno}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Ap_Materno}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Semestre}
                    onKeyPress={validarNumeros}

                    disabled
                  />
                </td>
              
                <td>
                  <NavLink className='btn btn-warning' 
                  to={{
                    pathname: 'calificacionAlumno',
                    search: '?id='+alumno.NControl
                  }}
                  >
                    Asignar
                  </NavLink>
                </td>

                 
                 
              </tr>
            ))
          ) : (
            <tr>
            <td className="m-1 text-danger">
              <h3>
              No se encontro ningún alumno con ese número de control
              </h3>
            </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}
