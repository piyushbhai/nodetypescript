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
    const handleSave = (e) => {
        e.preventDefault()
        setIsSaving(true);
        // console.log(category); return
        let obj = {
            product_name: name,
            price: price,
            image:image.name,
            productImage:image,
            categories: category? JSON.stringify(category) :""
        }
        axios.put(`${BASEURL}product/${id}`, obj ,{
                headers: {
                  "Content-Type": "multipart/form-data",
               
            }})
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                navigate("/products");
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

    const onChange = (
        newValue,
      ) => {
        // console.log(newValue);
        setcategory(newValue);
      };
      const handleFileUpload = (event) => {
        // get the selected file from the input
        const file = event.target.files[0];
        setImage(file);
    }

    return (
        <>
        <Nav/>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Product</h2>
                <div className="card">
                  
                    <div className="card-body">
                        <form   onSubmit={handleSave}>
                            <div className="form-group">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    name="name" />
                            </div> <br/>
                            <div className="form-group">
                                <label htmlFor="name">Product Price</label>
                                <input
                                    onChange={(event) => { setprice(event.target.value) }}
                                    value={price}
                                    type="number"
                                    className="form-control"
                                    id="name"
                                    required
                                    name="name" />
                            </div><br/>
                            <div className="form-group">
                                <label htmlFor="name">Product Image</label>
                                <input
                                    onChange={handleFileUpload}
                                   type="file"
                                    className="form-control"
                                    id="name"
                                    name="name" />
                            </div><br/>
                            <div className="form-group">
                                <label htmlFor="description">Category</label>
                                <Select 
                                value={category}
                                onChange={onChange}
                                isMulti
                                name="colors"
                                options={categorylist}
                                className="basic-multi-select"
                                classNamePrefix="select" />
{/*                                 
                                <select
                                    value={category}
                                    onChange={(event) => { setcategory(event.target.value) }}
                                    className="form-control"
                                    id="description"
                                    required
                                    rows="3"
                                    name="description">
                                       {categorylist && categorylist.length>0 && categorylist.map((item)=>{
                                            return(
                                            <option value={item.id}>{item.category_name}</option>
                                            );
                                        })}        
                                    </select> */}
                            </div><br/>
                            <button
                                disabled={isSaving}
                                type="submit"
                                className="btn btn-outline-success mt-3">
                                Update Product
                            </button> &nbsp;
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