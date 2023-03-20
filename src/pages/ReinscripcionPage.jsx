import { Link, NavLink, useNavigate } from "react-router-dom";

export const ReinscripcionPage = () => {
  return (
    <div>
      <h1>Reinscripción</h1>
    <hr/>
    <div className='documentosDiv row'>
    <div className="card m-3 col-md-5 shadow" >
<div className="row g-0">
<div className="col-md-4">
  <img src="https://cdn-icons-png.flaticon.com/512/3778/3778120.png" className="img-fluid rounded-start" alt="..."/>
</div>
<div className="col-md-8">
  <div className="card-body">
    <h5 className="card-title">Datos de reinscripción</h5>
    <p className="card-text">Accede a los datos de tu reinscripción.</p>
    
    <NavLink
                className={({ isActive }) =>
                  `btn btn-primary ${isActive ? "active" : ""}`
                }
                to="datosreinscripcion"
              >
                Datos
              </NavLink>
  </div>
</div>
</div>
</div>
<div className="card m-3 col-md-5 shadow" >
<div className="row g-0">
<div className="col-md-4">
  <img src="https://cdn-icons-png.flaticon.com/512/3557/3557635.png" className="img-fluid rounded-start" alt="..."/>
</div>
<div className="col-md-8">
  <div className="card-body">
    <h5 className="card-title">Grupos disponibles</h5>
    <p className="card-text">Comprueba los grupos disponibles para este semestre.</p>
    <br/>
    <NavLink
                className={({ isActive }) =>
                  `btn btn-primary ${isActive ? "active" : ""}`
                }
                to="materiasdisponibles"
              >
                Acceder
              </NavLink>
  </div>
</div>
</div>
</div>
    </div>
    
    <div className='documentosDiv row'>
    <div className="card m-3 col-md-5 shadow">
<div className="row g-0">
<div className="col-md-4">
  <img src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" className="img-fluid rounded-start" alt="..."/>
</div>
<div className="col-md-8">
  <div className="card-body">
    <h5 className="card-title">Materias de Verano</h5>
    <p className="card-text">Materias disponibles para cursar en verano.</p>
    
    <a href="/" className="btn btn-danger disabled">No disponible</a>
  </div>
</div>
</div>
</div>
<div className="card m-3 col-md-5 shadow">
<div className="row g-0">
<div className="col-md-4">
  <img src="https://cdn-icons-png.flaticon.com/512/167/167756.png" className="img-fluid rounded-start" alt="..."/>
</div>
<div className="col-md-8">
  <div className="card-body">
    <h5 className="card-title">Selección de materias</h5>
    <p className="card-text">Selecciona las materias para tu próximo semestre</p>
    <br/>
    <NavLink
                className={({ isActive }) =>
                  `btn btn-danger ${isActive ? "active" : ""}`
                }
                to="seleccionmaterias"
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
