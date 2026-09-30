import { useState } from "react";
import api from "../services/api.js";
import {useNavigate, Link} from "react-router-dom";
import {Eye, EyeOff} from "lucide-react"

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await api.post("/v1/users/register", formData)
        alert("User registered successfully redirecting to the login page!");
        navigate("/login")
    } catch (error) {
        seterror(error.response?.data?.message || "Something went wrong!");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-yellow-600 h-105 w-150 rounded-2xl text-center pt-4 flex gap-5 items-center flex-col">
          <h2 className="text-2xl font-semibold">New user? Sign up</h2>
          <div className="w-90 h-70 flex flex-col gap-3">
            <form onSubmit={handleSubmit}>

            <div className="text-left">
              <label htmlFor="fullName">Fullname:</label>
              <div className="h-10 flex items-center p-4 rounded-lg bg-white text-black">
                <i className="fi fi-rr-user text-xl pt-1.5"></i>
                <input
                  value={formData.fullName}
                  onChange={(e)=> {
                    setFormData({
                        ...formData,
                        fullName: e.target.value
                    })
                  }}
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="outline-none p-5"
                />
              </div>
            </div>

            <div className="text-left">
              <label htmlFor="email">Email:</label>
              <div className=" h-10 flex items-center p-4 rounded-lg bg-white text-black">
                <i className="fi fi-rr-envelope text-xl pt-1.5"></i>
                <input
                  value={formData.email}
                  onChange={(e)=> {
                    setFormData({
                        ...formData,
                        email: e.target.value
                    })
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="outline-none p-5"
                />
              </div>
            </div>

            <div className="text-left">
              <label htmlFor="password">Password:</label>
              <div className=" h-10 flex items-center p-4 rounded-lg bg-white text-black">
                <i className="fi fi-rr-lock text-xl pt-1.5"></i>
                <div className="flex gap-9 items-center">
                <input
                  value={formData.password}
                  onChange={(e)=> {
                    setFormData({
                        ...formData,
                        password: e.target.value
                    })
                  }}
                  type={`${showPassword?"text":"password"}`}
                  name="password"
                  id="password"
                  className="outline-none p-5"
                />
                <div onClick={()=> (
                    setShowPassword(!showPassword)
                  )} className="hover:cursor-pointer">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              {error && (
                <p className="text-black pt-2 text-sm font-medium">
                  {error}
                </p>
              )}
              <div className="pt-5">
              <button
                type="submit"
                className="w-full bg-orange-800/30 rounded-lg text-3xl cursor-pointer h-12 hover:bg-orange-500"
              >
                Register
              </button>
              </div>
            </div>

            </form>

            <div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="hover:text-black hover:text-xl duration-200">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
