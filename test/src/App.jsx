// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import AllProduct from './components/AllProduct';
import Profile from './components/Profile';
import Ref from './components/Ref';
import Single from './components/Single';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/single' element={<Single />} />
        <Route exact path='/ref' element={<Ref />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/all-products' element={<AllProduct />} />
        <Route exact path='/add-product' element={<Addproduct />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />}/>
      </Routes>

    </div>
  );
}

export default App;
