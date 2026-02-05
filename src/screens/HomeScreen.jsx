import {useEffect, useState} from "react";
import '../styles/gradients.css'

export default function HomeScreen() {

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

    useEffect(() => {
        greetUser()
    }, []);

    return (
        <div className={'center-container gradient-1'}>
            <div className={'hero-section'}>



                <div className={'grid has-3-col'}>
                    <p>Automate your workflows </p>
                </div>

            </div>
        </div>
    )
}