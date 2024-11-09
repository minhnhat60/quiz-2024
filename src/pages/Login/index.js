import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { getUser } from "../../services/userService";
import "./Login.scss";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { authen } from "../../actions/authen";

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        const result = await getUser(email, password);

        if(result && result.length > 0) {
            const data = result[0];
            setCookie("id", data.id, 1);
            setCookie("fullname", data.fullName, 1);
            setCookie("email", data.email, 1);
            setCookie("token", data.token, 1);

            dispatch(authen(true));

            navigate("/");

        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Sai email hoặc mật khẩu",
                showConfirmButton: false,
                timer: 2000
              });
        }
    };

    return (
        <>
            <div className="form">
                <h3 className="form__title">Login Quiz</h3>
                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" placeholder="Nhập Email" required></input>
                    <input name="password" type="password" placeholder="Nhập Password" required></input>
                    <button type="submit" className="button button__main">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;