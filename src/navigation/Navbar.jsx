import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'
import {useAwsUser} from "../contexts/AwsUserContext.js";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import brand from '../brand.config.json'
import {useView} from "../contexts/ViewContext.js";
import {useAuthUser} from "../contexts/AuthUserContext.js";


export default function Navbar() {

    const navigate = useNavigate()
    const {awsUser, setAwsUser} = useAwsUser()
    const {authUser, setAuthUser} = useAuthUser()
    const {view, setView} = useView()

    const signOut = async() => {
        console.log('Singing Out')
        setAuthUser(null)
        navigate("/")
        setView('welcome')
        // try {
        //     await Auth.signOut();
        //     console.log('✅ Signed out successfully');
        //     setAwsUser(null)
        //     navigate("/")
        //     // Optionally redirect the user or clear app state
        // } catch (error) {
        //     console.error('❌ Error signing out: ', error);
        // }
    }



    useEffect(() => {

    }, []);

    useEffect(() => {
        if (awsUser === false) {
            navigate("/")
        }
    }, [awsUser]);

    return (
        <div className={'navbar'}>

            <div className={'nav-row-container is-gap-1'}>
                <p onClick={() => setView('welcome')} style={{fontWeight: '700'}}>{brand.name}</p>


            </div>

            <div className={'nav-row-container is-gap-2'}>
                {/*<div>*/}
                {/*    <Link to="/">Home</Link>*/}
                {/*</div>*/}

                {authUser ? (
                    <div style={{display: 'flex', gap: '2rem'}}>
                        <button
                            className={'button'}
                            onClick={signOut}
                        >Sign Out
                        </button>
                        <button
                            onClick={() => navigate('/sign-out')}
                        >My Account
                        </button>
                    </div>
                ) : (
                    <div style={{display: 'flex', gap: '2rem'}}>
                        <button
                            className={'button'}
                            onClick={() => setView('sign-in')}
                        >Sign In
                        </button>
                        <button
                            className={'button-accent'}
                            onClick={() => setView('sign-up')}
                        >Get Started
                        </button>
                    </div>
                )}


            </div>

        </div>
    )
}