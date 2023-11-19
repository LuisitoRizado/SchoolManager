import React from "react";
import { useState, useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
let inputHorario, inputInicio, inputFin;

export const AgregarHorarioPage = () => {
  //-------------HOOKS
  const [horarios, setHorarios] = useState([]);
  const [id_horario, setId_horario] = useState();
  const [hora_inicio, setHora_inicio] = useState();
  const [hora_fin, setHora_fin] = useState();
  const [materias, setMaterias] = useState([])
  let inputID, inputInicio, inputFin;
  //---------------HANDLERS
  const onHandleId = (e) => {
    setId_horario(e.target.value);
  };
  const onHandleHora_Inicio = (e) => {
    setHora_inicio(e.target.value);
  };
  const onHandleHora_Fin = (e) => {
    setHora_fin(e.target.value);
  };

  //---------------FUNCTIONS

  useEffect(() => {
    inputHorario = document.querySelector("#id_horario");
    inputInicio = document.querySelector("#horaInicio");
    inputFin = document.querySelector("#horaFin");
    //Cargamos los horarios
    fetch("https://rest-api-production-a5bf.up.railway.app/getAllHorarios")
      .then((res) => res.json())
      .then((data) => setHorarios(data));

    console.log(inputHorario, inputInicio, inputFin);

    //traemos todas las materias
    fetch('https://rest-api-production-a5bf.up.railway.app/getAllMaterias')
    .then(res=>res.json())
    .then(data=>setMaterias(data));

  }, []);

  useEffect(() => {
    inputHorario = document.querySelector("#id_horario");
    inputInicio = document.querySelector("#horaInicio");
    inputFin = document.querySelector("#horaFin");
  }, [id_horario, hora_inicio, hora_fin]);

  const addHorario = () => {
    //En esta funcion vamos a aagregar al horario que se seleciones

    console.log(inputHorario, inputInicio, inputFin);

    if (validarCampos(inputHorario, inputInicio, inputFin)) {
      const url = "https://rest-api-production-a5bf.up.railway.app/addHorario";

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_HORARIO: id_horario,
          Hora_Inicio: hora_inicio,
          Hora_Final: hora_fin,
        }),
      });
      //Recargamos la pagina
      window.confirm("Horario agregada con exito");
      window.location.reload();
    }
  };

  const cancelarEvent = () => {
    inputHorario.value = "";
    inputInicio.value = "";
    inputFin.value = "";

    inputHorario.disabled = false;
    inputInicio.disabled = false;
    inputFin.disabled = false;
    const btnagregar = document.querySelector(".btn-agregar");
    btnagregar.disabled = false;
  };

  const comprobarSiExiste = async () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar
    //las  limpiamos
    inputInicio.value = "";
    inputFin.value = "";
    //Creamos la url
    const url = "https://rest-api-production-a5bf.up.railway.app/getHorario/" + id_horario;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //Actualizamos los datos en los inputs
        console.log(data)
        inputHorario.value = data[0].Id_Horario;
        inputInicio.value = data[0].Hora_Inicio;
        inputFin.value = data[0].Hora_Final;
      });

    if (inputInicio.value === "") {
      //comprobamos si tiene valor es porque si existe.
      //bloqueamos el boton  y los inputs
      inputHorario.disabled = false;
      inputInicio.disabled = false;
      inputFin.disabled = false;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = false;
    } else {
      inputHorario.disabled = true;
      inputInicio.disabled = true;
      inputFin.disabled = true;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = true;
    }
    setId_horario(0)
  };

  const habilitarModificacion = (index) => {
    //deshabilitamos el boton modificar
    const modificarButton = document.querySelectorAll(".modificarButton");
    modificarButton.forEach((btn) => {
      btn.classList.add("disabled");
    });

    //vamos a buscar todos los elementos con la classe fila-index
    const inputs = document.querySelectorAll(".fila-" + index);
    const mod = document.querySelector(".btn-" + index);
    const id = document.querySelector(".id-" + index).value;
    console.log(id);
    console.log(inputs);
    const okButton = document.createElement("button");
    const noButton = document.createElement("button");
    okButton.classList.add("btn", "btn-success", "m-2");
    okButton.innerText = "OK";
    noButton.classList.add("btn", "btn-danger", "m-2");
    noButton.innerText = "X";

    //obtener valores iniciales
    const valoresIniciales = [];
    valoresIniciales.push(inputs[0].value);
    valoresIniciales.push(inputs[1].value);
    for (let i = 0; i < 2; i++) {
      console.log(valoresIniciales[i]);
    }

    //Agregamos el button
    mod.appendChild(okButton);
    mod.appendChild(noButton);

    //Habiliatamos los campos
    inputs.forEach((input) => {
      input.disabled = false;
    });

    //Evento de cancelacion
    noButton.addEventListener("click", () => {
      modificarButton.disabled = false;

      //Aquí vamos a cancelar todo, es decir solo eliminamos los dos botones
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });
      //primero deshabilitamo los inputs
      console.log(inputs[0].value);
      console.log(valoresIniciales[0]);
      inputs[0].value = valoresIniciales[0];
      inputs[1].value = valoresIniciales[1];
      inputs.forEach((input, index) => {
        input.disabled = true;
        //a la vez, regresamos su valores iniciales

        //por ultimo, eliminamos los botones
        noButton.remove();
        okButton.remove();
      });
    });
    //detectamos el evento del button ok
    okButton.addEventListener("click", async () => {
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });

      console.log("me diste click");
      console.log(inputs[0]);
      //guardamos los datos de los inputs
      let HORA_INICIO_LUNES = inputs[0].value;
      let HORA_FINAL_LUNES = inputs[1].value;
      //recopilamos los inputs
      const inputInicio = inputs[0];
      const inputFinal = inputs[1];

      //hacemos la peticion
      if(validarCampos(inputInicio,inputFinal))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateHorario/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          HORA_INICIO_LUNES: HORA_INICIO_LUNES,
          HORA_FINAL_LUNES: HORA_FINAL_LUNES,
        }),
      });
      window.location.reload();
    }
    });
  };

  const eliminarHorario = (id_horario) =>{
    //vamos a buscar entre todas las materias si es que coincide
    let tieneHijos = false;
    console.log("clikeaste");
    materias.forEach((materia) => {
      if (materia.Id_Horario === id_horario) {
        tieneHijos = true;
      }
    });

    if (!tieneHijos) {
      //borramos la materia
      if(confirm("Estas seguro que quieres eliminar este horario?"))
      fetch("https://rest-api-production-a5bf.up.railway.app/deleteHorario/" + id_horario, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            console.log("Registro eliminado exitosamente");
          } else {
            console.error("Ocurrió un error al eliminar el registro");
          }
        })
        .catch((error) => console.error(error));
        confirm('Horario eliminada con exito')
    } else {
      confirm("No se puede eliminar, tiene hijos");
    }

  }

  return (
    <div>
      <h1>Agregar Horario </h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="id_aula" className="form-label">
          Id Horario
        </label>
        <input
          type="number"
          name="id_horario"
          id="id_horario"
          onBlur={() => comprobarSiExiste()}
          onKeyPress={validarNumeros}
          className="form-control"
          onChange={(event) => onHandleId(event)}
        />

        <label htmlFor="aula" className="form-label mt-3">
          Hora inicio
        </label>

        <select
          className="form-select"
          aria-label="Default select example"
          id="horaInicio"
          
          onChange={(event) => onHandleHora_Inicio(event)}
        >
          <option value=""></option>
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
        <label htmlFor="edificio" className="form-label">
          Hora fin
        </label>

        <select
          className="form-select"
          aria-label="Default select example"
          id="horaFin"
          onChange={(event) => onHandleHora_Fin(event)}
        >
          <option value=""></option>

          <option value="10:00">10:00</option>
          <option value="9:00">9:00</option>
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

        <button className="btn btn-danger" onClick={() => cancelarEvent()}>
          Cancelar
        </button>
        <button
          className="btn btn-success m-4 btn-agregar"
          //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
          onClick={() => addHorario()}
        >
          Agregar!
        </button>
      </form>

      <div className="table-responsive">

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id Horario</th>
            <th scope="col">Hora inicio</th>
            <th scope="col">Hora Final</th>

            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {horarios.length >= 1 ? (
            horarios.map((horario, index) => (
              <tr key={index}>
                <td>
                  <input
                    className={`id-${index} form-control`}
                    defaultValue={horario.Id_Horario}
                    disabled
                  />
                </td>
                <td>
                  <select
                    aria-label="Default select example"
                    className={`fila-${index} form-control form-select`}
                    defaultValue={horario.Hora_Inicio}
                    disabled
                  >
                    <option value={horario.Hora_Inicio}>{horario.Hora_Inicio}</option>
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
                </td>
                <td>
                  <select
                    aria-label="Default select example"
                    className={`fila-${index} form-control form-select`}
                    defaultValue={horario.Hora_Final}
                    disabled
                  >
                    <option value={horario.Hora_Final}>{horario.Hora_Final}</option>
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
                </td>
                <td className={`btn-${index} form-control`}>
                  <a
                    onClick={() => habilitarModificacion(index)}
                    className="btn btn-warning modificarButton"
                  >
                    Modificar
                  </a>
                </td>
                <td>
                  <a
                    href=""
                    className="btn btn-danger"
                    onClick={() => eliminarHorario(horario.Id_Horario)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td><h1>No existe ese Docente</h1></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};
