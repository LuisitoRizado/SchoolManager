import { useState, useEffect } from "react";
import { validarCampos, validarNumeros } from "./validarCampos";
import { Link, NavLink, useNavigate } from "react-router-dom";

let inputId;
let inputNombre;
let inputAPaterno;
let inputAMaterno;
let ventanaModal;
let inputSearch;
let results = [];

export const AgregarDocentePage = () => {
  //objetctos
 
  const [id_docente, setId_docente] = useState(0);
  const [Nombre, setNombre] = useState();
  const [Ap_Paterno, setAp_Paterno] = useState();
  const [Ap_Matern, setAp_Matern] = useState();
  const [docentes, setDocentes] = useState([]);
  const [search, setSearch] = useState("")
  const [filteredDocentes, setFilteredDocentes] = useState([]);
  const [Correo, setCorreo] = useState();
  const [Estatus, setEstatus] = useState();

  const [materias_asignadas, setmaterias_Asignadas] = useState([])

  const onHandleId = (e) => {
    setId_docente(e.target.value);
  };

  const onHandleNombre = (e) => {
    setNombre(e.target.value);
  };
  const onHandleApPaterno = (e) => {
    setAp_Paterno(e.target.value);
  };
  const onHandleApMaterno = (e) => {
    setAp_Matern(e.target.value);
    
  };
  const onHandleCorreo = (e) => {
    setCorreo(e.target.value);
    
  };
  const onHandleEstatus = (e) => {
    setEstatus(e.target.value);
    console.log(e.target.value)
    
  };
  const onHandleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm)
    
  };

