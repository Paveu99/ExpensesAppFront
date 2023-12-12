import React, {useState} from "react";
import {NavLink} from "react-router-dom"
import "../styles/Header.scss";
import el1 from '../styles/images/Home.png';
import el2 from '../styles/images/Info.png';
import el3 from '../styles/images/Details.png';
import el4 from '../styles/images/user.png';
import {MouseGradientText} from "./Gradient";
import {AddExpenseView} from "../../views/AddView";
export const Header = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const styleOfLink = ({isActive}: {
                             isActive: boolean
                         }
    ) => (
        {
            color: isActive ? "#ffffff" : '',
            backgroundColor: isActive ? "#323232" : '',
        }
    )

  return <header className='nav'>
      <MouseGradientText text="Expense app"/>
      <NavLink className="nav__link" style={styleOfLink} to="/">
          <img className="small-icon" src={el1} alt=""/>
          <p className="text">Main</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/info">
          <img className="small-icon" src={el2} alt=""/>
          <p className="text">Information</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/creator">
          <img className="small-icon" src={el4} alt=""/>
          <p className="text">Creator</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/details">
          <img className="small-icon" src={el3} alt=""/>
          <p className="text">Details</p>
      </NavLink>
      <button className="add-form-button" onClick={() => setOpenModal(true)}>+ New expense</button>
      <AddExpenseView isOpen={openModal} onClose={() => setOpenModal(false)}></AddExpenseView>
      </header>
}