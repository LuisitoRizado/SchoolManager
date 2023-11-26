import { Navigate, Route, Routes } from 'react-router-dom';
import { NavbarProfesor } from '../../ui/components/NavbarProfesor';
import { InicioPage } from '../../Profesores/InicioPage';
import { CalificacionesPage } from '../../Profesores/CalificacionesPage';
import { ReporteDocentePage } from '../../Profesores/ReporteDocentePage';



export const ProfesorRoutes = () => {
  return (
    <>
        <NavbarProfesor />

        <div className="container-fluid">
            <Routes>
                <Route path="inicio/*" element={<InicioPage />} />
                <Route path="reportes/" element={<ReporteDocentePage />} />
                <Route path="calificaciones/" element={<CalificacionesPage />} />
                <Route path="misDatos/" element={<ReporteDocentePage />} />
                <Route path="reportes/reportePDF" element={<ReportePDF />} />
               

                <Route path="/" element={<Navigate to="/profesor/inicio" />} />

            </Routes>
        </div>


    </>
  )
}

