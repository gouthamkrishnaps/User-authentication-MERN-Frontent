import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import { editPswdAPI, getUserAPI } from '../services/allAPI';

function Header() {
    const navigate = useNavigate()
    const location = useLocation();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userDetails,setUserDetails] = useState({
        _id:"",
        fullname:"",
        username:"",
        password:"",
        address:"",
        gender:""
    })
    /* const [userUpdate,setUserUpdate] = useState()
    console.log(userUpdate); */
    


    //fetching user from db
    const getAUsers = async()=>{
        const username = JSON.parse(sessionStorage.getItem("Username"))
        console.log(username);
        const result = await getUserAPI(username)
        //console.log(result.data);
        setUserDetails(result.data)
    }
    console.log(userDetails);

    useEffect(()=>{
        getAUsers()
    },[])

    const handleUserUpdate = async()=>{

        const {_id,fullname,username,password,address,gender} = userDetails

        if(!password){
            swal({
                title: 'Oops',
                text: `Please fill the form completely`,
                icon: 'info',
            });
        }
        else{
            const result = await editPswdAPI(userDetails)
            //console.log(result);
            if(result.status===200){
                swal({
                    title: 'Good Job 😍',
                    text: `password Successfully reset`,
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
    
    

    if (location.pathname === '/' || location.pathname === '/sign-up') { 
        return null;
    }
    const logout = ()=>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to logout from ComputerValley?",
            icon: "warning",
            dangerMode: true,
        })
        .then(loginout => {
        if (loginout) {
            sessionStorage.removeItem("Username")
            navigate('/')
            swal("Logged out!", "Your are successfully logged out of the website!", "success");
        }
        });
        
    }

  return (
    <div>
        <Navbar fixed="top" collapseOnSelect expand="lg" className="navbar shadow">
        <Container>
            <Navbar.Brand href="#home" className='fw-bold text-light'>Computer Valley</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#features"  className='text-light'>Features</Nav.Link>
                <Nav.Link href="#pricing"  className='text-light'>Form</Nav.Link>
            </Nav>
            <Nav className='d-flex gap-2'>
                <Button variant='dark' className='rounded-pill' onClick={handleShow}>Reset Password</Button>
                <Button variant='danger' className='rounded-pill' onClick={logout}>Logout</Button>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Change your password</label>
          <input type="text" value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} className='form-control rounded' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='rounded' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='rounded' onClick={handleUserUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Header