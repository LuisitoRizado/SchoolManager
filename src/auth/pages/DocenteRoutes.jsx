import { Navigate, Route, Routes } from 'react-router-dom';
import { AlumnosPage } from '../../Docentes/pages/AlumnosPage';
import { InicioPage } from '../../Docentes/pages/InicioPage';
import { NavbarDocentes } from '../../ui/components/NavbarDocentes';
import { MateriasPage } from '../../Docentes/pages/MateriasPage';
import { AgregarAlumno } from '../../Docentes/pages/AgregarAlumno';
import { EliminarAlumnoPage } from '../../Docentes/pages/EliminarAlumnoPage';
import { AgregarMateriaPage } from '../../Docentes/pages/AgregarMateriaPage';
import { AdministrarMaterias } from '../../Docentes/pages/AdministrarMaterias';
import { ModificarMateriaPage } from '../../Docentes/pages/ModificarMateriaPage';
import { DocentesPage } from '../../Docentes/pages/DocentesPage';
import { AgregarDocentePage } from '../../Docentes/pages/AgregarDocentePage';
import { AdministrarDocentePage } from '../../Docentes/pages/AdministrarDocentePage';
import { AdministracionDocentePage } from '../../Docentes/pages/AdministracionDocentePage';
import { AulasPage } from '../../Docentes/pages/AulasPage';
import { AgregarAula } from '../../Docentes/pages/AgregarAula';
import { AdministrarAulaPage } from '../../Docentes/pages/AdministrarAulaPage';
import { ModificarAulaPage } from '../../Docentes/pages/ModificarAulaPage';
import { HorariosPage } from '../../Docentes/pages/HorariosPage';
import { AgregarHorarioPage } from '../../Docentes/pages/AgregarHorarioPage';
import { AdministracionHorarioPage } from '../../Docentes/pages/AdministracionHorarioPage';
import { ModificarHorarioPage } from '../../Docentes/pages/ModificarHorarioPage';
import { AgregarDocenteMateria } from '../../Docentes/pages/AgregarDocenteMateria';
export const DocenteRoutes = () => {
  return (
    <>
        <NavbarDocentes />

        <div className="container">
            <Routes>
                <Route path="inicio/*" element={<InicioPage />} />
                <Route path="alumnos" element={<AlumnosPage />} />
                <Route path="materias" element={<MateriasPage />} />
                <Route path="agregarAlumno" element={<AgregarAlumno />} />
                <Route path="eliminarAlumno" element={<EliminarAlumnoPage />} />
                <Route path="agregarMateria" element={<AgregarMateriaPage />} />
                <Route path="administrarMaterias" element={<AdministrarMaterias />} />
                <Route path="modificarMateria" element={<ModificarMateriaPage />} />
                <Route path="docentes" element={<DocentesPage />} />
                <Route path="agregarDocente" element={<AgregarDocentePage />} />
                <Route path="administrarDocente" element={<AdministrarDocentePage />} />
                <Route path="modificarDocente" element={<AdministracionDocentePage />} />
                <Route path="aulas" element={<AulasPage />} />
                <Route path="agregarAula" element={<AgregarAula />} />
                <Route path="administrarAula" element={<AdministrarAulaPage  />} />
                <Route path="modificarAula" element={<ModificarAulaPage  />} />
                <Route path="horarios" element={<HorariosPage  />} />
                <Route path="agregarHorario" element={<AgregarHorarioPage  />} />
                <Route path="administrarHorarios" element={<AdministracionHorarioPage  />} />
                <Route path="modificarHorario" element={<ModificarHorarioPage  />} />
                <Route path="agregarDocenteMateria" element={<AgregarDocenteMateria  />} />



                <Route path="/" element={<Navigate to="/empleado/inicio" />} />

            </Routes>
        </div>


    </>
  )
}


