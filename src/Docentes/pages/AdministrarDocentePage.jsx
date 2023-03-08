import { useState } from "react";
export const AdministrarDocentePage = () => {
  const [id_docente, setId_docente] = useState([]);
  const [docentes, setDocentes] = useState([]);

  //---------HANDLERS
  const onHandleDocente = (e) => {
    setId_docente(e.target.value);
  };

  //Metodo para realizar peticion
  const mostrarDocentes = () => {
    const url = "http://localhost:3030/getDocente/" + id_docente;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDocentes(data);
      });
  };

  const redirecionamientoPage = () =>{
        window.location.href = "modificarDocente/?id="+id_docente;
  }

  const eliminarDocente = (Id_Docente) =>{
    //vamos a pedir la peticion al http de delte en la base de datos
    //Nos va a pasar como parametros el numero de control del alumno
    //Ok ahora podemos hacer la peticion al servidor
    const url = 'http://localhost:3030/deleteDocente/'+Id_Docente;
    
    //hacemos el fetch a la api

    //Primero preguntamos si esta seguo de que quiere elimnar el alumno
    if(confirm('¿Estás seguro de que quieres eliminar este Docente?'))
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

  return (
    <div>
      <h1>Administrar docentes</h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Buscar por id docente"
          className="form-control "
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
