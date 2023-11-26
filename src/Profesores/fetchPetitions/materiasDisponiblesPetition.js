//Función para consultar la materia por semestre
export const consultarMateria = (semestre) =>{

    //URL
    const URL = 'https://rest-api-production-a5bf.up.railway.app/getMaterias/'+semestre;
    //Peticion
    fetch(URL)
    .then((response)=>response.json())
    .then((data)=> console.log(data));

}