
export const DatosReinscripcionPage = () => {
  return (
    <div className="contenedorReinscripcion">
        
      <div className="alert alert-success mt-4" role="alert">
        Tu pago ha sido registrado correctamente, espera tu hora y fecha
        asignada para inscribirte.
      </div>
      <div className="contenedorPago shadow row mt-5 p-4">
        <div className="contenidoTexto col-md-8">
        <h4 className="text-primary">Inscripción del ciclo Enero-Junio 2023</h4>
        <p><i></i><strong> Horario de selección de materias</strong></p>
        <p className="text-primary"><strong> 19 de Enero de 2023 a las 09:41 hrs</strong></p>
        <hr />
        <p className="text-primary">Pago de colegiatura</p>
        
        <p className="text-success">
          Tu pago ya se encuentra registrado, te podrás inscribir de acuerdo a
          las fechas y horarios establecidos.
        </p>
      </div>
      <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" alt="" className="col-md-3 img-fluid"/>
    </div>
    </div>
  )
}
