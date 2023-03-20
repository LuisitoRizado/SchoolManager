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
  let inputProfesor, inputHora, inputAula;
  //FUNCIONES PARA LA FUNCIONALIDAD DE LA PAGINA ESTAS PUEDEN SER IMPORTADAS O NO
  const fetchUser = async () => {
    const URL = "https://rest-api-production-a5bf.up.railway.app/getMateria/" + id;
    //Hacemos la peticion
    await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
        
        console.log(data.slice(0,1));
        setMateria(data.slice(0,1));
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
    inputProfesor = document.querySelector('#profesor')
    inputHora = document.querySelector('#hora')
    inputAula = document.querySelector('#aula')
  }, []);

  useEffect(() => {
    inputProfesor = document.querySelector('#profesor')
    inputHora = document.querySelector('#hora')
    inputAula = document.querySelector('#aula')
  }, [profesor, hora,aula]);
  

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
              placeholder={mat.Id_Materia}
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
              placeholder={mat.Materia}
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
                mat.Nombre + " " + mat.Ap_Paterno + " " + mat.Ap_Materno
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
              placeholder={mat.Hora_Inicio_Lunes}
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
              placeholder={mat.Hora_Final_Lunes}
              onChange={(e)=>onHandleAula(e)}

            />
            <button
              className="btn btn-danger m-2"
              onClick={() => guardarCambios()}
            >
              Cancela
            </button>
            <button className="btn btn-success m-2">Confirmar</button>
          </form>
        );
      })}
    </div>
  );
};
