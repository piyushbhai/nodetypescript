import React from 'react'
import { Link, useNavigate } from "react-router-dom"
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
// import Popper from 'popper.js';
import Swal from 'sweetalert2'

const Nav = () => {
    const navigate = useNavigate();

    const Logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout it!'
        }).then((result) => {
            if (result.isConfirmed) {
                        Swal.fire("Logout!", "Logout success.", "success");
                        localStorage.removeItem("userdata");
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        navigate("/");              
            }
        })
    }



  return (
    <>
     <nav class="navbar navbar-expand-lg navbar-light bg-dark p-3">
            <Link class="navbar-brand text-white" to="/">Product App</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active ">
                    <Link class="nav-link text-white" to="/">Home</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link text-white" to="/category">Categories</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link text-white" to="/products">Products</Link>
                </li>
               
                </ul>
                <span class="navbar-text" style={{marginLeft: "auto"}}>
                <ul class="navbar-nav">
                {/* <li class="nav-item "> */}
                    {/* <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a> */}
                    {/* <div class="dropdown-menu" aria-labelledby="navbarDropdown"> */}
                    {/* <a class="dropdown-item" href="#">Action</a> */}
                    {/* <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                    </div> */}
                {/* </li> */}

                <li class="nav-item">
                    <Link class="nav-link text-white" to="/profile">Profile</Link>
                </li>
                <li class="nav-item " style={{cursor:"pointer"}}>
                    <a class="nav-link text-white " onClick={Logout}>Logout</a>
                </li>
                </ul>
                
                </span>
            </div>
            </nav>
    </>
  )
}

export default Nav