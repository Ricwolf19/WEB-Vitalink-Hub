import { useState } from "react"; //UserRef nos permite atravez de la referencia de un componente obtener el valor que nos devuelve el mismo componente (Vacio)
import { useAuth } from "../Context/authContext";
import { Alert } from "../Components/SignIn/Alert";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export function SignUp() {
  const navigate = useNavigate()
  const [captchaToken, setCaptchaToken] = useState(null);
  const [user, setUser] = useState({ //Se exporta un useState para poder guardar el email y el password del usuario
    email: '',
    password: ''
  })

  const siteKey = "6LdPmGwpAAAAANHjG3BVHr1DPtqodRh-bL4K6DTd"
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleChange = ({ target: { name, value } }: any) => { //Funcion para actualizar el estado
    //console.log(e.target.name, e.target.value); Se van mostrando todo lo que hay adentro de los inputs en consola
    //console.log(name, value)
    setUser({ ...user, [name]: value }) //Se tiene adentro de {Por que es un objeto el usuario}
  } //Se hace una funcion con cambio

  const handleCaptchaChange = (token: any) => { //Tambien se puede hacer simplemente poniendo un valor en () y consologeando ese mismo valor en la funcion
    setCaptchaToken(token);
  };

  const handleHome = () => {
    navigate('/')
  }

  //Para que funcione el await tiene que tener la palabra clave asyn en la funcion para indicar asyncrono y ejecutar acciones asyncronicas
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (!captchaToken) {
        throw new Error("The captcha is necessary");
      }
      await signUp(user.email, user.password);
    } catch (rawError) {
      const error = rawError as Error; // cast the unknown error to a normal JavaScript Error
      console.error("Signup Error:", error.message);
      if ((error as any).code === "auth/email-already-in-use") {
        setError("Email address is already in use.");
      } else {
        setError(error.message);
      }
    }
  };


  return ( //Se hace un form para poder ingresar los datos del usuario, (Importante name y onChange)
  <div className="container mx-auto flex justify-center items-center h-screen">
  <div className="w-full max-w-xs m-auto">

    {error && <Alert mesagge={error} />}

    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-fold mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="yourEmail@gmail.ltd"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
      </div>

      <div className="pl-[20%] mt-4 w-full md:w-3/4 lg:w-1/2">
        <ReCAPTCHA
          sitekey={siteKey}
          onChange={handleCaptchaChange}
          size="compact"
          theme="dark"
        /> 
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>

    </form>

    <p className="my-4 text-sm flex justify-between px-5">Already have an account?<Link to={'/Login'}>Login</Link></p>

    <button onClick={handleHome} className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full">Home</button>
  </div>
</div>

  )
}
