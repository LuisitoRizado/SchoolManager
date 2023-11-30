import React from "react";
import { Document, Page, Text, Image, View, StyleSheet  } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useState,useEffect } from "react";
export const HorarioPDF = () => {
    const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const alumno = window.localStorage.getItem('user');
  console.log(alumno);
  
  //-----Hooks
  const [cargas, setCargas] = useState([]);
  const [user, setUser] = useState([])
  const [carrera, setCarrera] = useState([])
  const [idCarrera, setIdCarrera] = useState()

  //const [semestre, setSemestre] = useState();
  //URL
  const URL = "https://rest-api-production-a5bf.up.railway.app/getCarga/" + alumno;
  //Peticion
  const consultarMaterias =  () => {
     fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //Ordenamos el horario por hora:
        //Cortamos el primer número, en caso de ser dos los cortamos los y los convertirmos a number
        let seEncontro = false;
        let hora;
     
        data.sort((o1,o2)=>{
          
          if(o1.HORA_INICIO_LUNES>o2.HORA_INICIO_LUNES){
            return -1;
          }
          else if(o1.HORA_INICIO_LUNES<o2.HORA_INICIO_LUNES){
            return 1;
          }
          else{
            return 0;
          }
        })
        setCargas(data);
      });
  };


  const consultarAlumno = async() =>{
    const url = 'https://rest-api-production-a5bf.up.railway.app/getAlumno/' + alumno;
    await fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setUser(data)
      setIdCarrera(data[0].Id_Carrera);
      console.log(idCarrera)
      }
      )
  }
  const consultarCarrera = async() =>{
    const url = 'https://rest-api-production-a5bf.up.railway.app/getCarrera/' + idCarrera;
    await fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setCarrera(data)}
      )
  }
  useEffect(() => {
    consultarMaterias();
    consultarAlumno()
    console.log(idCarrera)
  }, []);
  useEffect(() => {
    if (idCarrera) {
      consultarCarrera();
    }
  }, [idCarrera]);
 
  

  const styles = StyleSheet.create({
    table: {
      margin:'0 auto',
    width: '90%',
    borderWidth: 1,
    textAlign:'center',
    borderColor: '#999',
    marginBottom: 20,
    },
    tableRow: {
    flexDirection: 'row',
    },
    tableCol: {
      fontSize:'9px',
    borderWidth: 1,
    borderColor: '#999',
    color:'black',
    fontWeight:'bold',
    backgroundColor:'#A9A0A0',
    padding: 2,
    },
    tableCell: {
      fontSize:'9px',
    display:'flex',
    flexDirection:'column',
    borderWidth: 1,
    justifyContent:'space-between',
    textAlign:'left',
    borderColor: '#999',
    padding: 10,
    },
    });

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }} >
      <Document style={{padding:'400px'}}>
        <Page size="A4">
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              padding:'40px'
            }}
          >
            <Image
              style={{ width: "100px", height: "25px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG9CnsNyNBFmiXDulHgIev9pZej1tz8zwViQ&usqp=CAU"
              alt="icono"
            />
            <Image
              style={{ width: "100px", height: "25px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/SEP_Logo_2019.svg/300px-SEP_Logo_2019.svg.png"
            />
            <Image
              style={{ width: "50px", height: "25px" }}
              src="https://cdn.domestika.org/c_pad,dpr_auto,f_auto,h_150,q_auto,w_150/v1595881497/school-logos/000/023/777/23777-original.png?1595881497"
            />
          </View>
          <Text style={{textAlign:'center', fontSize:'10px', marginTop:'15px'}}>Carga academica</Text>

          {/* User info */}
          <View style={{...styles.table, marginTop:'30px'}}>
  <View style={styles.tableRow}>
  <View style={{  ...styles.tableCol, width: '20%', }}>
      <Text>Control                                      </Text>
    </View>
    <View style={{  ...styles.tableCol, width: '40%',  }}>

      <Text>Nombre    </Text>
    </View>
  
    <View style={{  ...styles.tableCol, width: '10%', }}>

      <Text>Semestre  </Text>
    </View>
    <View style={{  ...styles.tableCol, width: '30%', }}>

      <Text>Periodo     </Text>
    </View>
  </View>
  {
    user.map((alumno, index)=>(
    <View style={{...styles.tableRow, textAlign:'center'}} key={index}>
      <View style={{...styles.tableCell, width: '20%',}}>
      <Text>{alumno.NControl}</Text>
    </View>
    <View style={{...styles.tableCell, width: '40%',}}>
      <Text>{alumno.Nombre} {alumno.Ap_Paterno} {alumno.Ap_Materno}</Text>
    </View>
    <View style={{...styles.tableCell, display:'flex', flexDirection:'column', width:'10%'}}>

      <Text>{alumno.Semestre}    </Text>
    </View>
     
    </View>
    ))
  }

</View>
{/* HORARIOS */}

<View style={styles.table}>
  <View style={styles.tableRow}>
  <View style={{  ...styles.tableCol, width: '30%', }}>
      <Text>Materia                                                      </Text>
    </View>
    <View style={{  ...styles.tableCol, width: '10%', }}>

      <Text>Rep     </Text>
    </View>
  
    <View style={{  ...styles.tableCol, width: '10%', }}>

      <Text>Lunes      </Text>
    </View>
    <View style={{  ...styles.tableCol, width: '10%', }}>

      <Text>Martes     </Text>
    </View>
    <View style={{  ...styles.tableCol, width: '10%', }}>

      <Text>Miercoles </Text>
    </View>
    <View style={{  ...styles.tableCol, width: '10%', }}>

      <Text>Jueves    </Text>
    </View>
    <View style={styles.tableCol}>
      <Text>Viernes   </Text>
    </View>
    <View style={styles.tableCol}>
      <Text>Sábado    </Text>
    </View>
    <View style={styles.tableCol}>
      <Text>Domingo    </Text>
    </View>
  </View>
  {
    cargas.map((carga, index)=>(
    <View style={styles.tableRow} key={index}>
      
      <View style={{...styles.tableCell, width: '34%',}}>
      <Text>{carga.Nombre_Aula} / </Text>
      <Text>{carga.Nombre_Materia}</Text>
      <Text>Profesor: {carga.Nombre_Docente} {carga.AP_PATERNO} {carga.AP_MATERNO}</Text>
    </View>
    <View style={styles.tableCell}>
      <Text>No </Text>
    </View>
    
    <View style={{...styles.tableCell, width:'10%'}}>
      <Text >{carga.Hora_Inicio} - {carga.Hora_Final} </Text>
    </View>
    <View style={{...styles.tableCell, width:'10%'}}>

    <Text>{carga.Hora_Inicio} - {carga.Hora_Final} </Text>

    </View>
    <View style={{...styles.tableCell, width:'10%'}}>

    <Text>{carga.Hora_Inicio} - {carga.Hora_Final} </Text>

    </View>
    <View style={{...styles.tableCell, width:'10%'}}>

    <Text>{carga.Hora_Inicio} - {carga.Hora_Final} </Text>

    </View>
    <View style={{...styles.tableCell, width:'10%'}}>

    <Text>{carga.Hora_Inicio} - {carga.Hora_Final} </Text>

    </View>
    <View style={styles.tableCell}>
      <Text>           </Text>
    </View>
    <View style={styles.tableCell}>
      <Text>            </Text>
    </View>
    </View>
    ))
  }
  {/* 
  ))} */}
</View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
