import { Routes, Route } from 'react-router-dom';
import { Home } from "./Pages/Home";
import { AuthProvider } from "./Context/authContext"; //Se da el contexto
import { ProtectedRoute } from './Components/SignIn/ProtectedRoute';
// import { SignUp } from "./Pages/SignUp";
import { Login } from './Pages/Login';
import { Dashboard } from './Pages/Dashboard';

function App() {
  return (
    <div>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} /> {/*Adentro de el componente ProtectedRoute proteje todas las rutas para usuarios no logeados*/}
        <Route path='/Login' element={<Login />} />
        {/* <Route path='/SignUp' element={<SignUp />} /> */}
        <Route path='/Dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
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