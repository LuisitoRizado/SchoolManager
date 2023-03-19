import { useState, useEffect } from "react"
export const AlumnoEncontrado = (Ncontrol) => {
    //Realizamos la peticion en busca del alumno
    const [alumno, setAlumno] = useState({});
 
    const URL = "https://rest-api-production-a5bf.up.railway.app/getAlumno/" +Ncontrol;
    const fetchUser =  async (URL) => {
     
      //Hacemos la peticion
        await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla
          console.log(data);
          setAlumno(data);
        })
        .catch((err) => console.log(err));
    };
     // HOOKS
    useEffect(() => {
      fetchUser(URL);
    }, [])

  return (
    <table>
        <thead>
            <tr>
                <td>Numero de control</td>
                <td>Nombre</td>
                <td>Apellido Paterno</td>
                <td>Apellido Materno</td>
                <td>Semestre</td>
                <td>Carrera</td>
            </tr>
        </thead>
        <tbody>
            <tr>
               <td>{alumno.NControl}</td>
               <td>{alumno.NOMBRE}</td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
            </tr>
        </tbody>
    </table>
  )
}
