import { useState,useEffect } from "react";
export const ModificarAulaPage = () => {
  //Obtener query params de la url
  //Leemos el query params de la url
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const id = params.get("id");
  console.log(id);

  //-----HOOKS
  const [aula, setAula] = useState([]);
  const [nombre, setNombre] = useState();
  const [edificio, setEdificio] = useState();
  const [capacidad, setCapacidad] = useState();

  //---HANDLERS
  const onHandleNombre = (e) => {
    setNombre(e.target.value);
  };
  const onHandleEdificio = (e) => {
    setEdificio(e.target.value);
  };
  const onHandleCapacidad = (e) => {
    setCapacidad(e.target.value);
  };

  //---FUNCTIONS
  const obtenerAula = () => {
    const url = "http://localhost:3030/getAula/" + id;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAula(data);
        setNombre(data[0].Nombre);
        setEdificio(data[0].Edificio);
        setCapacidad(data[0].Capacidad);

      });
  };

  const guardarDatos = (id, aula, edificio, capacidad) => {
    //En esta peticion va el metodo put el cual no va a ayudar a poder modificar los cambios realizaod
    //Todo esto es lo introducido en los campos de texto del formulario

    fetch("http://localhost:3030/updateAula/" + id, {
      method: "PUT",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID_AULA: id,
        NOMBRE: aula,
        EDIFICIO: edificio,
        CAPACIDAD: capacidad,
      }),
    });
    window.location.reload();
  };

   //Para los datos
   useEffect(() => {
    obtenerAula();
    }, [])
    

  return (
    <div>
      <h1>Modificación de docente</h1>
      <hr />

      {/*Mostraremos la información del docente en un formulario */}
      {aula.map((aul) => {
        return (
          <form action="" className="mt-4" onSubmit={(e) => e.preventDefault()}>
            {/*Id de la materia */}
            <label htmlFor="" className="form-label">
              Id materia
            </label>
            <input
              type="number"
              name="id"
              id="id"
              placeholder={aul.Id_Aula}
              defaultValue={aul.Id_Aula}
              className="form-control disabled"
              disabled={true}
            />
            {/*Nombre de la materia. */}
            <label htmlFor="" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              name="materia"
              id="materia"
              className="form-control"
              defaultValue={aul.Nombre}
              onChange={(e) => onHandleNombre(e)}
              placeholder={aul.Nombre}
            />
            {/*Profesor que imparte la materia */}
            <label htmlFor="" className="form-label">
              Edificio
            </label>
            <input
              type="text"
              name="edificio"
              id="edificio"
              className="form-control"
              defaultValue={aul.Edificio}
              onChange={(e) => onHandleEdificio(e)}
              placeholder={aul.Edificio}
            />
            {/*Hora de la materia */}
            <label htmlFor="" className="form-label">
              Capacidad
            </label>
            <input
              type="text"
              name="capacidad"
              id="capacidad"
              className="form-control"
              defaultValue={aul.Capacidad}
              
              placeholder={aul.Capacidad}
              onChange={(e) => onHandleCapacidad(e)}
            />
            {/*Aula donde se imparte la materia */}

            <button
              className="btn btn-danger m-2"
              onClick={() => guardarCambios()}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() =>
                guardarDatos(aul.Id_Aula, nombre, edificio, capacidad)
              }
            >
              Confirmar
            </button>
          </form>
        );
      })}
    </div>
  );
};
