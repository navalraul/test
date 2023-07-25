import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [userData, setUserData] = useState({ name: "", email: "", password: ""})
    const router = useNavigate();


    const handleChange=(event) => {
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const handleSubmit= (event) => {
        event.preventDefault();
        if(userData.name && userData.email && userData.password) {

            const array = JSON.parse(localStorage.getItem("Users")) || [];
            const Ls = { name: userData.name, email: userData.email, password: userData.password };

            console.log(array)
            array.push(Ls);
            console.log(Ls)

            localStorage.setItem("Users", JSON.stringify(array));
            alert("Registration Successful...")
            router('/login')
        } else{
            alert("Please fill all the fields")
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type='text' onChange={handleChange} name='name' /><br />
        <label>Email:</label><br />
        <input type='email' onChange={handleChange} name='email' /><br />
        <label>Password:</label><br />
        <input type='password' onChange={handleChange} name='password' /><br />
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default Register;
