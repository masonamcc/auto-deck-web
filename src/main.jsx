import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'; // ✅ Import BrowserRouter
import './index.css';
import App from './App.jsx';
import {Amplify, Auth} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

createRoot(document.getElementById('root')).render(
    <StrictMode>

        <BrowserRouter> {/* ✅ Wrap App in BrowserRouter */}
            <App/>
        </BrowserRouter>

    </StrictMode>
)
