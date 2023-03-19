import { useState, useEffect } from "react";
//Hook de materias page
export const MateriasPage = () => {
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const sem = params.get("semestre");
  console.log(sem);
  //-----Hooks
  const [materias, setMaterias] = useState([]);
  //const [semestre, setSemestre] = useState();
  //URL
  const URL = "http://localhost:3030/getMaterias/" + sem;
  //Peticion
  const consultarMaterias = async () => {
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMaterias(data);
      });
  };

  useEffect(() => {
    consultarMaterias();
  }, []);

  return (
    <div className="mt-5">
    <div className="table-responsive">

      <table className="table table-bordered text-center">
        <thead>
          <tr className="bg-body-secondary">
            <th scope="col">Id materia</th>
            <th scope="col">Materia</th>
            <th scope="col">Cupo</th>
            <th scope="col">Créditos</th>
            <th scope="col">Semestre</th>

            
          </tr>
        </thead>
        <tbody>
          {materias.map((materia, index) => {
            return (
              //Pintamos las materias en el componente
              <tr key={index}>
                <td>{materia.ID_MATERIA}</td>
                <td>{materia.MATERIA}</td>
                <td>{materia.CUPO}</td>
                <td>{materia.CREDITOS}</td>
                <td>{materia.SEMESTRE}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <a className="btn btn-warning" href="materiasdisponibles">Regresar</a>
    </div>
  );
};
