import { useState, useEffect } from "react";
import { validarCampos } from "./validarCampos";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const AdministrarMaterias = () => {
  //Hooks
  const [materia, setMateria] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [todasLasMaterias, setTodasLasMaterias] = useState([])
  let inputNombre;
  //Obtener el valor que el usuario teclea.
  const onHandleNControl = (e) => {
    setMateria(e.target.value);
  };

  //Peticion fetch

  const fetchUser = async () => {
    //Hacemos la peticion
    if(validarCampos(inputNombre)){
    const URL = "https://rest-api-production-a5bf.up.railway.app/getJusAtMateria/" + materia;

    await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
        console.log(data);
        setMaterias(data);
      })
      .catch((err) => console.log(err));
    }
  };

  //Funcion para redireccionar
  const redireccionarAModificacion = (id) => {
    window.location.href = "modificarMateria/?id=" + id;
  };
  // HOOKS
  const mostrarMaterias = () => {
    fetchUser();
  };
  useEffect(() => {
    inputNombre = document.querySelector('#nombre')
    console.log(inputNombre)
    fetch('https://rest-api-production-a5bf.up.railway.app/getAllMats')
    .then(res=>res.json())
    .then(data=>setTodasLasMaterias(data))
  }, [])
  
  useEffect(() => {
    inputNombre = document.querySelector('#nombre')
  }, [materia])
//Eliminar materia

  const eliminarMateria = async (id_materia) => {
    let tieneHijos = false;

    // todasLasMaterias.forEach((materia) => {
      //if (materia.Id_Materia === id_materia) {
      //  tieneHijos = true;
     // }
    //  console.log(materia.Id_Materia + " === " + id_materia);
 //   });

    if (!tieneHijos) {
      //borramos la materia
      if(confirm('¿Esta seguro que quiere eliminar?'))
      {
      await fetch("https://rest-api-production-a5bf.up.railway.app/deleteMateria/" + id_materia, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Registro eliminado exitosamente");
          } else {
            console.error("Ocurrió un error al eliminar el registro");
          }
        })
        .catch((error) => console.error(error));
      confirm("Aula eliminada con exito");
      window.location.reload()
      }
    } else {
      confirm("No se puede eliminar, tiene hijos");
    }
  };
  return (
    <div className="mt-4">
      <form action="" className="mt-5" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="form-control"
          onChange={(e) => onHandleNControl(e)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => mostrarMaterias()}
        >
          Buscar
        </button>
      </form>
      <hr />
      <h3>Resultados</h3>
      <hr />
      <div className="table-responsive">

      <table className="table  table-bordered">
        <thead className="bg-body-secondary">
          <tr className="bg-body-dark">
            <th scope="col">Id_Materia</th>
            <th scope="col">Materia</th>
            <th scope="col">Creditos</th>
            <th scope="col">Semestre</th>
            <th scope="col">Estatus</th>
            <th scope="col">Carrera</th>
            <th scope="col">Modificar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {materias.length >= 1 ? (
            materias.map((materia) => (
              <tr key={materia}>
                <td>{materia.Id_Materia}</td>
                <td>{materia.Materia}</td>
                <td>{materia.Creditos}</td>
                <td>{materia.Semestre}</td>
                <td>{materia.Estatus}</td>
                <td>{materia.Carrera}</td>
                <td>
                <NavLink
                className={'btn btn-warning'}
                
                to={{
                  pathname: 'modificarMateria',
                  search: '?id='+materia.Id_Materia
                }}
              >
                Modificar
              </NavLink>
                 
                </td>
                <td>
                  <button className="btn btn-danger" onClick={()=>eliminarMateria(materia.ID_MATERIA)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td><p>No se encontro ningúna materia</p></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};
