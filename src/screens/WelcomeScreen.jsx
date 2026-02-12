import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";
import {use, useEffect, useState} from "react";
import {IonIcon} from '@ionic/react';
import {eyeOffOutline, eyeOutline, personOutline} from "ionicons/icons";
import { useAwsUser } from '../contexts/AwsUserContext.js';
import brand from '../brand.config.json'
import {signInUser, signUpUser} from "../scripts/userScripts.js";
import {useView} from "../contexts/ViewContext.js";
import {useAuthUser} from "../contexts/AuthUserContext.js";
import '../styles/color-palette.css'

export default function WelcomeScreen() {

    // const { setAwsUser, awsUser } = useAwsUser();
    const {authUser, setAuthUser} = useAuthUser();
    const {view, setView} = useView()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            setGreetingMessage('Late Night?')
        }
    }

    function switchView(view) {
        setView(view)
    }

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    // const signIn = async (username, password) => {
    //     try {
    //         console.log('Getting Auth User')
    //         const authUser = await Auth.signIn(username, password);
    //         console.log('Signed in:', authUser);
    //         setAwsUser(authUser)
    //         console.log(awsUser)
    //         navigate('/app/home')
    //     } catch (error) {
    //         console.error('Sign in error:', error);
    //     }
    // };

    const signUp = async (email, password) => {
        const response = await signUpUser(firstName, lastName, email, password)
        if (response) {
            console.log('Response in front-end: ', response)
            setAuthUser(response.message)
        }
    }

    const signIn = async (email, password) => {
        const response = await signInUser(email, password)
        if (response?.body) {
            const user = response.body
            setAuthUser(user)
            console.log('Saving authUser to localStorage: ', user)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/dashboard')
        }
    }



    useEffect(() => {
        greetUser()
    }, []);

    return (
        <div className={'center-container arctic'}>

            <div className={"section height-full"} style={{width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>

                {view === 'welcome' && (

                    <div className={'height-full center'}>

                        <div className={'general-field text-center mb-1-children width-75'}>

                            <h1 style={{fontSize: '60px'}} className={'text-center'}>Power your workforce with <span style={{color: '#ff8700', fontStyle: 'italic'}}>Automation</span></h1>

                            <div className={'center'}>
                                <p style={{fontSize: '25px', fontWeight: '300'}} className={'width-50'} >Build custom automation tools for the systems you use and distribute them across teams.</p>
                            </div>

                            <div className={'gap-1'}>

                                <button onClick={() => switchView('sign-up')} className={'button  button-accent mb-1'}>Get Started</button>

                                <div className={'flex center gap-1'}>
                                    <p>Completely free</p>
                                    <p>No Credit Card Required</p>
                                </div>

                            </div>

                        </div>



                    </div>
                )}

                {view === 'sign-up' && (
                    <div className={'grid-2-col'}>

                        <div className={'general-field'}>
                            <h1 style={{fontSize: '40px', lineHeight: '1', fontWeight: '400'}}>Sign Up</h1>

                            <p style={{fontSize: '25px', fontWeight: '200'}}>Test out the authentication process and user
                                profile architecture.</p>

                        </div>

                        <div>
                            <div className={'grid-2-col'}>
                                <div>
                                    <p>First Name</p>
                                    <div className={'input-field'}>
                                        <input className={'input'}
                                               placeholder={'John'}
                                               value={firstName}
                                               onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Last Name</p>
                                    <div className={'input-field'}>
                                        <input className={'input'}
                                               placeholder={'Doe'}
                                               value={lastName}
                                               onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Email Address</p>
                                <div className={'input-field'}>
                                    <input className={'input'}
                                           placeholder={'email@email.com'}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />

                                </div>
                            </div>

                            <div>
                                <p>Password</p>
                                <div className={'input-field'}>
                                    <input className={'input'}
                                           type={showPassword ? 'text' : 'password'}
                                           placeholder={'********'}
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline}
                                             onClick={() => setShowPassword(prev => !prev)}
                                    />
                                </div>
                            </div>

                            <div>
                                <p>Confirm Password</p>
                                <div className={'input-field'}>
                                    <input className={'input'}
                                           type={showConfirmPassword ? 'text' : 'password'}
                                           placeholder={'********'}
                                           value={confirmPassword}
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <IonIcon icon={showConfirmPassword ? eyeOutline : eyeOffOutline}
                                             onClick={() => setShowConfirmPassword(prev => !prev)}
                                    />
                                </div>
                            </div>

                            <div className={'faint-text text-small mb-1'}>
                                <p>Passwords must:</p>
                                <p>Contain at least 8 characters</p>
                                <p>Contain a special character</p>

                            </div>



                            {errorMessage ? (
                                <div className="field">
                                    <p className={'error-message'}>{errorMessage}</p>
                                </div>
                            ) : (
                                <></>
                            )}

                            <button className={'button-accent'}
                                    onClick={() => {
                                        if (password !== confirmPassword) {
                                            setErrorMessage('Passwords do not match')
                                        } else {
                                            setErrorMessage('')
                                            signUp(email, password)
                                        }
                                    }
                                    }
                            >Sign Up</button>
                        </div>

                    </div>
                )}

                {view === 'sign-in' && (
                    <div className={'grid-2-col width-75'}>

                        <div className={'general-field'}>
                            <h1 style={{fontSize: '40px', lineHeight: '1', fontWeight: '400'}}>Sign In</h1>

                            <p style={{fontSize: '25px', fontWeight: '200'}}>Sign in to gain access.</p>

                            <a onClick={() => switchView('welcome')}>Back</a>

                        </div>

                        <div>
                            <div className={'hero-field'}>
                                <p>Email Address</p>
                                <div className={'input-field'}>
                                    <input className={'input'}
                                           placeholder={'your_email@email.com'}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />

                                </div>
                            </div>

                            <div className={'hero-field'}>
                                <p>Password</p>
                                <div className={'input-field'}>
                                    <input className={'input'}
                                           type={showPassword ? 'text' : 'password'}
                                           placeholder={'********'}
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline}
                                             onClick={() => setShowPassword(prev => !prev)}
                                    />
                                </div>
                            </div>

                            {errorMessage ? (
                                <div className="hero-field">
                                    <p className={'error-message'}>{errorMessage}</p>
                                </div>
                            ) : (
                                <></>
                            )}

                            <button className={'button-accent'}
                                    onClick={() => signIn(email, password)}
                            >Sign In</button>
                        </div>

                    </div>
                )}




            </div>

        </div>
    )

}
