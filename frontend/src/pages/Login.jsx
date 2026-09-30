import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import LoadingScreen from "../components/LoadingScreen.jsx";
import {Eye, EyeOff} from "lucide-react"


const Login = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({  email: "", password: "",});
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("")
    try {
      const response = await api.post("/v1/users/login", formData);
      
      navigate("/dashboard",{replace: true})
    } catch (error) {
      setError(error.response?.data?.message || "Something Went Wrong!");
    } finally{
      setIsLoading(false);
    }
  };

  if(isLoading) {
    return (
      <LoadingScreen message="Logging you in..." />
    )
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-red-500 h-90 w-120 rounded-2xl text-center pt-4 flex gap-5 items-center flex-col">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <div className="w-90 h-70 flex flex-col gap-3">
            <form onSubmit={handleSubmit}>
              <div className="text-left">
                <label htmlFor="email">Email:</label>
                <div className=" h-10 flex items-center p-4 rounded-lg bg-white text-black">
                  <i className="fi fi-rr-envelope text-xl pt-1.5"></i>
                  <input
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="outline-none p-5"
                  />
                </div>
              </div>

              <div className="text-left pt-2">
                <label htmlFor="password">Password:</label>
                <div className=" h-10 flex items-center p-4 rounded-lg bg-white text-black">
                  <i className="fi fi-rr-lock text-xl pt-1.5"></i>
                  <div className="flex items-center gap-15 pl-5">
                    <div>
                    <input
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                    type={`${showPassword?"text":"password"}`}
                    name="password"
                    id="password"
                    className="outline-none"
                  />
                  </div>
                  <div onClick={()=> (
                    setShowPassword(!showPassword)
                  )} className="hover:cursor-pointer">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  
                  </div>
                  </div>
                </div>
                  <p className="text-right text-white pt-2 hover:text-lg hover:cursor-pointer hover:text-black duration-100">Forgot password ?</p>
              </div>

              <div>
                {error && <p className="text-black text-sm font-medium">{error}</p>}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full bg-orange-800/30 rounded-lg text-3xl cursor-pointer h-12 hover:bg-orange-500"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>

            <div>
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="hover:text-black hover:text-xl duration-200">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
