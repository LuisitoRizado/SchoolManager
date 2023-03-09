import { addUserPetition } from "../petitions/addUserPetition";
import { useState, useEffect } from "react";
import { validarCampos } from "./validarCampos";
export const AgregarAlumno = () => {
  //Hooks de nuestra aplicacion, inicialmente es un objeto vacio

  //Hacemos un hook para cada atributo del alumno
  const [Ncontrol, setNcontrol] = useState();
  const [Id_Carrera, setId_Carrera] = useState();
  const [Nombre, setNombre] = useState();
  const [Ap_Paterno, setAp_Paterno] = useState();
  const [Ap_Matern, setAp_Matern] = useState();
  const [Semestre, setSemestre] = useState();
  const [Periodo, setPeriodo] = useState();
  const [Creditos, setCreditos] = useState();
  const [Especialidad, setEspecialidad] = useState();
  const [Contrasena, setContrasena] = useState();
  let inputContro,
    inputNombre,
    inputAPaterno,
    inputAMaterno,
    inputSemestre,
    inputPeriodo,
    inputCreditos,
    inputEspecidaldiad,
    inputContrasena;
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

  const agregarAlumno = () =>{
    const url = 'http://localhost:3030/addAlumno'
    if(validarCampos(inputContro, inputNombre, inputAPaterno, inputAPaterno, inputSemestre, inputPeriodo, inputCreditos, inputEspecidaldiad, inputContrasena)){

    fetch(url, {method:"POST", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },body: JSON.stringify({
        "NCONTROL": Ncontrol,
        "ID_CARRERA": Id_Carrera,
        "NOMBRE": Nombre,
        "AP_PATERNO":Ap_Paterno,
        "AP_MATERNO":Ap_Matern,
        "SEMESTRE":Semestre,
        "PERIODO":Periodo,
        "CREDITOS_DISPONIBLES":Creditos,
        "ESPECIALIDAD":Especialidad,
        "CONTRASENA":Contrasena
    })})
    .then((response)=>response.json())
    .then((data)=>console.log('Alumno agregado: ' + data));

    window.location.reload();
}


  }
  return (
    <div>
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="Ncontrol" className="form-label">
          Número de control
        </label>
        <input
          type="number"
          name="Ncontrol"
          id="Ncontrol"
          className="form-control"
          onChange={(event) => onHandleNcontrol(event)}
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
          <label for="gestion">Gestión</label>

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
          name="semestre"
          id="semestre"
          className="form-control"
          onChange={(event) => onHandleSemestre(event)}
        />
        <label htmlFor="periodo" className="form-label">
          Periodo
        </label>

        <input
          type="text"
          name="periodo"
          id="periodo"
          className="form-control"
          onChange={(event) => onHandlePeriodo(event)}
        />
        <label htmlFor="creditos" className="form-label">
          Créditos disponibles
        </label>

        <input
          type="text"
          name="creditos"
          id="creditos"
          className="form-control"
          onChange={(event) => onHandleCreditos(event)}
        />
        <label htmlFor="especialidad" className="form-label">
          Especialidad
        </label>

        <input
          type="text"
          name="especialidad"
          id="especialidad"
          className="form-control"
          onChange={(event) => onHandleEspecialidad(event)}
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
        <button className="btn btn-danger">Cancelar</button>
        <button
          className="btn btn-success m-4"
          //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
          onClick={() =>
            agregarAlumno()
          }
        >
          Agregar!
        </button>
      </form>
    </div>
  );
};
