export const loginPetition = (usuario, password) => {
  //Construimos la url para el login
  const url = "http://localhost:3030/getLogin/" + usuario + "/" + password;
  //Hacemos la peticion a la API
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(' info:::', data);
      //Pasamos a la siguiente pagina de inicio
      let obj = new Object();
      
      if(Object.entries(data).length!==0){
      window.location.href = "user/inicio/?usuario=" + usuario;
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
};
export const loginPetitionEmpleado = (usuario, password) => {
  //Construimos la url para el login
  const url = "http://localhost:3030/getEmpleado/" + usuario + "/" + password;
  //Hacemos la peticion a la API
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(' info:::', data);
      //Pasamos a la siguiente pagina de inicio
      let obj = new Object();
      
      if(Object.entries(data).length!==0){
      window.location.href = "empleado/inicio/?usuario=" + usuario;
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
};
