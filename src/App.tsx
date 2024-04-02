import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingpPage } from "./Pages/LandingPage";
import { AuthProvider } from "./Context/authContext"; //Se da el contexto
import { ProtectedRoute } from './Components/SignIn/ProtectedRoute';
// import { SignUp } from "./Pages/SignUp";
// import { Login } from './Components/HomePage/Login';
import { Dashboard } from './Pages/Dashboard';

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingpPage />} /> {/*Adentro de el componente ProtectedRoute proteje todas las rutas para usuarios no logeados*/}
          {/* <Route path='/Login' element={<Login />} /> */}
          {/* <Route path='/SignUp' element={<SignUp />} /> */}
          <Route path='/dashboard/*' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute> <Navigate to="/dashboard/home" replace /> </ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App


// function App() {
//   return (
//     <>
//     <Route path="/" component={Home}></Route>
//     <Route path="/SignIn" component={SignIn}></Route>
//     <Route path="/Dashboard" component={Dashboard}></Route>
//     </>
//   )
// }