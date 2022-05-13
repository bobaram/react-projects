import React from "react";
import classes from "./Navleft.module.css";
import { ImUndo } from "react-icons/im";
import { NavLink } from "react-router-dom";
class Navleft extends React.Component {
  render() {
    return (
      <nav className={classes.navbar}>
        <ul>
          <li className={classes.navItem}>
            <NavLink
              to="products/all"
              className={({ isActive }) => (isActive ? classes.highlight : " ")}
            >
              ALL
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="products/tech"
              className={({ isActive }) => (isActive ? classes.highlight : " ")}
            >
              TECH
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="products/clothes"
              className={({ isActive }) => (isActive ? classes.highlight : " ")}
            >
              CLOTHES
            </NavLink>
          </li>
        </ul>
        <div className={classes.cover}>
          <ImUndo size="1.5em" />
        </div>
      </nav>
    );
  }
}
export default Navleft;
