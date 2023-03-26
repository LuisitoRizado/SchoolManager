import React from "react";
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
export const ReporteCalificaciones = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const id = params.get("id");
  const id_Materia = parseInt(window.localStorage.getItem("id_materia"));
  console.log(id);
  const [docente, setDocente] = useState([]);
  const [materia, setMateria] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  useEffect(() => {
    fetch("https://rest-api-production-a5bf.up.railway.app/getDocente/" + id)
      .then((res) => res.json())
      .then((data) => setDocente(data));

    fetch(
      "https://rest-api-production-a5bf.up.railway.app/getMateria/" + id_Materia
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMateria(data.slice(0, 1));
      });

    fetch(
      "https://rest-api-production-a5bf.up.railway.app/alumnosInscritos/" +
        id_Materia
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAlumnos(data);
      });
  }, []);

  const styles = StyleSheet.create({
    table: {
      margin: "0 auto",
      width: "90%",
      textAlign: "center",
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      fontSize: "9px",
      color: "black",
      fontWeight: "bold",
      backgroundColor: "#A9A0A0",
      padding: 2,
    },
    tableCell: {
      fontSize: "9px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "left",
      borderColor: "#999",
      padding: 10,
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document style={{ padding: "400px" }}>
        <Page size="A4">
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              padding: "40px",
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
          {/* NOMBRE DE LA MATERIA */}
          {materia.map((mat, index) => (
            <Text
              style={{
                textAlign: "center",
                fontSize: "10px",
                marginTop: "15px",
              }}
            >
              {mat.Materia}
            </Text>
          ))}

          {/* Datos docente, materias */}
          <View style={{ marginTop: "20px", marginLeft: "20px" }}>
            {docente.map((doc, index) => (
              <Text
                style={{
                  textAlign: "left",
                  fontSize: "10px",
                  marginTop: "15px",
                }}
              >
                Docente : {doc.Nombre} {doc.AP_PATERNO} {doc.AP_MATERNO}
              </Text>
            ))}
            {materia.map((mat, index) => (
              <Text
                style={{
                  textAlign: "left",
                  fontSize: "10px",
                  marginTop: "15px",
                }}
              >
                Materia : {mat.Materia}
              </Text>
            ))}
            <Text
              style={{ textAlign: "left", fontSize: "10px", marginTop: "15px" }}
            >
              Fecha: {formattedDate}
            </Text>
            <Text
              style={{ textAlign: "left", fontSize: "10px", marginTop: "15px" }}
            >
              Hora: {hours}:{minutes}
            </Text>
          </View>
          {/* ------------------------------Alumnos */}
          <View style={{ ...styles.table, marginTop: "30px" }}>
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableCol, width: "20%" }}>
                <Text>Número de Control </Text>
              </View>
              <View style={{ ...styles.tableCol, width: "20%" }}>
                <Text>Apellido paterno </Text>
              </View>
              <View style={{ ...styles.tableCol, width: "20%" }}>
                <Text>Apellido Materno </Text>
              </View>
              <View style={{ ...styles.tableCol, width: "20%" }}>
                <Text>Nombre </Text>
              </View>
              <View style={{ ...styles.tableCol, width: "20%" }}>
                <Text>Calificación </Text>
              </View>
            </View>
            {alumnos.map((alumno, index) => (
              <View
                style={{ ...styles.tableRow, textAlign: "center" }}
                key={index}
              >
                <View style={{ ...styles.tableCell, width: "20%" }}>
                  <Text>{alumno.Ncontrol}</Text>
                </View>
                <View style={{ ...styles.tableCell, width: "20%" }}>
                  <Text>
                  {alumno.Ap_Paterno} 
                  </Text>
                </View>
                <View style={{ ...styles.tableCell, width: "20%" }}>
                  <Text>
                 {alumno.Ap_Materno}
                  </Text>
                </View>
                <View style={{ ...styles.tableCell, width: "20%" }}>
                  <Text>
                    {alumno.Nombre}
                  </Text>
                </View>
                <View style={{ ...styles.tableCell, width: "20%" }}>
                  <Text>
                    {alumno.Calificacion ? alumno.Calificacion : 'No disponible'}
                  </Text>
                </View>
             
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
