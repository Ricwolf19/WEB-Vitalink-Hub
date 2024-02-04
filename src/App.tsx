import { Route } from "wouter"
import { Home } from "./Pages/Home";

function App() {
  return (
    <>
    <Route path="/" component={Home}></Route>
    </>
  )
}

export default App
