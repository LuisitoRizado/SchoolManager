import React from 'react'
import { useState, useEffect } from 'react'
import { validarNumeros, validarCampos } from './validarCampos';
export const CalificacionAlumnoPage = () => {
    const querystring = window.location.search;

    // usando el querystring, creamos un objeto del tipo URLSearchParams
    const params = new URLSearchParams(querystring);
    const id = params.get("id");
    console.log(id);
    const [carga, setCarga] = useState([])
    const [calificacion, setCalificacion] = useState([])

    useEffect(() => {
      fetch('https://rest-api-production-a5bf.up.railway.app/getCarga/'+id)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setCarga(data)
    })

    }, [])
    
    const onHandleCalificacion = (e) =>{
        setCalificacion(e.target.value)
    }
    const modificarCalificacion = (index) =>{
        //Hbilitamos el input
        //Si el input tiene No asignada, lo limpiamos
    
        //deshabilitamos el boton modificar
    const modificarButton = document.querySelectorAll(".modificarButton");
    modificarButton.forEach((btn) => {
      btn.classList.add("disabled");
    });

    //vamos a buscar todos los elementos con la classe fila-index
    const inputs = document.querySelectorAll(".fila-" + index);
    const mod = document.querySelector(".btn-" + index);
    const id = document.querySelector(".id-" + index).textContent;
    console.log(id);
    console.log(inputs);
    const okButton = document.createElement("button");
    const noButton = document.createElement("button");
    okButton.classList.add("btn", "btn-success", "m-2");
    okButton.innerText = "OK";
    noButton.classList.add("btn", "btn-danger", "m-2");
    noButton.innerText = "X";

    //obtener valores iniciales
    const valoresIniciales = [];
    valoresIniciales.push(inputs[0].value);
    for (let i = 0; i < 1; i++) {
      console.log(valoresIniciales[i]);
    }

    //Agregamos el button
    mod.appendChild(okButton);
    mod.appendChild(noButton);

    //Habiliatamos los campos
    inputs.forEach((input) => {
      input.disabled = false;
      if(input.value === 'No asignada'){
        input.value = ''
      }
    });

    //Evento de cancelacion
    noButton.addEventListener("click", () => {
      modificarButton.disabled = false;

      //Aquí vamos a cancelar todo, es decir solo eliminamos los dos botones
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });
      //primero deshabilitamo los inputs
      console.log(inputs[0].value);
      console.log(valoresIniciales[0]);
      inputs[0].value = valoresIniciales[0];
      inputs.forEach((input, index) => {
        input.disabled = true;
        //a la vez, regresamos su valores iniciales

        //por ultimo, eliminamos los botones
        noButton.remove();
        okButton.remove();
      });
    });
    //detectamos el evento del button ok
    okButton.addEventListener("click",async () => {
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });

      console.log("me diste click");
      console.log(inputs[0]);
      //guardamos los datos de los inputs
      const nombre = inputs[0].value;
      //recopilamos los inputs
      const inputName = inputs[0];

      //hacemos la peticion
      //COMPROBAMOS QUE ESTEN TODOS LOS CAMPOS
      if(validarCampos(inputName))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateCalificacion/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            CALIFICACION:nombre,
        }),
      });
       window.location.reload(); 
    }
    });
    }
  return (
    <div>
        <h1>Calificación Alumno</h1>
        <hr />
        <div>
        <div className="table-responsive">

            <table className="table  table-bordered table-responsive table-container">
            <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id carga</th>
            <th scope="col">Materia</th>
            <th scope="col">Docente</th>
            <th scope="col">Horario</th>
            <th scope="col">Aula</th>
            <th scope="col">Calificación</th>
            <th scope="col"></th>


          </tr>
        </thead>
        <tbody>
            {
               carga.length > 0 ? (
                carga.map((materia,index)=>(
                    <tr>
                        <td className={'id-'+index}>{materia.CARGA}</td>
                        <td>{materia.MATERIA}</td>
                        <td>{materia.NOMBRE} {materia.AP_PATERNO} {materia.AP_MATERNO}</td>
                        <td>{materia.HORA_INICIO_LUNES} - {materia.HORA_FINAL_LUNES}</td>
                        <td>{materia.AULA}</td>
                        <td><input onKeyPress={validarNumeros} type="text" name="" id={`input fila-`+index} defaultValue={materia.CALIFICACION ? materia.CALIFICACION : 'No asignada' } className={'form-control fila-'+ index} disabled onChange={(e)=>onHandleCalificacion(e)}/></td>
                        <td className={'btn-'+index}><button className={'btn btn-success modificarButton '} id={`btn-`+index} onClick={()=>modificarCalificacion(index)}>Editar</button></td>
                    </tr>
                ))
               ) : (<tr><td>No hay materias</td></tr>)
            }
            
        </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}
