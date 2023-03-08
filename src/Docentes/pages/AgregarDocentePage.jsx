import { useState, useEffect } from "react";
import { validarCampos } from "./validarCampos";
export const AgregarDocentePage = () => {
  //objetctos
  let inputId ;
  const [id_docente, setId_docente] = useState();
  const [Nombre, setNombre] = useState();
  const [Ap_Paterno, setAp_Paterno] = useState();
  const [Ap_Matern, setAp_Matern] = useState();

  const onHandleId = (e) => {
    setId_docente(e.target.value);
  };

  const onHandleNombre = (e) => {
    setNombre(e.target.value);
  };
  const onHandleApPaterno = (e) => {
    setAp_Paterno(e.target.value);
  };
  const onHandleApMaterno = (e) => {
    setAp_Matern(e.target.value);
  };

  console.log(inputId)
  const addDocentePetition = (id_docente, nombre, ap_paterno, ap_materno) => {
    //Hacemos la peticion para enviar los datos del dcoente
    
    if(validarCampos(inputId)){
      
    }
    const url = "http://localhost:3030/addDocente";
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "ID_DOCENTE": id_docente,
        "NOMBRE": nombre,
        "AP_PATERNO": ap_paterno,
        "AP_MATERNO": ap_materno,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Alumno agregado: " + data));

    window.location.reload();
  };
  useEffect(() => {
    inputId = document.querySelector('#id_docente')
    console.log(inputId.value)
  }, [id_docente])
  
  return (
    <div>
      <h1>Agregar docentes </h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="id_docente" className="form-label">
          Id docente
        </label>
        <input
          type="number"
          id="id_docente"
          name="id_docente"
          className="form-control"
          onChange={(event) => onHandleId(event)}
        />

        <label htmlFor="nombre" className="form-label mt-3">
          Nombre (s)
        </label>

        <input
          type="text"
          name="nombre"
          className="form-control"
          onChange={(event) => onHandleNombre(event)}
        />
        <label htmlFor="ap_paterno" className="form-label">
          Apellido Paterno
        </label>

        <input
          type="text"
          name="ap_paterno"
          className="form-control"
          onChange={(event) => onHandleApPaterno(event)}
        />
        <label htmlFor="ap_materno" className="form-label">
          Apellido materno
        </label>

        <input
          type="text"
          name="ap_materno"
          className="form-control"
          onChange={(event) => onHandleApMaterno(event)}
        />

        <button className="btn btn-danger">Cancelar</button>
        <button
          className="btn btn-success m-4"
          //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
          onClick={() =>
            addDocentePetition(id_docente, Nombre, Ap_Paterno, Ap_Matern)
          }
        >
          Agregar!
        </button>
      </form>
    </div>
  );
};
