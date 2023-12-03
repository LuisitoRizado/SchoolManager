import React from 'react'
import { useState, useEffect } from 'react'
import { validarCampos, validarNumeros } from './validarCampos';
import { Link, NavLink, useNavigate } from "react-router-dom";
//inputs
let inputIdCarrera, inputNombreCarrera, inputPlanEstudios;
export const AgregarCarreraPage = () => {
    const [carreras, setcarreras] = useState([])
    const [materias, setMaterias] = useState([])
    const [alumnos, setAlumnos] = useState([])
    //hooks para obtener datos
    const [idCarrera, setIdCarrera] = useState()
    const [nombreCarrera, setNombreCarrera] = useState()
    const [planEstudios, setPlanEstudios] = useState()
    //fin de hooks para obtener datos

    //handles para obtener datos
    const onHandleIdCarrera = (e) =>{
        setIdCarrera(e.target.value)
    }
    const onHandleNombreCarrera = (e) =>{
        setNombreCarrera(e.target.value)
    }
    const onHandelPlanEstudios = (e) =>{
        setPlanEstudios(e.target.value)
    }
    //fin de handles para obtener datos


    //------funciones de botones
    const agregarCarrera =async () =>{

        //validamos los datos
        if(validarCampos(inputIdCarrera, inputNombreCarrera)){
            //hacemos la peticion para agregar la carrear
            const url = "https://rest-api-production-a5bf.up.railway.app/addCarrera";
            await fetch(url, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ID_CARRERA: idCarrera,
                NOMBRE: nombreCarrera,
              }),
            })
              .then((response) => response.json())
              .then((data) => console.log("Carrera agregado: " + data));
            confirm('Carrera agregada')
            window.location.reload();

        }
    }

    //----Rellenado de inputs
    const comprobarSiExiste = async () =>{
        const url = "https://rest-api-production-a5bf.up.railway.app/getCarrera/" + idCarrera;
        //limpiamos los inputs
        inputNombreCarrera.value = ''
        inputPlanEstudios.value = ''
        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            //Actualizamos los datos en los inputs
            console.log(data)
            console.log(inputNombreCarrera)
            console.log(inputPlanEstudios)
    
            inputNombreCarrera.value = data[0].Nombre;
          });
        
          if(inputNombreCarrera.value==='undefined'){
            //comprobamos si tiene valor es porque si existe.
            //bloqueamos el boton  y los inputs
            inputIdCarrera.disabled = false; 
            inputNombreCarrera.disabled = false;
            const btnagregar = document.querySelector('.btn-agregar');
            btnagregar.disabled = false;
            //Limpiamos las cajas
            inputNombreCarrera.value = ''
            
          }
          else{
            inputIdCarrera.disabled = true; 
            inputNombreCarrera.disabled = true;
            const btnagregar = document.querySelector('.btn-agregar');
            btnagregar.disabled = true;
            //llenamos las cajas
          }
    }
    //Limpiar cajas 
     const cancelarEvent = () =>{
    //Habilitamos todas las cajas y las limpiamos
    inputIdCarrera.value = ''
    inputNombreCarrera.value = ''
    inputPlanEstudios.value = ''
    //habilitamos
    inputIdCarrera.disabled = false; 
    inputNombreCarrera.disabled = false;
    const btnagregar = document.querySelector('.btn-agregar');
    btnagregar.disabled = false;
  }

  //Funcion para eliminar una carrera
  const eliminarCarrera = async (id_carrera)=>{

    let tieneHijos = false;

    //vamos a recorrer las materias asignadas profesor en busca del id del docente
    materias.forEach(materia=>{
      //vamos a buscar en cada materia
      if(materia.Id_Carrera==id_carrera){
        tieneHijos = true;
      }
    })
    //vamos a recorrer las materias asignadas profesor en busca del id del docente
    alumnos.forEach(alumno=>{
      //vamos a buscar en cada materia
      if(alumno.Id_Carrera==id_carrera){
        tieneHijos = true;
      }
    })

    //si no tiene hijos, eliminamos el registro
    if(!tieneHijos){
      
      //eliminamos
      if(confirm('Esta seguro?'))
      await fetch('https://rest-api-production-a5bf.up.railway.app/deleteCarrera/'+id_carrera, { method: 'DELETE' })
      .then(response => {
    if (response.ok) {
      console.log('Registro eliminado exitosamente');
    } else {
      console.error('Ocurrió un error al eliminar el registro');
    }
  })
  .catch(error => console.error(error));

  window.location.reload()
    }
    else{
      confirm('No se puede eliminar, ya que tiene hijos')
    }

  }

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
    okButton.addEventListener("click",async () => {
      modificarButton.forEach((btn) => {
        btn.classList.replace("disabled", "enable");
      });

      console.log("me diste click");
      console.log(inputs[0]);
      //guardamos los datos de los inputs
      const nombre = inputs[0].value;
      const ap_paterno = inputs[1].value;
      //recopilamos los inputs
      const inputName = inputs[0];
      const inputAPaterno = inputs[1];

      //hacemos la peticion
      //COMPROBAMOS QUE ESTEN TODOS LOS CAMPOS
      if(validarCampos(inputName, inputAPaterno))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateCarrera/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NOMBRE: nombre,
          PLAN_ESTUDIOS: ap_paterno,
        }),
      });
      window.location.reload();
    }
    });
  };
  //-----INICIO USEEFFECS
    useEffect(() => {
     //get all carreras
     fetch("https://rest-api-production-a5bf.up.railway.app/getAllCarreras")
     .then((res) => res.json())
     .then((data) => setcarreras(data));
     //get all materias
     fetch("https://rest-api-production-a5bf.up.railway.app/getAllMaterias")
     .then((res) => res.json())
     .then((data) => setMaterias(data));
     //get all alumnos
     fetch("https://rest-api-production-a5bf.up.railway.app/getAllAlumnos")
     .then((res) => res.json())
     .then((data) => setAlumnos(data));
     //Obtenemos todos los inputs
     inputIdCarrera = document.querySelector('#inputId')
     inputNombreCarrera = document.querySelector('#inputCarrera')
     inputPlanEstudios = document.querySelector('#inputPlan')
    }, [])
    //segundo useEffect
    useEffect(() => {
        inputIdCarrera = document.querySelector('#inputId')
        inputNombreCarrera = document.querySelector('#inputCarrera')
        inputPlanEstudios = document.querySelector('#inputPlan')
    }, [idCarrera, nombreCarrera, planEstudios])
    
    
  return (
    <div>
        <h1>Agregar carrera</h1>
        <hr />

        <form action="" onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="id" className='label-form'>Id carrera</label>
            <input type="number" className='form-control' id='inputId' name='id' onChange={(e)=>onHandleIdCarrera(e)} onKeyPress={validarNumeros} onBlur={()=>comprobarSiExiste()}/>
            <label htmlFor="carrera" className='label-form'>Nombre carrera</label>
            <input type="text" className='form-control' id='inputCarrera' name='carrera' onChange={(e)=>onHandleNombreCarrera(e)} />
            
             
            <button className='btn btn-danger m-2' onClick={()=>cancelarEvent()}>Cancelar</button>
            <button className='btn btn-success m-2 btn-agregar' onClick={()=>agregarCarrera()}>Guardar</button>
        </form>


        {/* Aqui va la tabla con todas las carreras */}
        <div className="row">
        
        {/* Contenido de las materias */}
        <div className=" table-responsive  ">
        <table className="table  table-bordered ">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Clave carrera</th>
            <th scope="col">Carrera</th>
            <th scope="col">Modificar</th>
            <th scope="col">Eliminar</th>


           
          </tr>
        </thead>
        <tbody>
          {carreras.length >= 1 ? (
            carreras.map((carrera, index) => (
              <tr key={index} >
                <td>
                <input type="number" onKeyPress={validarNumeros} defaultValue={carrera.Id_Carrera} className={`id-${index} form-control`} disabled />
                </td>
                <td>
                <input type="text" name=""  className={`fila-${index} form-control`} defaultValue={carrera.Nombre} disabled/>
                  
                </td>
                 
                <NavLink
                className={'btn btn-warning'}
                
                
                to={{
                  pathname: 'https://radiant-queijadas-7b50d2.netlify.app/empleado/carreras/modificarCarrera/administrarCarrera?id=20',
                  search: '?id='+carrera.Id_Carrera
                }}
              >
                Modificar
              </NavLink>
                <td><button className='btn btn-danger' onClick={()=>eliminarCarrera(carrera.Id_Carrera)}>Eliminar</button></td>

              </tr>
            ))
          ) : (
            <tr>
              <td>
                <p className="m-1 text-danger">No se encontro ningúna carrera</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  )
}
