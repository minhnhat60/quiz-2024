import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const token = "dsadas";
    return (
        <>
            {token ? <Outlet /> : <Navigate to="/login"/>}
        </>
    )
}

export default PrivateRoutes;