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




                <Route path="/" element={<Navigate to="/inicio" />} />

            </Routes>
        </div>


    </>
  )
}

