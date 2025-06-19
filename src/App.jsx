import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Auth} from "aws-amplify";
import HomeScreen from "./screens/HomeScreen.jsx";
import {Route, Routes} from "react-router-dom";
import Navbar from "./navigation/Navbar.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";

function App() {


  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex', backgroundColor: '#e5e5e5'}}>
        <div className={'master-container gradient'}>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<HomeScreen/>}></Route>
            </Routes>

            {/*Authentication*/}
            <Routes>
                <Route path={"/sign-up"} element={<SignUpScreen/>}></Route>
            </Routes>


        </div>
    </div>

  )
}

export default App
