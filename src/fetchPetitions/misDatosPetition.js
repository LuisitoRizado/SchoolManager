//En este documento estará la peticion a la api de obtener los datos del usuario
//Esto se ejecutara una vez entremos  al sesión de MisDatosPage.jsx
export const misDatosPetition = (alumno) =>{
    //Definimos la URL 
    const URL = 'https://rest-api-production-a5bf.up.railway.app/getAlumno/'+alumno;

    //Hacemos la peticion
    const data =  fetch(URL)
    .then((res)=> res.json())
    .then((data)=> {
        //Esta data la tenemos que pasar a la página para poder imprimirla o pintarla

        console.log(data);
    })
    .catch((err)=> console.log(err));
    
    
    //La data la vamos a pintar en nuestra 'MisDatosPage.jsx'
}