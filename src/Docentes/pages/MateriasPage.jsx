import { Link, NavLink, useNavigate } from "react-router-dom";

export const MateriasPage = () => {
  
  return (
    <div>
      <h1>Materias</h1>
      <hr />
      <div className="documentosDiv row">
        <div className="card m-3 col-md-5 shadow">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="https://img.freepik.com/iconos-gratis/agregar_318-466615.jpg?w=2000"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Agregar materia</h5>
                <p className="card-text">
                 Puedes agregar materias disponibles para los alumnos
                </p>

                <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'agregarMateria'
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
                src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Administrar materias</h5>
                <p className="card-text">
                 Puedes modificar o eliminar las materias
                </p>
                <br />
                <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'administrarMaterias'
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
                src="https://cdn-icons-png.flaticon.com/512/747/747062.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Asignar docente a  materia</h5>
                <p className="card-text">
                 Puedes asignarle un docente a una materia
                </p>

                <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'agregarDocenteMateria'
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

  );
};
