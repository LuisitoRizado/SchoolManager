
//Exportamos la funcion para hacer la peticion
//Recibe al alumno, que inicialmnete es un objeto vacio
export const addUserPetition = (ncontrol,id_carrera, nombre, ap_paterno, ap_materno, semestre,periodo,creditos,especialidad, contrasena) =>{
    //Construimos la url para agregar datos
    const url = 'http://localhost:3030/addAlumno'
    fetch(url, {method:"POST", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },body: JSON.stringify({
        "NCONTROL": ncontrol,
        "ID_CARRERA": id_carrera,
        "NOMBRE": nombre,
        "AP_PATERNO":ap_paterno,
        "AP_MATERNO":ap_materno,
        "SEMESTRE":semestre,
        "PERIODO":periodo,
        "CREDITOS_DISPONIBLES":creditos,
        "ESPECIALIDAD":especialidad,
        "CONTRASENA":contrasena
    })})
    .then((response)=>response.json())
    .then((data)=>console.log('Alumno agregado: ' + data));

    window.location.reload();
}