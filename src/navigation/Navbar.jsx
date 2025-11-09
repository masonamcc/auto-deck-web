import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'
import {useAwsUser} from "../contexts/AwsUserContext.js";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";

export default function Navbar() {

    const navigate = useNavigate()
    const {awsUser, setAwsUser} = useAwsUser()
    const {users, setUsers} = useState({})

    const signOut = async() => {
        console.log('Singing Out')
        try {
            await Auth.signOut();
            console.log('✅ Signed out successfully');
            setAwsUser(null)
            navigate("/")
            // Optionally redirect the user or clear app state
        } catch (error) {
            console.error('❌ Error signing out: ', error);
        }
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
                <p style={{fontWeight: '700'}}>AutoDeck</p>
                <p>|</p>
                <p style={{fontWeight: '300'}}>Management Console</p>
            </div>

            <div className={'nav-row-container is-gap-2'}>
                {/*<div>*/}
                {/*    <Link to="/">Home</Link>*/}
                {/*</div>*/}

                {awsUser ? (
                    <div style={{display: 'flex', gap: '2rem'}}>
                        <button
                            style={{backgroundColor: 'transparent', color: 'white', borderColor: 'white'}}
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
                            style={{backgroundColor: 'transparent', color: 'white', borderColor: 'white'}}
                            onClick={() => navigate('/sign-in')}
                        >Sign In
                        </button>
                        <button
                            onClick={() => navigate('/sign-up')}
                        >Sign Up
                        </button>
                    </div>
                )}


            </div>

        </div>
    )
}