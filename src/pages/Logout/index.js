import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authen } from "../../actions/authen";

const Logout = () => {
    const navigate = useNavigate();    

    const dispatch = useDispatch();

    useEffect(() => {
        deleteAllCookies();
        
        dispatch(authen(false));

        navigate("/login");
    }, [dispatch, navigate]);

    return (
        <>
            <h2>Trang Logout</h2>
        </>
    )
}

export default Logout;