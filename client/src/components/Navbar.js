import React, {useContext, useReducer} from 'react';
import {NavLink} from "react-router-dom";
import {UidContext} from "./AppContext";
import {useSelector} from "react-redux";
import Profil from "../pages/Profil";

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return (

        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon_GL.png" alt="icon"/>
                            <h3>Gamelab</h3>
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Bienvenue {userData.pseudo}</h5>
                            </NavLink>
                        </li>
                        <NavLink exact to="/profil">
                            <img src={userData.picture} alt="login" className="profilIcon"/>
                        </NavLink>
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/profil">
                                <img src={userData.picture} alt="login" className="profilIcon Login"/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;