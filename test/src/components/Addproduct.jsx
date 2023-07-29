
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const Addproduct = () => {

    const [productData, setProductData] = useState({ name: "", price: "", image: "", category: "Other" });

    const router = useNavigate();


    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (productData.name && productData.price && productData.image && productData.category) {
            const productsArray = JSON.parse(localStorage.getItem("Products")) || [];

            const randomId = uuidv4();
            productData["id"] = randomId;
            productsArray.push(productData);
            localStorage.setItem("Products", JSON.stringify(productsArray))
            setProductData({ name: "", price: "", image: "", category: "Other" })
            router('/all-products');
            alert("Product added Successfully.")
        } else {
            alert("Please fill the all fields.")
        }
    }

    function selectRole(event) {
        // console.log(event.target.value, "- role")
        setProductData({ ...productData, ["category"]: event.target.value })
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("Current-user"))
        if (user) {
            if (user?.role == "Buyer") {
                alert("You are not a Seller.")
                router('/')
            }
        } else {
            alert("You are not a Logged user.")
            router('/login')
        }
    }, [])


    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <label>Product Name :</label><br />
                <input value={productData.name} type='text' onChange={handleChange} name="name" /><br />
                <label>Product Price :</label><br />
                <input value={productData.price} type='number' onChange={handleChange} name='price' /><br />
                <label>Product Category :</label><br />
                <select onChange={selectRole} >
                    <option value="Other">Other</option>
                    <option value="Mens">Mens</option>
                    <option value="Womens">Womens</option>
                    <option value="Chidrens">Chidrens</option>
                    <option value="Electronics">Electronics</option>
                </select><br />
                <label>Product Image :</label><br />
                <input value={productData.image} type='text' onChange={handleChange} name='image' /><br />
                <input type='submit' value='Add Product' /><br />
            </form>
        </div>
    )
}

export default Addproduct;
