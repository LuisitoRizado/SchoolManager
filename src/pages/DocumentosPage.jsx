import { Link, NavLink, useNavigate } from "react-router-dom";

export const DocumentosPage = () => {
  return (
    <div>  <h1>Documentos</h1>
    <hr/>
    <div className='documentosDiv row m-5'>
    <div className="card m-3 col-md-5 shadow " >
<div className="row g-0">
<div className="col-md-4">
  <img src="https://thumbs.dreamstime.com/z/un-mont%C3%B3n-de-libros-libro-abierto-y-l%C3%A1piz-suministros-escolares-objetos-dibujos-animados-vectoriales-aislados-en-fondo-blanco-192812588.jpg" className="img-fluid rounded-start" alt="..."/>
</div>
<div className="col-md-8">
  <div className="card-body">
    <h5 className="card-title">Carga académica</h5>
    <p className="card-text">Puedes asignar, modificar o eliminar alguna materia a tu horario. Sólo en caso de ser posible.</p>
    <NavLink
                className={({ isActive }) =>
                  `btn btn-primary ${isActive ? "active" : ""}`
                }
                to="cargaAcademica"
              >
                Acceder
              </NavLink>
  </div>
</div>
</div>

</div>
<div className="card m-3 col-md-5 shadow" >
<div className="row g-0">
<div className="col-md-4">
  <img src="https://previews.123rf.com/images/stockgiu/stockgiu1904/stockgiu190412712/123642082-elemento-de-estudio-certificado-diploma-de-dibujos-animados-ilustraci%C3%B3n-vectorial-dise%C3%B1o-gr%C3%A1fico.jpg" className="img-fluid rounded-start" alt="..."/>
</div>
<div className="col-md-8">
  <div className="card-body">
    <h5 className="card-title">Kardex</h5>
    <p className="card-text">Revisa tu kardex.</p>
    <br/>
    
    <NavLink
                className={({ isActive }) =>
                  `btn btn-primary ${isActive ? "active" : ""}`
                }
                to="Kardex"
              >
                Acceder
              </NavLink>
  </div>
</div>
</div>
</div>
    </div></div>
  )
}
