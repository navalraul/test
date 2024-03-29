import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [userData, setUserData] = useState({ name: "", email: "", password: "", role:"Buyer"})
    const router = useNavigate();


    const handleChange=(event) => {
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const handleSubmit= (event) => {
        event.preventDefault();
        if(userData.name && userData.email && userData.password) {

            const array = JSON.parse(localStorage.getItem("Users")) || [];
            const Ls = { name: userData.name,
               email: userData.email,
                password: userData.password, 
                role: userData.role,
              cart: [] };

            console.log(array)
            array.push(Ls);
            console.log(Ls)

            localStorage.setItem("Users", JSON.stringify(array));
            setUserData({  name: "", email: "", password: "", role:"Buyer" })
            alert("Registration Successful...")
            router('/login')
        } else{
            alert("Please fill all the fields")
        }
    }

    function selectRole(event) {
      console.log(event.target.value, "-role here")
      setUserData({...userData, ["role"]: event.target.value })
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type='text' onChange={handleChange} name='name' /><br />
        <label>Select Role:</label><br />
        <select onChange={selectRole}>
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select><br />
        <label>Email:</label><br />
        <input type='email' onChange={handleChange} name='email' /><br />
        <label>Password:</label><br />
        <input type='password' onChange={handleChange} name='password' /><br />
        <input type='submit' value='Register' />
        <button onClick={() => router('/login')}>Login</button>
      </form>
    </div>
  )
}

export default Register;
