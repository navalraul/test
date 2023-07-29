
import React, { useContext } from 'react'
import { AuthContext } from './Context/AuthContext';

const Home = () => {

  const { state } = useContext(AuthContext)

  return (
    <div>
      Home-{state?.user?.name}
    </div>
  )
}

export default Home;
