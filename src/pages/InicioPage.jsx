import "../styles/noticias.css";
import { cargarUsuario } from "../auth/storage";
export const InicioPage = () => {
  //Una vez estando en el inicio, llamamos a la funcion de localStorage
  //Obtenemos el usuario de los query params que se guarda.
  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const usuario = params.get("usuario");

  //Tenemos dos casos:
  //1.- La primera vez que se inicia sesión
  //2.- Cuando ya hay una sesión iniciada

  //Primer caso, cuando es la priemra vez que se inicioa
  //Comprobamos que no exista un valor anterior en el LocalStorage
  //Si no se encuentra, lamamos la funcion con el query param
  if (usuario) {
    cargarUsuario(usuario);
  } else {
    cargarUsuario(window.localStorage.getItem("user"));
  }

  //lIMPIAMOS EL HORARIO
  window.localStorage.removeItem("materias");
  console.log(window.localStorage.getItem("user"));

  return (
    <div className="mainContainer mt-1 border container-fluid">
      <div className="main row">
        <div className="contenedorImageMain col-md-6"></div>
        <div className="infoDerechaMain col-md-6 d-flex flex-column justify-content-center align-items-start">
          <h2>Bienvendio al portal escolar</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            atque eius necessitatibus dolor libero eveniet nisi, asperiores
            veniam magnam accusantium nesciunt dolorem adipisci quas iure aut
            recusandae provident ipsa vero!
          </p>
          <button className="btn btn-danger">Acceder</button>
        </div>
      </div>
      <div className="main mt-3 border row">
        <div className="infoDerechaMain col-md-6 d-flex flex-column justify-content-center align-items-start">
          <h1>Bienvendio al portal escolar</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            atque eius necessitatibus dolor libero eveniet nisi, asperiores
            veniam magnam accusantium nesciunt dolorem adipisci quas iure aut
            recusandae provident ipsa vero!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            animi impedit quas dignissimos adipisci temporibus possimus
            consequuntur quidem, ad ipsam perspiciatis molestiae modi a facere
            excepturi odio ab inventore cumque.
          </p>
        </div>
        <div className="contenedorImageMain2 col-md-6"></div>
      </div>
      {/*   <div className="noticiaPrincipal row shadow">
        <div className="noticiaInicial col-md-8">
          <img
            src="https://viveloensaltillo.com/wp-content/uploads/2021/11/1254x851usts.png"
            className="img-fluid"
            alt=""
          />
          <div className="contenidoNoticiaPrincipal row">
            <h1 className="col-md-6">Nuevo ciclo escolar Enero - Junio 2023</h1>
            <div className="col-md-6 ">
              <p>
                Inicia un nuevo Periodo de clases en el Instituto tecnológico de
                Saltillo
              </p>
              <a href="" className="btn btn-danger">
                Leer más
              </a>
            </div>
          </div>
        </div>
        <div className="noticiasLateral col-md-4">
          <h2 className="text-warning">Quizás te interese...</h2>
          <h3 className="tituloLateral">Inicia nuevo ciclo Enero - Junio 2023</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            minus porro eligendi recusandae suscipit voluptas ex eius. Quibusdam
            ad possimus debitis modi, facere, aliquid, doloremque tenetur eius
            sit sed ex!
          </p>

          <h3 className="tituloLateral">Se inaugura nuevo equipo de Fútbol</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            minus porro eligendi recusandae suscipit voluptas ex eius. Quibusdam
            ad possimus debitis modi, facere, aliquid, doloremque tenetur eius
            sit sed ex!
          </p>

          <h3 className="tituloLateral">Remodelación de Aulas</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            minus porro eligendi recusandae suscipit voluptas ex eius. Quibusdam
            ad possimus debitis modi, facere, aliquid, doloremque tenetur eius
            sit sed ex!
          </p>
        </div>
      </div>

      <div className="noticiasTerceros">
        <div className="noticiaChica shadow">
          <img
            src="https://saltillo.tecnm.mx/images/anexos/complementarias.png"
            alt=""
            className="imagenChica"
          />
          <div className="contenidoNoticiaChica">
            <h3 className="titutloNoticiaChica">Catálogo</h3>
            <p>
              Consulta el nuevo catálogo para este ciclo Enero - Junio 2023{" "}
            </p>
            <a className="btn btn-primary">Ver más</a>
          </div>
        </div>
        <div className="noticiaChica shadow">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJN7nc1iC9bXZhMn8FyHVEsWG0BVMh008sg&usqp=CAU"
            alt=""
            className="imagenChica "
          />
          <div className="contenidoNoticiaChica">
            <h3 className="titutloNoticiaChica">Nuevo transporte para equipos</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              ipsa quam, error esse officia obcaecati amet laboriosam
              perferendis aquo accusamus
            </p>
            <a className="btn btn-primary">Ver más</a>
          </div>
        </div>
        <div className="noticiaChica shadow">
          <img
            src="https://desaltillo.com/wp-content/uploads/2022/05/Gorra-Guinda-ITS-Trasera-Tienda.jpg"
            alt=""
            className="imagenChica"
          />
          <div className="contenidoNoticiaChica">
            <h3 className="titutloNoticiaChica">Noticia 3</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              vero, laborum illum ut quam aut aliquid vitae eveniet nesciunt
              suscipit{" "}
            </p>
            <a className="btn btn-primary">Ver más</a>
          </div>
        </div>
      </div> */}
    </div>
  );
};
