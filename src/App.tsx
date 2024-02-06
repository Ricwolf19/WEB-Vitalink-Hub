import { Route } from "wouter"
import { Home } from "./Pages/Home";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <>
    <Route path="/" component={Home}></Route>
    <Route path="/Dashboard" component={Dashboard}></Route>
    </>
  )
}

export default App
