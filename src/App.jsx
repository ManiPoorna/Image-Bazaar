import { Route, Routes } from "react-router-dom"
import "./App.css"
import Signup from "./components/Signup/Signup"
import Dashboard from "./components/Dashboard/Dashboard"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={< Signup />} />
        <Route path="/image-bazaar" element={< Signup />} />
        <Route path="/image-bazaar-dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App