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
import AppHomeScreen from './screens/AppHomeScreen.jsx';
import SignInScreen from './screens/SignIn.jsx';
import Sidebar from './navigation/Sidebar.jsx';
import {useQuery, gql} from '@apollo/client';
import ManageOrgsScreen from "./screens/ManageOrgsScreen.jsx";
import EditOrgScreen from "./screens/EditOrgScreen.jsx";


// const GET_USERS = gql`
//     query {
//         users {
//             id
//             firstName
//             lastName
//             email
//         }
//     }
// `;

function App() {
    const [awsUser, setAwsUser] = useState(false);
    const [dbUser, setDbUser] = useState(null);
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    // ✅ Run GraphQL query at component level
    // const {loading, error, data} = useQuery(GET_USERS);



    // ✅ Log result when available
    // useEffect(() => {
    //     if (data) {
    //         console.log('GraphQL query result:', data);
    //         setUsers(data)
    //     }
    // }, [data]);

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



    return (
        <div className={'master-container'}>
            <AwsUserContext.Provider value={{awsUser, setAwsUser}}>
                <div className={`static-container ${awsUser ? 'app-background' : 'gradient'}`}>
                    <Navbar/>

                    {awsUser &&
                        <div className={'page-content'}>
                            <Sidebar/>
                            <div className={'mainframe'}>
                                <Routes>
                                    <Route path={'/app/home'} element={<AppHomeScreen/>}/>
                                    <Route path={'/app/manage/organizations'} element={<ManageOrgsScreen/>}/>
                                    <Route path={'/app/manage/organizations/edit'} element={<EditOrgScreen/>}/>
                                </Routes>
                            </div>
                        </div>
                    }

                    {!awsUser &&
                        <div className={'page-content'}>
                            <div className={'mainframe logged-out'}><Routes>
                                <Route path={"/"} element={<HomeScreen/>}></Route>
                                <Route path={"/sign-in"} element={<SignInScreen/>}></Route>
                                <Route path={"/sign-up"} element={<SignUpScreen/>}></Route>
                                <Route path={"/sign-up/setup"} element={<SetupScreen/>}></Route>
                                <Route path={"/verification"} element={<VerificationScreen/>}></Route>
                            </Routes></div>
                        </div>
                    }
                </div>
            </AwsUserContext.Provider>
        </div>
    );
}

export default App;
