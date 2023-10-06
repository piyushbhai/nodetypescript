import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
// import Layout from "../components/Layout"
import Nav from "./Nav"
import { BASEURL } from './config'
import Select from 'react-select'

function Profile() {
     const [first_name, setfName] = useState('');
    const [last_name, setlName] = useState('')
    const [email, setEamil] = useState('')
    const [mobile, setMobile] = useState([])
    const [password, setPassword] = useState("")
    const [profileImage, setImage] = useState([])
    const [profileImage1, setImage1] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
       getdata()        
    }, [])


    const getdata = async(e) => {
        let user = JSON.parse(localStorage.getItem('user')).data;
        // console.log(user); return
        await axios.get(`${BASEURL}users/${user.id}` ,{
            headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),            
            }})
            .then(function (response) {
                let data = response.data.data
                setfName(data.first_name);
                setlName(data.last_name);
                setEamil(data.email);
                // console.log(product.categories);
                setMobile(data.mobile);
                setImage(data.profileImage);
                setImage1(data.profileImage);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }
    const handleSave = (e) => {
        let user = JSON.parse(localStorage.getItem('user')).data;
        e.preventDefault()
        setIsSaving(true);
        // console.log(profileImage.name); return
        let obj =  {
            first_name,
            last_name,
            email,
            mobile,
            profileImage:profileImage.name,
            file:profileImage,
            // password
        }
        // const formData = new FormData();
        // formData.append("first_name", first_name);
        // formData.append("last_name", last_name);
        // formData.append("email", email);
        // formData.append("mobile", mobile);
        // formData.append("profileImage", profileImage);
        // if(password==""){
        //     delete(obj.password)
        // }
       
        axios.put(`${BASEURL}users/${user.id}`,obj,{
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }})
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                getdata();
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    const handleFileUpload = (event) => {
        // get the selected file from the input
        const file = event.target.files[0];
        setImage(file);
    }
    return (
        <>
        <Nav/>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Profile</h2>
                <div className="card">
                    <div className="card-body">
                        <form   onSubmit={handleSave} encType='multi'>
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input
                                    onChange={(event) => { setfName(event.target.value) }}
                                    value={first_name}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    required
                                    name="first_name" />
                            </div> <br/>
                            <div className="form-group">
                                <label htmlFor="name">Last Name</label>
                                <input
                                    onChange={(event) => { setlName(event.target.value) }}
                                    value={last_name}
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    required
                                    name="last_name" />
                            </div> <br/>
                            <div className="form-group">
                                <label htmlFor="name">Email ID</label>
                                <input
                                    onChange={(event) => { setEamil(event.target.value) }}
                                    value={email}
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    required
                                    name="email" />
                            </div><br/>
                            <div className="form-group">
                                <label htmlFor="name">Mobile</label>
                                <input
                                    onChange={(event) => { setMobile(event.target.value) }}
                                    value={mobile}
                                    type="number"
                                    className="form-control"
                                    id="mobile"
                                    required
                                    name="mobile" />
                            </div><br/>
                            {/* <div className="form-group">
                                <label htmlFor="name">Password</label>
                                <input
                                    onChange={(event) => { setPassword(event.target.value) }}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    
                                    name="password" />
                            </div><br/> */}
                            <div className="form-group">
                            {profileImage1 !="" && <>
                                <img width={200} src={BASEURL+'uploads/'+profileImage1}/> <br/> </>}
                                <label htmlFor="name">Profile Image</label>
                                <input
                                   onChange={handleFileUpload}
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image" />
                            </div><br/>
                         
                            <button
                                disabled={isSaving}
                                type="submit"
                                className="btn btn-outline-success mt-3">
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;