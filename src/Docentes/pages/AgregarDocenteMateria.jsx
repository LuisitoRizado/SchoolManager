import { useState, useEffect } from "react";
import '../../styles/tablas.css'
import { Link, NavLink, useNavigate } from "react-router-dom";

let inputId, inputIdDocente, inputIdMateria;
let estaSeleccionado = true;
let materiasSeleccionadas = []
let prueba;
export const AgregarDocenteMateria = () => {
  //--HOOKS
  const [id, setId] = useState();
  const [id_docente, setId_docente] = useState();
  const [id_materia, setId_materia] = useState();
  const [materias, setMaterias] = useState([]);

  const [docentes, setDocentes] = useState([]);
  const [aulas, setAulas] = useState([])
  const [carreras, setCarreras] = useState([])
  const [materiasCargadas, setMateriasCargadas] = useState([]);
  const [materias_Asignadas, setMaterias_Asignadas] = useState([])
  const [docenteSeleccionado, setDocenteSeleccionado] = useState();
  const [horarios, setHorarios] = useState([])
  //-----Handlers
  const onHandleId = (e) => {
    setId(e.target.value);
  };
  const onHandleIdDocente = (e) => {
    setId_docente(e.target.value);
  };
  const onHandleIdMateria = (e) => {
    setId_materia(e.target.value);
  };

  //functions
  const comprobarSiExiste = () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar

    //Creamos la url
    const url = "https://rest-api-production-a5bf.up.railway.app/getMats/" + id;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //Actualizamos los datos en los inputs

        console.log(data);
        inputIdDocente.value = data[0].ID_DOCENTE;
        inputIdMateria.value = data[0].ID_MATERIA;
      });
  };

  //useEffect
  useEffect(() => {
    //Cargamos los datos de todas las materias
    inputId = document.querySelector("#id");
    inputIdDocente = document.querySelector("#id_docente");
    inputIdMateria = document.querySelector("#id_materia");
    const url1 = "https://rest-api-production-a5bf.up.railway.app/getAllMats";
    fetch(url1)
      .then((res) => res.json())
      .then((data) => {
        setMateriasCargadas(data);
        console.log(data);
      });
    //obtener todos los docentes
    fetch("https://rest-api-production-a5bf.up.railway.app/getAllDocentes")
      .then((res) => res.json())
      .then((data) => setDocentes(data));

      const url3 = "https://rest-api-production-a5bf.up.railway.app/getAllMaterias";
    fetch(url3)
      .then((res) => res.json())
      .then((data) => setMaterias(data));
      
    const url2 = 'https://rest-api-production-a5bf.up.railway.app/getAllHorarios'
    fetch(url2)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setHorarios(data)
    })
    //pedir todas las maulas
    fetch('https://rest-api-production-a5bf.up.railway.app/getAllAulas')
    .then(res=>res.json())
    .then(data=>setAulas(data))

    //traer todas las carreas
    fetch('https://rest-api-production-a5bf.up.railway.app/getAllCarreras')
    .then(res=>res.json())
    .then(data=>setCarreras(data))

    fetch('https://rest-api-production-a5bf.up.railway.app/getAllCargas')
    .then(res=>res.json())
    .then(data=>setMaterias_Asignadas(data))



  }, []);
  //----HABILITAMOS LA EDICION DE LOS DATOS EN LOS INPUTS
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
    valoresIniciales.push(inputs[2].value);
    valoresIniciales.push(inputs[3].value);
    valoresIniciales.push(inputs[4].value);
    valoresIniciales.push(inputs[5].value);
    valoresIniciales.push(inputs[6].value);

    for (let i = 0; i < 7; i++) {
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
      inputs[2].value = valoresIniciales[2];
      inputs[3].value = valoresIniciales[3];
      inputs[4].value = valoresIniciales[4];
      inputs[5].value = valoresIniciales[5];
      inputs[6].value = valoresIniciales[6];

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
      const aula = inputs[0].value;
      const edificio = inputs[1].value;
      const capacidad = inputs[2].value;
      //recopilamos los inputs
      const inputName = inputs[0];
      const inputAPaterno = inputs[1];
      const inputAMaterno = inputs[2];

      //hacemos la peticion

      fetch("https://rest-api-production-a5bf.up.railway.app/updateAula/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NOMBRE: aula,
          EDIFICIO: edificio,
          CAPACIDAD: capacidad,
        }),
      });
      window.location.reload();
    });
  };

  //---------------------------FUNCIONALIDAD DE RELACIONES
  const seleccionarMateria = (fila) =>{
    fila.style.backgroundColor = "yellow";
  }
  const seleccionarDocente = (checkbox, row) => {
  
    // Modificar el estilo de la fila
    row.style.backgroundColor = "gray";
  
    // Deshabilitar todos los otros checkboxes
    const checkboxes = document.querySelectorAll('.check-docente');
    checkboxes.forEach((box, index) => {
      if (box !== checkbox) {
        box.disabled = true;
      }
    });
    //Vamos a habilitar todas las checkbox de la materia
    const materiasCheckboxes = document.querySelectorAll('.check-materia');
    materiasCheckboxes.forEach((box, index) => {
      //habilitamos todas las checkbox de materias
      box.disabled = false;
    });
    setDocenteSeleccionado(parseInt(row.children[0].textContent))
    // Manejar evento change del checkbox
    checkbox.addEventListener('change', () => {
      // Si el checkbox ha sido deseleccionado
      if (!checkbox.checked) {
        // Habilitar todos los otros checkboxes
        checkboxes.forEach((box, index) => {
          if (box !== checkbox) {
            box.disabled = false;
          }
        });
        // Restablecer el estilo de la fila
        row.style.backgroundColor = "white";
        estaSeleccionado = false;
        materiasCheckboxes.forEach((box, index) => {
          //habilitamos todas las checkbox de materias
          box.disabled = true;
          //limpiamos las cajas
          box.checked = false;
        });
      } else {
        estaSeleccionado = true;
      }
      console.log("¿Seleccionado?: " + estaSeleccionado);
      return estaSeleccionado;
    });
  };
  
  //------------funcion para seleccionar las materias
  const seleccionarMaterias = (checkbox, fila, e) =>{
    
    //habilitamos los botones de cancelar y aceptar
    console.log(e)
    const btnAceptar = document.querySelector('.btnAceptar');
    btnAceptar.classList.replace('disabled','enable')
    const btnCancelar = document.querySelector('.btnCancelar');
    btnCancelar.disabled = false;

    console.log("materia: " + fila.children)
    const childrenArray = Array.from(fila.children);
    console.log("materia: " + childrenArray[1].textContent)

    //comprobar que no deseleccione
    console.log('Evento?' + checkbox.checked)
    console.log(parseInt(childrenArray[1].textContent))
    if(!checkbox.checked) //Eliminamos el elemento del arreglo
    {
      //Limpiamos el color
      console.log(checkbox.parentNode.parentNode)
      checkbox.parentNode.parentNode.style.backgroundColor = 'white'
      
      let index = materiasSeleccionadas.indexOf(parseInt(childrenArray[1].textContent));

      // Si el elemento se encuentra en el array, elimínalo
      if (index !== -1) {
      materiasSeleccionadas.splice(index, 1);
      }

    }

    if(!materiasSeleccionadas.includes(parseInt(childrenArray[1].textContent)) && checkbox.checked){
    materiasSeleccionadas.push(parseInt(childrenArray[1].textContent))
    fila.style.backgroundColor = "red";

    }

    console.log(materiasSeleccionadas)


    //eventos para los botones
   
    btnCancelar.addEventListener('click', () =>{
      materiasSeleccionadas = []
      //vamos a deshabilitar y limpiar TODAS LAS CAJAS
      const docentesCheck = document.querySelectorAll('.check-docente');
      docentesCheck.forEach((box, index) => {
        //habilitamos todas las checkbox de materias
          box.checked = false;
        box.disabled = false;
        //limpiamos los colores
        box.parentNode.parentNode.style.backgroundColor = 'white'
      });
      const materiasCheckboxes = document.querySelectorAll('.check-materia');
      materiasCheckboxes.forEach((box, index) => {
      //habilitamos todas las checkbox de materias
      box.disabled = true;
      box.checked = false;
      box.parentNode.parentNode.style.backgroundColor = 'white'
      box.addEventListener('click',()=>{
        console.log('cambio!!!')
        if(!box.checked){
          box.parentNode.parentNode.style.backgroundColor = 'white'


        }
      })

    });
    //Tambien deshabilitamos los botones
    btnAceptar.disabled = true;
    btnCancelar.disabled = false;
    })

    

    
  }
  const guardarCambios = () =>{
    //primero comprobamos que si hay un profe y una materia al menos
    
      console.log('se seleccionaron!');
      materiasSeleccionadas.forEach(async(materia)=>{
         await fetch('https://rest-api-production-a5bf.up.railway.app/addMateria_Asignada', {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "ID_DOCXMATH":Math.floor(Math.random() * 100000),
            "ID_DOCENTE":docenteSeleccionado,
            "ID_MATERIA":materia
          }),
        });   
        console.log('ID: ' + Math.floor(Math.random() * 100000) +  ' materia: ' + materia + "  docente: "+ docenteSeleccionado)
      })
      //vamos a hacer la peticion
      confirm('Guardado con exito!')
     window.location.reload();
    
  }

  const eliminarMateriaAsignada = async (id_docxmath) =>{
    let tieneHijos = false;
    //vamos a elminar la materia
    //verificar que no este en alguna carga de algun alumno
    materias_Asignadas.forEach(materia=>{
      console.log(materia)
      if(materia.Id_DocxMath == id_docxmath){
        tieneHijos =true;
      }
    })

    if(!tieneHijos)
    {

    
    if(confirm('Está seguro que quieres eliminar?'))
    {
    await fetch('https://rest-api-production-a5bf.up.railway.app/deleteMateria_Asignada/'+id_docxmath, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        console.log("Registro eliminado exitosamente");
      } else {
        console.error("Ocurrió un error al eliminar el registro");
      }
    })
    .catch((error) => console.error(error));
    confirm('Materia eliminada con exito')
  }
}
else{
  confirm('No se puede eliminar, tiene hijos')
}
  }
  return (
    <div>
      <h1>Asignar docente a materia</h1>
      <hr />
      {/* <form action="" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="" className="form-label">
          Id
        </label>

        <input
          type="number"
          className="form-control"
          id="id"
          onChange={(e) => onHandleId(e)}
          onBlur={() => comprobarSiExiste()}
        />

        <label htmlFor="" className="form-label">
          Id docente
        </label>
        <input
          type="number"
          className="form-control"
          id="id_docente"
          onChange={(e) => onHandleIdDocente(e)}
        />

        <label htmlFor="" className="form-label">
          Id materia
        </label>
        <input
          type="number"
          className="form-control"
          id="id_materia"
          onChange={(e) => onHandleIdMateria(e)}
        />
      </form> */}
      <div className="row">
        <div className="tablaDocentes col-md-6 table-responsive table-container border">
          <table className="table  table-bordered table-responsive">
            <thead className="bg-body-secondary table-container">
              <tr className="bg-body-dark">
                <th scope="col">Numero empleado</th>
                <th scope="col">Nombre</th>
                <th scope="col">Ap paterno</th>
                <th scope="col">Ap materno</th>
                <th scope="col">Seleccionar</th>

              </tr>
            </thead>
            <tbody>
              {docentes.length >= 1 ? (
                docentes.map((docente, index) => (
                  <tr key={index}  >
                    <td>{docente.Id_Docente}</td>
                    <td>{docente.Nombre}</td>
                    <td>{docente.AP_PATERNO}</td>
                    <td>{docente.AP_MATERNO}</td>
                    <td className="d-flex justify-content-center align-items-center"><input onChange={(e)=>seleccionarDocente(e.target, e.target.parentNode.parentNode)} className="form-check-input check-docente" type="checkbox" value="" id="defaultCheck1"></input></td>
                  </tr>
                ))
              ) : (
                <tr>
              <td>
                <p className="m-1 text-danger">No se encontro ningúna docente</p>
              </td>
            </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Contenido de las materias */}
        <div className="tablaMaterias col-md-5 table-responsive table-container border">
        <table className="table  table-bordered ">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Seleccionar</th>
            <th scope="col">Clave materia</th>
            <th scope="col">Materia</th>
            <th scope="col">Creditos</th>
            <th scope="col">Semestre</th>
          </tr>
        </thead>
        <tbody>
          {materias.length >= 1 ? (
            materias.map((materia, index) => (
              <tr key={index} >
                <td className="d-flex justify-content-center align-items-center"><input disabled onChange={(e)=>seleccionarMaterias(e.target, e.target.parentNode.parentNode, e)} className="form-check-input check-materia" type="checkbox" value="" id="defaultCheck1"></input></td>
                <td>
                {materia.Id_Materia}
                </td>
                <td>
               
                {materia.Materia}
                </td>
                <td>
                {materia.Creditos}
                </td>
                <td>
                {materia.Semestre}
                </td>
               

                
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <p className="m-1 text-danger">No se encontro ningúna materia</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
      </div>
      <div className="contenedorBotones container-fluid d-flex justify-content-center align-items-center">

      <div class="modal fade"   id="mi-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        <button className="btn btn-danger m-3 btnCancelar " disabled >Cancelar</button>
        <button className="btn btn-success m-3 btnAceptar disabled " data-bs-toggle='modal' data-bs-target='#mi-modal'   >Aceptar</button>
        
       
      </div>
      <hr />
      <div className="table-responsive">

      <table className="table  table-bordered table-responsive ">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            
            <th scope="col">Materia</th>
            <th scope="col">Aula</th>
            <th scope="col">Profesor</th>
            <th scope="col">Ap paterno</th>
            <th scope="col">Ap materno</th>
            <th scope="col">Hora inicio</th>
            <th scope="col">Hora Final</th>
            <th scope="col">Eliminar</th>
           {/*  <th>Eliminar</th> */}
          </tr>
        </thead>
        <tbody>
          {materiasCargadas.length >= 1 ? (
            materiasCargadas.map((materia, index) => (
              <tr key={index}>
                
                
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.MATERIA}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.AULA_NOMBRE}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.NOMBRE_DOCENTE}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.AP_PATERNO}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.Ap_Materno}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.HORA_INICIO}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={materia.HORA_FINAL}
                    disabled
                  />
                </td>
                {/* <td className={`btn-${index} form-control`}>
                  <a
                    onClick={() => habilitarModificacion(index)}
                    className="btn btn-warning modificarButton"
                  >
                    Modificar
                  </a>
                </td> */}
                 <td>
                  <a
                    href=""
                    className="btn btn-danger"
                    onClick={() =>eliminarMateriaAsignada(materia.Id_Docxmath)}
                  >
                    Eliminar
                  </a>
                </td> 
              </tr>
            ))
          ) : (
            <tr>
            <td>
              <p className="m-1 text-danger">No se encontro ninguna materia</p>
            </td>
          </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};
