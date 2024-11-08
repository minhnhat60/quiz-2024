import "./Login.scss";

const Login = () => {
    return (
        <>
            <div className="form">
                <h3 className="form__title">Login Quiz</h3>
                <form>
                    <input name="email" type="email" placeholder="Nhập Email" required></input>
                    <input name="password" type="password" placeholder="Nhập Password" required></input>
                    <button type="submit" className="button button__main">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;