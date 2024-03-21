import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { registerAPI } from '../services/allAPI';
import swal from 'sweetalert';


function Signup() {
    
    const navigate = useNavigate()
    const [userData,setUserdata] = useState({
        fullname:"",
        username:"",
        password:"",
        address:"",
        gender:""
    })
    console.log(userData);

    const handleRegister = async(e)=>{
        e.preventDefault()
        const {fullname,username,password,address,gender} = userData
        if(!fullname || !username || !password || !address || !gender){
            swal({
                title: 'Hey..!',
                text: 'Please fill the form completely',
                icon: 'warning',
            });
        }
        else{
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status === 200){
                swal({
                    title: 'Good Job 😍',
                    text: `${result.data.name} is successfully registered`,
                    icon: 'success',
                });
                setUserdata({
                    fullname:"",
                    username:"",
                    password:"",
                    address:"",
                    gender:""
                })
                //move to login
                navigate('/')
            }
            else{
                swal({
                    title: 'Oh sorry..😣!',
                    text: `${result.response.data}`,
                    icon: 'error',
                })
            }
        }
    }
    const handleReset = () =>{
        setUserdata({
            fullname:"",
            username:"",
            password:"",
            address:"",
            gender:""
        })
    }
  return (
    <div className='signup-component w-100 ' >
        <div className="row">
            <div className="col-lg-4 col-md-0"></div>
            <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <div className="signup-box p-5 rounded-5 shadow border">
                    <h2 className='fw-bold text-center text-light mb-4'>User Sign up</h2>
                    <div className='mt-3'>
                        <input type="text" className='form-control rounded-pill shadow border border-0' placeholder='Fullname' style={{width:"300px"}} value={userData.fullname} onChange={(e)=>setUserdata({...userData,fullname:e.target.value})}/>
                    </div>
                    <div className='mt-3'>
                        <input type="text" className='form-control rounded-pill shadow border border-0' placeholder='Username' style={{width:"300px"}} value={userData.username} onChange={(e)=>setUserdata({...userData,username:e.target.value})}/>
                    </div>
                    <div className='mt-3'>
                        <input type="password" className='form-control rounded-pill shadow border border-0' placeholder='Password' style={{width:"300px"}} value={userData.password} onChange={(e)=>setUserdata({...userData,password:e.target.value})}/>
                    </div>
                    <div className='mt-3'>
                        <textarea type="text" className='form-control rounded-pill shadow border border-0' placeholder='Address' style={{width:"300px"}} value={userData.address} onChange={(e)=>setUserdata({...userData,address:e.target.value})}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="gender" className='text-light'>Choose Gender:</label>
                        <select className='form-control rounded-pill' name="gender" id="gender" style={{width:"300px"}} value={userData.gender} onChange={(e)=>setUserdata({...userData,gender:e.target.value})}>
                            <option >select and option</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer Not To Say">Prefer Not To Say</option>
                        </select>
                    </div>
                    <div className="buttons d-flex gap-2 mt-3 " style={{width:"300px"}}>
                        <button className='btn btn-success rounded-pill w-50' onClick={handleRegister}>Signup</button>
                        <button className='btn btn-danger rounded-pill w-50' onClick={handleReset}>Reset</button>
                    </div>
                    <div className="links text-center mt-3">
                        <Link to={'/'} style={{textDecoration:"none" , color:"cyan"}}>Already a user ?.. Please Login</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-0 "></div>
        </div>
       
    </div>
  )
}

export default Signup