import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
// import Layout from "../components/Layout"
import Nav from "../Nav"
import { BASEURL } from '../config'
import Select from 'react-select'
import { addcat } from '../../redux/reducer'


function CategoryCreate() {
    const [name, setName] = useState('');
    const [category, setcategory] = useState()
    const [isSaving, setIsSaving] = useState(false)
    const [categorylist, setcategorylist] = useState([])
    const dispatch = useDispatch();
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
                    title: 'category: An Error Occured!',
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

        let obj = {
            category_name: name,
            parent_category: JSON.stringify(category),

        }
        dispatch(addcat(obj))
// return
        axios.post(`${BASEURL}category`, obj)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Category created successfully!',
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
                <h2 className="text-center mt-5 mb-3">Add Category</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/category">View All Category
                        </Link>
                    </div>
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
                                <label htmlFor="category">Parent Category</label>
                                <Select 
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
                                className="btn btn-outline-success mt-3">
                                Add Category
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryCreate;