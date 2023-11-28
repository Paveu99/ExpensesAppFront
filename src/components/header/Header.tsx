import React from "react";
import {NavLink} from "react-router-dom"
import el1 from '../styles/images/dollar-2584988_1280.png';
import "../styles/Header.scss";
export const Header = () => {
    const styleOfLink = ({isActive}: {
                             isActive: boolean
                         }
    ) => (
        {
            color: isActive ? "#ffffff" : '',
            backgroundColor: isActive ? "rgba(0, 0, 0, 0.91)" : '',
            // padding: isActive ? "0px 150px" : "0px 100px",
        }
    )
  return <header className="nav">
      <img src={el1} alt=""/>
      <h1 className="title">EXPENSE APP</h1>
      <NavLink className="nav__link" style={styleOfLink} to="/">Main</NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/info">Information</NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/creator">Creator</NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/details">Details</NavLink>
      <button className="add-form-button">New expense</button>
  </header>
}