import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import {BASEURL} from "./config"

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isSaving, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('user') != null) {
            navigate("/dashboard");
        }
    }, [])

   
    const handleSave = (e) => {
        e.preventDefault();
        setIsLoading(true);
     
        axios.post(BASEURL+'users/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                // console.log(response); return
                // validate from local storage and on successful login create session cookie 
                let userdata = JSON.parse(localStorage.getItem("userdata"));
                // console.log(userdata.email response.data.data.email  );
                // if(response.data.data.email==userdata.email){
                    // console.log('ddd')
                    localStorage.setItem("user", JSON.stringify(response.data));
                    
                    // i use password as token for demo purpose
                    localStorage.setItem("token", response.data.password);
                    Swal.fire({
                        icon: 'success',
                        title: 'Login successfully done!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/dashboard");
                    setIsLoading(false);
                    setEmail('')
                    setPassword('')
                // }else{
                //     Swal.fire({
                //         icon: 'error',
                //         title: "Please register and then do login",
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                    setIsLoading(false)
                // }
            })
            .catch(function (error) {
                // console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: error.response ? error.response.data.message: "Please Enter correct details",
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsLoading(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <form onSubmit={handleSave}>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={email}
                                            onChange={(event) => { setEmail(event.target.value) }}
                                            type="email"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            required
                                        />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            value={password}
                                            onChange={(event) => { setPassword(event.target.value) }}
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <div className="d-grid">
                                        <button
                                            disabled={isSaving}
                                            
                                            type="submit"
                                            className="btn btn-primary btn-login text-uppercase fw-bold" >
                                            Sign in
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>

                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/signup">Create new account </Link>
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

export default Login;