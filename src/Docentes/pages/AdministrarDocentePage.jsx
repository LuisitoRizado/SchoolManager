import { useState, useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
export const AdministrarDocentePage = () => {
  const [id_docente, setId_docente] = useState([]);
  const [docentes, setDocentes] = useState([]);

  const [materias_asignadas, setmaterias_Asignadas] = useState([])

  let inputId;
  //---------HANDLERS
  const onHandleDocente = (e) => {
    setId_docente(e.target.value);
  };

  //Metodo para realizar peticion
  const mostrarDocentes = () => {
    if(validarCampos(inputId)){
    const url = "http://localhost:3030/getDocente/" + id_docente;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
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
      if(materia.ID_DOCENTE==id_docente){
        tieneHijos = true;
      }
    })

    //si no tiene hijos, eliminamos el registro
    if(!tieneHijos){
      //eliminamos
      fetch('http://localhost:3030/deleteADocente/'+id_docente, { method: 'DELETE' })
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
   fetch('http://localhost:3030/getMaterias_asigandas')
    .then(res=>res.json())
    .then(data=>setmaterias_Asignadas(data))
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
            docentes.map((docente) => (
              <tr key={docente}>
                <td>{docente.Id_Docente}</td>
                <td>{docente.Nombre}</td>
                <td>{docente.AP_PATERNO}</td>
                <td>{docente.AP_MATERNO}</td>
                <td>
                  <a onClick={()=> redirecionamientoPage()} className="btn btn-warning">
                    Modificar
                  </a>
                </td>
                <td>
                  <a href="" className="btn btn-danger" onClick={()=>eliminarDocente(docente.Id_Docente)}>
                    Eliminar
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <h1>No existe ese Docente</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};
