import React from 'react'

export const Alumno = ({alumno = []}) => {
  return (
    <>
   
         <h3 className='bg-dark text-white'>Datos generales</h3>
    <p><kbd className='bg-danger'>Nombre:</kbd>{alumno[0].Nombre} </p>
    <p><kbd className='bg-danger'>Correo Electrónico:</kbd> laog.sonic4@gmail.com</p>
    <h3 className='bg-dark text-white'>Información escolar</h3>
    <p><kbd className='bg-danger'>Número control:</kbd> </p>
    <p><kbd className='bg-danger'>Estatus:</kbd>ACTIVO</p>
    <p><kbd className='bg-danger'>Semestre:</kbd>  </p>
    <p><kbd className='bg-danger'>Carrera:</kbd> </p>
    <p><kbd className='bg-danger'>Especialidad:</kbd> r</p>
    <hr/>

    </>
  )
}
