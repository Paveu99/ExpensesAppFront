import React from "react";
import {NavLink} from "react-router-dom"
import el1 from '../styles/images/Dollar.png';
import "../styles/Header.scss";
import el2 from '../styles/images/Home.png';
import el3 from '../styles/images/Info.png';
import el4 from '../styles/images/Details.png';
import el5 from '../styles/images/user.png';
export const Header = () => {
    const styleOfLink = ({isActive}: {
                             isActive: boolean
                         }
    ) => (
        {
            color: isActive ? "#ffffff" : '',
            backgroundColor: isActive ? "#323232" : '',
        }
    )
  return <header className="nav">
      <img src={el1} alt=""/>
      <h1 className="title">EXPENSE APP</h1>
      <NavLink className="nav__link" style={styleOfLink} to="/">
          <img className="small-icon" src={el2} alt=""/>
          <p className="text">Main</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/info">
          <img className="small-icon" src={el3} alt=""/>
          <p className="text">Information</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/creator">
          <img className="small-icon" src={el5} alt=""/>
          <p className="text">Creator</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/details">
          <img className="small-icon" src={el4} alt=""/>
          <p className="text">Details</p>
      </NavLink>
      <button className="add-form-button">+ New expense</button>
  </header>
}