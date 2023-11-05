import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { validarCampos, validarNumeros } from "./validarCampos";
let inputIdMateria,
  inputIdHorario,
  inputIdAula,
  inputIdCarrera,
  inputMateria,
  inputCredtios,
  inputCupo,
  inputSemestre,
  inputIdHorarioMostrar;
export const AgregarMateriaPage = () => {
  const [ID_MATERIA, setID_MATERIA] = useState(0);
  const [Id_Carrera, setId_Carrera] = useState();
  const [HORARIO, setHorario] = useState();
  const [AULA, setAula] = useState();
  const [MATERIA, setMateria] = useState();
  const [CREDITOS, setCreditos] = useState();
  const [CUPO, setCupo] = useState();
  const [SEMESTRE, setSemestre] = useState();
  const [Id_Docente, setId_Docente] = useState();
  const [aulas, setAulas] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [estatus, setEstatus] = useState();

  //hook para cargar todas las materias existentes
  const [materias, setMaterias] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [materiasAsignadas, setmMteriasAsignadas] = useState([]);

  const onHandleIdMateria = (e) => {
    setID_MATERIA(e.target.value);
  };

  const onHandleCarrera = (e) => {
    setId_Carrera(e.target.value);
  };

  const onHandleHorario = (e) => {
    setHorario(e.target.value);
  };

  const onHandleAula = (e) => {
    setAula(e.target.value);
  };

  const onHandleMateria = (e) => {
    setMateria(e.target.value);
  };


  const onHandleCreditos = (e) => {
    setCreditos(e.target.value);
  };

  const onHandleEstatus = (e) =>{
    setEstatus(e.target.value)
  }

  const onHandleCupo = (e) => {
    setCupo(e.target.value);
  };
  const onHandleSemestre = (e) => {
    setSemestre(e.target.value);
  };

  const onHandleId_Docente = (e) => {
    setId_Docente(e.target.value);
  };

  const agregarMateria = async () => {
let estaOcupada = false;

    
    console.log(
      inputIdMateria,
      inputMateria,
      inputSemestre
    );
    if (
      validarCampos(
        inputIdMateria,
        inputMateria,
        inputIdCarrera,
        inputCredtios,
        inputSemestre
      )
    ) {
      //validar si no se repite el aula YY el horario a la vez
    /*  console.log(materias)
      materias.forEach(materia=>{
       
        if(materia.Id_Horario == HORARIO && materia.Id_Aula == AULA){
          estaOcupada = true;
          console.log('Se encontro!')
        }
      })
      */
      const url = "https://rest-api-production-a5bf.up.railway.app/addNewMateria";
      //No se puede agregar
      if(estaOcupada)
      {
        confirm('No se puede agregar ya que ya existe una materia en la misma hora y aula')
      }
      else{
        console.log('materia agregada')
       await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_MATERIA: ID_MATERIA,
          ID_CARRERA: Id_Carrera,
          ID_ESTATUS: estatus,
          MATERIA: MATERIA,
          CREDITOS: CREDITOS,
          SEMESTRE: SEMESTRE,
        }),
      });
      confirm('Materia agregada con exito!')
      window.location.reload()  
    }
    }
  };

  //useEffect
  useEffect(() => {
    //Obtener todos los inputs
    inputIdHorarioMostrar = document.querySelector("#id_horario");
    inputIdMateria = document.querySelector("#id_materia");
    //AQUI FALTA DEL ID DE LA CARRERA
    inputIdHorario = document.querySelector(".mySelect");
    inputIdAula = document.querySelector("#id_aula");
    inputIdCarrera = document.querySelector("#id_carreras");

    inputMateria = document.querySelector("#materia");
    inputCredtios = document.querySelector("#creditos");
    inputCupo = document.querySelector("#cupo");
    inputSemestre = document.querySelector("#semestre");

    //cargamos los datos
    const url = "https://rest-api-production-a5bf.up.railway.app/getAllMaterias";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMaterias(data));

   // const url2 = "https://rest-api-production-a5bf.up.railway.app/getAllHorarios";
    //fetch(url2)
     // .then((res) => res.json())
     // .then((data) => {
      //  console.log(data);
       // setHorarios(data);
      //});
    //pedir todas las maulas
   // fetch("https://rest-api-production-a5bf.up.railway.app/getAllAulas")
      //.then((res) => res.json())
      //.then((data) => setAulas(data));

    //traer todas las carreas
    fetch("https://rest-api-production-a5bf.up.railway.app/getAllCarreras")
      .then((res) => res.json())
      .then((data) => setCarreras(data));

    //traer todas las auals
    //fetch("https://rest-api-production-a5bf.up.railway.app/getAllAulas")
     // .then((res) => res.json())
      //.then((data) => setAulas(data));

    //fetch("https://rest-api-production-a5bf.up.railway.app/getMaterias_asigandas")
     // .then((res) => res.json())
     // .then((data) => setmMteriasAsignadas(data));
  }, []);

  
  //---------------------------------tablas
  const comprobarSiExiste = async () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar

    console.log(inputIdAula)
    inputIdCarrera.value = "";
    inputCredtios.value = "";
    inputSemestre.value = "";
    inputMateria.value = "";
    inputCupo.value = "";
    inputIdAula.value = "";
    //Creamos la url
    const url = "https://rest-api-production-a5bf.up.railway.app/getJusAtMateria/" + ID_MATERIA;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //Actualizamos los datos en los inputs
        inputIdHorarioMostrar.value = data[0].ID_HORARIO;
        inputCredtios.value = data[0].CREDITOS;
        inputSemestre.value = data[0].SEMESTRE;
        inputMateria.value = data[0].MATERIA;
        inputCupo.value = data[0].CUPO;
        inputIdAula.value = data[0].ID_AULA;
        inputIdCarrera.value = data[0].NOMBRE;

      });

    //VAMOS A DESHABILITAR TODOS LOS INPUT
    if (inputCredtios.materia === "") {
      inputIdMateria.disabled = false;
      inputIdHorarioMostrar.disabled = false;
      inputCredtios.disabled = false;
      inputSemestre.disabled = false;
      inputMateria.disabled = false;
    inputIdCarrera.disabled = false;

      inputCupo.disabled = false;
      inputIdAula.disabled = false;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = false;
    } else {
      inputIdMateria.disabled = true;
    inputIdCarrera.disabled = true;

      inputIdHorarioMostrar.disabled = true;
      inputCredtios.disabled = true;
      inputSemestre.disabled = true;
      inputMateria.disabled = true;
      inputCupo.disabled = true;
      inputIdAula.disabled = true;
      const btnagregar = document.querySelector(".btn-agregar");
      btnagregar.disabled = true;
    }
    setID_MATERIA(0);
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
    okButton.addEventListener("click",async  () => {
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });

      console.log("me diste click");
      console.log(inputs[0]);
      //guardamos los datos de los inputs
      const idHorario = inputs[0].value;
      const idAula = inputs[1].value;
      const idCarrera = inputs[2].value;
      const idMateria = inputs[3].value;
      const creditos = inputs[4].value;
      const cupo = inputs[5].value;
      const semestre = inputs[6].value;

      //recopilamos los inputs
      const inputIdHorario = inputs[0];
      const inputIdAula = inputs[1];
      const inputIdCarrera = inputs[2];
      const inputMateria = inputs[3];
      const inputCreditos = inputs[4];
      const inputCupo = inputs[5];
      const inputSemestre = inputs[6];

      //hacemos la peticion
      if (
        validarCampos(
          inputIdHorario,
          inputIdAula,
          inputIdCarrera,
          inputMateria,
          inputCreditos,
          inputCupo,
          inputSemestre
        )
      ) {
        console.log(
          "id horario: " + idHorario,
          idAula,
          idCarrera,
          idMateria,
          creditos,
          cupo,
          semestre
        );
        await fetch("https://rest-api-production-a5bf.up.railway.app/updateMat/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID_HORARIO: idHorario,
            ID_AULA: idAula,
            ID_CARRERA: idCarrera,
            MATERIA: idMateria,
            CREDITOS: creditos,
            CUPO: cupo,
            SEMESTRE: semestre,
          }),
        });
        window.location.reload();
      }
    });
  };

  const cancelarEvent = () => {
    inputIdMateria.value = "";
    inputIdHorarioMostrar.value = "";
    inputCredtios.value = "";
    inputSemestre.value = "";
    inputMateria.value = "";
    inputCupo.value = "";
    inputIdAula.value = "";
    inputIdCarrera.value = ""

    inputIdCarrera.disabled = false;
    inputIdMateria.disabled = false;
    inputIdHorarioMostrar.disabled = false;
    inputCredtios.disabled = false;
    inputSemestre.disabled = false;
    inputMateria.disabled = false;
    inputCupo.disabled = false;
    inputIdAula.disabled = false;
    const btnagregar = document.querySelector(".btn-agregar");
    btnagregar.disabled = false;
  };

  //
  const eliminarMateria = async (id_materia) => {
    let tieneHijos = false;

    await materiasAsignadas.forEach((materia) => {
      if (materia.Id_Materia === id_materia) {
        tieneHijos = true;
      }
      console.log(materia.Id_Materia + " === " + id_materia);
    });

    if (!tieneHijos) {
      //borramos la materia
      if(confirm('¿Esta seguro que quiere eliminar?'))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/deleteMateria/" + id_materia, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Registro eliminado exitosamente");
          } else {
            console.error("Ocurrió un error al eliminar el registro");
          }
        })
        .catch((error) => console.error(error));
      confirm("Aula eliminada con exito");
      window.location.reload()
      }
    } else {
      confirm("No se puede eliminar, tiene hijos");
    }
  };
  return (
    <div>
      <h1>Agregar Materias</h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="idmateria" className="form-label">
          Id materia
        </label>
        <input
          type="number"
          name="idmateria"
          id="id_materia"
          className="form-control"
          //onBlur={() => comprobarSiExiste()}
          onKeyPress={validarNumeros}
          onChange={(e) => onHandleIdMateria(e)}
        />

        <label htmlFor="carrera" className="form-label">
          Carrera
        </label>
        <select
          className={"form-select mySelect "}
          name='carrera'
          id="id_carreras"
          aria-label="Default select example"
          onChange={(e) => {
            onHandleCarrera(e);
          }}
        >

        {carreras.length >= 1 ? (
          carreras.map((carrera, index) => (
            <option value={carrera.Id_Carrera} className={"opcion-" + index} key={index}>
              {carrera.Nombre}
            </option>
          ))
        ) : (
          <option >No existen Carreras</option>
        )}
      </select>
        

      <label htmlFor="carrera" className="form-label">
          Estatus
        </label>
        <select
          className={"form-select mySelect "}
          name='estatus'
          id="estatus"
          aria-label="Default select example"
          onChange={(e) => onHandleEstatus(e)}

        >

        <option value={1}>Activo</option>
        <option value={2}>Inactivo</option>
        <option value={3}>Pendiente</option>

      </select>
        <label htmlFor="materia" className="form-label">
          Materia
        </label>
        <input
          type="text"
          name="materia"
          id="materia"
          className="form-control"
          onChange={(e) => onHandleMateria(e)}
        />

        <label htmlFor="creditos" className="form-label">
          Creditos
        </label>
        <input
          type="number"
          name="creditos"
          id="creditos"
          onKeyPress={validarNumeros}
          className="form-control"
          onChange={(e) => onHandleCreditos(e)}
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
          onChange={(e) => onHandleSemestre(e)}
        />

        {/*  <label htmlFor="docente" className="form-label">
          Id Docente
        </label>
        <input type="number" name="idDocente" className="form-control" 
        onChange={(e)=> onHandleId_Docente(e)}
        
        /> */}

        <button className="btn btn-danger" onClick={() => cancelarEvent()}>
          Cancelar
        </button>
        <button
          className="btn btn-success m-4 btn-agregar"
          onClick={() => agregarMateria()}
        >
          Agregar!
        </button>
      </form>

      {/*Tabla de nuestras materias existentes */}
      <div className="table-responsive">

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id_Materia</th>
            <th scope="col">Materia</th>
            <th scope="col">Carrera</th>
            <th scope="col">Estatus</th>
            <th scope="col">Creditos</th>
            <th scope="col">Semestre</th>
            <th scope="col">Modificar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {materias.length >= 1 ? (
            materias.map((materia, index) => (
              <tr key={index}>
                <td>
                  <input
                    disabled
                    type="number"
                    defaultValue={materia.Id_Materia}
                    className={"form-control id-" + index}
                  />
                </td>
                <td>
                  <input
                    disabled
                    type="text"
                    defaultValue={materia.Materia}
                    className={"form-control fila-" + index}
                  />
                </td>
                <td>
                  <select
                    className={"form-select nuevoIdAula fila-" + index}
                    aria-label="Default select example"
                    onChange={(e) => {
                      const selectedValueAsNumber = parseInt(e.target.value);
                      console.log(
                        `Valor seleccionado: ${selectedValueAsNumber}`
                      );
                    }}
                    disabled
                  >
                    <option value={materia.Id_Carrera} >
                      {materia.Carrera}
                    </option>
                    {carreras.length >= 1 ? (
                      carreras.map((carrera, index) => (
                        <option
                          value={carrera.Id_Carrera}
                          className={"opcion-" + index}
                          key={index}
                        >
                          {carrera.Carrera}
                        </option>
                      ))
                    ) : (
                      <option>No existen Carreras</option>
                    )}
                  </select>
                </td>
                <td>
                  <select name="estatus" id="estatus" disabled  className={"form-select  fila-" + index}>
                    <option value={1}>Activo</option>
                    <option value={2}>Inactivo</option>
                    <option value={3}>Pendiente</option>
                  </select>
                </td>
                
                <td>
                  <input
                    disabled
                    type="number"
                    onKeyPress={validarNumeros}
                    defaultValue={materia.Creditos}
                    className={"form-control fila-" + index}
                  />
                </td>
                <td>
                  <input
                    disabled
                    type="number"
                    defaultValue={materia.Semestre}
                    onKeyPress={validarNumeros}
                    className={"form-control fila-" + index}
                  />
                </td>

                <td className={"btn-" + index}>
                  <a
                    className={"btn btn-warning modificarButton"}
                    onClick={() => habilitarModificacion(index)}
                  >
                    Modificar
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarMateria(materia.Id_Materia)}
                  >
                    ELiminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            <td><h3 className="m-1 text-danger">No se encontro ningúna materia</h3></td>
          </tr>
            
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};
