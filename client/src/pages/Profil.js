import React, {useContext} from 'react';
import Log from "../components/log";
import {UidContext} from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className="profil-page">
            {uid ? (
                <UpdateProfil />
            ) : (
                <div className="log-container">
                    <Log login={false} signup={true}/>
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;