import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Purchaseordercreation from '../Purchaseordercreation';
import Login from '../Login';

const Routess = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Login/>}/>
            <Route path='/purchaseordercreation' element={<Purchaseordercreation/>}/>
        </Routes>
    </div>
  )
}

export default Routess