import { useState, useEffect } from "react";

export const SeleccionarMateriaPage = () => {
  const querystring = window.location.search;
  let estaSeleccionada = false;
  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const materia = params.get("materia");
  console.log(materia);
  let estaCargada;
  //-----Hooks
  const [cargas, setCargas] = useState([]);
  //const [semestre, setSemestre] = useState();
  //URL
  const URL = "https://rest-api-production-a5bf.up.railway.app/getGrupos/" + materia;
  //Peticion
  const consultarMaterias = async () => {
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCargas(data);
        console.log(cargas);
      });
  };
  useEffect(() => {
    consultarMaterias();
  }, []);

  //Con esta función vamos a guarda la materia en el local storage, para que podamos leerlo en la
  //Pagina de materias seleccionadas

  let cargada;
  let carga;
  
  console.log(JSON.parse(window.localStorage.getItem("materias")));
  cargada = JSON.parse(window.localStorage.getItem("materias"));
  console.log(cargada);

  //Obtener todos los id de las materias ya cargadas
  cargada = cargada.map((carga) => carga.ID_MATERIA);
  console.log(cargada);
  
  let nombresMaterias;
  console.log(JSON.parse(window.localStorage.getItem("materias")));
  nombresMaterias = JSON.parse(window.localStorage.getItem("materias"));
  console.log(nombresMaterias);

  //Obtener todos los id de las materias ya cargadas
  nombresMaterias = nombresMaterias.map((carga) => carga.MATERIA);
  console.log(" Materias seleccioandas  :" + nombresMaterias);

  
  let nuevoHorario;
  console.log(JSON.parse(window.localStorage.getItem("materias")));
  nuevoHorario = JSON.parse(window.localStorage.getItem("materias"));
  console.log(nuevoHorario);

  //Obtener todos los horarios de las materias ya cargadas
  nuevoHorario = nuevoHorario.map((carga) => carga.HORA_INICIO_LUNES);
  console.log("NUEVO HORARIO:::" + nuevoHorario)
  const agregarMateriaHorario = (materia) => {
    //Hay que comprobar si ya habia seleccionado la materia con aterioridad
    if (nombresMaterias.includes(materia.MATERIA) || nuevoHorario.includes(materia.HORA_INICIO_LUNES)) {
      //En este caso, quiere decir que ya lo había seleccionado
      //Lo que haremos es que vamos a reemplazar el anterior por el nuevo

      //window.localStorage.setItem('materias', )
      console.log("YA HABIA CARGADO UNA");

      //Si la encuentra, entonces tenemos que reemplazar la antigua por la nueva
      carga = window.localStorage.getItem("materias");
      carga = JSON.parse(carga);

      //Primero la eliminamos
      carga = carga.filter((mat) => mat.MATERIA !== materia.MATERIA);
      //Ahora la agregamos
      carga.push(materia);
      window.localStorage.setItem("materias", JSON.stringify(carga));

      //Recargamos la pagina
      window.location.reload();
      console.log('SE REMPLAZO!')
    } else {
      carga = window.localStorage.getItem("materias");
      carga = JSON.parse(carga);
      //Guardamos el identificador de la materia
      //oBTENEMOS EL ARREGLO

      carga.push(materia);
      window.localStorage.setItem("materias", JSON.stringify(carga));
      console.log(JSON.parse(window.localStorage.getItem("materias")));

      //Recargamos la pagina
      window.location.reload();
    }
  };

  return (
    <div>
      <h4 className="mt-5 text-secondary">
        Selección de materias para el ciclo Enero Junio 2023
      </h4>
      <div className="alert alert-danger mt-4 p-3" role="alert">
        Si el grupo a seleccionar no cumple con los integrantes mínimos se dará
        de baja
      </div>
      <p>Selecciona el grupo en el cuál deseas inscribirte</p>
    <div className="table-responsive">

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-secondary">
            <th scope="col">Seleccionar</th>
            <th scope="col">Materia</th>
            <th scope="col">Profesor</th>
            <th scope="col">Campus</th>
            <th scope="col">Aula</th>
            <th scope="col">Lunes</th>
            <th scope="col">Martes</th>
            <th scope="col">Miercoles</th>
            <th scope="col">Jueves</th>
            <th scope="col">Viernes</th>
          </tr>
        </thead>
        <tbody>
          
          {cargas.length>=1 ? (cargas.map((carga, i) => {
            //Hay que comprobar si la materia ya ha sido seleccionada, en caso de serlo, vamos a deshabilitar el boton
            console.log(carga.ID_MATERIA);

            console.log("asdfs" + window.localStorage.getItem("materias"));
            //Falta comprobar si ya ha seleccionado la materia o no
            console.log(carga.ID_MATERIA);
            if (cargada.includes(carga.ID_MATERIA) || nuevoHorario.includes(carga.HORA_INICIO_LUNES)) {
              console.log("YA ESTABA SELECCIONADA");
              //Aquí significa que sí esta seleccionada
              estaSeleccionada = true;
            } else {
              console.log("NO ESTABA SELECCIONADA");
              //estaSeleccionada = false;
            }

            return (
              <tr key={i}>
                <td>
                  <button
                    className={`btn btn-success ${
                      estaSeleccionada ? "btn-danger disabled" : ""
                    }`}
                    onClick={() => {
                      agregarMateriaHorario(carga);
                    }}
                  >
                    Seleccionar
                  </button>
                </td>
                <td>{carga.MATERIA}</td>
                <td>
                  {carga.NOMBRE_DOCENTE} {carga.AP_PATERNO} {carga.Ap_Materno}
                </td>
                <td>Tec Saltillo</td>

                <td>{carga.AULA}</td>
                <td>
                  {carga.Hora_Inicio} - {carga.Hora_Final}
                </td>
                <td>
                {carga.Hora_Inicio} - {carga.Hora_Final}
                </td>
                <td>
                {carga.Hora_Inicio} - {carga.Hora_Final}
                </td>
                <td>
                {carga.Hora_Inicio} - {carga.Hora_Final}
                </td>
                <td>
                {carga.Hora_Inicio} - {carga.Hora_Final}
                </td>
              </tr>
            );
          })) : (<p>No existen grupos disponibles</p>)}
        </tbody>
      </table>
      </div>
      <button className="btn btn-warning">Regresar</button>
    </div>
  );
};
