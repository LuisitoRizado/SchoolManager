//En este archivo administraremos todo lo relacionado con el Local Stogage
 const localStorage = window.localStorage;

//Vamos a modificar el atributo de usuario, el cual será el que estará logeado
export const cargarUsuario = (usuario) =>{
    localStorage.setItem('user', usuario);
    
}