import { Link, useLocation, useNavigate,} from "react-router-dom";
import { useState } from "react";
import api from "../services/api.js";
import LoadingScreen from "./LoadingScreen.jsx";


function Navbar() {
  
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  const logoutUser = async()=> {
    setIsLoggingOut(true);
    try {
      await api.post("/v1/users/logout");
      navigate("/login", {replace: true});
    } catch (error) {
      console.log("Logout failed: ",error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  const handleHomePage = () => {
    navigate("/")
  }

  if(isLoggingOut) {
    <LoadingScreen message="Logging you out..." />
  }

  return (
    <>
      <div className="bg-orange-400 w-full h-16.5 rounded-lg">
        <div className="p-2 flex justify-between items-center">
          <h1 className="pl-4 text-3xl cursor-pointer hover:text-black" onClick={handleHomePage} >Todo Manager</h1>
          <div className="text-2xl flex gap-8">
              {location.pathname === "/dashboard" ? (
                <>
                <div className="flex justify-center items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-300 gap-1">
                <i className="fi fi-rr-user text-xl pt-1.5"></i>
                <button 
                className="hover:cursor-pointer"
                onClick={logoutUser}
                >
                  Logout
                </button>
                </div>
                </>
              ) : (
                <Link to={"/login"} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 hover:cursor-pointer transition duration-300 hover:text-black">Login</Link>
              )}
            {
              location.pathname !== "/dashboard" ? 
              (<Link
              to="/register"
              className="px-4 py-2 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-300"
              >
              Register
              </Link>) : null
            }
            
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
