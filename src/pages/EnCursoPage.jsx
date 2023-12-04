import '../styles/horario.css'
import { useState,useEffect } from 'react';
export const EnCursoPage = () => {
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const alumno = window.localStorage.getItem('user');
  console.log(alumno);
  
  //-----Hooks
  const [cargas, setCargas] = useState([]);
  //const [semestre, setSemestre] = useState();
  //URL
  const URL = "https://rest-api-production-a5bf.up.railway.app/getCarga/" + alumno;
  //Peticion
  const consultarMaterias =  async () => {
     await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //Ordenamos el horario por hora:
        //Cortamos el primer número, en caso de ser dos los cortamos los y los convertirmos a number
        let seEncontro = false;
        let hora;
     
        data.sort((o1,o2)=>{
          
          if(o1.HORA_INICIO_LUNES>o2.HORA_INICIO_LUNES){
            return -1;
          }
          else if(o1.HORA_INICIO_LUNES<o2.HORA_INICIO_LUNES){
            return 1;
          }
          else{
            return 0;
          }
        })
        setCargas(data);
      });
  };

  useEffect(() => {
    consultarMaterias();
  }, []);

  return (
    <div className='p-5'>
    <h1>Horario</h1>
        <hr/>
        <p>
        Revisa tus clases!
        </p>
       
    <div className="table-responsive">

      <table className="table table-bordered text-center">
        <thead className='bg-success text-white'>
          <tr className="bg-body-secondary">
          <th scope="col">LUNES</th>
          <th scope="col">MARTES</th>
          <th scope="col">MIERCOLES</th>
          <th scope="col">JUEVES</th>
          <th scope="col">VIERNES</th>
          </tr>
        </thead>
        <tbody>
        {cargas.map((carga,index)=>{
          
         
            return (
              
              <tr key={index}>
              <td>
              <div className=" materia shadow" >
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.Nombre_Materia} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.Hora_Inicio} - {carga.Hora_Final}</h6>
                <p className="card-text">Aula: {carga.Nombre_Aula} </p>
                <p>Profesor: {carga.Nombre_Docente} {carga.Paterno_Docente} {carga.Materno_Docente}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
              <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.Nombre_Materia} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.Hora_Inicio} - {carga.Hora_Final}</h6>
                <p className="card-text">Aula: {carga.Nombre_Aula} </p>
                <p>Profesor: {carga.Nombre_Docente} {carga.Paterno_Docente} {carga.Materno_Docente}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
              <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.Nombre_Materia} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.Hora_Inicio} - {carga.Hora_Final}</h6>
                <p className="card-text">Aula: {carga.Nombre_Aula} </p>
                <p>Profesor: {carga.Nombre_Docente} {carga.Paterno_Docente} {carga.Materno_Docente}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
              <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.Nombre_Materia} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.Hora_Inicio} - {carga.Hora_Final}</h6>
                <p className="card-text">Aula: {carga.Nombre_Aula} </p>
                <p>Profesor: {carga.Nombre_Docente} {carga.Paterno_Docente} {carga.Materno_Docente}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
              <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.Nombre_Materia} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.Hora_Inicio} - {carga.Hora_Final}</h6>
                <p className="card-text">Aula: {carga.Nombre_Aula} </p>
                <p>Profesor: {carga.Nombre_Docente} {carga.Paterno_Docente} {carga.Materno_Docente}</p>
               </div>
            </div>
            </td>
            </tr>
            )
          
            
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}
