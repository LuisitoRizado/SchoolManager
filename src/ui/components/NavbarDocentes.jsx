import { Link, NavLink, useNavigate } from "react-router-dom";
import { InicioPage } from "../../pages/InicioPage";
import { useState,useEffect } from 'react';
 let nombre;
export const NavbarDocentes = () => {
  //Custom hook de react router para la navegación
  const navigate = useNavigate();
  const usuario =parseInt(window.localStorage.getItem('user'))
  const password =window.localStorage.getItem('password')
 
  const URL = "https://rest-api-production-a5bf.up.railway.app/getEmpleado/" + usuario + '/' + password;
  const consultarMaterias =  async () => {
    await fetch(URL)
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       nombre = data[0].Nombre
     });
 };

 useEffect(() => {
   consultarMaterias();
 }, []);


  const onLogout = () => {
    navigate("/login", {
      replace: true,
    });
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary p-2">
      <Link className="navbar-brand" to="inicio">
        <img
          src="https://ingreso.saltillo.tecnm.mx/images/its.png"
          alt=""
          width="30"
          height="24"
        />
      </Link>
      <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

      <div className="navbar-collapse collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
          {/*LINKS DE NUESTRO ROUTER */}
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="inicio"
          >
            Inicio
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="alumnos"
          >
            Alumnos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="materias"
          >
            Materias
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="docentes"
          >
            Docentes
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="aulas"
          >
            Aulas
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="horarios"
          >
            Horarios
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="carreras"
          >
            Carreras
          </NavLink>
        </div>
        <p className='text-white nav-item'> Usuario: {nombre} </p>

      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          {/* <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
          <button onClick={onLogout} className="nav-item nav-link btn">
            Cerrar Sesión
          </button>
        </ul>
      </div>
    </nav>
  );
};
