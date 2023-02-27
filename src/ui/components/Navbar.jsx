import { Link, NavLink, useNavigate } from 'react-router-dom';
import { InicioPage } from '../../pages/InicioPage';

export const Navbar = () => {
    //Custom hook de react router para la navegación
    const navigate = useNavigate();

    const onLogout = () =>{
        navigate('/login',{
            replace:true
        });
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/user"
            >
                ITS
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                            {/*LINKS DE NUESTRO ROUTER */}
                    <NavLink 
                        className={({isActive})=> `nav-item nav-link ${isActive ? 'active':''}`} 
                        to="inicio"
                    >
                        Inicio
                    </NavLink>

                    <NavLink 
                        className={({isActive})=> `nav-item nav-link ${isActive ? 'active':''}`}
                        to="encurso"
                    >
                        Cursando
                    </NavLink>
                    <NavLink 
                        className={({isActive})=> `nav-item nav-link ${isActive ? 'active':''}`}
                        to="reinscripcion"
                    >
                        Reinscripción
                    </NavLink>
                    <NavLink 
                        className={({isActive})=> `nav-item nav-link ${isActive ? 'active':''}`}
                        to="documentos"
                    >
                        Documentos
                    </NavLink>
                    <NavLink 
                        className={({isActive})=> `nav-item nav-link ${isActive ? 'active':''}`}
                        to="misdatos"
                    >
                        Datos
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                  <span className='nav-item nav-link text-primary'>
                    Luis 
                  </span>
                  <button onClick={onLogout} className='nav-item nav-link btn'>
                    Logout
                  </button>
                </ul>
            </div>
        </nav>
    )
}