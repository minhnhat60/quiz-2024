import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";

const LayoutDefault = () => {
    const authen = useSelector(state => state.authenReducer);

    const token = getCookie("token");

    console.log(token);

    return (
        <>
            <header className='header'>
                <h2 className='header__logo'><Link to="/">Quiz</Link></h2>

                {token && (
                    <ul className='header__menu'>
                        <li><NavLink to="/">Trang chủ</NavLink></li>
                        <li><NavLink to="/topic">Topic</NavLink></li>                    
                        <li><NavLink to="/answers">Answers</NavLink></li>                    
                    </ul>
                )}
                
                <ul className="header__menu">
                    {token ? (<><li><NavLink to="/logout">Logout</NavLink></li></>) : 
                        (<>  <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                        </>)}
                </ul>
            </header>

            <Outlet />

            <footer className='footer'>
                Copyright 60F Technology
            </footer>
        </>
    )
}

export default LayoutDefault;