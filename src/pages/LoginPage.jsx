import "../styles/loginPage.css";
import "../fetchPetitions/loginPetition";
import { useState,useEffect } from "react";
import { loginPetition, loginPetitionEmpleado } from "../fetchPetitions/loginPetition";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { validarCampos, validarNumeros } from "../Docentes/pages/validarCampos";

//Esta será nuestra pagina de inicio , la cual deberá realizar una peticion a la api comparando si el
//Número de control y la contraseña son correctos

//Llamamos a la petiicion cuando el usuario introduzca los valores
let btnNav;
let inputUsuario;
let inputPassword;
export const LoginPage = () => {
  const navigate = useNavigate();

  //Hooks
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
 
  btnNav = document.querySelector('.btnLogin')
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


  const onLogoIn = () => {
    
      navigate("/user/inicio/?usuario="+username, {
        replace: true,
      });
    
 
  };
  const onLogInEmpleado = () => {
    
    window.localStorage.setItem('user', username)
      navigate("/empleado/inicio/?usuario="+username, {
        replace: true,
      });
    
    
  };
  const onLogInDocente = () => {
    
    navigate("/profesor/inicio/?usuario="+username, {
      replace: true,
    });
  
  
};
  useEffect(() => {
    inputUsuario = document.querySelector('#usuario')
    inputPassword = document.querySelector('#password')
    
   }, [])
  //Realizamos las peticions
  //loginPetition(username,password);
  return (
    <div className="loginContainer row d-flex  shadow border border">
      <div className="rightContainer  col-md-6  d-flex flex-column justify-content-center align-items-center">
        <h4>Inicio de sesión</h4>
        <img
          src="https://saltillo.tecnm.mx/innovatecnm/images/tec-footer.png"
          alt=""
        />
        <form
          action=""
          className="d-flex flex-column p-3"
          onSubmit={(e) => e.preventDefault()}
        >
           

          <label htmlFor="username" className="mb-3 form-label text-dark">
            Usuario
          </label>
          <input
            type="number"
            id="usuario"
            name="username"
            onKeyPress={validarNumeros}
            className="mt-3 form-control form-control-lg"
            placeholder="Usuario"
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
            id="password"
            className="mt-3 form-control"
            placeholder="******"
            onChange={(e) => {
              onHandlePassword(e);
            }}
          />
          <NavLink
            className="btn btn-primary mt-4 btnLogin"
            onClick={async() => {
              let isValid = false;
              //Nueva  busqueda de inicio de sesion
              const url = "https://rest-api-production-a5bf.up.railway.app/getLogin/" + username + "/" + password;
              await fetch(url)
              .then((res) => res.json())
              .then((data) => {
                console.log(' info:::', data);
                //Pasamos a la siguiente pagina de inicio
                let obj = new Object();
                
                if(Object.entries(data).length!==0){
                  /*  btnNav.to = {
                    pathname:'user/inicio',
                    search: "?usuario=" + username
                  }  */
                  isValid = true;
                }
                console.log(btnNav)
              })
              .catch((err) => {
                console.log(err);
                //En caso de que no exista , tendremos que colocar un anuncio de que no se encuentra ningun alumno con esa informacion
               /*  const mensajeErorr =
                  document.createElement(`<div class="alert alert-primary" role="alert">
                A simple primary alert—check it out!
              </div>`);
                document.querySelector(".errorContainer").innerHTML = mensajeErorr; */
              });
              if(isValid){
                onLogoIn()

              }
              else{
                const url = "https://rest-api-production-a5bf.up.railway.app/getEmpleado/" + username + "/" + password;
                window.localStorage.setItem('password', password)
                //Hacemos la peticion a la API
                await fetch(url)
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(' info:::', data);
                    //Pasamos a la siguiente pagina de inicio
                    let obj = new Object();
                    
                    if(Array.isArray(data)){
                    //window.location.href = "empleado/inicio/?usuario=" + usuario;
                      isValid = true
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    //En caso de que no exista , tendremos que colocar un anuncio de que no se encuentra ningun alumno con esa informacion
                   /*  const mensajeErorr =
                      document.createElement(`<div class="alert alert-primary" role="alert">
                    A simple primary alert—check it out!
                  </div>`);
                    document.querySelector(".errorContainer").innerHTML = mensajeErorr; */
                  });
                  if(isValid){
                    onLogInEmpleado()
                  }
                  else{
                     //loginPetitionEmpleado(username, password);
                 const url = "https://rest-api-production-a5bf.up.railway.app/getProfesor/" + username + "/" + password;
                 //Hacemos la peticion a la API
                 await fetch(url)
                   .then((res) => res.json())
                   .then((data) => {
                     console.log(' info:::', data);
                     //Pasamos a la siguiente pagina de inicio
                     let obj = new Object();
                     
                     if(Array.isArray(data)){
                     //window.location.href = "empleado/inicio/?usuario=" + usuario;
                      isValid = true;
                     }
                   })
                   if (isValid){
                    onLogInDocente()
                   }
                   else{
                    alert("Usuario o contrasena no validos")
                   }
                  }
              }

    }}
          >
            Iniciar sesión
          </NavLink>
        </form>
        <div className="errorContainer"></div>
      </div>
      <div className="leftContainer bg-primary col-md-6">
      </div>
    </div>
  );
};
