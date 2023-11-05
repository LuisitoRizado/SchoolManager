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
  const [estatus, setEstatus] = useState()

  //peticiones
  const [aulas, setAulas] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [horarios, setHorarios] = useState([]);



  
  //FUNCIONES PARA LA FUNCIONALIDAD DE LA PAGINA ESTAS PUEDEN SER IMPORTADAS O NO
  const fetchUser = async () => {
    const URL = "https://rest-api-production-a5bf.up.railway.app/getJusAtMateria/" + id;
    //Hacemos la peticion
    await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
        
        console.log(data);
        console.log('hola')
         setMateria(data)
        //obtener todos los valores (LISTO)
        setCarrera(data[0].Id_Carrera);
        setSemestre(data[0].Semestre)
        setCreditos(data[0].Creditos)
        setNombre(data[0].Materia)
        setEstatus(data[0].Estatus)
      })
      .catch((err) => console.log(err));

      //peticiones
      /*const url2 = "https://rest-api-production-a5bf.up.railway.app/getAllHorarios";
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
  */
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
  const onHandleEstatus = (e)=> {
    setEstatus(e.target.value)
  }



  //Funciones para los botones
  const guardarCambios = async () => {
    //Vamos a actualizar la materia con los datos que se cambiaron
    //setMateria(...materia, profesor,hora,aula)
    console.log('NUEVA MATERIA: ' + materia);

    //verificamos los campos
    if(validarCampos(inputMateria, inputCarrera,inputCreditos, inputSemestre)){
      console.log('VALIDADOS!')
      //Vamos a hacer la peticion de update
      console.log(nombre)
      console.log(carrera)
      console.log(creditos)
      console.log(semestre)
      //hacemos la peticion fetch
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateMat/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          ID_CARRERA: carrera,
          MATERIA: nombre,
          CREDITOS: creditos,
          ESTATUS:  estatus,
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
    inputMateria = document.querySelector('#materia')
    inputCreditos = document.querySelector('#creditos')
    inputSemestre = document.querySelector('#semestre')
  
  }, []);

  useEffect(() => {
    inputProfesor = document.querySelector('#profesor')
    inputCarrera = document.querySelector('#id_carreras')
    inputMateria = document.querySelector('#materia')
    inputCreditos = document.querySelector('#creditos')
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
            <option value={mat.Id_Carrera}>{mat.Carrera} </option>

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
        <label htmlFor="estatus" className="form-label">
          Estatus
        </label>
        <select name="estatus" id="estatus" defaultValue={mat.Estatus} className={"form-select mySelect "}>
        <option value={mat.Id_Estatus}>{mat.Estatus}</option>
          <option value={1}>Activo</option>
          <option value={2}>Inactivo</option>
          <option value={3}>Pendiente</option>

        </select>
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
