import { Navigate, Route, Routes } from 'react-router-dom';
import { NavbarProfesor } from '../../ui/components/NavbarProfesor';
import { InicioPage } from '../../Profesores/InicioPage';
import { CalificacionesPage } from '../../Profesores/CalificacionesPage';
import { ReporteDocentePage } from '../../Profesores/ReporteDocentePage';
import { ReportePDF } from '../../Profesores/ReportePDF';
import { CalificacionAlumnoPage } from '../../Profesores/CalificacionAlumnoPage';
import { ReporteCalificaciones } from '../../Profesores//ReporteCalificaciones';


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
                <Route path="reportes/reporteCalificacionesPDF" element={<ReporteCalificaciones />} />

                <Route path="calificaciones/reporteCalificacionesPDF" element={<ReporteCalificaciones />} />
                <Route path="calificaciones/calificacionAlumno" element={<CalificacionAlumnoPage />} />
               

                <Route path="/" element={<Navigate to="/profesor/inicio" />} />

            </Routes>
        </div>


    </>
  )
}

