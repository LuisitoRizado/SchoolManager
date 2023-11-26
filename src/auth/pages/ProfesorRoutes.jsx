import { Navigate, Route, Routes } from 'react-router-dom';
import { NavbarProfesor } from '../../ui/components/NavbarProfesor';
import { InicioPage } from '../../Profesores/InicioPage';


export const ProfesorRoutes = () => {
  return (
    <>
        <NavbarProfesor />

        <div className="container-fluid">
            <Routes>
                <Route path="inicio/*" element={<InicioPage />} />
               





                <Route path="/" element={<Navigate to="/profesor/inicio" />} />

            </Routes>
        </div>


    </>
  )
}

