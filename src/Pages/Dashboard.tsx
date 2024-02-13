import { SideBar } from "../Components/Dashboard/SideBar"
import { useAuth } from "../Context/authContext" //Se importa el useAuth del authContext para poder usarlo en el home

export function Dashboard() {

    const { user, logOut, loading } = useAuth() //Se exportan las propiedades necesarias para todo 

    const handleLogout = async () => { //Se crea una funcion asyncrona para poder deslogearse
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    /* if (!user) { //Si no se tiene usuario se redirige al login
      navigate('/login')
    } Esto esta en ProtectedRoute*/


    //{/*Mensaje logeando*/}
    if (loading) return <h1>Loading</h1>


    return (
        // <div>
        //      <SideBar></SideBar>
        // </div>
        <div className="bg-blue-100">
            <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                {/* <div className="w-16 h-16 p-2  bg-gray-200 dark:bg-gray-800 transition-all transform hover:scale-110">
                    <img src={user.photoURL || '/user-icon.jpg'} className="h-full w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200" /> 
                </div> */}
                <br />
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Welcome, {user.displayName || user.email}</h1>

                <button className="mt-4 px-6 py-2 text-white bg-red-500 rounded-full transition-all transform hover:scale-110 hover:bg-red-600" onClick={handleLogout}>
                    Logout
                </button>
                <br />
            </div>
        </div>
    )
}