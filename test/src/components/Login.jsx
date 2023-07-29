import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

const Login = () => {

    const {state, Login} = useContext(AuthContext);

    const [userData, setUserData] = useState({ email: "", password: "" });
    const router = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userData.email && userData.password) {
            const users = JSON.parse(localStorage.getItem("Users"));

            var flag = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email == userData.email && users[i].password == userData.password) {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                return alert("Please Check your email & password")
            } else {
                localStorage.setItem("Current-user", JSON.stringify(users[i]));
                Login(users[i])
                alert("Login Successfull....");
                setUserData({ email: "", password: "" });
                router('/')
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email:</label><br />
                <input type='email' onChange={handleChange} name='email' /><br />
                <label>Password:</label><br />
                <input type='password' onChange={handleChange} name='password' /><br />
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login;
