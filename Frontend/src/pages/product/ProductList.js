import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
// import Layout from "../components/Layout"
import Nav from "../Nav"
import {BASEURL} from "../config"
import { useSelector } from 'react-redux'

function ProductList() {
    const navigate = useNavigate();
    const [ProductList, setProductList] = useState([])
    const addedproductlist = useSelector((state) => state.productdata.addedproductlist)

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
        fetchProductList()
    }, [])

   
    const fetchProductList = () => {
        axios.get(BASEURL+'product',{
            headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),            
            }})
            .then(function (response) {
                
                setProductList(response.data.data);
                // let newdata = response.data.data.forEach(element => {
                //     console.log(element.categories);
                // })

                // console.log(JSON.parse(response.data.data[0].categories));
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
                axios.delete(`${BASEURL}product/${id}`,{
                    headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),            
                    }})
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProductList()
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
                <h2 className="text-center mt-5 mb-3">Product List</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/createProduct">+ Add Product </Link>
                    </div>
                    <div className="card-body">
                        {addedproductlist && addedproductlist.length>0  &&
                        <><h6>Latest created Product </h6>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    {/* <th>Product Image</th> */}
                                    <th>Category</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {addedproductlist && addedproductlist.length>0 ? addedproductlist.map((Product, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{Product.product_name}</td>
                                            <td>{Product.price}</td>
                                            
                                            <td>{Product.categories && JSON.parse(Product.categories).map((item,i)=>{
                                                return(
                                                    <span className="badge badge-secondary">{item.label}</span>
                                                );
                                            })}</td>
                                            
                                        </tr>
                                    )
                                }):
                                <tr>
                                    <td colSpan={5}>No Data found</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                        </>}
                        
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    {/* <th>Product Image</th> */}
                                    <th>Category</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ProductList && ProductList.length>0 ? ProductList.map((Product, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{Product.product_name}</td>
                                            <td>{Product.price}</td>
                                            {/* <td> 
                                            {Product.image &&
                                                <img width={200} src={BASEURL+'uploads/'+Product.image}/>} <br/> 
                                            </td> */}
                                            <td>{Product.categories && JSON.parse(Product.categories).map((item,i)=>{
                                                return(
                                                    <span className="badge badge-secondary">{item.label}</span>
                                                );
                                            })}</td>
                                            {/* <td>{JSON.parse(Product.categories).map((item)=>{
                                                return(<>
                                                    <badge>{item.label}<badge/>
                                                    </>
                                                );
                                            })}</td> */}
                                            <td>
                                                <Link
                                                    className="btn btn-outline-success mx-1 btn-sm"
                                                    to={`/viewProduct/${Product.id}`}>
                                                    View Details
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1 btn-sm"
                                                    to={`/editProduct/${Product.id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(Product.id)}
                                                    className="btn btn-outline-danger mx-1 btn-sm">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }):
                                <tr>
                                    <td colSpan={5}>No Data found</td>
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

export default ProductList;