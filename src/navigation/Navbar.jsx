import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'

export default function Navbar() {

    const navigate = useNavigate()

    return (
        <div className={'navbar'}>

            <div className={'nav-row-container is-gap-1'}>
                <p style={{fontWeight: '400'}}>Mason McCall</p>
                <p>|</p>
                <p style={{fontWeight: '200'}}>Software Engineer</p>
            </div>

            <div className={'nav-row-container is-gap-2'}>
                <div>
                    <Link to="/">Home</Link>
                </div>

                <div>
                    <button>Login</button>
                    <button
                    onClick={() => navigate('/sign-up')}
                    >Sign Up</button>
                </div>
            </div>

        </div>
    )
}