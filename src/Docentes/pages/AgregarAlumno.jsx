import { addUserPetition } from "../petitions/addUserPetition";
import { useState, useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
let inputContro,
  inputNombre,
  inputAPaterno,
  inputAMaterno,
  inputSemestre,
  inputPeriodo,
  inputCreditos,
  inputEspecidaldiad,
  inputCarrera,
  inputContrasena;
export const AgregarAlumno = () => {
  //Hooks de nuestra aplicacion, inicialmente es un objeto vacio

  //Hacemos un hook para cada atributo del alumno
  const [Ncontrol, setNcontrol] = useState(0);
  const [Id_Carrera, setId_Carrera] = useState();
  const [Nombre, setNombre] = useState();
  const [Ap_Paterno, setAp_Paterno] = useState();
  const [Ap_Matern, setAp_Matern] = useState();
  const [Semestre, setSemestre] = useState();
  const [Periodo, setPeriodo] = useState();
  const [Creditos, setCreditos] = useState();
  const [Especialidad, setEspecialidad] = useState();
  const [Contrasena, setContrasena] = useState();
  const [alumno, setAlumno] = useState([]);
  const [carreras, setCarreras] = useState([])

  ///-------FIN DE HOOKS

  //La siguiente función nos sirve para ir creando nuestro alumno
  const onHandleNcontrol = (e) => {
    //Convertimos a cadena

    setNcontrol(e.target.value);
    console.log(e.target.value);
  };

  const onHandleCarrera = (e) => {
    setId_Carrera(e.target.value);
    console.log("Carrera: " + e.target.value);
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
  const onHandleSemestre = (e) => {
    setSemestre(e.target.value);
  };
  const onHandlePeriodo = (e) => {
    setPeriodo(e.target.value);
  };
  const onHandleCreditos = (e) => {
    setCreditos(e.target.value);
  };
  const onHandleEspecialidad = (e) => {
    setEspecialidad(e.target.value);
  };
  const onHandleContrasena = (e) => {
    setContrasena(e.target.value);
  };

  useEffect(() => {
    //Ncontrol
    inputContro = document.querySelector("#NControl");
    inputNombre = document.querySelector("#nombre");
    inputAPaterno = document.querySelector("#ap_paterno");
    inputAMaterno = document.querySelector("#ap_materno");
    inputSemestre = document.querySelector("#semestre");
    inputPeriodo = document.querySelector("#periodo");
    inputCreditos = document.querySelector("#creditos");
    inputEspecidaldiad = document.querySelector("#especialidad");
    inputContrasena = document.querySelector("#contrasena");
    inputCarrera = document.querySelector('#id_carrera')
    //obtenemos todos los alumnos
    fetch("https://rest-api-production-a5bf.up.railway.app/getAllAlumnos")
      .then((res) => res.json())
      .then((data) => setAlumno(data));

    fetch('https://rest-api-production-a5bf.up.railway.app/getAllCarreras')
    .then(res=>res.json())
    .then(data=>setCarreras(data))

  }, []);


  useEffect(() => {
    //Ncontrol
    
    inputContro = document.querySelector("#Ncontrol");
    inputNombre = document.querySelector("#nombre");
    inputAPaterno = document.querySelector("#ap_paterno");
    inputAMaterno = document.querySelector("#ap_materno");
    inputSemestre = document.querySelector("#semestre");
    inputPeriodo = document.querySelector("#periodo");
    inputCreditos = document.querySelector("#creditos");
    inputEspecidaldiad = document.querySelector("#especialidad");
    inputContrasena = document.querySelector("#contrasena");
  }, [
    Ncontrol,
    Nombre,
    Ap_Paterno,
    Ap_Matern,
    Semestre,
    Periodo,
    Creditos,
    Especialidad,
    Contrasena,
  ]);

  const comprobarSiExiste = async () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar
    inputCarrera.value = "";
    inputNombre.value = "";
    inputAPaterno.value = "";
    inputAMaterno.value = "";
    inputSemestre.value = "";
    inputPeriodo.value = "";
    inputCreditos.value = "";
    inputEspecidaldiad.value = "";
    inputContrasena.value = "";
    //Creamos la url
    const url = "https://rest-api-production-a5bf.up.railway.app/getAlumno/" + Ncontrol;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //Actualizamos los datos en los inputs
        inputCarrera.value = data[0].ID_Carrera;
        inputContro.value = data[0].NControl;
        inputNombre.value = data[0].Nombre;
        inputAPaterno.value = data[0].AP_PATERNO;
        inputAMaterno.value = data[0].AP_MATERNO;
        inputSemestre.value = data[0].SEMESTRE;
        inputPeriodo.value = data[0].PERIODO;
        inputCreditos.value = data[0].CREDITOS_DISPONIBLES;
        inputEspecidaldiad.value = data[0].ESPECIALIDAD;
        inputContrasena.value = data[0].CONTRASENA;
      });

    if (inputNombre === "") {
      //habilitamos las cajas
      inputCarrera.disabled = false;

      inputContro.disabled = false;
      inputNombre.disabled = false;
      inputAPaterno.disabled = false;
      inputAMaterno.disabled = false;
      inputSemestre.disabled = false;
      inputPeriodo.disabled = false;
      inputCreditos.disabled = false;
      inputEspecidaldiad.disabled = false;
      inputContrasena.disabled = false;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = false;
    } else {
      inputCarrera.disabled = true;

      inputContro.disabled = true;
      inputNombre.disabled = true;
      inputAPaterno.disabled = true;
      inputAMaterno.disabled = true;
      inputSemestre.disabled = true;
      inputPeriodo.disabled = true;
      inputCreditos.disabled = true;
      inputEspecidaldiad.disabled = true;
      inputContrasena.disabled = true;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = true;
    }
  };

  const agregarAlumno = async () => {
    const url = "https://rest-api-production-a5bf.up.railway.app/addAlumno";
    if (
      validarCampos(
        inputContro,
        inputNombre,
        inputAPaterno,
        inputAPaterno,
        inputSemestre,
        inputContrasena
      )
    ) {
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NCONTROL: Ncontrol,
          ID_CARRERA: Id_Carrera,
          NOMBRE: Nombre,
          AP_PATERNO: Ap_Paterno,
          AP_MATERNO: Ap_Matern,
          SEMESTRE: Semestre,
          CONTRASENA: Contrasena,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Alumno agregado: " + data));

      window.location.reload();
    }
  };
  //----------------------------------------------------------logica de modificacion
  const habilitarModificacion = async (index) => {
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
    okButton.addEventListener("click", async () => {
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });

      console.log("me diste click");
      console.log(inputs[0]);
      //guardamos los datos de los inputs
      const nombre = inputs[0].value;
      const ap_paterno = inputs[1].value;
      const ap_materno = inputs[2].value;
      const semestre = inputs[3].value;
      const periodo = inputs[4].value;
      const creditos = inputs[5].value;
      const especialidad = inputs[6].value;

      //recopilamos los inputs
      const inputNombre = inputs[0];
      const inputAPaterno = inputs[1];
      const inputAMaterno = inputs[2];
      const inputSemestre = inputs[3];
      const inputPeriodo = inputs[4];
      const inputCreditos = inputs[5];
      const inputEspecialidad = inputs[6];

      //hacemos la peticion
      if(validarCampos(inputNombre,inputAPaterno, inputAMaterno, inputSemestre, inputPeriodo, inputCreditos, inputEspecialidad))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateAlumno/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NOMBRE: nombre,
          AP_PATERNO: ap_paterno,
          AP_MATERNO: ap_materno,
          SEMESTRE: semestre,
          PERIODO: periodo,
          CREDITOS_DISPONIBLES: creditos,
          ESPECIALIDAD: especialidad,
        }),
      });
      window.location.reload();
    }
    });
  };
  const cancelarEvento = () =>{
    inputCarrera.value = ""
    inputContro.value = "";
    inputNombre.value = "";
    inputAPaterno.value = "";
    inputAMaterno.value = "";
    inputSemestre.value = "";
    inputPeriodo.value = "";
    inputCreditos.value = "";
    inputEspecidaldiad.value = "";
    inputContrasena.value = "";

    inputCarrera.disabled = false;

    inputContro.disabled = false;
    inputNombre.disabled = false;
    inputAPaterno.disabled = false;
    inputAMaterno.disabled = false;
    inputSemestre.disabled = false;
    inputPeriodo.disabled = false;
    inputCreditos.disabled = false;
    inputEspecidaldiad.disabled = false;
    inputContrasena.disabled = false;
    const btnagregar = document.querySelector(".btn-agregar");
    btnagregar.disabled = false;
  }
  //ELIMINAR
  const eliminarAlumno = (ncontrol) =>{
    //vamos a pedir la peticion al http de delte en la base de datos
    //Nos va a pasar como parametros el numero de control del alumno
    //Ok ahora podemos hacer la peticion al servidor
    const url = 'https://rest-api-production-a5bf.up.railway.app/deleteAlumno/'+ncontrol;
    
    //hacemos el fetch a la api

    //Primero preguntamos si esta seguo de que quiere elimnar el alumno
    if(confirm('¿Estás seguro de que quieres eliminar este alumno?'))
    {
      //En caso de que diga que si , entonces, lo eliminamos
      fetch(url, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data)=>console.log('Eliminado : ' + data))
      confirm('Alumno eliminado con exito!')
      window.location.reload();
    }
    else{
      //De lo contrario no hacemos nada
      return;
    }


    //

  }
  return (
    <div className="animate__animated animate__fadeInLeft">
      <form action="" className="mt-5 animate__fadeInLeft" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="Ncontrol" className="form-label">
          Número de control
        </label>
        <input
          type="number"
          name="Ncontrol"
          onKeyPress={validarNumeros}

          id="Ncontrol"
          className="form-control"
          onBlur={() => comprobarSiExiste()}
          onChange={(event) => onHandleNcontrol(event)}
        />
        <h4 className="mt-3">Carrera</h4>
        <select
                    className={"form-select nuevoIdAula fila-"}
                    aria-label="Default select example"
                    id='id_carrera'
                    onChange={(e) => {
                     onHandleCarrera(e)
                      
                    }}
                  >
                      
                    {carreras.length >= 1 ? (
                      carreras.map((carrera, index) => (
                        <option
                          value={carrera.Id_Carrera}
                          className={"opcion-" + index}
                        >
                          {carrera.Nombre}
                        </option>
                      ))
                    ) : (
                      <option>No existen Carreras</option>
                    )}
                  </select>
                  <label htmlFor="estatus">Estatus</label>
                  <select name="estatus" id="estatus"
                  className={"form-select nuevoIdAula fila-"}
                  aria-label="Default select example">
                    <option value={1}>Activo</option>
                    <option value={2}>Inactivo</option>
                    <option value={3}>Pendiente</option>

                  </select>
        <label htmlFor="nombre" className="form-label mt-3">
          Nombre (s)
        </label>

        <input
          type="text"
          name="nombre"
          id="nombre"
          className="form-control"
          onChange={(event) => onHandleNombre(event)}
        />
        <label htmlFor="ap_paterno" className="form-label">
          Apellido Paterno
        </label>

        <input
          type="text"
          name="ap_paterno"
          id="ap_paterno"
          className="form-control"
          onChange={(event) => onHandleApPaterno(event)}
        />
        <label htmlFor="ap_materno" className="form-label">
          Apellido materno
        </label>

        <input
          type="text"
          name="ap_materno"
          id="ap_materno"
          className="form-control"
          onChange={(event) => onHandleApMaterno(event)}
        />
        <label htmlFor="semestre" className="form-label">
          Semestre
        </label>

        <input
          type="number"
          onKeyPress={validarNumeros}

          name="semestre"
          id="semestre"
          className="form-control"
          onChange={(event) => onHandleSemestre(event)}
        />
       
      
        
        <label htmlFor="contrasena" className="form-label">
          Contraseña
        </label>
        
        <input
          type="text"
          name="contrasena"
          id="contrasena"
          className="form-control"
          onChange={(event) => onHandleContrasena(event)}
        />
        <button className="btn btn-danger .btn-agregar" onClick={()=>cancelarEvento()}>Cancelar</button>
        <button
          className="btn btn-success m-4"
          //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
          onClick={() => agregarAlumno()}
        >
          Agregar!
        </button>
      </form>
      <div className="table-responsive">
      <table className="table  table-bordered table-responsive table-container">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Numero de control</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Semestre</th>
            <th scope="col">Estatus</th>
            <th scope="col">Carrera</th>           
            <th scope="col">Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {alumno.length >= 1 ? (
            alumno.map((alumno, index) => (
              <tr key={index}>
                <td>
                  <input
                    className={`id-${index} form-control`}
                    defaultValue={alumno.NControl}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Nombre}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Ap_Paterno}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Ap_Materno}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={alumno.Semestre}
                    onKeyPress={validarNumeros}

                    disabled
                  />
                </td>
              <td>
                <select name="estatus" id="estatus" defaultValue={alumno.EstatusNombre}  className={`fila-${index} form-control`} >
                  <option value={1}>{alumno.EstatusNombre}</option>
                  <option value={2}>Inactivo</option>
                  <option value={3}>Pendiente</option>

                </select>
              </td>

              <td>
                <select name="carrera" id="carrera" defaultValue={alumno.EstatusNCarreraNombreombre}  className={`fila-${index} form-control`}>
                  <option value={1}>{alumno.CarreraNombre}</option>
                  <option value={20}>Industrial</option>
                  <option value={30}>Gestion</option>

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
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarAlumno(alumno.NControl)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            <td className="m-1 text-danger">
              <h3>
              No se encontro ningún alumno con ese número de control
              </h3>
            </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};
