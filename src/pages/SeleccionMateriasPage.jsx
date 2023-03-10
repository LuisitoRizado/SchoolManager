import { useState, useEffect } from "react";

export const SeleccionMateriasPage = () => {
  document.addEventListener('DOMContentLoaded', () =>{
    window.location.reload()
  })
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const sem = params.get("semestre");
  console.log(sem);
  //-----Hooks
  const [materias, setMaterias] = useState([]);
  const [cargadas, setCargadas] = useState([]);
  //El siguiente hook tendra las horas ya seleccionadas en el horario
  const [horariosReservados, setHorariosReservados] = useState([]);

  //const [semestre, setSemestre] = useState();
  //URL
 
  //Peticion
  const consultarMaterias =  (semestre) => {
    const URL = "http://localhost:3030/getMaterias/" + semestre;
     fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMaterias(data);
      });
      
  };

  let carga = [];
  

  let horarios = []

  //Hay que checar si existe o no materias cargadas previamente

  //Vamos a crear o leer los datos de nuestro horario
  if(window.localStorage.getItem('materias')===null){
    //Si esta nulo, lo creamos un arreglo
    window.localStorage.setItem('materias', JSON.stringify([]));
    carga = window.localStorage.getItem('materias');
    carga =JSON.parse(carga);
    setCargadas(window.localStorage.getItem('materias'))
    console.log(carga);
    console.log('NO ESTABA CARGADO')
  }
  else{
    //Si ya existe uno entonces lo cargamos
   
  
    carga = window.localStorage.getItem('materias')
    carga = JSON.parse(carga)
    horarios = carga.map((materia)=>materia.HORA_FINAL_LUNES); 

  //console.log('aaa' + array[1])
    console.log('mateiras:::' + carga)
    console.log('YA ESTABA CARGADO')

  }

  //vamos a obtener los horarios 
  window.localStorage.setItem('horarios', horarios);
  console.log( window.localStorage.getItem('horarios'))
  //Consultar materias
  const onHandleMaterias = (semestre) => {
    consultarMaterias(semestre);
  };

  //Eliminar materia metodo
  const eliminarMateria = (materia) =>{
    //Vamos a recorrer la carga en busca de esa materia
    carga = carga.filter((mat)=>  mat.ID_MATERIA!=materia);

    window.localStorage.setItem('materias', JSON.stringify(carga))

    console.log('Eliminada: '+carga);
    
  }

  //Metodo apra guardar el horario en la base de datos
  const guardarHorario = () =>{
    //Primero cargamos las materias del localStorage
    let materias = window.localStorage.getItem("materias")
    //La convertirmos a arreglo
    materias = JSON.parse(materias);
    //Lo imprimimos
    console.log(materias);

    //Por cada materia que haya, hacemo una peticion a la api
    materias.forEach(materia => {
        //Hacemos la peticion y lo vamos guardando.
        fetch('http://localhost:3030/addCarga' , {method:'POST' , headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }, body: JSON.stringify({
          "Id_Carga":Math.floor(Math.random() * 100000) + 1,
          "Ncontrol": window.localStorage.getItem('user'),
          "Id_DocxMath":materia.AULA,
          "Calificacion":null
      })
      })
    });
    //Recargamos la pagina y limpiamos las materias
    window.localStorage.setItem('materias', JSON.stringify([]));
    window.location.reload(2);
  }

  
  
 

  //Metodo que comprueba si el alumno tiene materias cargadas o no, en caso de si tenerlas, 
  //Entonces deber??a de aparecer un mensaje en la pagina de que no te deje hacer horario

  const comprobarSiTieneCarga =  () =>{
    let tieneMaterias ;
    fetch('http://localhost:3030/getCarga/'+ window.localStorage.getItem('user'))
    .then((response) => response.json())
    .then((data) => {
      console.log(data.length)
      if(data.length>0){
        window.localStorage.setItem('tieneMaterias', 'true')
      }
      else{
        window.localStorage.setItem('tieneMaterias', 'false')

      }
    })
    console.log(" asdfasdf " + carga)
    //Tenemos que hacer una peticion con el n??mero de control del alumno
    if(window.localStorage.getItem('tieneMaterias')==='true'){
      //Mostramos un mensaje que diga que ya est?? cargado su horario

      return(<h1>Ya tienes un horario asignado para este periodo</h1>)
    }
    else{
      return(
        <>
        <div className="materiasSeleccionadas shadow border border-dark mt-5">
        <h4 className="text-center bg-body-secondary">
          Grupos seleccionados por el momento.
        </h4>
        <table className="table table-bordered text-center">
          <thead>
            <tr className="bg-body-secondary">
              <th scope="col">Eliminacion</th>
              <th scope="col">Materia</th>
              <th scope="col">Profesor</th>
              <th scope="col">Lunes</th>
              <th scope="col">Martes</th>
              <th scope="col">Miercoles</th>
              <th scope="col">Jueves</th>
              <th scope="col">Viernes</th>
            </tr>
          </thead>
          <tbody>
            
            {
              //Vamos a recorrer el arreglo del localstorage con nuestras materias...
              carga.map((materia)=>{
                return(
                  <>
                <tr>
                <td><button className="btn btn-danger" onClick={()=>{ 
                  eliminarMateria(materia.ID_MATERIA)
                   window.location.reload()}}>Eliminar</button></td>
                <td>{materia.MATERIA}</td>
                <td>{materia.NOMBRE} {materia.AP_PATERNO} {materia.AP_MATERNO}</td>
                <td>{materia.HORA_FINAL_LUNES}</td>
                <td>{materia.HORA_FINAL_LUNES}</td>
                <td>{materia.HORA_FINAL_LUNES}</td>
                <td>{materia.HORA_FINAL_LUNES}</td>
                <td>{materia.HORA_FINAL_LUNES}</td>

                

              </tr>
              </>
                )
              })
            }
         
           
         
           
          </tbody>
        </table>
        <button className="btn btn-success p-2 m-2" onClick={() => guardarHorario()}>Guardar Horario</button>
      </div>

      <div className="btn-group mt-4">
        <button className="btn btn-secondary btn-lg" type="button">
          Selecciona un semestre
        </button>
        <button
          type="button"
          className="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={() => onHandleMaterias(1)}>1</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => onHandleMaterias(2)}>2</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => onHandleMaterias(3)}>3</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => onHandleMaterias(4)}>4</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() =>onHandleMaterias(5)}>5</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() =>onHandleMaterias(6)}>6</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() =>onHandleMaterias(7)}>7</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => onHandleMaterias(8)}>8</button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => onHandleMaterias(9)}>9</button>
          </li>
        </ul>
      </div>
      <table className="table mt-5 table-bordered">
        <thead>
          <tr>
            <th scope="col">Id Materia</th>
            <th scope="col">Materia</th>
            <th scope="col">Cupo</th>
            <th scope="col">Cr??ditos</th>
            <th scope="col">Semestre</th>

            
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          
            {
              materias.map((materia)=>{
                return(
                  <>
                  <tr key={materia}>
                  <td>{materia.ID_MATERIA}</td>
                  <td>{materia.MATERIA}</td>
                  <td>{materia.CUPO}</td>
                  <td>{materia.CREDITOS}</td>
                  <td>{materia.SEMESTRE}</td>

                  
                  <td>
                    
                    <a href={"seleccionarMateria?materia=" + materia.MATERIA} className="btn btn-primary">
                      Ver grupos
                    </a>
                  </td>
                  </tr>
                  </>
                )
              })
         
            }
          
        </tbody>
      </table></>
      )
    }
  }

  return (
   
    <>
      {comprobarSiTieneCarga()}
    </>
  );
};
