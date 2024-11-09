import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import { createUser, getUser } from "../../services/userService";
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullName = event.target.elements.fullName.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        const existUser = await getUser(email);

        if(existUser.length > 0) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Email đã tồn tại!",
                showConfirmButton: false,
                timer: 2000
              });
        } else {
            const data = {
            fullName: fullName,
            email: email,
            password: password,
            token: generateToken()
            }

            const result = await createUser(data);

            if(result && result.id) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Đăng ký thành công"
                  });
                navigate("/login");
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Đăng ký tài khoản thất bại!",
                    showConfirmButton: false,
                    timer: 2000
                  });
            }
        }
    }
    return (
        <>
            <div className="form">
                <h3 className="form__title">Register Quiz</h3>
                <form onSubmit={handleSubmit}>
                    <input name="fullName" type="text" placeholder="Nhập họ tên" required></input>
                    <input name="email" type="email" placeholder="Nhập Email" required></input>
                    <input name="password" type="password" placeholder="Nhập Password" required></input>
                    <button type="submit" className="button button__main">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;