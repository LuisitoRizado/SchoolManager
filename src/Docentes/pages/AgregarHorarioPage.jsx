import React from 'react'
import { useState, useEffect } from 'react'
import { validarCampos } from './validarCampos'
let inputHorario, inputInicio, inputFin;

export const AgregarHorarioPage = () => {
    //-------------HOOKS
    const [horarios, setHorarios] = useState([])
    const [id_horario, setId_horario] = useState()
    const [hora_inicio, setHora_inicio] = useState()
    const [hora_fin, setHora_fin] = useState()
    let inputID, inputInicio, inputFin;
    //---------------HANDLERS
    const onHandleId = (e) =>{
        setId_horario(e.target.value);
    }
    const onHandleHora_Inicio = (e) =>{
        setHora_inicio(e.target.value);
    }
    const onHandleHora_Fin = (e) =>{
        setHora_fin(e.target.value);
    }

    
    //---------------FUNCTIONS
    
    useEffect(() => {
      inputHorario = document.querySelector('#id_horario')
      inputInicio = document.querySelector('#horaInicio')
      inputFin = document.querySelector('#horaFin')
      //Cargamos los horarios
      fetch('http://localhost:3030/getAllHorarios')
      .then(res=>res.json())
      .then(data=>setHorarios(data));

      console.log(inputHorario,inputInicio,inputFin)

    }, [])
    
    useEffect(() => {
      inputHorario = document.querySelector('#id_horario')
      inputInicio = document.querySelector('#horaInicio')
      inputFin = document.querySelector('#horaFin')
    }, [id_horario, hora_inicio, hora_fin])

    const addHorario = () =>{
        //En esta funcion vamos a aagregar al horario que se seleciones

        console.log(inputHorario,inputInicio,inputFin)
        
        if(validarCampos(inputHorario, inputInicio, inputFin)){
        const url = 'http://localhost:3030/addHorario';

        fetch(url, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "ID_HORARIO": id_horario,
              "HORA_INICIO_LUNES": hora_inicio,
              "HORA_FINAL_LUNES": hora_fin,
            }),
          })
          //Recargamos la pagina
          window.confirm("Horario agregada con exito")
          window.location.reload();
        }
        
    }

    const comprobarSiExiste = () => {
      //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar
  
      //Creamos la url
      const url = "http://localhost:3030/getHorario/" + id_horario;
  
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          //Actualizamos los datos en los inputs
          inputInicio.value = data[0].Hora_Inicio_Lunes;
          inputFin.value = data[0].Hora_Final_Lunes;
        });
    };

    const habilitarModificacion = (index) => {
      //deshabilitamos el boton modificar
      const modificarButton = document.querySelectorAll(".modificarButton");
      modificarButton.forEach((btn) => {
        btn.classList.add("disabled");
      });
  
      //vamos a buscar todos los elementos con la classe fila-index
      const inputs = document.querySelectorAll(".fila-" + index);
      const mod = document.querySelector(".btn-" + index);
      const id = document.querySelector(".id-" + index).value;
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
      valoresIniciales.push(inputs[1].value);
      for (let i = 0; i < 2; i++) {
        console.log(valoresIniciales[i]);
      }
  
      //Agregamos el button
      mod.appendChild(okButton);
      mod.appendChild(noButton);
  
      //Habiliatamos los campos
      inputs.forEach((input) => {
        input.disabled = false;
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
        inputs[1].value = valoresIniciales[1];
        inputs.forEach((input, index) => {
          input.disabled = true;
          //a la vez, regresamos su valores iniciales
  
          //por ultimo, eliminamos los botones
          noButton.remove();
          okButton.remove();
        });
      });
      //detectamos el evento del button ok
      okButton.addEventListener("click", () => {
        modificarButton.forEach((btn) => {
          btn.classList.replace("disabled", "enable");
        });
  
        console.log("me diste click");
        console.log(inputs[0]);
        //guardamos los datos de los inputs
        const HORA_INICIO_LUNES = inputs[0].value;
        const HORA_FINAL_LUNES = inputs[1].value;
        //recopilamos los inputs
        const inputInicio = inputs[0];
        const inputFinal = inputs[1];
  
        //hacemos la peticion
  
        fetch("http://localhost:3030/updateHorario/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "HORA_INICIO_LUNES": HORA_INICIO_LUNES,
            "HORA_FINAL_LUNES": HORA_FINAL_LUNES,
          }),
        });
        window.location.reload();
      });
    };
  return (
    <div>
    <h1>Agregar Horario </h1>
    <hr />
    <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="id_aula" className="form-label">
        Id Horario
      </label>
      <input
        type="number"
        name="id_horario"
        id='id_horario'
        onBlur={()=>comprobarSiExiste()}
        className="form-control"
        onChange={(event) => onHandleId(event)}
      />

      <label htmlFor="aula" className="form-label mt-3">
        Hora inicio 
      </label>

      <input
        type="text"
        name="horaInicio"
        id='horaInicio'
        className="form-control"
        onChange={(event) => onHandleHora_Inicio(event)}
      />
      <label htmlFor="edificio" className="form-label">
        Hora fin
      </label>

      <input
        type="text"
        name="horaFin"
        id='horaFin'
        className="form-control"
        onChange={(event) => onHandleHora_Fin(event)}
      />
     

      <button className="btn btn-danger">Cancelar</button>
      <button
        className="btn btn-success m-4"
        //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
        onClick={() =>
          addHorario()
        }
      >
        Agregar!
      </button>
    </form>

    <table className="table  table-bordered">
          <thead className="bg-body-secondary">
            <tr className="bg-body-dark">
              <th scope="col">Id Horario</th>
              <th scope="col">Hora inicio</th>
              <th scope="col">Hora Final</th>

              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {horarios.length >= 1 ? (
              horarios.map((horario, index) => (
                <tr key={horario}>
                  <td><input
                    className={`id-${index} form-control`}
                    defaultValue={horario.Id_Horario}
                    disabled
                  /> </td>
                  <td><input
                    className={`fila-${index} form-control`}
                    defaultValue={horario.Hora_Inicio_Lunes}
                    disabled
                  /></td>
                  <td><input
                    className={`fila-${index} form-control`}
                    defaultValue={horario.Hora_Final_Lunes}
                    disabled
                  /></td>
                  <td className={`btn-${index} form-control`}>
                    <a onClick={()=> habilitarModificacion(index)} className="btn btn-warning modificarButton">
                      Modificar
                    </a>
                  </td>
                  <td>
                    <a href="" className="btn btn-danger" onClick={()=>eliminarHorario(horario.Id_Horario)}>
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
  )
}
