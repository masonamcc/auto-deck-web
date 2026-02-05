import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'
import '../styles/sidebar.css'
import {useAwsUser} from "../contexts/AwsUserContext.js";
import {useEffect} from "react";
import {Auth} from "aws-amplify";
import {IonIcon} from "@ionic/react";
import '@ionic/react/css/core.css';

import {home} from "ionicons/icons";
import {useAuthUser} from "../contexts/AuthUserContext.js";

export default function Sidebar() {

    const navigate = useNavigate()
    const {awsUser, setAwsUser} = useAwsUser()
    const {authUser, setAuthUser} = useAuthUser()

    console.log('Auth User: ', authUser)

    // useEffect(() => {
    //     if (awsUser === false) {
    //         navigate("/")
    //     }
    // }, [awsUser]);

    return (
        <div className={'sidebar'}>
            {authUser.userGroup === 'admin' &&
                <div>
                    <div className={'menu-container'}>
                        <Link to={'/dashboard'}>Dashboard</Link>
                        <Link to={'/resources'}>Account Settings</Link>
                        <Link to={'/resources'}>General Settings</Link>
                    </div>
                </div>
            }

            {authUser.userGroup !== 'admin' &&

                <div>
                    <div className={'menu-container'}>
                        <Link to={'/dashboard'}>Dashboard</Link>
                        <Link to={'/resources'}>Account Settings</Link>
                        <Link to={'/resources'}>General Settings</Link>
                    </div>
                </div>
            }




        </div>
    )
}

