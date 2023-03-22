import { useState, useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const AdministrarDocentePage = () => {
  const [id_docente, setId_docente] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [todosLosDocente, setTodosLosDocente] = useState([])
  const [materias_asignadas, setmaterias_Asignadas] = useState([])
  
  //-------------FILTRADO
  const filtreredDocente = () =>{
    return docentes.slice(0,5)
  }




  let inputId;
  //---------HANDLERS
  const onHandleDocente = (e) => {
    setId_docente(e.target.value);
  };

  //Metodo para realizar peticion
  const mostrarDocentes =async  () => {
    if(validarCampos(inputId)){
    const url = "https://rest-api-production-a5bf.up.railway.app/getDocente/" + id_docente;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDocentes(data);
      });
    }

  };

  const redirecionamientoPage = () =>{
        window.location.href = "modificarDocente/?id="+id_docente;
  }

  const eliminarDocente = (id_docente) =>{
    //vamos a eliminar el docente seleccionado, solo en caso de que no tenga elementos hijos
    let tieneHijos = false;

    //vamos a recorrer las materias asignadas profesor en busca del id del docente
    materias_asignadas.forEach(materia=>{
      //vamos a buscar en cada materia
      if(materia.Id_Docente==id_docente){
        tieneHijos = true;
      }
    })

    //si no tiene hijos, eliminamos el registro
    if(!tieneHijos){
      //eliminamos
      fetch('https://rest-api-production-a5bf.up.railway.app/deleteADocente/'+id_docente, { method: 'DELETE' })
      .then(response => {
    if (response.ok) {
      console.log('Registro eliminado exitosamente');
    } else {
      console.error('Ocurrió un error al eliminar el registro');
    }
  })
  .catch(error => console.error(error));
    confirm('Docente Eliminado con exito!')
    }
    else{
      confirm('No se puede eliminar, ya que tiene hijos')
    }
  }
  useEffect(() => {
   inputId = document.querySelector('#id_docente')
   fetch('https://rest-api-production-a5bf.up.railway.app/getMaterias_asigandas')
    .then(res=>res.json())
    .then(data=>setmaterias_Asignadas(data))

    //Traer todos los docentes
    fetch('https://rest-api-production-a5bf.up.railway.app/getAllDocentes')
    .then(res=>res.json())
    .then(data=>setTodosLosDocente(data))
  }, [])
  useEffect(() => {
    inputId = document.querySelector('#id_docente')
   }, [id_docente])

  return (
    <div>
      <h1>Administrar docentes</h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Buscar por id docente"
          className="form-control "
          id="id_docente"
          onKeyPress={validarNumeros}
          onChange={(e) => onHandleDocente(e)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => mostrarDocentes()}
        >
          Buscar
        </button>
      </form>
      <hr />
      <h3>Resultados</h3>
      <hr />
      <div className="table-responsive">

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id docente</th>
            <th scope="col">Nombre</th>
            <th scope="col">Ap paterno</th>
            <th scope="col">Ap materno</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {docentes.length >= 1 ? (
            docentes.map((docente, index) => (
              <tr key={index}>
                <td>{docente.Id_Docente}</td>
                <td>{docente.Nombre}</td>
                <td>{docente.AP_PATERNO}</td>
                <td>{docente.AP_MATERNO}</td>
                <td>
                <NavLink
                className={'btn btn-warning'}
                
                
                to={{
                  pathname: 'modificarDocente' ,
                  search: '?id='+id_docente
                }}
              >
                Modificar
              </NavLink>
                  {/* <a onClick={()=> redirecionamientoPage()} className="btn btn-warning">
                    Modificar
                  </a> */}
                </td>
                <td>
                  
                  <a href="" className="btn btn-danger" onClick={()=>eliminarDocente(docente.Id_Docente)}>
                    Eliminar
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td><h1>No existe ese Docente</h1></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};
