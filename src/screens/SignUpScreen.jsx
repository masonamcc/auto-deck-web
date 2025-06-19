import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";
import {use, useState} from "react";
import {IonIcon} from '@ionic/react';
import {eyeOffOutline, eyeOutline, personOutline} from "ionicons/icons";
// import '../ionicons/dist/css/ionicons.min.css';


export default function SignUpScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const signUp = async (email, password) => {
        console.log('SignUp has started...');
        try {
            const {user} = await Auth.signUp({
                username: email, // ✅ email is used as username
                password,
                attributes: {email}
            });
            console.log('Sign-up successful:', user);
            navigate('/verification', {state: {email}});
        } catch (error) {
            setErrorMessage(error.message)
            console.log(errorMessage)
        }
    };

    return (
        <div className={'page'}>

            <div className="hero-section">

                <div className={'grid-2-col'}>

                    <div className={'general-field'}>
                        <h1 style={{fontSize: '40px', lineHeight: '1', fontWeight: '400'}}>Sign Up</h1>

                        <p style={{fontSize: '25px', fontWeight: '200'}}>Test out the authentication process and user
                            profile architecture.</p>

                    </div>

                    <div>
                        <div className={'hero-field'}>
                            <p>Email Address</p>
                            <div className={'input-field'}>
                                <input className={'input-dark'}
                                       placeholder={'your_email@email.com'}
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>
                        </div>

                        <div className={'hero-field'}>
                            <p>Password</p>
                            <div className={'input-field'}>
                                <input className={'input-dark'}
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

                        <div className={'hero-field'}>
                            <p>Confirm Password</p>
                            <div className={'input-field'}>
                                <input className={'input-dark'}
                                       type={showPassword ? 'text' : 'password'}
                                       placeholder={'********'}
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline}
                                         onClick={() => setShowPassword(prev => !prev)}
                                />
                            </div>
                        </div>

                        <div className="hero-field">
                            <p style={{
                                fontSize: '14px',
                                width: '75%',
                                color: 'rgba(255,255,255,.2)',
                                fontWeight: '300',
                                fontStyle: 'italic'
                            }}>* I respect your privacy and will never share or sell your email or personal
                                information.</p>
                        </div>

                        <button className={'button-accent'}>Sign Up</button>
                    </div>

                </div>
            </div>

        </div>
    )

}
