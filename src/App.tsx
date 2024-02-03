import { Route } from "wouter"
import { Home } from "./Pages/Home";

function App() {
  return (
    <>
    <Route path="/Home" component={Home}></Route>
    </>
  )
}

export default App
