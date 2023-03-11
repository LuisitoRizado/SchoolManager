import { useState, useEffect } from "react";
let inputId, inputIdDocente, inputIdMateria;
export const AgregarDocenteMateria = () => {
  //--HOOKS
  const [id, setId] = useState();
  const [id_docente, setId_docente] = useState();
  const [id_materia, setId_materia] = useState();
  const [materias, setMaterias] = useState([]);

  //-----Handlers
  const onHandleId = (e) => {
    setId(e.target.value);
  };
  const onHandleIdDocente = (e) => {
    setId_docente(e.target.value);
  };
  const onHandleIdMateria = (e) => {
    setId_materia(e.target.value);
  };

  //functions
  const comprobarSiExiste = () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar

    //Creamos la url
    const url = "http://localhost:3030/getMats/" + id;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //Actualizamos los datos en los inputs

        console.log(data)
        inputIdDocente.value = data[0].ID_DOCENTE;
        inputIdMateria.value = data[0].ID_MATERIA;
      });
  };

  //useEffect
  useEffect(() => {
    //Cargamos los datos de todas las materias
    inputId = document.querySelector("#id");
    inputIdDocente = document.querySelector("#id_docente");
    inputIdMateria = document.querySelector("#id_materia");
    const url = "http://localhost:3030/getAllMats";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMaterias(data)
        console.log(data)
    }
        );
  }, []);
//----HABILITAMOS LA EDICION DE LOS DATOS EN LOS INPUTS
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
    valoresIniciales.push(inputs[3].value);
    valoresIniciales.push(inputs[4].value);
    valoresIniciales.push(inputs[5].value);
    valoresIniciales.push(inputs[6].value);


    for (let i = 0; i < 7; i++) {
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
      inputs[3].value = valoresIniciales[3];
      inputs[4].value = valoresIniciales[4];
      inputs[5].value = valoresIniciales[5];
      inputs[6].value = valoresIniciales[6];

      inputs.forEach((input, index) => {
        input.disabled = true;
        //a la vez, regresamos su valores iniciales

        //por ultimo, eliminamos los botones
        noButton.remove();
        okButton.remove();
      });
    });
    //detectamos el evento del button ok
    okButton.addEventListener("click", () => {
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
      const inputAPaterno = inputs[1];
      const inputAMaterno = inputs[2];

      //hacemos la peticion

      fetch("http://localhost:3030/updateAula/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "NOMBRE": aula,
          "EDIFICIO": edificio,
          "CAPACIDAD": capacidad
        }),
      });
      window.location.reload();
    });
  };
  return (
    <div>
      <h1>Asignar docente a materia</h1>
      <hr />
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="" className="form-label">
          Id
        </label>

        <input
          type="number"
          className="form-control"
          id="id"
          onChange={(e) => onHandleId(e)}
          onBlur={() => comprobarSiExiste()}
        />

        <label htmlFor="" className="form-label">
          Id docente
        </label>
        <input
          type="number"
          className="form-control"
          id="id_docente"
          onChange={(e) => onHandleIdDocente(e)}
        />

        <label htmlFor="" className="form-label">
          Id materia
        </label>
        <input
          type="number"
          className="form-control"
          id="id_materia"
          onChange={(e) => onHandleIdMateria(e)}
        />
      </form>
      <hr />

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id materia asignada docente</th>
            <th scope="col">Id Materia</th>
            <th scope="col">Materia</th>
            <th scope="col">Profesor</th>
            <th scope="col">Ap paterno</th>
            <th scope="col">Ap materno</th>
            <th scope="col">Hora inicio</th>
            <th scope="col">Hora Final</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {materias.length >= 1 ? (
            materias.map((materia, index) => (
              <tr key={materia}>
                <td>
                  <input
                    className={`id-${index} form-control`}
                    defaultValue={materia.ID_DOCXMATH}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.ID_MATERIA}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.MATERIA}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.NOMBRE}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.AP_PATERNO}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.AP_MATERNO}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.HORA_INICIO_LUNES}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.HORA_FINAL_LUNES}
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
                    onClick={() => eliminarDocente(docente.Id_Docente)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <h1>No existe ese Docente</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};
