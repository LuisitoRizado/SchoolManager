import React from "react";
import { useState, useEffect } from "react";
import { json } from "react-router-dom";
import { validarCampos, validarNumeros } from "./validarCampos";
let inputId;
let inputAula;
let inputEdificio;
let inputCapacidad;
export const AgregarAula = () => {
  //HOOKS
  const [aulas, setAulas] = useState([]);
  const [id_aula, setId_aula] = useState(0);
  const [nombreAula, setNombreAula] = useState();
  const [edificio, setEdificio] = useState();
  const [capacidad, setCapacidad] = useState();

  const [materias, setMaterias] = useState([]);

  //handlers
  const onHandleId = (e) => {
    setId_aula(e.target.value);
  };
  const onHandleAula = (e) => {
    setNombreAula(e.target.value);
  };
  const onHandleEdificio = (e) => {
    setEdificio(e.target.value);
  };
  const onHandleCupo = (e) => {
    setCapacidad(e.target.value);
  };

  //Functions
  const addAula = () => {
    //Damos fetcha  nuestra api
    if (validarCampos(inputAula, inputId, inputEdificio, inputCapacidad)) {
      const url = "https://rest-api-production-a5bf.up.railway.app/addAula";
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_AULA: id_aula,
          NOMBRE: nombreAula,
          EDIFICIO: edificio,
          CAPACIDAD: capacidad,
        }),
      });
      //Recargamos la pagina
      window.prompt("Aula agregada con exito");
      window.location.reload();
    }
  };

  useEffect(() => {
    inputId = document.querySelector("#id_aula");
    inputAula = document.querySelector("#aula");
    inputEdificio = document.querySelector("#edificio");
    inputCapacidad = document.querySelector("#capacidad");
    //al cargar el aula, vamos a motrar las materias que existen
    fetch("https://rest-api-production-a5bf.up.railway.app/getAllAulas")
      .then((res) => res.json())
      .then((data) => setAulas(data));

    //traer todas las materias
    fetch("https://rest-api-production-a5bf.up.railway.app/getAllMaterias")
      .then((res) => res.json())
      .then((data) => setMaterias(data));
  }, []);
  useEffect(() => {
    inputId = document.querySelector("#id_aula");
    inputAula = document.querySelector("#aula");
    inputEdificio = document.querySelector("#edificio");
    inputCapacidad = document.querySelector("#capacidad");
  }, [id_aula, nombreAula, edificio, capacidad]);

  
  const comprobarSiExiste = async () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar

    //limpiamos los input
    inputAula.value = "";
    inputEdificio.value = "";
    inputCapacidad.value = "";
    //Creamos la url
    const url = "https://rest-api-production-a5bf.up.railway.app/getAula/" + id_aula;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //Actualizamos los datos en los inputs
        inputAula.value = data[0].Nombre;
        inputEdificio.value = data[0].Edificio;
        inputCapacidad.value = data[0].Capacidad;
      });

    if (inputAula.value === "") {
      //comprobamos si tiene valor es porque si existe.
      //bloqueamos el boton  y los inputs
      inputId.disabled = false;
      inputAula.disabled = false;
      inputEdificio.disabled = false;
      inputCapacidad.disabled = false;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = false;
    } else {
      inputId.disabled = true;
      inputAula.disabled = true;
      inputEdificio.disabled = true;
      inputCapacidad.disabled = true;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = true;
    }

    //limpiamos el valor
    setId_aula(0)
  };
  //----------------------------------------------------------logica de modificacion
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
    valoresIniciales.push(inputs[2].value);
    for (let i = 0; i < 3; i++) {
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
      inputs[2].value = valoresIniciales[2];
      inputs.forEach((input, index) => {
        input.disabled = true;
        //a la vez, regresamos su valores iniciales

        //por ultimo, eliminamos los botones
        noButton.remove();
        okButton.remove();
      });
    });
    //detectamos el evento del button ok
    okButton.addEventListener("click",async () => {
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });

      console.log("me diste click");
      console.log(inputs[0]);
      //guardamos los datos de los inputs
      const aula = inputs[0].value;
      const edificio = inputs[1].value;
      const capacidad = inputs[2].value;
      //recopilamos los inputs
      const inputName = inputs[0];
      const inputEdificio = inputs[1];
      const inputCapacidad = inputs[2];

      //hacemos la peticion

      if(validarCampos(inputName, inputEdificio, inputCapacidad))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateAula/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NOMBRE: aula,
          EDIFICIO: edificio,
          CAPACIDAD: capacidad,
        }),
      });
      window.location.reload();
    }
    });
  };

  const cancelarEvent = () => {
    inputId.value = "";
    inputAula.value = "";
    inputEdificio.value = "";
    inputCapacidad.value = "";

    inputId.disabled = false;
    inputAula.disabled = false;
    inputEdificio.disabled = false;
    inputCapacidad.disabled = false;
    const btnagregar = document.querySelector(".btn-agregar");
    btnagregar.disabled = false;
  };
  const eliminarAula = (id_aula) => {
    let tieneHijos = false;
    //recorremos todas las materias en busca del id del aula
    console.log("clikeaste");
    materias.forEach((materia) => {
      if (materia.Id_Aula === id_aula) {
        tieneHijos = true;
      }
    });

    //Si no tiene hijos
    if (!tieneHijos) {
      //borramos la materia
      fetch("https://rest-api-production-a5bf.up.railway.app/deleteAula/" + id_aula, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            console.log("Registro eliminado exitosamente");
          } else {
            console.error("Ocurrió un error al eliminar el registro");
          }
        })
        .catch((error) => console.error(error));
        confirm('Aula eliminada con exito')
    } else {
      confirm("No se puede eliminar, tiene hijos");
    }
  };
  return (
    <div className="animate__zoomInDown">
      <h1>Agregar Aula </h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="id_aula" className="form-label">
          Id Aula
        </label>
        <input
          type="number"
          name="id_aula"
          id="id_aula"
          onBlur={() => comprobarSiExiste()}
          onKeyPress={validarNumeros}
          className="form-control"
          onChange={(event) => onHandleId(event)}
        />

        <label htmlFor="aula" className="form-label mt-3">
          Nombre Aula
        </label>

        <input
          type="text"
          name="aula"
          id="aula"
          className="form-control"
          onChange={(event) => onHandleAula(event)}
        />
        <label htmlFor="edificio" className="form-label">
          Edificio
        </label>

        <input
          type="text"
          name="edificio"
          id="edificio"
          className="form-control"
          onChange={(event) => onHandleEdificio(event)}
        />
        <label htmlFor="capacidad" className="form-label">
          Capacidad
        </label>

        <input
          type="number"
          name="capacidad"
          id="capacidad"
          onKeyPress={validarNumeros}
          className="form-control"
          onChange={(event) => onHandleCupo(event)}
        />

        <button className="btn btn-danger" onClick={() => cancelarEvent()}>
          Cancelar
        </button>
        <button
          className="btn btn-success m-4 btn-agregar"
          //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
          onClick={() => addAula()}
        >
          Agregar!
        </button>
      </form>
      <div className="table-responsive">

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id aula</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edificio </th>
            <th scope="col">Capacidad</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {aulas.length >= 1 ? (
            aulas.map((aula, index) => (
              <tr key={index}>
                <td>
                  <input
                    className={`id-${index} form-control`}
                    defaultValue={aula.Id_Aula}
                    disabled
                  />{" "}
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={aula.Nombre}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={aula.Edificio}
                    disabled
                  />
                </td>
                <td>
                  <input
                    onKeyPress={validarNumeros}
                    className={`fila-${index} form-control`}
                    defaultValue={aula.Capacidad}
                    disabled
                  />
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
                    onClick={() => eliminarAula(aula.Id_Aula)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td><h1>No existe esa aula</h1></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};
