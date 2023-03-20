import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import { InicioPage } from '../../pages/InicioPage';
import { EnCursoPage } from '../../pages/EnCursoPage';
import { DocumentosPage } from '../../pages/DocumentosPage';
import { MisDatos } from '../../pages/MisDatosPage';
import { ReinscripcionPage } from '../../pages/ReinscripcionPage';
import { DatosReinscripcionPage } from '../../pages/DatosReinscripcionPage';
import { MateriasDisponibles } from '../../pages/MateriasDisponibles';
import { SeleccionMateriasPage } from '../../pages/SeleccionMateriasPage';
import { SeleccionarMateriaPage } from '../../pages/SeleccionarMateriaPage';
import { MateriasPage } from '../../pages/MateriasPage';

export const UserRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
            <Routes>
                <Route path="inicio/*" element={<InicioPage />} />
                <Route path="encurso" element={<EnCursoPage />} />
                <Route path="reinscripcion" element={<ReinscripcionPage />} />
                <Route path="documentos" element={<DocumentosPage />} />
                <Route path="misdatos" element={<MisDatos />} />
                <Route path="/reinscripcion/datosreinscripcion" element={<DatosReinscripcionPage />} />
                <Route path="/reinscripcion/materiasdisponibles" element={<MateriasDisponibles />} />
                <Route path="/reinscripcion/seleccionmaterias" element={<SeleccionMateriasPage />} />
                <Route path="/seleccionmaterias/seleccionarMateria" element={<SeleccionarMateriaPage />} />
                <Route path="/materiasdisponibles/materiaspage" element={<MateriasPage />} />





                <Route path="/" element={<Navigate to="/user/inicio" />} />

            </Routes>
        </div>


    </>
  )
}

