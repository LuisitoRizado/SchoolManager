import React from 'react'
import { useState,useEffect } from 'react'
import { validarCampos } from './validarCampos'
export const AdministrarAulaPage = () => {

    //----------HOOKS
    const [aulas, setAulas] = useState([])
    const [id_aula, setId_aula] = useState()
  const [materias, setMaterias] = useState([]);

    let inputId;
    //---------HANDLERS
    const onHandleIdAula = (e) =>{
        //Capturamos el id que ingrese el usuario
        setId_aula(e.target.value);
    }

    //-----FUNCTIONS
    const searchAula = () =>{
      
      if(validarCampos(inputId)){
        const url = 'http://localhost:3030/getAula/' + id_aula;
        fetch(url)
        .then(res => res.json())
        .then(data => setAulas(data))
      }
    }

    const redirecionamientoPage = (id_aula) =>{
      console.log('Me diste click')
      window.location.href = 'modificarAula/?id='+id_aula
      
    }

    const eliminarAula = (id_aula) => {
      let tieneHijos = false;
      //recorremos todas las materias en busca del id del aula
      console.log("clikeaste");
      materias.forEach((materia) => {
        if (materia.ID_AULA === id_aula) {
          tieneHijos = true;
        }
      });
  
      //Si no tiene hijos
      if (!tieneHijos) {
        //borramos la materia
        fetch("http://localhost:3030/deleteAula/" + id_aula, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              console.log("Registro eliminado exitosamente");
            } else {
              console.error("Ocurrió un error al eliminar el registro");
            }
          })
          .catch((error) => console.error(error));
          confirm('Aula eliminada con exito')
      } else {
        confirm("No se puede eliminar, tiene hijos");
      }
    };
  useEffect(() => {
    inputId = document.querySelector('#id_aula')
    fetch("http://localhost:3030/getAllMaterias")
      .then((res) => res.json())
      .then((data) => setMaterias(data));
   }, [])
   useEffect(() => {
     inputId = document.querySelector('#id_aula')
    }, [id_aula])

    
  return (
    <div>
    <h1>Administrar Aulas</h1>
    <hr />
    <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
      <input
        type="number"
        placeholder="Buscar por id aula"
        className="form-control"
        id='id_aula'
        onChange={(e) => onHandleIdAula(e)}
      />
      <button
        className="btn btn-primary mt-2"
        onClick={() => searchAula()}
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
          <th scope="col">Id aula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edificio </th>
          <th scope="col">Capacidad</th>
          <th>Modificar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {aulas.length >= 1 ? (
          aulas.map((aula) => (
            <tr key={aula}>
              <td>{aula.Id_Aula}</td>
              <td>{aula.Nombre}</td>
              <td>{aula.Edificio}</td>
              <td>{aula.Capacidad}</td>
              <td>
                <a onClick={()=> redirecionamientoPage(aula.Id_Aula)} className="btn btn-warning">
                  Modificar
                </a>
              </td>
              <td>
                <a href="" className="btn btn-danger" onClick={()=>eliminarAula(aula.Id_Aula)}>
                  Eliminar
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td><h1>No existe esa aula</h1></td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  </div>
  )
}
