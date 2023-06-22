import React from 'react'
import {FaLaptop, FaMobileAlt, FaTabletAlt} from "react-icons/fa"


function Header({title, width}) {
  return (
    <header className='Header'>
        <h1>{title}</h1>
        {width < 720 ? <FaMobileAlt/>
        : width < 992 ? <FaTabletAlt/>
        : <FaLaptop/>  }
    </header>
  )
}

export default Header;