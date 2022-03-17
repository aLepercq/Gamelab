import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {UidContext} from "./AppContext";
import {useSelector} from "react-redux";
import axios from "axios";
import Logout from "./log/Logout";

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    const handleLogout = (e) => {
        e.preventDefault();

        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        })
    };

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
                <div className="page-nav-container">
                    <div className="icons">
                        <div className="icons-bis">
                            <NavLink to="/" exact activeClassName="active-page-nav">
                                <img src="./img/icons/home.svg" alt="home"/>
                            </NavLink>
                            <NavLink to="/trending" exact activeClassName="active-page-nav">
                                <img src="./img/icons/rocket.svg" alt="trending"/>
                            </NavLink>
                            <NavLink to="/game" exact activeClassName="active-page-nav">
                                <img src="./img/icons/games_2.png" alt="games"/>
                            </NavLink>
                            <NavLink to="/profil" exact activeClassName="active-page-nav">
                                <img src="./img/icons/user.svg" alt="profil"/>
                            </NavLink>
                        </div>
                    </div>
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
                            <div className="icon-container">
                                <img src={userData.picture} alt="user-icon" className="profilIcon loggedIn"
                                     onClick={handleLogout}/>
                            </div>
                        </NavLink>
                        <Logout/>
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/profil">
                                <div className="icon-container">
                                    <img src="./img//random-user.png" alt="default-icon"
                                         className="profilIcon"/>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;