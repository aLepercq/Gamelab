import React, {useEffect, useState} from 'react';
import Routes from "./components/routes";
import {UidContext} from "./components/AppContext";
import axios from "axios";
import {getUser} from "./actions/user.actions";
import {useDispatch} from "react-redux";
import {theme} from "./components/Profil/UpdateProfil";

const App = () => {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();
    const useTheme = theme ? theme : 'dark';

    console.log("useTheme", useTheme);

    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true
            })
                .then((res) => setUid(res.data))
                .catch((err) => console.log("No token"));
        };

        fetchToken();

        if (uid) dispatch(getUser(uid))
    }, [uid]);

    return (
        <UidContext.Provider value={uid}>
            <div className="app" data-theme={useTheme}>
                <Routes/>
            </div>
        </UidContext.Provider>
    );
};

export default App;