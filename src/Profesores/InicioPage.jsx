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
    <div className="mainContainer mt-1  container-fluid">
      <div className="main row">
        <div className="infoDerechaMain col-md-6 d-flex flex-column justify-content-center align-items-start">
          <h1 className="text-light">Bienvenido al portal escolar</h1>
           <hr />
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            atque eius necessitatibus dolor libero eveniet nisi, asperiores
            veniam magnam accusantium nesciunt dolorem adipisci quas iure aut
            recusandae provident ipsa vero!
          </p>
          <a href="#" class="btn btn-primary">Más información</a>
        </div>
        <div className="contenedorImageMain col-md-6 p-2"></div>

      </div>
      <div className="main2 mt-3  row">
      <div className="contenedorImageMain2 col-md-6"></div>

        <div className="infoDerechaMain col-md-6 d-flex flex-column justify-content-center align-items-start">
          <h1 className="">Un nuevo periodo escolar!</h1>
          <br />
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            atque eius necessitatibus dolor libero eveniet nisi, asperiores
            veniam magnam accusantium nesciunt dolorem adipisci quas iure aut
            recusandae provident ipsa vero!
          </p>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            animi impedit quas dignissimos adipisci temporibus possimus
            consequuntur quidem, ad ipsam perspiciatis molestiae modi a facere
            excepturi odio ab inventore cumque.
          </p>
        </div>
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
<footer class="text-center text-lg-start bg-dark mt-4 text-muted container-fluid">
  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <div class="me-5 d-none d-lg-block">
      <span>Empieza a estudiar con nostros!</span>
    </div>

    <div>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-github"></i>
      </a>
    </div>
  </section>

  <section class="">
    <div class="container text-center text-md-start mt-5">
      <div class="row mt-3">
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3"></i>Instituto tecnológico de Saltillo
          </h6>
          <p>
            La mejor opción para tu educación
          </p>
        </div>

        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
          </h6>
          <p>
            <a href="#!" class="text-reset">Sistemas</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Industrial</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Gestión</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Eléctrica</a>
          </p>
        </div>

        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
          </h6>
          <p>
            <a href="#!" class="text-reset">Mecatrónica</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Administración</a>
          </p>
          
        </div>

        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 class="text-uppercase fw-bold mb-4">Contact0</h6>
          <p><i class="fas fa-home me-3"></i> Saltillo Coahuila, México</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
          </p>
          <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
        </div>
      </div>
    </div>
  </section>

  <div class="text-center p-4" >
    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">Instituto tecnológico de Saltillo</a>
  </div>
</footer>
    </div>
  );
};
