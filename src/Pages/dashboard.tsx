import { useAuth } from "../Context/authContext" //Se importa el useAuth del authContext para poder usarlo en el home
import { Routes, Route } from "react-router-dom";
import { MoveUpIcon } from "lucide-react";
import { IconButton, Typography } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  // Configurator,
  Footer,
} from "../Components/Dashboard/Layout";
import routes from "../../routes";
import { useMaterialTailwindController } from "../Context/MaterialController";


export function Dashboard() {
  const { loading } = useAuth() //Se exportan las propiedades necesarias para todo 
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;
  //Se quito user y LogOut de propiedades

  // const handleLogout = async () => { //Se crea una funcion asyncrona para poder deslogearse
  //     try {
  //         await logOut()
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  /* if (!user) { //Si no se tiene usuario se redirige al login
    navigate('/login')
  } Esto esta en ProtectedRoute*/


  //{/*Mensaje logeando*/}
  if (loading) return <h1>Loading...</h1>


  return (
    <div className="min-h-screen bg-blue-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar /> 
        {/* <div>{user.email}</div> */}
        {/* <Configurator /> */}
        <Typography as="a" href="#" placeholder=""> {/* arrow to up in all sites */}
        <IconButton
          placeholder=""
          size="lg"
          color="red"
          className="fixed bottom-12 right-4 z-40 shadow-blue-gray-900/10"
          ripple={false}
          // onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <MoveUpIcon className="h-5 w-5" href="#" />
        </IconButton>
        </Typography>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route
                  key={path} // Added a key here is good practice
                  path={path}
                  element={element}
                />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}