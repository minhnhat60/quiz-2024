import { useNavigate } from "react-router-dom";

const ButtonGoBack = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(-1);
    };

    return (
        <>
            <button onClick={handleClick}>Trở lại</button>
        </>
    )
}

export default ButtonGoBack;