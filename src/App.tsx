import { Route } from "wouter"
import { Home } from "./Pages/Home";
import { Dashboard } from "./Pages/Dashboard";
import { SignIn } from "./Pages/SignIn";

function App() {
  return (
    <>
    <Route path="/" component={Home}></Route>
    <Route path="/SignIn" component={SignIn}></Route>
    <Route path="/Dashboard" component={Dashboard}></Route>
    </>
  )
}

export default App
