import {Navigate} from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../services/api";


const ProtectedRoute = ({children})=> {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(()=> {
        const checkAuth = async ()=> {
            try {
                await api.get("/v1/users/current-user");
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        }

        checkAuth();
    }, []);

    if(isAuthenticated == null) {
        return <p>Loading...</p>;
    }

    if(isAuthenticated == false) {
        return <Navigate to={"/login"} />;
    }

    return children;
}

export default ProtectedRoute;