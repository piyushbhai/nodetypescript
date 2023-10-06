import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
// import Layout from "../components/Layout"
import Nav from "../Nav"
import { BASEURL } from '../config'
import Select from 'react-select'

function CategoryEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [category, setcategory] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [categorylist, setcategorylist] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        axios.get(`${BASEURL}category`)
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
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })

        axios.get(`${BASEURL}category/${id}`)
            .then(function (response) {
                let Category = response.data.data
                setName(Category.category_name);
                setcategory(Category.parent_category && JSON.parse(Category.parent_category));

            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])

    const onChange = (
        newValue,
      ) => {
        // console.log(newValue);
        setcategory(newValue);
      };

      
    const handleSave = (e) => {
        e.preventDefault()
        setIsSaving(true);
        axios.put(`${BASEURL}category/${id}`, {
            category_name: name,
            parent_category: category?JSON.stringify(category):"",
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Category updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                navigate("/category");
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


    return (
        <>
        <Nav/>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Category</h2>
                <div className="card">
                   
                    <div className="card-body">
                        <form   onSubmit={handleSave}>
                            <div className="form-group">
                                <label htmlFor="name">Category Name</label>
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
                                <label htmlFor="description">Parent Category</label>
                                <Select 
                                value={category}
                                onChange={onChange}
                                isMulti
                                name="colors"
                                options={categorylist}
                                className="basic-multi-select"
                                classNamePrefix="select" />
                            </div><br/>
                            <button
                                disabled={isSaving}
                                type="submit"
                                className="btn btn-outline-success mt-3 mr-2">
                                Update Category
                            </button> &nbsp;
                            <Link
                            className="btn btn-outline-success ml-2 mt-3 mr-2"
                            to="/category">View All Category
                        </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryEdit;