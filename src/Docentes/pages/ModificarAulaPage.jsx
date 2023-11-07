import { useState,useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
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
  let inputNombre, inputEdificio, inputCapacidad;
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
    const url = "https://rest-api-production-a5bf.up.railway.app/getAula/" + id;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAula(data);
        setNombre(data[0].Nombre);
        setEdificio(data[0].Campus);

      });
  };

  const guardarDatos = async (id, aula, edificio) => {
    //En esta peticion va el metodo put el cual no va a ayudar a poder modificar los cambios realizaod
    //Todo esto es lo introducido en los campos de texto del formulario

    if(validarCampos(inputNombre, inputEdificio)){
    await fetch("https://rest-api-production-a5bf.up.railway.app/updateAula/" + id, {
      method: "PUT",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "NOMBRE": aula,
        "CAMPUS": edificio,
      }),
    });
    confirm('Aula actualizada!')
    window.location.reload();
  }
  };

   //Para los datos
   useEffect(() => {
    obtenerAula();
    inputNombre = document.querySelector('#aula')
    inputEdificio = document.querySelector('#edificio')
    inputCapacidad = document.querySelector('#capacidad')
    }, [])

    useEffect(() => {
      inputNombre = document.querySelector('#aula')
      inputEdificio = document.querySelector('#edificio')
      inputCapacidad = document.querySelector('#capacidad')
      }, [aula, edificio, capacidad])

    

  return (
    <div>
      <h1>Modificación de Aula</h1>
      <hr />

      {/*Mostraremos la información del docente en un formulario */}
      {aula.map((aul, index) => {
        return (
          <form action="" className="mt-4" onSubmit={(e) => e.preventDefault()} key={index}>
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
              name="aula"
              id="aula"
              className="form-control"
              defaultValue={aul.Nombre}
              onChange={(e) => onHandleNombre(e)}
            />
            {/*Profesor que imparte la materia */}
            <label htmlFor="" className="form-label">
              Edificio
            </label>
            <select name="edificio" id="edificio" onChange={(e) => onHandleEdificio(e)}     className="form-select">
              <option value="Principal">{aul.Campus}</option>
              <option value="Boilot">Principal</option>
              <option value="Boilot">Boilot</option>
            </select>
           
            {/*Hora de la materia */}
            
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
                guardarDatos(aul.Id_Aula, nombre, edificio)
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
