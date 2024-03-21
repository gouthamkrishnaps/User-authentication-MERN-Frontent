import React from 'react'
import Card from 'react-bootstrap/Card'
import './style.css'
import { Link } from 'react-router-dom'
import Header from './Header'


function Home() {
  const user = sessionStorage.getItem("Username")
    if (!user) {
        window.location="/"
  }
  return (
    <div className='home-page'>
      <div className='blur' >
      <Header/>
        <div className="row">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center " style={{height:'100vh'}}>
              <div className='text-light m-5 w-75'>
                <h1 className='fw-bold'>Computervalley IT Solutions Pvt Ltd</h1>
                <p className='fs-5'>Computervalley IT Solutions offers state of art cloud-based management solutions for Offices, Factories, Hospitals, Schools, Colleges, Churches etc. This system provides a complete solution for day-to-day activities, which brins quality and cost effectiveness into the system.</p>
              </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            
            <Link to={'/form-data'} style={{textDecoration:'none'}}>
            <Card className="bg-dark text-white rounded" style={{width:"200px"}}>
            <Card.Img src="https://images.pexels.com/photos/16447042/pexels-photo-16447042/free-photo-of-close-up-of-woman-holding-a-laptop-on-her-lap.jpeg?auto=compress&cs=tinysrgb&w=600" className='rounded' alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>Click the card to update <span className='fw-bold'>Employee</span> details</Card.Title>
            </Card.ImgOverlay>
          </Card>
            </Link>

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home