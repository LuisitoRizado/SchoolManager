
export const AlumnosPage = () => {
    return (
      <div>
        <h1>Alumnos</h1>
      <hr/>
      <div className='documentosDiv row'>
      <div className="card m-3 col-md-5 shadow" >
  <div className="row g-0">
  <div className="col-md-4">
    <img src="https://cdn-icons-png.flaticon.com/512/1177/1177577.png" className="img-fluid rounded-start" alt="..."/>
  </div>
  <div className="col-md-8">
    <div className="card-body">
      <h5 className="card-title">Dar de alta alumno</h5>
      <p className="card-text">Puedes dar de alta un alumno</p>
      
      <a href="agregarAlumno" className="btn btn-primary">Acceder</a>
    </div>
  </div>
  </div>
  </div>
  <div className="card m-3 col-md-5 shadow" >
  <div className="row g-0">
  <div className="col-md-4">
    <img src="https://cdn-icons-png.flaticon.com/512/2444/2444442.png" className="img-fluid rounded-start" alt="..."/>
  </div>
  <div className="col-md-8">
    <div className="card-body">
      <h5 className="card-title">Dar de baja definitiva alumno</h5>
      <p className="card-text">Puedes dar de baja un alumno</p>
      <br/>
      <a href="eliminarAlumno" className="btn btn-primary">Acceder</a>
    </div>
  </div>
  </div>
  </div>
      </div>
      
     
          
      </div>
    )
  }
  