import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'
import '../styles/sidebar.css'
import {useAwsUser} from "../contexts/AwsUserContext.js";
import {useEffect} from "react";
import {Auth} from "aws-amplify";
import {IonIcon} from "@ionic/react";
import '@ionic/react/css/core.css';

import {home} from "ionicons/icons";

export default function Sidebar() {

    const navigate = useNavigate()
    const {awsUser, setAwsUser} = useAwsUser()

    useEffect(() => {
        if (awsUser === false) {
            navigate("/")
        }
    }, [awsUser]);

    return (
        <div className={'sidebar'}>
            <div>
                <div className={'menu-container'}>
                    <Link to={'/app/home'}>Dashboard</Link>
                    <Link to={'/resources'}>Account Settings</Link>
                    <Link to={'/resources'}>General Settings</Link>
                </div>
            </div>

        </div>
    )
}

