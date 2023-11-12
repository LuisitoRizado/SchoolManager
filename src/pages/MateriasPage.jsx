import { useState, useEffect } from "react";

export const MateriasPage = () => {
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const sem = params.get("semestre");
  let ncontrol;
  ncontrol = parseInt(window.localStorage.getItem('user'))

  const [materias, setMaterias] = useState([]);
  const [user, setUser] = useState([]);

  const consultarMaterias = async () => {
    const URL = "https://rest-api-production-a5bf.up.railway.app/getMaterias/" + sem + '/' + user[0].Id_Carrera;

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMaterias(data);
      });
  };

  useEffect(() => {
    fetch('https://rest-api-production-a5bf.up.railway.app/getAlumno/' + ncontrol)
      .then(res => res.json())
      .then((data) => {
        setUser(data)
      })
  }, []);

  useEffect(() => {
    if (user.length > 0) {
      consultarMaterias();
    }
  }, [user]);

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
            {materias.length>=1 ?  (materias.map((materia, index) => {
              return (
                <tr key={index}>
                  <td>{materia.Id_Materia}</td>
                  <td>{materia.Materia}</td>
                  <td>{materia.Creditos}</td>
                  <td>{materia.Semestre}</td>
                </tr>
              );
            })):(<p>No existen materias</p>)}
          </tbody>
        </table>
      </div>
      <a className="btn btn-warning" href="materiasdisponibles">Regresar</a>
    </div>
  );
};
