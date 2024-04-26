
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const[data,setData]=useState({
        username:'',
        password:''
    })
    const navigate = useNavigate();

console.log(data)
    const handleLogin = (e) => {
        e.preventDefault();
        alert(`login successful, welcome ${data.username}`)
        if(data.username==='Arthy'&& data.password==='123@'){
            navigate('/purchaseordercreation');

        }else{
            alert("please login")
        }
    }
        return (
            <div className='form-container'>
                <form onSubmit={handleLogin} className='main_form'>
                    <h3 className='text-center'>Login</h3>
                    <div className='formcontent'>
                        <div className='mb-4'>
                            <label htmlFor="username">Username: </label>
                            <input type="text" id='username' value={data.username} style={{ marginLeft: "10px" }} onChange={(e)=>setData({...data,username:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" value={data.password} style={{ marginLeft: "10px" }} onChange={(e)=>setData({...data,password:e.target.value})} />
                        </div>
                        <button className='btn btn-success' style={{ marginLeft: "100px" }}>Login</button>
                    </div>
                </form>
            </div>
        );
   
}

export default Login;

