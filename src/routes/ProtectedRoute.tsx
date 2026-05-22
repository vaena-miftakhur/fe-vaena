import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute(){
    const isAuthenticate = useAuthStore((state) => state.isAuthenticate);

    //jika autheticate = false maka di rederect ke halaman login
    if (!isAuthenticate){
        return <Navigate to="/login" replace />;
    }

    //jika true maka boleh akses halaman
    return <Outlet/>;
}