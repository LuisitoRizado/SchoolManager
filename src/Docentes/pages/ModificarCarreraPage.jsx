import React, { useState, useEffect } from 'react'
import { validarCampos, validarNumeros } from './validarCampos'
//inputs 
let inputNombre, inputPlan;
export const ModificarCarreraPage = () => {

    const querystring = window.location.search;

    // usando el querystring, creamos un objeto del tipo URLSearchParams
    const params = new URLSearchParams(querystring);
    const id = params.get("id");
    console.log(id);
    const [materia, setMateria] = useState([])
    const [nombreCarrera, setNombreCarrera] = useState()
    const [Plan_estudios, setPlan_estudios] = useState()
    useEffect(() => {
        fetch('https://rest-api-production-a5bf.up.railway.app/getCarrera/'+id)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setMateria(data)
        })
    inputNombre = document.querySelector('#inputCarrera')

    }, [])

    useEffect(() => {
       
    inputNombre = document.querySelector('#inputCarrera')

    }, [nombreCarrera, Plan_estudios])

    const handleNombre = (e) =>{
        setNombreCarrera(e.target.value)
        console.log(e.target.value)
    }
    const onHandelPlanEstudios = (e) =>{
        setPlan_estudios(e.target.value)
    }
    //----funciones de botones
    const modificarCarrera = async () =>{
        //obtener valores de las cajas de texto
        let nombre = inputNombre.value;
        let plan = inputPlan.value;
        //hacemos la peticion
        if(validarCampos(inputNombre))
        {
        await fetch("https://rest-api-production-a5bf.up.railway.app/updateCarrera/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            NOMBRE: nombre,
          }),
        });
        window.location.reload();
      }
    }
    
  return (
    <div>
        <h1>ModificarCarreraPage</h1>
        <hr />
        {materia.map((mat,index)=>{
            return (
                <form action="" onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor="id" className='label-form'>Id carrera</label>
                <input type="number" value={mat.Id_Carrera} className='form-control' id='inputId' name='id' onChange={(e)=>onHandleIdCarrera(e)} onKeyPress={validarNumeros} onBlur={()=>comprobarSiExiste()} disabled/>
                <label htmlFor="carrera" className='label-form'>Nombre carrera</label>
                <input type="text" defaultValue={mat.Nombre} className='form-control' id='inputCarrera' name='carrera' onChange={(e)=>handleNombre(e)} />
                
                
                <button className='btn btn-danger m-2' onClick={()=>cancelarEvent()}>Cancelar</button>
                <button className='btn btn-success m-2 btn-agregar' onClick={()=>modificarCarrera()}>Guardar</button>
            </form>
            )
        })}
     

    </div>
  )
}
