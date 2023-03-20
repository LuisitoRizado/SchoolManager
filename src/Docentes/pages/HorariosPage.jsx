import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";

export const HorariosPage = () => {
  return (
    <div>
    <h1>Horarios</h1>
    <hr />
    <div className="documentosDiv row">
      <div className="card m-3 col-md-5 shadow">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5807/5807386.png"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Agregar Horario</h5>
              <p className="card-text">
               Puedes agregar horarios disponibles para las materias
              </p>

              <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'agregarHorario'
                }}
              >
                Acceder
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="card m-3 col-md-5 shadow">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="data:image/png;base64,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"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Administrar horarios</h5>
              <p className="card-text">
               Puedes modificar o eliminar los horarios disponibles
              </p>
              <br />
              <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'administrarHorarios'
                }}
              >
                Acceder
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>

   
      </div>
  )
}
