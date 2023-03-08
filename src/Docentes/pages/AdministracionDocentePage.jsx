import { useState, useEffect } from "react";
export const AdministracionDocentePage = () => {

    //Obtener query params de la url
     //Leemos el query params de la url
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const id = params.get("id");
  console.log(id);

    //Hooks
    const [docente, setDocente] = useState([])
    const [nombre, setNombre] = useState([])
    const [AP_PATERNO, setAP_PATERNO] = useState([])
    const [AP_MATERNO, setAP_MATERNO] = useState([])


    //LEER DATOS DEL INPUT
    const onHandleNombre = (e) =>{
        setNombre(e.target.value)
    }
    const onHandleAp_Paterno = (e) =>{
        setAP_PATERNO(e.target.value)
    }
    const onHandleAp_Materno = (e) =>{
        setAP_MATERNO(e.target.value)
    }


    //Peticion
    const obtenerDocente = () =>{
        const url = "http://localhost:3030/getDocente/"+id;
        fetch(url)
        .then(res => res.json())
        .then(data => setDocente(data));
    }

    //Mmetodo para guardar los datos del docente
    const guardarDatos = (id_docente, name, ap_pat, ap_mat) =>{
        //En esta peticion va el metodo put el cual no va a ayudar a poder modificar los cambios realizaod
        //Todo esto es lo introducido en los campos de texto del formulario

    fetch('http://localhost:3030/updateDocente/'+id, {method:'PUT', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "ID_DOCENTE":id,
        "NOMBRE":name,
        "AP_PATERNO": ap_pat,
        "AP_MATERNO": ap_mat
    })})
    window.location.reload();
    }
    //Para los datos
    useEffect(() => {
    obtenerDocente();
    }, [])
    

  return (
    <div>
        <h1>Modificación de docente</h1>
        <hr />

        {/*Mostraremos la información del docente en un formulario */}
        {docente.map((doc) => {
        return (
          <form action="" className="mt-4" onSubmit={(e)=>e.preventDefault()}>
            {/*Id de la materia */}
            <label htmlFor="" className="form-label">
              Id materia
            </label>
            <input
              type="number"
              name="id"
              id="id"
              placeholder={doc.Id_Docente}
              defaultValue = {doc.Id_Docente}
              className="form-control disabled"

              disabled={true}
            />
            {/*Nombre de la materia. */}
            <label htmlFor="" className="form-label">
              Nombre 
            </label>
            <input
              type="text"
              name="materia"
              id="materia"
              className="form-control"
              defaultValue = {doc.Nombre}
              onChange= {(e)=>onHandleNombre(e)}
              placeholder={doc.Nombre}
            />
            {/*Profesor que imparte la materia */}
            <label htmlFor="" className="form-label">
              Apellido paterno
            </label>
            <input
              type="text"
              name="profesor"
              id="profesor"
              className="form-control"
              defaultValue = {doc.AP_PATERNO}
              onChange= {(e)=>onHandleAp_Paterno(e)}

              placeholder={
               doc.AP_PATERNO
              }
             
            />
            {/*Hora de la materia */}
            <label htmlFor="" className="form-label">
              Apellido materno
            </label>
            <input
              type="text"
              name="hora"
              id="hora"
              className="form-control"
              defaultValue = {doc.AP_MATERNO}

              placeholder={doc.AP_MATERNO}

              onChange= {(e)=>onHandleAp_Materno(e)}
              

            />
            {/*Aula donde se imparte la materia */}
            
            <button
              className="btn btn-danger m-2"
              onClick={() => guardarCambios()}
            >
              Cancelar
            </button>
            <button className="btn btn-success m-2"
              onClick={() => guardarDatos(doc.ID_Docente, nombre, AP_PATERNO, AP_MATERNO)}
            
            >Confirmar</button>
          </form>
        );
      })}
    </div>
  )
}
