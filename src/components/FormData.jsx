import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { addFormDataAPI } from '../services/allAPI';
import ReCAPTCHA from 'react-google-recaptcha';


function FormData() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        date: '',
        gender: '',
        confirm: '',
        designation: '',
        about: '',
        resume: '',
      });
    console.log(formData);

    const handleFormUpload = async(e) =>{
        e.preventDefault()
        const {name,email,password,phone,date,gender,designation,about,resume} = formData

        if(!name || !email || !password || !phone || !date || !gender || !designation || !about || !resume){
            swal({
                title: 'Oops',
                text: `Please fill the form completely`,
                icon: 'info',
            });
        }
        else{
            const result = await addFormDataAPI(formData)
            //console.log(result);
            if(result.status===200){
                swal({
                    title: 'Good Job 😍',
                    text: `Details Successfully Added`,
                    icon: 'success',
                });
            }
            else{
            console.log(result.response.data);
            swal({
                title: 'Oh sorry..😶',
                text: `${result.response.data} `,
                icon: 'error',
            });
            }
        }
    }

     const [errors,setErrors] = useState({})
      const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {}
        if(!formData.name.trim()){
            validationErrors.name = "name is required"
        }else if(!/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(formData.name)){
            validationErrors.name = "name is not valid"
        }
        
        if(!formData.email.trim()){
            validationErrors.email = "email is required"
        }else if( !formData.email.endsWith("@gmail.com")){
            validationErrors.email = "email is not valid"
        }

        if(!formData.password.trim()){
            validationErrors.password = "password is required"
        }else if(formData.password.length < 4){
            validationErrors.password = "password should be atleast 4"
        }

        if(!formData.phone.trim()){
            validationErrors.phone = "phone is required"
        }else if(formData.phone.length < 10 || formData.phone.length > 10){
            validationErrors.phone = "password should be in 10 digits"
        }

        if(!formData.about.trim()){
            validationErrors.about = "about is required"
        }else if(formData.about.length < 10 ){
            validationErrors.about = "about should be in minimum 10 digits"
        }

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            handleFormUpload(e)
        }
        
      };
       // Step 3: Event handler to update state
    const handleRadioChange = (e) => {
        const value  = e.target.value;
        setFormData({
        ...formData, 
        designation: value, 
    });
    }

    const recaptchaRef = React.createRef();

    const [verified,setVerified] = useState(false)
    
    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true)
    }
    
    const handleReset = (e) =>{
        e.preventDefault()
        setFormData({
            name: '',
            email: '',
            password: '',
            phone: '',
            date: '',
            gender: '',
            confirm: '',
            designation: '',
            about: '',
            resume: '',
          });
          
    }
  return (
    <div className='d-flex justify-content-center align-items-center p-5' style={{backgroundColor:'gray'}}>
        <div className="form-box rounded-5 shadow p-5 bg-light">
            <h2 className='fw-bold mb-3'>Employee Detials</h2>
            <form >
                <div className='d-flex gap-5 mb-3'>
                    <TextField id="standard-basic" label={errors.name?errors.name:'Name'} color={errors.name && 'error'} variant="standard" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} required />
    
                    <TextField id="standard-basic" variant="standard" label={errors.email?errors.email:'E-mail'} color={errors.email && 'error'} value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} required/>
                </div>
                <div className='d-flex gap-5 mb-3'>
                    <TextField id="standard-basic"variant="standard" label={errors.password?errors.password:'Password'} color={errors.password && 'error'} value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} required/>
    
                    <TextField id="standard-basic" type='number' variant="standard" label={errors.phone?errors.phone:'Phone'} color={errors.phone && 'error'} value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} required />
                </div>
                <div className='d-flex gap-2 mb-3'>
                    <input type='date' className='form-control' value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})}/>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gender" 
                        value={formData.gender} onChange={(e)=>setFormData({...formData,gender:e.target.value})} required
                    >
                        <MenuItem></MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <FormLabel>Select your Designation</FormLabel>
                <div className='d-flex gap-2 mb-3'>
                    <Form.Check type="radio" aria-label="radio 1" name='desig' checked={ formData.designation == 'Software developer'} label='Software developer' value={'Software developer'} onChange={handleRadioChange}/>
                    <Form.Check type="radio" aria-label="radio 1" name='desig' checked={ formData.designation == 'Software tester'} label='Software tester'  value={'Software tester'} onChange={handleRadioChange}/>
                    <Form.Check type="radio" aria-label="radio 1" name='desig' checked={ formData.designation == 'Software designer'} label='Software designer'  value={'Software designer'} onChange={handleRadioChange}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="about">{errors.about?errors.about:'About'}</label>
                    <textarea type='text' className='form-control rounded' placeholder='About yourself ' id='about' value={formData.about} onChange={(e)=>setFormData({...formData,about:e.target.value})} required></textarea>
                </div>
                <div  className='mb-3'>
                    <label htmlFor="profile" className='text-center' >Upload your resume</label>
                    <input id="profile" className='form-control' type="file" value={formData.resume} onChange={(e)=>setFormData({...formData,resume:e.target.value})} required/>
                </div>
              <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={onChange}
                />
                <div className='d-flex gap-2 mt-3 mb-3'>
                    <button className='btn btn-success rounded-pill w-50' disabled={!verified} type='submit' onClick={handleSubmit}>Submit</button>
                    <button className='btn btn-danger rounded-pill w-50' onClick={handleReset}>Reset</button>
                </div>
            </form>

        </div>
    </div>
  )
}

export default FormData