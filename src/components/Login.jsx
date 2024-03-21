import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { loginAPI } from '../services/allAPI'


function Login() {
    const navigate = useNavigate()
    const [userData,setUserdata] = useState({
        username:"",
        password:""
    })
    console.log(userData);

    const handleLogin = async(e)=>{
        e.preventDefault()
        const {username,password} = userData
        if(!username || !password){
            swal({
                title: 'Hey..!',
                text: 'Please fill the form completely',
                icon: 'warning',
            });
        }
        else{
            const result = await loginAPI(userData)
            console.log(result);

            if(result.status === 200){
                sessionStorage.setItem("Username",JSON.stringify(result.data.existingUser.username))
                swal({
                    title: 'Good Job 😍',
                    text: 'Login Successfull',
                    icon: 'success',
                });
    
                setUserdata({
                    email:"",
                    password:""
                })
                setTimeout(()=>{
                    navigate('/home')
                },2000)
               
            }
            else{
                swal({
                    title: 'Oh sorry..😣!',
                    text: `${result.response.data}`,
                    icon: 'error',
                });
            }
        }
    }
    const handleReset = () =>{
        setUserdata({
            username:"",
            password:""
        })
    }
  return (
    <div className='login-component w-100 ' >
        <div className="row">
            <div className="col-lg-4 col-md-0"></div>
            <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <div className="login-box p-5 rounded-5 shadow border">
                    <h2 className='fw-bold text-center text-light mb-4'>User Login</h2>
                    <div className='mt-3'>
                        <input type="text" className='form-control rounded-pill shadow border border-0' placeholder='username' style={{width:"300px"}} value={userData.username} onChange={(e)=>setUserdata({...userData,username:e.target.value})} />
                    </div>
                    <div className='mt-3'>
                        <input type="password" className='form-control rounded-pill shadow border border-0' placeholder='password' style={{width:"300px"}} value={userData.password} onChange={(e)=>setUserdata({...userData,password:e.target.value})}/>
                    </div>
                    <div className="buttons d-flex gap-2 mt-3 " style={{width:"300px"}}>
                        <button className='btn btn-success rounded-pill w-50' onClick={handleLogin}>Login</button>
                        <button className='btn btn-danger rounded-pill w-50' onClick={handleReset}>Reset</button>
                    </div>
                    <div className="links text-center mt-3">
                        <Link to={'/sign-up'} style={{textDecoration:"none" , color:"cyan"}}>Not an existing user ?.. Please Signup</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-0 "></div>
        </div>
       
    </div>
  )
}

export default Login