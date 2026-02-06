import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'
import '../styles/sidebar.css'
import {useAwsUser} from "../contexts/AwsUserContext.js";
import {useEffect} from "react";
import {Auth} from "aws-amplify";
import {IonIcon} from "@ionic/react";
import '@ionic/react/css/core.css';

import settingsIcon from '../assets/icons/setting.png'
import helpIcon from '../assets/icons/help.png'
import logoutIcon from '../assets/icons/logout.png'

import {useAuthUser} from "../contexts/AuthUserContext.js";

export default function Sidebar() {

    const navigate = useNavigate()
    const {awsUser, setAwsUser} = useAwsUser()
    const {authUser, setAuthUser} = useAuthUser()

    const signOut = async() => {
        console.log('Singing Out')
        setAuthUser(null)
        navigate("/")
        setView('welcome')
    }

    console.log('Auth User: ', authUser)

    // useEffect(() => {
    //     if (awsUser === false) {
    //         navigate("/")
    //     }
    // }, [awsUser]);

    return (
        <div className={'sidebar text-white gunmetal'}>
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
                        <div>
                            <h5 className={'mb-half'}>Menu</h5>
                            <div className={'flex column menu-list-item-container'}>
                                <Link to={'/dashboard'}>Dashboard</Link>
                                <Link to={'/workspace'}>Workspace</Link>
                                <Link to={'/resources'}>User Groups</Link>
                            </div>
                        </div>

                        <h5>Marketplace</h5>
                    </div>
                </div>
            }

            <div className={'mb-1-children menu-list-item-container'}>
                <div className={'flex align-center gap-half'}>
                    <img src={settingsIcon} alt={'settings'} width={'20px'} height={'20px'}/>
                    <p>Settings</p>
                </div>
                <div className={'flex align-center gap-half'}>
                    <img src={helpIcon} alt={'helpIcon'} width={'20px'} height={'20px'} />
                    <p>Help Center</p>
                </div>
                <div className={'flex align-center gap-half'}>
                    <img src={logoutIcon} alt={'logoutIcon'} width={'20px'} height={'20px'} />
                    <p onClick={() => signOut()}>Logout</p>
                </div>
            </div>



        </div>
    )
}

