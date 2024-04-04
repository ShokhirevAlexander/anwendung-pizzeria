import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import "./register.scss";

function LoginRegister() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const RegisterUser = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/account/register/', { username, password });
            localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh));
            localStorage.setItem('username', username);
            if (response.status === 201) {
              navigate("/");
            }
        } catch(error) {
            console.log(error.response.data.username);
        }
    }

    return (
        <div className="form-container">
            <h2>Регистрация пользователя</h2>
            <form>
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
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
                    type="button"
                    onClick={RegisterUser}
                >
                  Зарегистрироваться
                </button>
            </form>
            <p>Если у вас уже есть аккаунт, войдите  
              <Link to="/login" className="authorization">
                здесь
              </Link>.
            </p>
        </div>
    );
}

export default LoginRegister;

