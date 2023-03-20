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
                <Route path="alumnos/agregarAlumno" element={<AgregarAlumno />} />
                <Route path="alumnos/eliminarAlumno" element={<EliminarAlumnoPage />} />
                <Route path="materias/agregarMateria" element={<AgregarMateriaPage />} />
                <Route path="materias/administrarMaterias" element={<AdministrarMaterias />} />
                <Route path="administrarMaterias/modificarMateria" element={<ModificarMateriaPage />} />
                <Route path="docentes" element={<DocentesPage />} />
                <Route path="docentes/agregarDocente" element={<AgregarDocentePage />} />
                <Route path="docentes/administrarDocente" element={<AdministrarDocentePage />} />
                <Route path="administrarDocente/modificarDocente" element={<AdministracionDocentePage />} />
                <Route path="aulas" element={<AulasPage />} />
                <Route path="aulas/agregarAula" element={<AgregarAula />} />
                <Route path="aulas/administrarAula" element={<AdministrarAulaPage  />} />
                <Route path="administrarAula/modificarAula" element={<ModificarAulaPage  />} />
                <Route path="horarios" element={<HorariosPage  />} />
                <Route path="horarios/agregarHorario" element={<AgregarHorarioPage  />} />
                <Route path="horarios/administrarHorarios" element={<AdministracionHorarioPage  />} />
                <Route path="administrarHorarios/modificarHorario" element={<ModificarHorarioPage  />} />
                <Route path="materias/agregarDocenteMateria" element={<AgregarDocenteMateria  />} />



                <Route path="/" element={<Navigate to="/empleado/inicio" />} />

            </Routes>
        </div>


    </>
  )
}


