import { useState, useEffect } from "react";
import { validarCampos } from "./validarCampos";
export const ModificarHorarioPage = () => {
  //Obtener query params de la url
  //Leemos el query params de la url
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const id = params.get("id");
  console.log(id);

  //-----HOOKS
  const [horario, setHorario] = useState([]);
  const [hora_inicio, setHora_Inicio] = useState();
  const [hora_final, setHora_Final] = useState();
  let inputInicio, inputFinal;

  const onHandleHora_Inicio = (e) => {
    setHora_Inicio(e.target.value);
  };
  const onHandleHora_Final = (e) => {
    setHora_Final(e.target.value);
  };

  //---FUNCTIONS
  const obtenerHorario = () => {
    const url = "http://localhost:3030/getHorario/" + id;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHorario(data);
        setHora_Inicio(data[0].Hora_Inicio_Lunes);
        setHora_Final(data[0].Hora_Final_Lunes);
      });
  };

  const guardarDatos = (id, hora_inicio, hora_final) => {
    //En esta peticion va el metodo put el cual no va a ayudar a poder modificar los cambios realizaod
    //Todo esto es lo introducido en los campos de texto del formulario
    if (validarCampos(inputInicio, inputFinal)) {
      fetch("http://localhost:3030/updateHorario/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          HORA_INICIO_LUNES: hora_inicio,
          HORA_FINAL_LUNES: hora_final,
        }),
      });
      window.location.reload();
    }
  };

  //Para los datos
  useEffect(() => {
    obtenerHorario();
    inputInicio = document.querySelector("#hora_inicio");
    inputFinal = document.querySelector("#hora_final");
  }, []);

  useEffect(() => {
    inputInicio = document.querySelector("#hora_inicio");
    inputFinal = document.querySelector("#hora_final");
  }, [hora_inicio, hora_final]);

  return (
    <div>
      <h1>Modificación de Horario</h1>
      <hr />

      {/*Mostraremos la información del docente en un formulario */}
      {horario.map((hora) => {
        return (
          <form action="" className="mt-4" onSubmit={(e) => e.preventDefault()}>
            {/*Id de la materia */}
            <label htmlFor="" className="form-label">
              Id Horario
            </label>
            <input
              type="number"
              name="id"
              id="id"
              placeholder={hora.Id_Horario}
              defaultValue={hora.Id_Horario}
              className="form-control disabled"
              disabled={true}
            />
            {/*Nombre de la materia. */}
            <label htmlFor="" className="form-label">
              Hora inicio
            </label>
            <select
          class="form-select"
          aria-label="Default select example"
          id="hora_inicio"
          defaultValue={hora.Hora_Inicio_Lunes}
          onChange={(event) => onHandleHora_Inicio(event)}
        >
          <option value="" selected>{hora.Hora_Inicio_Lunes}</option>
          <option value="9:00">9:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:0</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
        </select>
            {/*Profesor que imparte la materia */}
            <label htmlFor="" className="form-label">
              Edificio
            </label>
            <select
          class="form-select"
          aria-label="Default select example"
          id="hora_final"
          defaultValue={hora.Hora_Final_Lunes}
          onChange={(event) => onHandleHora_Inicio(event)}
        >
          <option value="" selected>{hora.Hora_Final_Lunes}</option>
          <option value="9:00">9:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:0</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
        </select>
            {/*Hora de la materia */}

            <button
              className="btn btn-danger m-2"
              onClick={() => guardarCambios()}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() =>
                guardarDatos(hora.Id_Horario, hora_inicio, hora_final)
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
