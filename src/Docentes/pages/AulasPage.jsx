import { Link, NavLink, useNavigate } from "react-router-dom";

export const AulasPage = () => {
  return (
    <div>
        <h1>Aulas</h1>
        <hr />
        <div className='documentosDiv row'>
      <div className="card m-3 col-md-5 shadow" >
  <div className="row g-0">
  <div className="col-md-4">
    <img src="https://cdn-icons-png.flaticon.com/512/3606/3606117.png" className="img-fluid rounded-start" alt="..."/>
  </div>
  <div className="col-md-8">
    <div className="card-body">
      <h5 className="card-title">Cargar aulas</h5>
      <p className="card-text">Puedes dar de alta un aula</p>
      
      <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'agregarAula'
                }}
              >
                Acceder
              </NavLink>
    </div>
  </div>
  </div>
  </div>
  <div className="card m-3 col-md-5 shadow" >
  <div className="row g-0">
  <div className="col-md-4">
    <img src="https://img.icons8.com/color/512/google-classroom.png" className="img-fluid rounded-start" alt="..."/>
  </div>
  <div className="col-md-8">
    <div className="card-body">
      <h5 className="card-title">Administrar aulas</h5>
      <p className="card-text">Puedes adiministrar aulas</p>
      <br/>
      <NavLink
                className={'btn btn-primary'}
                to={{
                  pathname: 'administrarAula'
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
