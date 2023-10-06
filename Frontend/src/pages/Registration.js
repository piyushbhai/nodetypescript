import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import {BASEURL} from "./config"



function Registration() {
    const [first_name, setfName] = useState('');
    const [last_name, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [profileImage, setImage] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('mobile', mobile);
        formData.append('profileImage', profileImage.name);
        formData.append('Image', profileImage);

        // {
        //     first_name: first_name,
        //     last_name: last_name,
        //     email: email,
        //     password: password,
        //     mobile: mobile,    
        //     profileImage:profileImage.name,
        //     Image:profileImage,        
        //   }
        axios.post(BASEURL+'users', formData,{
            headers: {
            //   "Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'

            }})
          .then(function (response) {
            localStorage.setItem("userdata", JSON.stringify(response.data));
            Swal.fire({
                icon: 'success',
                title: 'User registrstion successfully done!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/");
            setIsLoading(false);
            setfName('')
            setlName('')
            setEmail('')
            setPassword('')
            setMobile('')
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsLoading(false)
          });
    }

    const handleFileUpload = (event) => {
        // get the selected file from the input
        const file = event.target.files[0];
        setImage(file);
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Create new account</h5>
                                <form onSubmit={handleSave} >
                                    <div className="form-floating mb-3">
                                        <input 
                                            value={first_name}
                                            onChange={(event)=>{setfName(event.target.value)}}
                                            type="text" 
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Jhon Joe" 
                                            required
                                        />
                                        <label htmlFor="floatingInput">First Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input 
                                            value={last_name}
                                            onChange={(event)=>{setlName(event.target.value)}}
                                            type="text" 
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Jhon Joe" 
                                            required
                                        />
                                        <label htmlFor="floatingInput">Last Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input 
                                        value={email}
                                        onChange={(event)=>{setEmail(event.target.value)}}
                                        type="email" 
                                        className="form-control" 
                                        id="floatingemail" 
                                        placeholder="name@example.com" required/>
                                        <label htmlFor="floatingemail">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input 
                                        value={password}
                                        onChange={(event)=>{setPassword(event.target.value)}}
                                        type="password" 
                                        className="form-control" 
                                        id="floatingPassword" required
                                        placeholder="Password" />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input 
                                            value={mobile}
                                            onChange={(event)=>{setMobile(event.target.value)}}
                                            type="text" 
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="+91 9856234100" 
                                            required
                                        />
                                        <label htmlFor="floatingInput">Mobile</label>
                                    </div>

                                    <label htmlFor="floatingPassword">Profile Image</label>
                                    <div className="form-floating1 mb-3">                                        
                                      <input
                                        onChange={handleFileUpload}
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image" />
                                      
                                    </div>
                                   
                                    <div className="d-grid">
                                        <button 
                                        disabled={isLoading}
                                        className="btn btn-primary btn-login text-uppercase fw-bold" 
                                        type="submit">
                                            Sign Up
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>

                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/">Log in</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Registration;