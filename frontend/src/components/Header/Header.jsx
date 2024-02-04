import React from "react";

import "./Header.css"
import CartWidget from '../CartWidget/CartWidget'
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className="header-hijo">
                <NavLink className={"header-navlink"} to={'/'}>
                  <h2 className="header-titulo">Dulce Rosita</h2>
                </NavLink>
                <CartWidget />
            </div>
        </div>
    )
}

export default Header