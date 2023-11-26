import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { UserRoutes } from '../auth/pages/UserRoutes';
import { DocenteRoutes } from '../auth/pages/DocenteRoutes';
import { ProfesorRoutes } from '../auth/pages/ProfesorRoutes';



export const AppRouter = () => {
  return (
    <>

        <Routes>
            
            <Route path="/" element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="empleado/*" element={ <DocenteRoutes />} />
            <Route path="user/*" element={ <UserRoutes />} />
            <Route path="profesor/*" element={ <ProfesorRoutes />} />
            
            

        </Routes>
    
    </>
  )
}
