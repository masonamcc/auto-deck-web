import {Auth} from "aws-amplify";
import {useLocation, useNavigate} from "react-router-dom";
import {use, useState} from "react";
import {IonIcon} from '@ionic/react';
import {eyeOffOutline, eyeOutline, personOutline} from "ionicons/icons";
// import '../ionicons/dist/css/ionicons.min.css';


export default function VerificationScreen({setAwsUser}) {

    const location = useLocation();;

    const {email, user} = location.state;
    const username = email;
    // const cognitoUser = user;


    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    // const [showPassword, setShowPassword] = useState(false);
    const [verificationCode, setVerificationCode] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    async function handleConfirmation(username, verificationCode) {
        console.log('Username: ', username, " code: ", verificationCode);
        try {
            const result = await Auth.confirmSignUp(username, verificationCode);

            if (result === 'SUCCESS') {
                console.log('✅ Sign-up confirmed!');
                navigate("/sign-up/setup", {state: {username, user}});
            } else {
                console.warn('⚠️ Unexpected confirmation result:', result);
            }
        } catch (error) {
            console.error('❌ Error confirming sign-up:', error);
        }
    }

    return (
        <div className={'page'}>

            <div className="hero-section">

                <div className={'grid-2-col'}>

                    <div className={'general-field'}>
                        <h1 style={{fontSize: '40px', lineHeight: '1', fontWeight: '400'}}>Verify</h1>

                        <p style={{fontSize: '25px', fontWeight: '200'}}>Enter the verification code that was sent to your email.</p>

                    </div>

                    <div>
                        <div className={'hero-field'}>
                            <p>Verification</p>
                            <div className={'input-field'}>
                                <input className={'input-dark'}
                                       placeholder={'Verification Code'}
                                       value={verificationCode}
                                       onChange={(e) => setVerificationCode(e.target.value)}
                                />

                            </div>
                        </div>

                        <button className={'button-accent'}
                                onClick={() => handleConfirmation(email, verificationCode)}
                        >Verify</button>
                    </div>

                </div>
            </div>

        </div>
    )

}
