import { Link, NavLink, useNavigate } from "react-router-dom";
//import { InicioPage } from "../../pages/InicioPage";

export const NavbarProfesor = () => {
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
            to="reportes"
          >
            Reportes
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="calificaciones"
          >
            Calificaciones
          </NavLink>
          
          
          

         
        </div>
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
