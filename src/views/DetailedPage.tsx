import React from "react";
import "../components/styles/Detailed.scss"
import {NavLink} from "react-router-dom";
export const DetailedPage = () => {
  return <div className="detailed">
      <h1 className="title">Choose type of expenses</h1>
      <div className="choices">
          <NavLink className="choices__past" to={`/details/past`}>
              <p className="text">Past</p>
          </NavLink>
          <NavLink className="choices__future" to={`/details/future`}>
              <p className="text">Future</p>
          </NavLink>
      </div>
  </div>
}