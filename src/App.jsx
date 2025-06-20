import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Auth} from "aws-amplify";
import HomeScreen from "./screens/HomeScreen.jsx";
import {Route, Routes} from "react-router-dom";
import Navbar from "./navigation/Navbar.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";
import VerificationScreen from "./screens/VerificationScreen.jsx";
import SetupScreen from "./screens/SetupScreen.jsx";
import {AwsUserContext} from "./Contexts/AwsUserContext.js";
import AppHomeScreen from "./screens/AppHomeScreen.jsx";

function App() {

    const [awsUser, setAwsUser] = useState(false);
    const [dbUser, setDbUser] = useState(null)

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log('Authenticated User')
                const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
                console.log("User's Groups are: ", groups);
                console.log("Setting User's Groups...");
                // setUserGroup(groups); // <-- Store all groups
                console.log("Setting AWS User...");
                setAwsUser(user);

                const userEmail = user.attributes.email;
                console.log("Settings User's Email...");
                // setUserEmail(userEmail);
                console.log("Navigating to Dashboard");
                // navigate('/dashboard');
            })
            .catch(() => {
                console.log('❌ No authenticated user');
                // navigate('/login');
                setAwsUser(null);
            });
    }, []);

    return (
        <AwsUserContext value={{ awsUser, setAwsUser}}>
        <div style={{height: '100vh', width: '100vw', display: 'flex', backgroundColor: '#e5e5e5'}}>
            <div className={'master-container gradient'}>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<HomeScreen/>}></Route>
                </Routes>

                {/*Authentication*/}
                <Routes>
                    <Route path={"/app/home"} element={<AppHomeScreen/>}></Route>
                    <Route path={"/sign-up"} element={<SignUpScreen/>}></Route>
                    <Route path={"/sign-up/setup"} element={<SetupScreen/>}></Route>
                    <Route path={"/verification"} element={<VerificationScreen/>}></Route>
                </Routes>
            </div>
        </div>
        </AwsUserContext>

    )
}

export default App
