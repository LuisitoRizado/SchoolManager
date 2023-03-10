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

                <a href="agregarMateria" className="btn btn-primary">
                  Acceder
                </a>
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
                <a href="administrarMaterias" className="btn btn-primary">
                  Acceder
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

     
        </div>

  );
};