/*   useEffect(() => {
    const filtered = docentes.filter((docente) =>
      docente.Nombre.includes(search)
    );
    setFilteredDocentes(filtered);
  }, [docentes, search]); */
  //metodo para filtrar
  const filtrar = () => {
  
  }
  //metodo para guardar datos
  const guardarDatos = (id, name, ap_pat, ap_mat) => {
    //En esta peticion va el metodo put el cual no va a ayudar a poder modificar los cambios realizaod
    //Todo esto es lo introducido en los campos de texto del formulario
    if (validarCampos(inputNombre, inputAPaterno, inputAMaterno)) {
      fetch("https://rest-api-production-a5bf.up.railway.app/updateDocente/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_DOCENTE: id,
          NOMBRE: name,
          AP_PATERNO: ap_pat,
          AP_MATERNO: ap_mat,
        }),
      });
      window.location.reload();
    }
  };
  console.log(inputId);
  const addDocentePetition = (id_docente, nombre, ap_paterno, ap_materno, estatus, correo) => {
    //Hacemos la peticion para enviar los datos del dcoente
    console.log(inputId);
    console.log(inputNombre);
    console.log(inputAPaterno);
    console.log(inputAMaterno);

    if (validarCampos(inputId, inputNombre, inputAPaterno, inputAMaterno)) {
      const url = "https://rest-api-production-a5bf.up.railway.app/addDocente";
       fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_DOCENTE: id_docente,
          NOMBRE: nombre,
          AP_PATERNO: ap_paterno,
          AP_MATERNO: ap_materno,
          ESTATUS: estatus,
          CORREO: correo
        }),
      })
     

      //window.location.reload();
    } else {
      console.log("faltan datos");
    }
  };
  const redirecionamientoPage = (id_docente) => {
    window.location.href = "modificarDocente/?id=" + id_docente;
  };
  //Con el siguiente metodo vamos a abrir el modal
  const abrirModal = () => {
    ventanaModal = document.querySelector(".ventanaModal");
    //La mostramos, le damos estilos desde el componente
    ventanaModal.classList.remove("d-none");
    console.log(ventanaModal);
  };

  //Boton cancelar
  const cancelarEvent = () =>{
    //Habilitamos todas las cajas y las limpiamos
    inputNombre.value = ''
    inputAPaterno.value = ''
    inputAMaterno.value = ''
    inputId.value = '';
    //habilitamos
    inputId.disabled = false; 
    inputNombre.disabled = false;
    inputAPaterno.disabled = false;
    inputAMaterno.disabled = false;
    const btnagregar = document.querySelector('.btn-agregar');
    btnagregar.disabled = false;
  }
  const comprobarSiExiste = async () => {
    //En esta funcion  vamos a comprobar si existe e o no el docente que se busca agregar

    //Creamos la url
    const url = "https://rest-api-production-a5bf.up.railway.app/getDocente/" + id_docente;
    //limpiamos los inputs
    inputNombre.value = ''
    inputAPaterno.value = ''
    inputAMaterno.value = ''
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //Actualizamos los datos en los inputs
        console.log(data)
        console.log(inputNombre)
        console.log(inputAPaterno)
        console.log(inputAMaterno)

        inputNombre.value = data[0].Nombre;
        inputAPaterno.value = data[0].AP_PATERNO;
        inputAMaterno.value = data[0].AP_MATERNO;
      });
    
      if(inputNombre.value==='undefined'){
        //comprobamos si tiene valor es porque si existe.
        //bloqueamos el boton  y los inputs
        inputId.disabled = false; 
        inputNombre.disabled = false;
        inputAPaterno.disabled = false;
        inputAMaterno.disabled = false;
        const btnagregar = document.querySelector('.btn-agregar');
        btnagregar.disabled = false;
        //Limpiamos las cajas
        inputNombre.value = ''
        inputAPaterno.value = ''
        inputAMaterno.value = ''
        
      }
      else{
        inputId.disabled = true; 
        inputNombre.disabled = true;
        inputAPaterno.disabled = true;
        inputAMaterno.disabled = true;
        const btnagregar = document.querySelector('.btn-agregar');
        btnagregar.disabled = true;
        //llenamos las cajas
      }
      //setId_docente()
  };

  const getAllDocentes = () => {
    //En esta funcion vamos a llamar a todos los docentes una vez que cargue la pagina del docente
    const url = "https://rest-api-production-a5bf.up.railway.app/getAllDocentes";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDocentes(data);
        setFilteredDocentes(data)
      });
  };
  useEffect(() => {
    inputId = document.querySelector("#id_docente");
    console.log(inputId.value);
    //Reconocemos la ventana modal
    getAllDocentes();
    fetch('https://rest-api-production-a5bf.up.railway.app/getMaterias_asigandas')
    .then(res=>res.json())
    .then(data=>setmaterias_Asignadas(data))
  }, []);

  useEffect(() => {
    inputNombre = document.querySelector("#nombre");
    console.log(inputNombre.value);
  }, []);

  useEffect(() => {
    inputAPaterno = document.querySelector("#APaterno");
    console.log(inputAPaterno.value);
  }, []);

  useEffect(() => {
    inputAMaterno = document.querySelector("#AMaterno");
    inputSearch = document.querySelector('.search')
    console.log(inputAMaterno.value);
  }, []);
  useEffect(() => {
    inputId = document.querySelector("#id_docente");
    inputNombre = document.querySelector("#nombre");
    inputAPaterno = document.querySelector("#APaterno");
    inputAMaterno = document.querySelector("#AMaterno");
    inputAMaterno = document.querySelector("#AMaterno");
    inputSearch = document.querySelector('.search')


    console.log(inputId.value);
  }, [id_docente, Nombre, Ap_Paterno, Ap_Matern]);

  //Metodo para podera habilitar la modificacion de una row de la tabla
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
    for (let i = 0; i < 3; i++) {
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
      const ap_materno = inputs[2].value;
      //recopilamos los inputs
      const inputName = inputs[0];
      const inputAPaterno = inputs[1];
      const inputAMaterno = inputs[2];

      //hacemos la peticion
      //COMPROBAMOS QUE ESTEN TODOS LOS CAMPOS
      if(validarCampos(inputName, inputAMaterno, inputAPaterno))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/updateDocente/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NOMBRE: nombre,
          AP_PATERNO: ap_paterno,
          AP_MATERNO: ap_materno,
        }),
      });
      window.location.reload();
    }
    });
  };

  //eliminar docente
  const eliminarDocente = async (id_docente) =>{
    //vamos a eliminar el docente seleccionado, solo en caso de que no tenga elementos hijos
    let tieneHijos = false;

    //vamos a recorrer las materias asignadas profesor en busca del id del docente
    materias_asignadas.forEach(materia=>{
      //vamos a buscar en cada materia
      if(materia.Id_Docente==id_docente){
        tieneHijos = true;
      }
    })

    //si no tiene hijos, eliminamos el registro
    if(!tieneHijos){
      
      //eliminamos
      if(confirm('Esta seguro?'))
      await fetch('https://rest-api-production-a5bf.up.railway.app/deleteADocente/'+id_docente, { method: 'DELETE' })
      .then(response => {
    if (response.ok) {
      console.log('Registro eliminado exitosamente');
    } else {
      console.error('Ocurrió un error al eliminar el registro');
    }
  })
  .catch(error => console.error(error));

    }
    else{
      confirm('No se puede eliminar, ya que tiene hijos')
    }
  }
  return (
    <div>
      <h1>Agregar docentes </h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="id_docente" className="form-label">
         Número empleado
        </label>
        <input
          type="number"
          pattern="[0-9]*"
          id="id_docente"
          name="id_docente"
          className="form-control"
          onKeyPress={validarNumeros}
          onBlur={() => comprobarSiExiste()}
          onChange={(event) => onHandleId(event)}
        />

        <label htmlFor="nombre" className="form-label mt-3">
          Nombre (s)
        </label>

        <input
          type="text"
          name="nombre"
          id="nombre"
          className="form-control"
          onChange={(event) => onHandleNombre(event)}
        />
        <label htmlFor="ap_paterno" className="form-label">
          Apellido Paterno
        </label>

        <input
          type="text"
          name="ap_paterno"
          id="APaterno"
          className="form-control"
          onChange={(event) => onHandleApPaterno(event)}
        />
        <label htmlFor="ap_materno" className="form-label">
          Apellido materno
        </label>

        <input
          type="text"
          name="ap_materno"
          id="AMaterno"
          className="form-control"
          onChange={(event) => onHandleApMaterno(event)}
        />
         <label htmlFor="estatus" className="form-label">
          Estatus
        </label>
        <select name="estatus" id="estatus"
          onChange={(event) => onHandleEstatus(event)}
          className={"form-select"}
          defaultValue={1}
          
        
        >
          <option value={1}>Activo</option>
          <option value={2}>Inactivo</option>
          <option value={3}>Pendiente</option>
        </select>

        <label htmlFor="correo" className="form-label">
          Correo
        </label>

        <input
          type="text"
          name="correo"
          id="correo"
          className="form-control"
          onChange={(event) => onHandleCorreo(event)}
        />
        <button className="btn btn-danger" onClick={()=>cancelarEvent()}>Cancelar</button>
        <button
          className="btn btn-success m-4 btn-agregar"
          //Llamamos a la función para agregar al alumno, antes que todo, hay que validar que todos los datos sean correctos
          onClick={() =>
            addDocentePetition(id_docente, Nombre, Ap_Paterno, Ap_Matern, Estatus, Correo)
          }
        >
          Agregar!
        </button>
      </form>
    
      <div className="table-responsive">

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id docente</th>
            <th scope="col">Nombre</th>
            <th scope="col">Ap paterno</th>
            <th scope="col">Ap materno</th>
            <th scope="col">Correo</th>
            <th scope="col">Estatus</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocentes.length >= 1 ? (
            filteredDocentes.map((docente, index) => (
              <tr key={index}>
                <td>
                  <input
                    className={`id-${index} form-control`}
                    defaultValue={docente.Id_Docente}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={docente.Nombre}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={docente.AP_PATERNO}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={docente.AP_MATERNO}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={docente.CORREO}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={`fila-${index} form-control`}
                    defaultValue={docente.ESTATUS}
                    disabled
                  />
                </td>
                <td className={`btn-${index} form-control`}>
                
                  <a
                    onClick={() => habilitarModificacion(index)}
                    className="btn btn-warning modificarButton"
                  >
                    Modificar
                  </a>
                </td>
                <td>
                  
                  <a
                    href=""
                    className="btn btn-danger"
                    onClick={() => eliminarDocente(docente.Id_Docente)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
              <h1>No existe ese Docente</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      {/*Ventana modal para modificar un docente */}

     
            
         
   
      
    </div>
  );
};
