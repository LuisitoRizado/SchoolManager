import { addUserPetition } from "../petitions/addUserPetition";
import { useState } from "react";
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

  ///-------FIN DE HOOKS

  //La siguiente función nos sirve para ir creando nuestro alumno
  const onHandleNcontrol = (e) => {
    //Convertimos a cadena

    setNcontrol( e.target.value);
    console.log(e.target.value)
  };

  const onHandleCarrera = (e) => {
    setId_Carrera(e.target.value);
    console.log('Carrera: ' + e.target.value)
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

  return (
    <div>
      <form action="" className="mt-5" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="Ncontrol" className="form-label">
          Número de control
        </label>
        <input type="number"
         name="Ncontrol" 
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
            onChange={(event)=>onHandleCarrera(event)}
          />
          <label for="gestion">Gestión</label>

          <input
            type="radio"
            id="gestion"
            name="fav_language"
            value="30"
            className="form-check-input"
            onChange={(event)=>onHandleCarrera(event)}

          />
          <label for="industrial">Industrial</label>

          <input
            type="radio"
            id="industrial"
            name="fav_language"
            value="40"
            className="form-check-input"
            onChange={(event)=>onHandleCarrera(event)}

          />
          <label for="mecatronica">Mecatrónica</label>

          <input
            type="radio"
            id="mecatronica"
            name="fav_language"
            value="50"
            className="form-check-input"
            onChange={(event)=>onHandleCarrera(event)}

          />
          <label for="electronica">Electrónica</label>

          <input
            type="radio"
            id="electronica"
            name="fav_language"
            value="60"
            className="form-check-input"
            onChange={(event)=>onHandleCarrera(event)}

          />
        </div>
        <label htmlFor="nombre" className="form-label mt-3">
          Nombre (s)
        </label>

        <input type="text" name="nombre" className="form-control"  
        onChange={(event) => onHandleNombre(event)}
        />
        <label htmlFor="ap_paterno" className="form-label">
          Apellido Paterno
        </label>

        <input type="text" name="ap_paterno" className="form-control"  
        onChange={(event) => onHandleApPaterno(event)}
        />
        <label htmlFor="ap_materno" className="form-label">
          Apellido materno
        </label>

        <input type="text" name="ap_materno" className="form-control"
        onChange={(event) => onHandleApMaterno(event)}
        />
        <label htmlFor="semestre" className="form-label">
          Semestre
        </label>

        <input type="number" name="semestre" className="form-control"
        onChange={(event) => onHandleSemestre(event)}
        />
        <label htmlFor="periodo" className="form-label">
          Periodo
        </label>

        <input type="text" name="periodo" className="form-control"
        onChange={(event) => onHandlePeriodo(event)}
        />
        <label htmlFor="creditos" className="form-label">
          Créditos disponibles
        </label>

        <input type="text" name="creditos" className="form-control"
        onChange={(event) => onHandleCreditos(event)}
        />
        <label htmlFor="especialidad" className="form-label">
          Especialidad
        </label>

        <input type="text" name="especialidad" className="form-control" 
        onChange={(event) => onHandleEspecialidad(event)}
        />
        <label htmlFor="contrasena" className="form-label">
          Contraseña
        </label>

        <input type="text" name="contrasena" className="form-control" 
        onChange={(event) => onHandleContrasena(event)}
        />
        <button className="btn btn-danger">Cancelar</button>
        <button
          className="btn btn-success m-4"
          //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
          onClick={() => addUserPetition(Ncontrol,Id_Carrera, Nombre,Ap_Paterno,Ap_Matern, Semestre,Periodo, Creditos,Especialidad,Contrasena)}
        >
          Agregar!
        </button>
      </form>
    </div>
  );
};
