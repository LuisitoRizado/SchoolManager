import React from 'react'
import { useState, useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
import { Link, NavLink, useNavigate } from "react-router-dom";
export const ReportesPage = () => {

  const [filteredDocentes, setFilteredDocentes] = useState([]);
   
  useEffect(() => {
    const url = "https://rest-api-production-a5bf.up.railway.app/getAllDocentes";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFilteredDocentes(data)
      });

  }, [])
  
  return (
    <div>
        <h1>Reportes</h1>
        <hr />
        <h4>Selecciona un docente</h4>
        <div className="row">
            <div className="buttonleftContainer col-md-1 d-flex justify-content-center align-items-center">
                <button className='btn btn-primary'> {'<'} </button>
            </div>
            <div className="docentesContainer col-md-10">
            {/* AQUI VA LA INFORMACIÓN DE LOS DOCENTES */}
            {
                filteredDocentes.map((docente,index)=>(
                    <div className='row border-bottom mt-1'>
                        <img src="https://img.icons8.com/color/512/teacher.png" alt=""  height={'50px'} width={'50px'} className=' col-md-1'/>
                        <p className='col-md-3'>{docente.Id_Docente}</p>
                        <p className='col-md-6'>{docente.Nombre} {docente.AP_PATERNO} {docente.AP_MATERNO}</p>
                        <div className="buttonsCotainer col-md-2">
                        <NavLink
                className={'btn btn-outline-success'}
                to={{
                  pathname: 'reporteDocente',
                  search: '?id='+docente.Id_Docente
                }}
              >
                Acceder
              </NavLink>
                        </div>
                    </div>
                ))
            }
            </div>
            <div className="buttonRightContainer col-md-1 d-flex justify-content-center align-items-center">
            <button className='btn btn-primary'> {'>'} </button>

            </div>
        </div>
    </div>
  )
}
