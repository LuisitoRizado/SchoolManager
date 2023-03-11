import { useState, useEffect } from "react";
import { validarCampos } from "./validarCampos";
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
  const [ID_MATERIA, setID_MATERIA] = useState();
  const [Id_Carrera, setId_Carrera] = useState();
  const [HORARIO, setHorario] = useState();
  const [AULA, setAula] = useState();
  const [MATERIA, setMateria] = useState();
  const [CREDITOS, setCreditos] = useState();
  const [CUPO, setCupo] = useState();
  const [SEMESTRE, setSemestre] = useState();
  const [Id_Docente, setId_Docente] = useState();
  const [aulas, setAulas] = useState([])
  const [carreras, setCarreras] = useState([])
  //hook para cargar todas las materias existentes
  const [materias, setMaterias] = useState([]);
  const [horarios, setHorarios] = useState([])
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
  const onHandleCupo = (e) => {
    setCupo(e.target.value);
  };
  const onHandleSemestre = (e) => {
    setSemestre(e.target.value);
  };

  const onHandleId_Docente = (e) => {
    setId_Docente(e.target.value);
  };

  const agregarMateria = () => {
    const url = "http://localhost:3030/postMateria";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID_MATERIA: ID_MATERIA,
        HORA: HORARIO,
        AULA: AULA,
        ID_CARRERA: Id_Carrera,
        MATERIA: MATERIA,
        CREDITOS: CREDITOS,
        CUPO: CUPO,
        SEMESTRE: SEMESTRE,
      }),
    });
  };

  //useEffect
  useEffect(() => {
    //Obtener todos los inputs
    inputIdHorarioMostrar = document.querySelector('#id_horario');
    inputIdMateria = document.querySelector("#id_materia");
    //AQUI FALTA DEL ID DE LA CARRERA
    inputIdHorario = document.querySelector(".mySelect");
    inputIdAula = document.querySelector("#id_aula");
    inputMateria = document.querySelector("#materia");
    inputCredtios = document.querySelector("#creditos");
    inputCupo = document.querySelector("#cupo");
    inputSemestre = document.querySelector("#semestre");


    //cargamos los datos
    const url = "http://localhost:3030/getAllMaterias";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMaterias(data));
      
    const url2 = 'http://localhost:3030/getAllHorarios'
    fetch(url2)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setHorarios(data)
    })
    //pedir todas las maulas
    fetch('http://localhost:3030/getAllAulas')
    .then(res=>res.json())
    .then(data=>setAulas(data))

    //traer todas las carreas
    fetch('http://localhost:3030/getAllCarreras')
    .then(res=>res.json())
    .then(data=>setCarreras(data))

  }, []);

  //---------------------------------tablas
  const comprobarSiExiste = () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar

    //Creamos la url
    const url = "http://localhost:3030/getJusAtMateria/" + ID_MATERIA;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //Actualizamos los datos en los inputs
        inputIdHorarioMostrar.value = data[0].ID_HORARIO
        inputCredtios.value = data[0].CREDITOS;
        inputSemestre.value = data[0].SEMESTRE;
        inputMateria.value = data[0].MATERIA;
        inputCupo.value = data[0].CUPO;
        inputIdAula.value = data[0].ID_AULA;
      });
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
    okButton.addEventListener("click", () => {
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
      const inputIdCarrera= inputs[2];
      const inputMateria= inputs[3];
      const inputCreditos= inputs[4];
      const inputCupo= inputs[5];
      const inputSemestre= inputs[6];


      //hacemos la peticion
      if(validarCampos(inputIdHorario,inputIdAula, inputIdCarrera, inputMateria, inputCreditos, inputCupo, inputSemestre))
      {
      console.log('id horario: '+ idHorario, idAula, idCarrera, idMateria, creditos, cupo,semestre)
         fetch("http://localhost:3030/updateMat/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ID_HORARIO": idHorario,
            "ID_AULA": idAula,
            "ID_CARRERA": idCarrera,
            "MATERIA": idMateria,
            "CREDITOS": creditos,
            "CUPO": cupo,
            "SEMESTRE": semestre,
        }),
      });
      window.location.reload();   
    }
    });
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
          className="form-control"
          onBlur={() => comprobarSiExiste()}
          onChange={(e) => onHandleIdMateria(e)}
        />

        <h4 className="mt-3">Carrera</h4>
        <div className="radioGroup p-2 d-flex flex-column justify-content-around">
          <label for="sistemas">Sistemas</label>

          <input
            type="radio"
            id="sistemas"
            name="fav_language"
            value="20"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="gestion">Gestión empresarial</label>

          <input
            type="radio"
            id="gestion"
            name="fav_language"
            value="30"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="industrial">Industrial</label>

          <input
            type="radio"
            id="industrial"
            name="fav_language"
            value="40"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="mecatronica">Mecatrónica</label>

          <input
            type="radio"
            id="mecatronica"
            name="fav_language"
            value="50"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="electronica">Electrónica</label>

          <input
            type="radio"
            id="electronica"
            name="fav_language"
            value="60"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
        </div>

        <label htmlFor="horario" className="form-label">
          Id horario
        </label>
        <input
          type="number"
          name="id_horario"
          id="id_horario"
          className="form-control"
          onChange={(e) => onHandleHorario(e)}
        />

        <label htmlFor="aula" className="form-label">
          Id Aula
        </label>
        <input
          type="number"
          name="id_aula"
          id="id_aula"
          className="form-control"
          onChange={(e) => onHandleAula(e)}
        />

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
          className="form-control"
          onChange={(e) => onHandleCreditos(e)}
        />

        <label htmlFor="cupo" className="form-label">
          Cupo
        </label>
        <input
          type="number"
          name="cupo"
          id="cupo"
          className="form-control"
          onChange={(e) => onHandleCupo(e)}
        />

        <label htmlFor="semestre" className="form-label">
          Semestre
        </label>
        <input
          type="number"
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

        <button className="btn btn-danger">Cancelar</button>
        <button
          className="btn btn-success m-4"
          onClick={() => agregarMateria()}
        >
          Agregar!
        </button>
      </form>

      {/*Tabla de nuestras materias existentes */}
      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id_Materia</th>
            <th scope="col">Id horario</th>
            <th scope="col">Id aula</th>
            <th scope="col">Carrera</th>
            <th scope="col">Materia</th>
            <th scope="col">Creditos</th>
            <th scope="col">Cupo</th>
            <th scope="col">Semestre</th>
            <th scope="col">Modificar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {materias.length >= 1 ? (
            materias.map((materia, index) => (
              <tr key={materia}>
                <td>
                  <input
                    disabled
                    type="number"
                    defaultValue={materia.ID_MATERIA}
                    className={"form-control id-" + index}
                  />
                </td>
                <td>
                <select
                    
                    className={"form-select mySelect fila-"+index}
                    aria-label="Default select example"
                    onChange={(e)=>{
                      const selectedValueAsNumber = parseInt(e.target.value);
                    console.log(`Valor seleccionado: ${selectedValueAsNumber}`);
                    }}
                    
                    disabled
                  >
                    <option value={materia.ID_HORARIO} selected>{materia.HORA_INICIO_LUNES+ ' - ' + materia.HORA_FINAL_LUNES}</option>
                 {
                  horarios.length >= 1 ? (
                    horarios.map((horario,index)=>(
                    
                      <option  value={horario.Id_Horario} className={'opcion-'+index}>{horario.Hora_Inicio_Lunes+ ' - ' + horario.Hora_Final_Lunes}</option>
                    
                    ))
                  
                  ) : (<p>No existen horarios</p>)
                 }
                  </select>
                </td>
                <td>
                <select
                    className={"form-select nuevoIdAula fila-"+index}
                    aria-label="Default select example"
                    onChange={(e)=>{
                      const selectedValueAsNumber = parseInt(e.target.value);
                    console.log(`Valor seleccionado: ${selectedValueAsNumber}`);
                    }}
                    
                    disabled
                  >
                    <option value={materia.ID_AULA} selected>{materia.Nombre}</option>
                 {
                  aulas.length >= 1 ? (
                    aulas.map((aula,index)=>(
                    
                      <option  value={aula.Id_Aula} className={'opcion-'+index}>{aula.Nombre}</option>
                    
                    ))
                  
                  ) : (<p>No existen horarios</p>)
                 }
                  </select>
                </td>
                <td>
                   <select
                    className={"form-select nuevoIdAula fila-"+index}
                    aria-label="Default select example"
                    onChange={(e)=>{
                      const selectedValueAsNumber = parseInt(e.target.value);
                    console.log(`Valor seleccionado: ${selectedValueAsNumber}`);
                    }}
                    
                    disabled
                  >
                    <option value={materia.ID_CARRERA} selected>{materia.NOMBRE}</option>
                 {
                  carreras.length >= 1 ? (
                    carreras.map((carrera,index)=>(
                    
                      <option  value={carrera.ID_CARRERA} className={'opcion-'+index}>{carrera.NOMBRE}</option>
                    
                    ))
                  
                  ) : (<p>No existen Carreras</p>)
                 }
                  </select>
                </td>
                <td>
                  <input
                    disabled
                    type="text"
                    defaultValue={materia.MATERIA}
                    className={"form-control fila-" + index}
                  />
                </td>
                <td>
                  <input
                    disabled
                    type="number"
                    defaultValue={materia.CREDITOS}
                    className={"form-control fila-" + index}
                  />
                </td>
                <td>
                  <input
                    disabled
                    type="number"
                    defaultValue={materia.CUPO}
                    className={"form-control fila-" + index}
                  />
                </td>
                <td>
                  <input
                    disabled
                    type="number"
                    defaultValue={materia.SEMESTRE}
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
                  <button className="btn btn-danger">ELiminar</button>
                </td>
              </tr>
            ))
          ) : (
            <h3 className="m-1 text-danger">No se encontro ningúna materia</h3>
          )}
        </tbody>
      </table>
    </div>
  );
};
