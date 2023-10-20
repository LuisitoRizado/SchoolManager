import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";

export const CarrerasPage = () => {
  return (
    <div>
        <h1>Carrerras</h1>
        <hr />
        <div className="documentosDiv row">

        <div className="card m-3 col-md-5 shadow">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2502/2502481.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Agregar carrera</h5>
                <p className="card-text">
                 Puedes agregarrrrrrrrrrrr carreras disponibles para los alumnos
                </p>

                <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'agregarCarrera'
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSVR84SOd9Sjn6ZvvVkUH3MkNUWHyrXBIlA&usqp=CAU"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Buscar carrera</h5>
                <p className="card-text">
                 Puedes modificar carreras 
                </p>

                <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'modificarCarrera'
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
