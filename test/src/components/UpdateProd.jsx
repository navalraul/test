
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProd = () => {

    const [productData, setProductData] = useState({});
    const [singleProduct, setSingleProduct] = useState({});
    const router = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const allPro = JSON.parse(localStorage.getItem('Products'))
        if (allPro) {
            const res = allPro.find((pro) => pro.id === id)
            setSingleProduct(res)
        }
    }, [])

    function handleChange(e) {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }
    function selectrole(e) {
        setProductData({ ...productData, ["category"]: e.target.value })
    }
    function handleSubmit(e) {
        // toast.success("Product Update")
        e.preventDefault();
        const allPro = JSON.parse(localStorage.getItem('Products'))
        for (var i = 0; i < allPro.length; i++) {
            if (allPro[i].id === id) {
                allPro[i].image = productData.image;
                allPro[i].name = productData.name;
                allPro[i].price = productData.price;
                allPro[i].category = productData.category;
                singleProduct.image = productData.image;
                singleProduct.name = productData.name;
                singleProduct.price = productData.price;
                singleProduct.category = productData.category;

                localStorage.setItem("Products", JSON.stringify(allPro));
                setProductData({})
                // route('/single_product')
                alert("Product Update")
            }
        }
    }


    return (
        <div style={{ margin: '10vh' }}>
            <form onSubmit={handleSubmit}>
                <div id='register'>
                    <h1>Update PRODUCTS</h1>
                    <div className='Input'>
                        <label>Product Name : </label><br />
                        <input type='text' name='name' onChange={handleChange} /><br />
                    </div>
                    <div className='Input'>
                        <label>Product Price : </label><br />
                        <input type='number' name='price' onChange={handleChange} /><br />
                    </div>
                    <div className='Input'>
                        <label>Product Category :</label><br />
                        <select onChange={selectrole}>
                            <option value='Other'>Other</option>
                            <option value='Mens'>Mens</option>
                            <option value='Women'>Women</option>
                            <option value='Kids'>Kids</option>
                            <option value='Electronics'>Electronics</option>
                        </select>
                    </div>
                    <div className='Input'>
                        <label>Product Image : </label><br />
                        <input type='text' name='image' onChange={handleChange} /><br />
                    </div>
                    <div id='btn'>
                        <input type='submit' value='UPDATE' />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default UpdateProd;
