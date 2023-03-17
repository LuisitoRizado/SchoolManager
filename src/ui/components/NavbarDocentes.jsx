import { Link, NavLink, useNavigate } from "react-router-dom";
import { InicioPage } from "../../pages/InicioPage";

export const NavbarDocentes = () => {
  //Custom hook de react router para la navegación
  const navigate = useNavigate();

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
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
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
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          {/* <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
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
