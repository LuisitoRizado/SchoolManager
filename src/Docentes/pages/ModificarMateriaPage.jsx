import { set } from "lodash";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { validarNumeros,validarCampos } from "./validarCampos";
let inputProfesor, inputHora, inputAula, inputId, inputCarrera,inputMateria,inputCreditos, inputCupo, inputSemestre;

export const ModificarMateriaPage = () => {
  //Leemos el query params de la url
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const id = params.get("id");
  console.log(id);
  //HOOKS DE NUESTRA APLICACION
  const [materia, setMateria] = useState([]);
  const [profesor, setProfesor] = useState();
  const [hora, setHora] = useState();
  const [aula, setAula] = useState();
  const [carrera, setCarrera] = useState()
  const [nombre, setNombre] = useState()
  const [creditos, setCreditos] = useState()
  const [cupo, setCupo] = useState()
  const [semestre, setSemestre] = useState()
  //peticiones
  const [aulas, setAulas] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [horarios, setHorarios] = useState([]);


  
  //FUNCIONES PARA LA FUNCIONALIDAD DE LA PAGINA ESTAS PUEDEN SER IMPORTADAS O NO
  const fetchUser = async () => {
    const URL = "https://rest-api-production-a5bf.up.railway.app/getMateria/" + id;
    //Hacemos la peticion
    await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
        
        console.log(data);
        console.log('hola')
         setMateria(data.slice(0,1))
        //obtener todos los valores (LISTO)
        setCarrera(data[0].Id_Carrera);
        setAula(data[0].Id_Aula);
        setHora(data[0].Id_Horario)
        setCupo(data[0].Cupo)
        setSemestre(data[0].Semestre)
        setCreditos(data[0].Creditos)
        setNombre(data[0].Materia)
      })
      .catch((err) => console.log(err));

      //peticiones
      const url2 = "https://rest-api-production-a5bf.up.railway.app/getAllHorarios";
      await fetch(url2)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHorarios(data);
        });
      //pedir todas las maulas
      await fetch("https://rest-api-production-a5bf.up.railway.app/getAllAulas")
        .then((res) => res.json())
        .then((data) => setAulas(data));
  
      //traer todas las carre
      await fetch("https://rest-api-production-a5bf.up.railway.app/getAllCarreras")
        .then((res) => res.json())
        .then((data) => setCarreras(data));
  };

  //Funciones para los datos que modifique
  const onHandleProfesor = (e) => {
    setProfesor(e.target.value);
  };
  const onHandleHora = (e) => {
    setHora(e.target.value);
    console.log(hora)
  };
  const onHandleAula = (e) => {
    setAula(e.target.value);
    console.log(aula)
  };
  const onHandleCreditos = (e) => {
    setCreditos(e.target.value);
    console.log(creditos)
  };
  //-----handlers

  const onHandleNombreMateria = (e) =>{
    setNombre(e.target.value)
    console.log(nombre)
  }
  const onHandleCupo = (e) => {
    setCupo(e.target.value);
    console.log(cupo)
  };
  const onHandleSemestre = (e) => {
    setSemestre(e.target.value);
    console.log(semestre)
  };
  const onHandleCarrera = (e) => {
    setCarrera(e.target.value);
    console.log(carrera)
  };

  const onHandleHorario = (e) => {
    setHorario(e.target.value);
  };



  //Funciones para los botones
  const guardarCambios = async () => {
    //Vamos a actualizar la materia con los datos que se cambiaron
    //setMateria(...materia, profesor,hora,aula)
    console.log('NUEVA MATERIA: ' + materia);

    //verificamos los campos
    if(validarCampos(inputMateria, inputCarrera, inputAula, inputHora, inputCreditos, inputCupo, inputSemestre)){
      console.log('VALIDADOS!')
      //Vamos a hacer la peticion de update
      console.log(nombre)
      console.log(carrera)
      console.log(aula)
      console.log(hora)
      console.log(creditos)
      console.log(cupo)
      console.log(semestre)
      //hacemos la peticion fetch
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateMat/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          ID_HORARIO: hora,
          ID_AULA: aula,
          ID_CARRERA: carrera,
          MATERIA: nombre,
          CREDITOS: creditos,
          CUPO: cupo,
          SEMESTRE: semestre
        }),
      });
      //recargarmos la página
      window.location.reload()
    }
    //hacemos la peticion fetch
    
  };

  //use Effect
  useEffect(() => {
    fetchUser();
    inputProfesor = document.querySelector('#profesor')
    inputCarrera = document.querySelector('#id_carreras')
    inputHora = document.querySelector('#id_horario')
    inputAula = document.querySelector('#id_aula')
    inputMateria = document.querySelector('#materia')
    inputCreditos = document.querySelector('#creditos')
    inputCupo = document.querySelector('#cupo')
    inputSemestre = document.querySelector('#semestre')
  
  }, []);

  useEffect(() => {
    inputProfesor = document.querySelector('#profesor')
    inputCarrera = document.querySelector('#id_carreras')
    inputHora = document.querySelector('#id_horario')
    inputAula = document.querySelector('#id_aula')
    inputMateria = document.querySelector('#materia')
    inputCreditos = document.querySelector('#creditos')
    inputCupo = document.querySelector('#cupo')
    inputSemestre = document.querySelector('#semestre')
  }, [profesor, hora,aula,carrera, materia,cupo,semestre,creditos]);
  

  return (
    <div>
      <h1>Modificación de materias</h1>
      <hr />
      {materia.map((mat) => {
        return (
          <form action="" className="mt-4" onSubmit={(e)=>e.preventDefault()}>
            {/*Id de la materia */}
            <label htmlFor="" className="form-label">
              Id materia
            </label>
            <input
              type="text"
              name="id"
              id="id"
              placeholder={mat.Id_Materia}
              className="form-control disabled"
              disabled={true}
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
            <option value={mat.Id_Carrera}>{mat.Nombre_Carrera} </option>

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
      <label htmlFor="horario" className="form-label">
          Id horario
        </label>
        <select
          className={"form-select mySelect "}
          id="id_horario"
          aria-label="Default select example"
          onChange={(e) => {
            onHandleHora(e);
          }}
        >
            <option value={mat.Id_Horario}>{mat.Hora_Inicio_Lunes + " - " + mat.Hora_Final_Lunes} </option>

          {horarios.length >= 1 ? (
            horarios.map((horario, index) => (
              <option value={horario.Id_Horario} className={"opcion-" + index} key={index}>
                {horario.Hora_Inicio_Lunes + " - " + horario.Hora_Final_Lunes}
              </option>
            ))
          ) : (
            <option >No existen horarios</option>
          )}
        </select>

        <label htmlFor="aula" className="form-label">
          Id Aula
        </label>
        <select
          className={"form-select mySelect "}
          id="id_aula"
          aria-label="Default select example"
          onChange={(e) => {
            onHandleAula(e);
          }}
        >
            <option value={mat.Id_Aula}>{mat.Aula} </option>

          {aulas.length >= 1 ? (
            aulas.map((aula, index) => (
              <option value={aula.Id_Aula} className={"opcion-" + index} key={index}>
                {aula.Nombre}
              </option>
            ))
          ) : (
            <option >No existen horarios</option>
          )}
        </select>

            {/*Nombre de la materia. */}
            <label htmlFor="" className="form-label">
              Nombre materia
            </label>
            <input
              type="text"
              name="materia"
              id="materia"
              className="form-control"
              onChange={(e)=>onHandleNombreMateria(e)}
              defaultValue={mat.Materia}
            />
            {/*Profesor que imparte la materia */}
            <label htmlFor="creditos" className="form-label">
          Creditos
        </label>
        <input
          type="number"
          name="creditos"
          id="creditos"
          onKeyPress={validarNumeros}
          className="form-control"
          defaultValue={mat.Creditos}
          onChange={(e) => onHandleCreditos(e)}
        />
            {/*Hora de la materia */}
           
            {/*Aula donde se imparte la materia */}
            <label htmlFor="cupo" className="form-label">
          Cupo
        </label>
        <input
          type="number"
          name="cupo"
          id="cupo"
          onKeyPress={validarNumeros}
          className="form-control"
          defaultValue={mat.Cupo}

          onChange={(e) => onHandleCupo(e)}
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
          defaultValue={mat.Semestre}

          onChange={(e) => onHandleSemestre(e)}
        />
            <button
              className="btn btn-danger m-2"
              
            >
              Cancela
            </button>
            <button className="btn btn-success m-2" onClick={() => guardarCambios()}>Confirmar</button>
          </form>
        );
      })}
    </div>
  );
};
