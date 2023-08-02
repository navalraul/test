
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

const Single = () => {

  const [isProductExist, setIsProductExist] = useState(false);
  const [isUserLoggedin, setUserLoggedin] = useState(false);
  const [CurrentUserEmail, setCurrentUserEmail] = useState("");
  const [product, setProduct] = useState();
  const [userData, setUserData] = useState();
  const [singleproduct, setSingleProduct] = useState({});
  const [updatewindow, setUpdateWindow] = useState(false);
  const [productData, setProductData] = useState({ name: '', price: '', image: '', category: 'Other' });


  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const router = useNavigate();


  useEffect(() => {
    if (state) {
      setUserData(state.user)
    }
  }, [state])

  useEffect(() => {
    const productFromDB = JSON.parse(localStorage.getItem("Products"));
    if (productFromDB) {
      setIsProductExist(true)
      setProduct(productFromDB)
    } else {
      setIsProductExist(false)
    }
  },[])

  useEffect(() => {
    if (isProductExist) {
      if (id && product.length) {
        const res = product.find((pro) => pro.id == id)
        setSingleProduct(res)
      }
    }
  }, [id, product])

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("Current-user"));
    // console.log(user, "-user")
    if (user) {
      setUserLoggedin(true);
      setCurrentUserEmail(user.email)
    }
  }, [])

  function updateContainer() {
    setUpdateWindow(true);
  }
  function closewindow() {
    setUpdateWindow(false);
  }

  function addtocart() {
    // alert("hii")
    if (isUserLoggedin) {
      const user = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < user.length; i++) {
        if (user[i].email == CurrentUserEmail) {
          user[i].cart.push(singleproduct);
          localStorage.setItem("Users", JSON.stringify(user));
          break;
        }
      }
      alert("Product Added Successfully!!!")
    }
  }

  function handleChange(event) {
    setProductData({ ...productData, [event.target.name]: event.target.value })
  }
  function selectrole(event) {
    setProductData({ ...productData, ["category"]: event.target.value })
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
            singleproduct.image = productData.image;
            singleproduct.name = productData.name;
            singleproduct.price = productData.price;
            singleproduct.category = productData.category;

            localStorage.setItem("Products", JSON.stringify(allPro));
            setProductData({name:'',price:'',image:'',category:'Other'})
            // route('/single_product')
            alert("Product Update")
        }
    }
}

  return (
    <div>
      {updatewindow ? (
        <div className='updatewindow'>
          <div className='closemark' onClick={closewindow}>
            X
          </div>
          <form onSubmit={handleSubmit}>
            <div id='update'>
              <h1>UPDATE PRODUCTS</h1>
              <div className='Input'>
                <label>Product Name : </label><br />
                <input type='text' name='name' onChange={handleChange} value={productData.name} /><br />
              </div>
              <div className='Input'>
                <label>Product Price : </label><br />
                <input type='number' name='price' onChange={handleChange} value={productData.price} /><br />
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
                <input type='text' name='image' onChange={handleChange} value={productData.image} /><br />
              </div>
              <div id='btn'>
                <input type='submit' value='UPDATE' />
              </div>

            </div>
          </form>

        </div>
      ) : null
      }
      <div id='single_pro'>
        {/* <h3>{singleproduct.name}</h3> */}
        <div id='outter'>
          <div id="inner_left">
            <img src={singleproduct.image} />
          </div>
          <div id='inner_right'>
            <h2>{singleproduct.name}</h2>

            <h3>MRP:{singleproduct.price}Rs</h3>
            {userData?.role == 'Seller' ?
              <div id='btn'>
                <button onClick={updateContainer}>Update</button>
              </div>
              :
              <div id='out_btn'>
                <button onClick={addtocart}>Add To Cart</button>
              </div>}

          </div>
        </div>


      </div>
    </div>
  )
}

export default Single;
