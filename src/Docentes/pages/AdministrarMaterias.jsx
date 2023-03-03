import { useState } from "react";
export const AdministrarMaterias = () => {
  //Hooks
  const [materia, setMateria] = useState([]);
  const [materias, setMaterias] = useState([]);
  //Obtener el valor que el usuario teclea.
  const onHandleNControl = (e) => {
    setMateria(e.target.value);
  };

  //Peticion fetch

  const fetchUser = async () => {
    const URL = "http://localhost:3030/getGrupos/" + materia.trim();
    //Hacemos la peticion
    await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
        console.log(data);
        setMaterias(data);
      })
      .catch((err) => console.log(err));
  };

  //Funcion para redireccionar
  const redireccionarAModificacion = (id) => {
    window.location.href = "modificarMateria/?id=" + id;
  };
  // HOOKS
  const mostrarMaterias = () => {
    fetchUser();
  };
  return (
    <div className="mt-4">
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Buscar por nombre de materia"
          className="form-control"
          onChange={(e) => onHandleNControl(e)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => mostrarMaterias()}
        >
          Buscar
        </button>
      </form>
      <hr />
      <h3>Resultados</h3>
      <hr />
      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id_Materia</th>
            <th scope="col">Materia</th>
            <th scope="col">Profesor</th>
            <th scope="col">Hora</th>
            <th scope="col">Aula</th>
            <th scope="col">Modificar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {materias.length >= 1 ? (
            materias.map((materia) => (
              <tr key={materia}>
                <td>{materia.ID_MATERIA}</td>
                <td>{materia.MATERIA}</td>
                <td>
                  {materia.NOMBRE} {materia.AP_PATERNO} {materia.AP_MATERNO}
                </td>
                <td>{materia.HORA_FINAL_LUNES}</td>
                <td>{materia.HORA_INICIO_LUNES}</td>

                <td>
                  <a
                    className="btn btn-warning"
                    onClick={() => redireccionarAModificacion(materia.ID_MATERIA)}
                  >
                    Modificar
                  </a>
                </td>
                <td>
                  <button className="btn btn-danger">ELiminar</button>
                </td>
              </tr>
            ))
          ) : (
            <h3 className="m-1 text-danger">No se encontro ningúna materia</h3>
          )}
        </tbody>
      </table>
    </div>
  );
};
