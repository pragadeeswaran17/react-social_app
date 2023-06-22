import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function PostLayout() {
  return (
    <>
    <Link to="/postpage/1" >Post 1</Link>
    <br></br>
    <Link to="/postpage/2" >Post 2</Link>
    <br></br>
    <Link to="/postpage/3" >Post 3</Link>
    <br></br>
    <Link to="/postpage/newpost">newPost</Link>
    <Outlet/>
    </>

  )
}

export default PostLayout