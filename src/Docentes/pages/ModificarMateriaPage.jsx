import { useState, useEffect } from "react";

export const ModificarMateriaPage = () => {
  //Leemos el query params de la url
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const id = params.get("id");
  console.log(id);
  //HOOKS DE NUESTRA APLICACION
  const [materia, setMateria] = useState([]);
  const [profesor, setProfesor] = useState();
  const [hora, setHora] = useState();
  const [aula, setAula] = useState();

  //FUNCIONES PARA LA FUNCIONALIDAD DE LA PAGINA ESTAS PUEDEN SER IMPORTADAS O NO
  const fetchUser = async () => {
    const URL = "http://localhost:3030/getMateria/" + id;
    //Hacemos la peticion
    await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
        console.log(data);
        setMateria(data);
      })
      .catch((err) => console.log(err));
  };

  //Funciones para los datos que modifique
  const onHandleProfesor = (e) => {
    setProfesor(e.target.value);
  };
  const onHandleHora = (e) => {
    setHora(e.target.value);
  };
  const onHandleAula = (e) => {
    setAula(e.target.value);
  };
  //Funciones para los botones
  const guardarCambios = () => {
    //Vamos a actualizar la materia con los datos que se cambiaron
    setMateria(...materia, profesor,hora,aula)
    console.log('NUEVA MATERIA: ' + materia);
  };

  //use Effect
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Modificación de materias</h1>
      <hr />
      {materia.map((mat) => {
        return (
          <form action="" className="mt-4" onSubmit={(e)=>e.preventDefault()}>
            {/*Id de la materia */}
            <label htmlFor="" className="form-label">
              Id materia
            </label>
            <input
              type="text"
              name="id"
              id="id"
              placeholder={mat.ID_MATERIA}
              className="form-control disabled"
              disabled={true}
            />
            {/*Nombre de la materia. */}
            <label htmlFor="" className="form-label">
              Nombre materia
            </label>
            <input
              type="text"
              name="materia"
              id="materia"
              className="form-control"
              placeholder={mat.MATERIA}
              disabled={true}
            />
            {/*Profesor que imparte la materia */}
            <label htmlFor="" className="form-label">
              Profesor
            </label>
            <input
              type="text"
              name="profesor"
              id="profesor"
              className="form-control"
              placeholder={
                mat.NOMBRE + " " + mat.AP_PATERNO + " " + mat.AP_MATERNO
              }
              onChange={(e)=>onHandleProfesor(e)}
            />
            {/*Hora de la materia */}
            <label htmlFor="" className="form-label">
              Hora
            </label>
            <input
              type="text"
              name="hora"
              id="hora"
              className="form-control"
              placeholder={mat.HORA_FINAL_LUNES}
              onChange={(e)=>onHandleHora(e)}

            />
            {/*Aula donde se imparte la materia */}
            <label htmlFor="" className="form-label">
              Aula
            </label>
            <input
              type="text"
              name="aula"
              id="aula"
              className="form-control"
              placeholder={mat.HORA_INICIO_LUNES}
              onChange={(e)=>onHandleAula(e)}

            />
            <button
              className="btn btn-danger m-2"
              onClick={() => guardarCambios()}
            >
              Cancelar
            </button>
            <button className="btn btn-success m-2">Confirmar</button>
          </form>
        );
      })}
    </div>
  );
};
