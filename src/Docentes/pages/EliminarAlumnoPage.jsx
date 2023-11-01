import { AlumnoEncontrado } from "../components/AlumnoEncontrado";
import { useState, useEffect } from "react";
import { validarNumeros } from "./validarCampos";

export const EliminarAlumnoPage = () => {
  const [ncontrol, setNcontrol] = useState([]);

  const onHandleNControl = (e) => {
    setNcontrol(e.target.value);
  };

  const [alumno, setAlumno] = useState([]);

  const URL = "https://rest-api-production-a5bf.up.railway.app/getAlumno/" + ncontrol;
  const fetchUser = async (URL) => {
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
  // METODO PARA MOSTRAR ALUMNOS
  const mostrarAlumno = () =>{
    fetchUser(URL);
  }
  //METODO PARA ELIMINAR ALUMNOS.
  const eliminarAlumno = (ncontrol) =>{
    //vamos a pedir la peticion al http de delte en la base de datos
    //Nos va a pasar como parametros el numero de control del alumno
    //Ok ahora podemos hacer la peticion al servidor
    const url = 'https://rest-api-production-a5bf.up.railway.app/deleteAlumno/'+ncontrol;
    
    //hacemos el fetch a la api

    //Primero preguntamos si esta seguo de que quiere elimnar el alumno
    if(confirm('¿Estás seguro de que quieres eliminar este alumno?'))
    {
      //En caso de que diga que si , entonces, lo eliminamos
      fetch(url, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data)=>console.log('Eliminado : ' + data))
      confirm('Alumno eliminado con exito!')
      window.location.reload();
    }
    else{
      //De lo contrario no hacemos nada
      return;
    }


    //

  }
  return (
    <div>
      {/*El siguiente formulario es para los filtros de busqueda */}
      <form action="" className="mt-5" onSubmit={(e) =>e.preventDefault()}>
        <input
          type="number"
          placeholder="Buscar por Número de control"
          className="form-control"
          onKeyPress={validarNumeros}
          onChange={(e) => onHandleNControl(e)}
        />
        <button className="btn btn-primary mt-2" onClick={()=> mostrarAlumno()}>Buscar</button>
      </form>
      <hr />
      <h3>Resultados</h3>
      <hr />
      <div className="table-responsive">
      <table className="table  table-bordered table-responsive table-container">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Numero de control</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Semestre</th>
            <th scope="col">Carrera</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
            {
                alumno.length>=1 ? alumno.map((alumno)=>(
                  <tr key={alumno}>
                  <td>{alumno.NControl}</td>
                  <td>{alumno.Nombre}</td>
                  <td>{alumno.Ap_Paterno}</td>
                  <td>{alumno.Ap_Materno}</td>
                  <td>{alumno.Semestre}</td>
                  <td>{alumno.Carrera}</td>
                  <td><button className="btn btn-danger" onClick={() => eliminarAlumno(alumno.NControl)}>Eliminar</button></td>
                </tr>
              )) : 
              <tr>
                <td>
              <h3 className="m-1 text-danger">No se encontro ningún alumno con ese número de control</h3>
              </td>
              </tr>
            }
        
        </tbody>
      </table>
      </div>
    </div>
  );
};
