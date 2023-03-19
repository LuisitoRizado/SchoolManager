import "../styles/misdatos.css";
import { useEffect, useState } from "react";
import { misDatosPetition } from "../fetchPetitions/misDatosPetition";
import { Alumno } from "../ui/components/Alumno";

export const MisDatos = () => {
  let img;
  const [alumno, setAlumno] = useState([]);
 
  const URL = "http://localhost:3030/getAlumno/" + window.localStorage.getItem("user");
  const fetchUser =  async (URL) => {
   
    //Hacemos la peticion
      await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
        console.log(data);
        setAlumno(data);
      })
      .catch((err) => console.log(err));
  };
   // HOOKS
  useEffect(() => {
    fetchUser(URL);
    //get an image
    
  }, [])
  
    
  

  //Funcion para mostrar la data
  
 

  return (
    <div>
      <h1>Mis datos</h1>
      <hr />
      <div className="infoDiv">
        <div className="profileDiv">
          {/**IMAGEN DEL USUARIO, SÓLO PODRA SER UNA IMAGEN DE INTERNET */}
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt=""
          />
          <div>
            
          </div>
        </div>
        {
          alumno.map(alum =>{
            return (
              <div key={alum}>
                <h3> {alum.Nombre} {alum.AP_PATERNO} {alum.AP_MATERNO}</h3>
            <h4 className="text-primary">Estudiante</h4>
            
            <h3 className='bg-dark text-white'>Datos generales</h3>
            <p><kbd className='bg-danger'>Nombre :</kbd>{alum.Nombre} {alum.AP_PATERNO} {alum.AP_MATERNO} </p>
            <h3 className='bg-dark text-white'>Información escolar</h3>
            <p><kbd className='bg-danger'>Número control:</kbd> {alum.NControl} </p>
            <p><kbd className='bg-danger'>Estatus:</kbd>ACTIVO</p>
            <p><kbd className='bg-danger'>Semestre:</kbd> {alum.SEMESTRE} </p>
            <p><kbd className='bg-danger'>Carrera:</kbd>{alum.Id_Carrera} </p>
            <p><kbd className='bg-danger'>Especialidad:</kbd> {alum.Especialidad }</p>
            <hr/>
        </div>
          )})
        }
        <div className="datosUsuario"></div>
      </div>
    </div>
  );
};
