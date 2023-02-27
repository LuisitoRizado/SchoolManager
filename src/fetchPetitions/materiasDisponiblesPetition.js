//Función para consultar la materia por semestre
export const consultarMateria = (semestre) =>{

    //URL
    const URL = 'http://localhost:3030/getMaterias/'+semestre;
    //Peticion
    fetch(URL)
    .then((response)=>response.json())
    .then((data)=> console.log(data));

}