import {useEffect, useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Auth} from 'aws-amplify';
import HomeScreen from './screens/HomeScreen.jsx';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Navbar from './navigation/Navbar.jsx';
import SignUpScreen from './screens/SignUpScreen.jsx';
import VerificationScreen from './screens/VerificationScreen.jsx';
import SetupScreen from './screens/SetupScreen.jsx';
import {AwsUserContext} from './contexts/AwsUserContext.js';
import Dashboard from './screens/Dashboard.jsx';
import SignInScreen from './screens/WelcomeScreen.jsx';
import Sidebar from './navigation/Sidebar.jsx';
import {useQuery, gql} from '@apollo/client';
import ManageOrgsScreen from "./screens/ManageOrgsScreen.jsx";
import EditOrgScreen from "./screens/EditOrgScreen.jsx";
import ManageUsersScreen from "./screens/ManageUsersScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import {ViewContext} from "./contexts/ViewContext.js";
import {AuthUserContext} from "./contexts/AuthUserContext.js";


function App() {
    const [awsUser, setAwsUser] = useState(false);
    const [dbUser, setDbUser] = useState(null);
    const [users, setUsers] = useState([])
    const [view, setView] = useState('welcome');
    const [authUser, setAuthUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                console.log('Authenticated User');
                const groups =
                    user.signInUserSession.accessToken.payload['cognito:groups'] || [];
                console.log("User's Groups are: ", groups);
                setAwsUser(user);
                navigate('/app/home');
            })
            .catch(() => {
                console.log('❌ No authenticated user');
                setAwsUser(null);
            });
    }, []);

    useEffect(() => {

        console.log('Checking for cached user...');
        // Fetch the cached user
        console.log('Auth User: ', localStorage.getItem('user'))
        localStorage.getItem('user') && setAuthUser(JSON.parse(localStorage.getItem('user')));
        setAuthUser(JSON.parse(localStorage.getItem('user')));
    }, []);



    return (
        <div className={'master-container'}>
            <AuthUserContext value={{authUser, setAuthUser}}>
            <ViewContext value={{view, setView}}>
                <AwsUserContext.Provider value={{awsUser, setAwsUser}}>
                    <div className={`static-container ${awsUser ? 'app-background' : 'gradient'}`}>
                        <Navbar/>

                        {authUser &&
                            <div className={'page-content'}>
                                <Sidebar/>
                                <div className={'mainFrame'}>
                                    <Routes>
                                        <Route path={'/dashboard'} element={<Dashboard/>}/>
                                        <Route path={'/app/manage/organizations'} element={<ManageOrgsScreen/>}/>
                                        <Route path={'/app/manage/organizations/edit'} element={<EditOrgScreen/>}/>
                                        <Route path={'/app/manage/users'} element={<ManageUsersScreen/>}/>
                                    </Routes>
                                </div>

                            </div>
                        }

                        {!authUser &&
                            <div className={'page-content'}>
                                <div className={'mainFrame logged-out'}><Routes>
                                    <Route path={"/"} element={<WelcomeScreen/>}></Route>
                                    <Route path={"/sign-up/setup"} element={<SetupScreen/>}></Route>
                                    {/*<Route path={"/verification"} element={<VerificationScreen/>}></Route>*/}
                                </Routes></div>
                            </div>
                        }
                    </div>
                </AwsUserContext.Provider>
            </ViewContext>
            </AuthUserContext>

        </div>
    )
        ;
}

export default App;
