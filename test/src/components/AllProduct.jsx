import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AllProduct = () => {


    const [isProductsExist, setIsProductsExist] = useState(false);
    const [products, setProducts] = useState();
    const router = useNavigate();
    
    

    console.log(products, " - products")

    useEffect(() => {
        const productsFromDb = JSON.parse(localStorage.getItem("Products"))
        if (productsFromDb) {
            setIsProductsExist(true);
            setProducts(productsFromDb)
            console.log(productsFromDb)
        } else {
            setIsProductsExist(false)
        }
    }, [])

    

  return (
    <div>
      {!isProductsExist ? <div>No products</div>
                :
                <div style={{ display: "flex", justifyContent: "space-around", cursor: 'pointer' }}>
                    {products && products.map((pro) => (
                        <div style={{ width: "23%", border: "2px solid black" }} key={pro.name}>
                            <img src={pro.image} />
                            <h3>Name : {pro.name}</h3>
                            <h4>Category :{pro.category}</h4>
                            <h4>Price : {pro.price}$</h4>
                        </div>
                    ))}
                </div>
            }
    </div>
  )
}

export default AllProduct;
