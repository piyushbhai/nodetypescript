import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
// import Layout from "../components/Layout"
import Nav from "../Nav"
import { BASEURL } from '../config'
import Select from 'react-select'

function ProductEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [price, setprice] = useState('')
    const [image, setImage] = useState('')
    const [category, setcategory] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [categorylist, setcategorylist] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
        getCat()
        getprod()        
    }, [])


    const getCat = async(e) => {
        await axios.get(`${BASEURL}category`)
        .then(function (response) {
            let cat = response.data.data
            let newcat =  cat.map(item=>{
                return {value:item.id,label:item.category_name}
            })
            // console.log(newcat);
            setcategorylist(newcat);
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'category: An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
    })
    }
    const getprod = async(e) => {
        await  axios.get(`${BASEURL}product/${id}`)
            .then(function (response) {
                let product = response.data.data
                setName(product.product_name);
                setprice(product.price);
                setImage(product.image);
                // console.log(product.categories);
                setcategory(product.categories && JSON.parse(product.categories));
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
   

    return (
        <>
        <Nav/>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">View Product Details</h2>
                <div className="card">
                  
                    <div className="card-body">
                        <form >
                            <div className="form-group">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    disabled
                                    name="name" />
                            </div> <br/>
                            <div className="form-group">
                                <label htmlFor="name">Product Price</label>
                                <input
                                    value={price}
                                    type="number"
                                    className="form-control"
                                    id="name"
                                    disabled
                                    name="name" />
                            </div><br/>
                            <div className="form-group">
                                <label htmlFor="name">Product Image</label> <br/>
                                {image !="" && <>
                                <img width={200} src={BASEURL+'uploads/'+image}/> <br/> </>}
                            </div><br/>
                            <div className="form-group">
                                <label htmlFor="description">Category</label>
                                <Select 
                                value={category}
                                isMulti
                                name="colors"
                                options={categorylist}
                                className="basic-multi-select"
                                classNamePrefix="select" readOnly disabled />

                            </div><br/>
                            
                            <Link
                            className="btn btn-outline-success mt-3"
                            to="/products">View All Products
                        </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductEdit;