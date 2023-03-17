import "../styles/loginPage.css";
import "../fetchPetitions/loginPetition";
import { useState } from "react";
import { loginPetition, loginPetitionEmpleado } from "../fetchPetitions/loginPetition";

//Esta será nuestra pagina de inicio , la cual deberá realizar una peticion a la api comparando si el
//Número de control y la contraseña son correctos

//Llamamos a la petiicion cuando el usuario introduzca los valores

export const LoginPage = () => {
  //Hooks
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  //Obtenemos los datos que el usuario va escribiendo y los vamos gaurdando en los hooks
  const onHandleUsername = (e) => {
    console.log(e.target.value);
    //Modificamos el hook
    setUsername(e.target.value);
  };
  //Obtenemos los datos que el usuario va escribiendo y los vamos gaurdando en los hooks
  const onHandlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  //Eliminamos el usuario cargado anteriormente
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("tieneMaterias");


  //Realizamos las peticions
  //loginPetition(username,password);
  return (
    <div className="loginContainer row d-flex h-100">
      <div className="leftContainer bg-primary col-md-6"></div>
      <div className="rightContainer  col-md-6 text-white d-flex flex-column justify-content-center align-items-center">
        <h4>Inicio de sesión</h4>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995485.png"
          alt=""
        />
        <form
          action=""
          className="d-flex flex-column p-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="radioGroup p-1 d-flex justify-content-around">
            <input
              type="radio"
              id="alumno"
              name="fav_language"
              value="alumno"
              className="form-check-input"
            />
            <label for="alumno">Alumno</label>

            <input
              type="radio"
              id="empleado"
              name="fav_language"
              value="empleado"
              className="form-check-input"
            />
            <label for="empleado">Empleado</label>
          </div>

          <label htmlFor="username" className="mb-3 form-label text-dark">
            Número de control
          </label>
          <input
            type="number"
            name="username"
            className="mt-3 form-control"
            placeholder="Número de control"
            onChange={(e) => {
              onHandleUsername(e);
            }}
          />
          <label htmlFor="password" className="mt-3 form-label text-dark">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            className="mt-3 form-control"
            placeholder="******"
            onChange={(e) => {
              onHandlePassword(e);
            }}
          />
          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              if (document.querySelector("#alumno").checked) {
                loginPetition(username, password);
              }
              else if (document.querySelector("#empleado").checked) {
                loginPetitionEmpleado(username, password);
              }
            }}
          >
            Iniciar sesión
          </button>
        </form>
        <div className="errorContainer"></div>
      </div>
    </div>
  );
};
