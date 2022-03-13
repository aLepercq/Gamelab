import React, {useState} from 'react';
import SignUpForm from "./signUpForm";
import LogInForm from "./logInForm";

const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [logInModal, setLogInModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignUpModal(true);
            setLogInModal(false);
        }else if(e.target.id === "login"){
            setSignUpModal(false);
            setLogInModal(true);
        }
    }

    return (
    <div className="connection-form">
        <div className="form-container">
            <ul>
                <li onClick={handleModals}
                    id="register"
                    className={signUpModal ? "active-btn": null}
                >
                    S'inscrire
                </li>
                <li onClick={handleModals}
                    id="login"
                    className={logInModal ? "active-btn": null}
                >
                    Se connecter
                </li>
            </ul>
            {signUpModal && <SignUpForm />}
            {logInModal && <LogInForm />}
        </div>
    </div>
    );
};

export default Log;