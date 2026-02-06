import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'
import {useAwsUser} from "../contexts/AwsUserContext.js";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import brand from '../brand.config.json'
import {useView} from "../contexts/ViewContext.js";
import {useAuthUser} from "../contexts/AuthUserContext.js";


export default function Navbar() {

    const [greetingMessage, setGreetingMessage] = useState('')

    const greetUser = () => {
        const now = new Date();
        const thisHour = now.getHours()
        if (thisHour < 6) {
            setGreetingMessage('Early Bird, Huh?')
        } else if (thisHour >= 6 && thisHour < 12) {
            setGreetingMessage('Good Morning')
        } else if (thisHour >= 12 && thisHour < 18) {
            setGreetingMessage('Good Afternoon,')
        } else if (thisHour >= 18 && thisHour < 21) {
            setGreetingMessage('Good Evening,')
        } else if (thisHour >= 21 && thisHour <= 24) {
            setGreetingMessage('Good Night,')
        }
    }

    const navigate = useNavigate()
    const {awsUser, setAwsUser} = useAwsUser()
    const {authUser, setAuthUser} = useAuthUser()
    const {view, setView} = useView()

    const signOut = async() => {
        console.log('Singing Out')
        setAuthUser(null)
        navigate("/")
        setView('welcome')
    }



    useEffect(() => {
        greetUser()
    }, []);

    useEffect(() => {
        if (awsUser === false) {
            navigate("/")
        }
    }, [awsUser]);

    return (
        <div className={'navbar gunmetal'} style={{justifyContent: 'center', alignContent: 'center', display: 'flex'}}>

            {authUser ? (
                <div className={'fullwidth grid-2-col'} style={{alignItems: 'center', display: 'flex'}} >
                    <div style={{width: '50%', alignContent: 'center',display: 'flex'}}>
                        <div className={'flex gap-half'} style={{width: '24%', paddingLeft: '2rem'}}>
                            <h4 onClick={() => setView('welcome')} style={{alignContent: 'center', fontWeight: '700', margin: 0}}>{brand.name}</h4>
                        </div>
                        <div className={'pl-2'}>
                            <p className={'inter-200'}>{greetingMessage}</p>
                            <p className={'inter-600'}>{authUser.firstName} {authUser.lastName}</p>
                        </div>
                    </div>
                    <div style={{width: '50%', textAlign: 'right'}}>

                        <div style={{textAlign: 'right', width: 'auto', paddingRight: '2rem' }} onClick={() => signOut()}>
                            <p>{authUser.firstName} {authUser.lastName}</p>
                        </div>
                    </div>



                </div>

            ) : (
                <></>
            )}
            <div>

            </div>

            <div className={authUser ? 'width-100 flex' : 'width-75 flex'} style={{justifyContent: 'space-between'}}>
                <div className={'nav-row-container gap-half'}>
                </div>

                <div className={'nav-row-container gap-half'}>
                    {/*<div>*/}
                    {/*    <Link to="/">Home</Link>*/}
                    {/*</div>*/}



                </div>
            </div>



        </div>
    )
}