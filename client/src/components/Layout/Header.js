import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {message} from 'antd'

const Header = () =>{

  const [loggedinUser, setLoggedInUser] = useState("")
  const navigate = useNavigate()

  const logoutHandler = () =>{
    localStorage.removeItem("user");
    message.success("Logout Successful")
    navigate("/login")
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) 
      setLoggedInUser(user)
  },[])

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Expense Management</Link>
    <div className="navbar navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto mb-32 mb-lg-0">
        <li className="nav-item">
          <Link>{loggedinUser && loggedinUser.name}</Link>
          <Button className="btn btn-primary" onClick={logoutHandler}>Logout</Button>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header