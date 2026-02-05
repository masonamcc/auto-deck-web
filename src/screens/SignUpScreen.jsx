import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";
import {use, useState} from "react";
import {IonIcon} from '@ionic/react';
import {eyeOffOutline, eyeOutline, personOutline} from "ionicons/icons";



export default function SignUpScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const signUp = async (email, password) => {
        try {
            const {user} = await Auth.signUp({
                username: email, // ✅ email is used as username
                password,
                attributes: {email}
            });
            console.log('Sign-up successful:', user);
            setErrorMessage('')
            navigate('/verification', {state: {email}});
        } catch (error) {
            setErrorMessage(error.message)
            console.log(errorMessage)
        }

    };

    return (
        <div className={'center-container'}>

            <div className="hero-section">


            </div>

        </div>
    )

}
