import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
    <ul className="categorias">
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/mantas'}>
                    <span className="categoria-span">Mantas Bebé</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/jardineros '}>
                     <span className="categoria-span">Jardineros Bebé</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/saquitos'}>
                    <span className="categoria-span">Saquitos</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/gorritos'}>
                    <span className="categoria-span">Gorritos</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/accesorios'}>
                    <span className="categoria-span">Pc gamer</span>
                </NavLink>
            </li>
          
        </ul>


    
    </>
  )
}

export default Navbar