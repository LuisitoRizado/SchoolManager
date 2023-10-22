import { useState, useEffect } from "react";
import { validarCampos } from "./validarCampos";
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
    const [nombre, setNombre] = useState("")
    const [AP_PATERNO, setAP_PATERNO] = useState("")
    const [AP_MATERNO, setAP_MATERNO] = useState("")
    let inputId;
    let inputNombre;
    let inputAPaterno;
    let inputAMaterno;

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
    const obtenerDocente = async () =>{
        const url = "https://rest-api-production-a5bf.up.railway.app/getDocente/"+id;
        await fetch(url)
        .then(res => res.json())
        .then(data => {
          
          setAP_PATERNO(data[0].AP_PATERNO)
          setAP_MATERNO(data[0].AP_MATERNO)
          setDocente(data)

        });
     

      }

    //Mmetodo para guardar los datos del docente
    const guardarDatos = (id_docente, name, ap_pat, ap_mat) =>{
      inputNombre = document.querySelector('#nombre');
      inputAPaterno = document.querySelector('#ap_paterno');
      inputAMaterno = document.querySelector('#ap_materno');
        //En esta peticion va el metodo put el cual no va a ayudar a poder modificar los cambios realizaod
        //Todo esto es lo introducido en los campos de texto del formulario
      if(validarCampos(inputNombre,inputAPaterno,inputAMaterno)){

        fetch("https://rest-api-production-a5bf.up.railway.app/updateDocente/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            NOMBRE: name,
            AP_PATERNO: ap_pat,
            AP_MATERNO: ap_mat,
          }),
        });
        confirm('Modificaciones realizadas!')
        window.location.reload();
      }
      
    }
    inputNombre = document.querySelector('#nombre');
    inputAPaterno = document.querySelector('#ap_paterno');
    inputAMaterno = document.querySelector('#ap_materno');
    //Para los datos
    useEffect(() => {
    obtenerDocente();
    //obtenemos los inputs al cargar

    inputNombre = document.querySelector('#nombre');
    inputAPaterno = document.querySelector('#ap_paterno');
    inputAMaterno = document.querySelector('#ap_materno');
    
    }, [])
    useEffect(() => {
      //obtenemos los inputs al cargar
  
      inputNombre = document.querySelector('#nombre');
      inputAPaterno = document.querySelector('#ap_paterno');
      inputAMaterno = document.querySelector('#ap_materno');
      
      }, [nombre, AP_PATERNO, AP_MATERNO])
   
    

  return (
    <div>
        <h1>Modificación de docente</h1>
        <hr />

        {/*Mostraremos la información del docente en un formulario */}
        {docente.map((doc, index) => {
        return (
          <form action="" className="mt-4" onSubmit={(e)=>e.preventDefault()} key={index}>
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
              id="nombre"
              className="form-control"
              defaultValue = {doc.Nombre}
              onChange= {(e)=>onHandleNombre(e)}
            />
            {/*Profesor que imparte la materia */}
            <label htmlFor="" className="form-label">
              Apellido paterno
            </label>
            <input
              type="text"
              name="profesor"
              id="ap_paterno"
              className="form-control"
              defaultValue = {doc.AP_PATERNO}
              onChange= {(e)=>onHandleAp_Paterno(e)}

            />
            {/*Hora de la materia */}
            <label htmlFor="" className="form-label">
              Apellido materno
            </label>
            <input
              type="text"
              name="hora"
              id="ap_materno"
              className="form-control"
              defaultValue = {doc.AP_MATERNO}
              onChange= {(e)=>onHandleAp_Materno(e)}
            />

            {/*Estatus y correo */}
            <label htmlFor="" className="form-label">
              Estatus
            </label>
            
            <select name="estatus" id="estatus" defaultValue = {doc.Estatus} className="form-select" >
              <option value={doc.Estatus}>{doc.Estatus}</option>
              <option value={2}>Inactivo</option>
              <option value={3}>Pendiente</option>

            </select>

<label htmlFor="" className="form-label">
              Correo
            </label>
            <input
              type="text"
              name="hora"
              id="correo"
              className="form-control"
              defaultValue = {doc.CORREO}
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
              onClick={() => guardarDatos(doc.ID_Docente, inputNombre.value, inputAPaterno.value, inputAMaterno.value)}
            
            >Confirmar</button>
          </form>
        );
      })}
    </div>
  )
}
