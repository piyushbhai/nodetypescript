import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className=''>
           <Nav/>
           <h2 className='mt-5 ml-2'>PageNotFound</h2>
           <Link to={"/"} className='ml-2'>Go to home</Link>
    </div>
  )
}

export default PageNotFound