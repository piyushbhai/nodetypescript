import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
// import Layout from "../components/Layout"
import Nav from "../Nav"
import {BASEURL} from "../config"
import { useSelector } from 'react-redux'


function CategoryList() {
    const navigate = useNavigate();
    const [CategoryList, setCategoryList] = useState([])
    const CategoryListstore = useSelector((state) => state.productdata.value)

    // console.log(CategoryListstore);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
        fetchCategoryList()
    }, [])

   
    const fetchCategoryList = () => {
        let token = localStorage.getItem('token')
        axios.get(BASEURL+'category',{
            headers: {
            "Authorization": "Bearer " + token,            
            }})
            .then(function (response) {
                // console.log(response.data.data);
                setCategoryList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASEURL}Category/${id}`,{
                    headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),            
                    }})
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Category deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchCategoryList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <>
        <Nav/>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Category List</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/createCategory">+ Add Category </Link>
                    </div>
                    <div className="card-body">

                    {CategoryListstore && CategoryListstore.length>0  &&
                        <><h6>Latest created Category </h6>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Category name</th>
                                    <th>Parent Category</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {CategoryListstore && CategoryListstore.length>0 ? CategoryListstore.map((Category, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{Category.category_name}</td>
                                            <td>{Category.parent_category && JSON.parse(Category.parent_category).map((item,i)=>{
                                                return(
                                                    <span className="badge badge-secondary">{item.label}</span>
                                                );
                                            })}</td>
                                           
                                        </tr>
                                    )
                                }):
                                <tr>
                                    <td colSpan={3}>No Data found</td>
                                </tr>
                                }
                            </tbody>
                        </table> <br/> </>}

                        <h6>Category List by API</h6>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Category name</th>
                                    <th>Parent Category</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CategoryList && CategoryList.length>0 ? CategoryList.map((Category, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{Category.category_name}</td>
                                            <td>{Category.parent_category && JSON.parse(Category.parent_category).map((item,i)=>{
                                                return(
                                                    <span className="badge badge-secondary">{item.label}</span>
                                                );
                                            })}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-outline-success mx-1 btn-sm"
                                                    to={`/editCategory/${Category.id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(Category.id)}
                                                    className="btn btn-outline-danger mx-1 btn-sm">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }):
                                <tr>
                                    <td colSpan={3}>No Data found</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                      
                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryList;