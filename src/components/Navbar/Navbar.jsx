/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom"
import "./style.css"


const Navbar = () => {
  const navigate = useNavigate();
  
  function handleLogout() {
    navigate("/")
  }
  
  return (
    <div className="nav">
      <h1>IMAGE-BAZAAR</h1>
      <button onClick={handleLogout}  className="button">Logout</button>
    </div>
  )
}

export default Navbar