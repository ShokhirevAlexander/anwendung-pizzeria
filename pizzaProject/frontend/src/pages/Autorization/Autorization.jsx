import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Autorization() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const AutorizationUser = async (e) => {
        e.preventDefault(); // Предотвращение стандартного поведения отправки формы
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('username', username);
            
            navigate("/");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="form-container">
            <h2>Авторизация</h2>
            <form>
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder = "Имя пользователя"
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder = "Пароль"
                    />
                </div>
                <button 
                    type="submit"
                    onClick={AutorizationUser}
                >
                    Авторизоваться
                </button>
            </form>
        </div>
    )
}

export default Autorization;