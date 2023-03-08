import React from 'react'
import { useState } from 'react'
export const AdministrarAulaPage = () => {

    //----------HOOKS
    const [aulas, setAulas] = useState([])
    const [id_aula, setId_aula] = useState()

    //---------HANDLERS
    const onHandleIdAula = (e) =>{
        //Capturamos el id que ingrese el usuario
        setId_aula(e.target.value);
    }

    //-----FUNCTIONS
    const searchAula = () =>{
        const url = 'http://localhost:3030/getAula/' + id_aula;
        fetch(url)
        .then(res => res.json())
        .then(data => setAulas(data))
    }

    const eliminarAula = (id) =>{
        //vamos a pedir la peticion al http de delte en la base de datos
        //Nos va a pasar como parametros el numero de control del alumno
        //Ok ahora podemos hacer la peticion al servidor
        const url = 'http://localhost:3030/deleteAula/'+id;
        
        //hacemos el fetch a la api
    
        //Primero preguntamos si esta seguo de que quiere elimnar el alumno
        if(confirm('¿Estás seguro de que quieres eliminar esta Aula?'))
        {
          //En caso de que diga que si , entonces, lo eliminamos
          fetch(url, { method: 'DELETE' })
          .then((res) => res.json())
          .then((data)=>console.log('Eliminado : ' + data))
    
          window.location.reload();
        }
        else{
          //De lo contrario no hacemos nada
          return;
        }
    
      }

      const redirecionamientoPage = (id) =>{
        window.location.href = "administracionAula/?id="+id;
  }
  return (
    <div>
    <h1>Administrar docentes</h1>
    <hr />
    <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
      <input
        type="number"
        placeholder="Buscar por id aula"
        className="form-control"
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
          <h1>No existe esa aula</h1>
        )}
      </tbody>
    </table>
  </div>
  )
}
