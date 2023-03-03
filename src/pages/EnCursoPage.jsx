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
  const URL = "http://localhost:3030/getCarga/" + alumno;
  //Peticion
  const consultarMaterias =  () => {
     fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //Ordenamos el horario por hora:
        //Cortamos el primer número, en caso de ser dos los cortamos los y los convertirmos a number
        let seEncontro = false;
        let hora;
        /* const arregloConNumerosCortados = data.map((materia)=>{
          //Buscamos los : 
          for(let i = 0 ; materia.HORA_INICIO_LUNES.length; i++){
            //Buscamos el : 
           if(materia.HORA_INICIO_LUNES.charAt(i)===':')
           {
            seEncontro = true;
           }
           if(seEncontro){
            hora = materia.HORA_INICIO_LUNES.slice(0,i);
            break;
           }
          
          }
        }) */
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
    <div>
    <h1>Horario</h1>
        <hr/>
        <p>
        Revisa tus clases!
        </p>
        {/* <div className="horario">
        <div className="diasSemana row">
          <div className="dia col-md-2">Lunes</div>
          <div className="dia col-md-2">Martes</div>
          <div className="dia col-md-2">Miercoles</div>
          <div className="dia col-md-2">Jueves</div>
          <div className="dia col-md-2">Viernes</div>
        </div>
        <div className="contenedorMaterias ">
          {cargas.map(carga=>{
            return (
              <div className="col-md-2 materia shadow" >
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> 9:00 - 10:00 </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.MATERIA}</h6>
                <p className="card-text">Aula: {carga.AULA} </p>
                <p>Profesor: {carga.NOMBRE} {carga.AP_PATERNO} {carga.AP_MATERNO}</p>
               </div>
            </div>
            )
          })}
         
           
            
        </div>
      </div> */}
      <table className="table table-bordered text-center">
        <thead>
          <tr className="bg-body-secondary">
          <th scope="col">LUNES</th>
          <th scope="col">MARTES</th>
          <th scope="col">MIERCOLES</th>
          <th scope="col">JUEVES</th>
          <th scope="col">VIERNES</th>
          </tr>
        </thead>
        <tbody>
        {cargas.map(carga=>{
          
         
            return (
              
              <tr>
              <td>
              <div className=" materia shadow" >
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.HORA_INICIO_LUNES} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.MATERIA}</h6>
                <p className="card-text">Aula: {carga.AULA} </p>
                <p>Profesor: {carga.NOMBRE} {carga.AP_PATERNO} {carga.AP_MATERNO}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.HORA_INICIO_LUNES} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.MATERIA}</h6>
                <p className="card-text">Aula: {carga.AULA} </p>
                <p>Profesor: {carga.NOMBRE} {carga.AP_PATERNO} {carga.AP_MATERNO}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.HORA_INICIO_LUNES} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.MATERIA}</h6>
                <p className="card-text">Aula: {carga.AULA} </p>
                <p>Profesor: {carga.NOMBRE} {carga.AP_PATERNO} {carga.AP_MATERNO}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i> {carga.HORA_INICIO_LUNES} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.MATERIA}</h6>
                <p className="card-text">Aula: {carga.AULA} </p>
                <p>Profesor: {carga.NOMBRE} {carga.AP_PATERNO} {carga.AP_MATERNO}</p>
               </div>
            </div>
            </td>
            <td>
              <div className=" materia shadow" >
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-alarm-fill"></i>{carga.HORA_INICIO_LUNES} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{carga.MATERIA}</h6>
                <p className="card-text">Aula: {carga.AULA} </p>
                <p>Profesor: {carga.NOMBRE} {carga.AP_PATERNO} {carga.AP_MATERNO}</p>
               </div>
            </div>
            </td>
            </tr>
            )
          
            
          })}
        </tbody>
      </table>
    </div>
  )
}
