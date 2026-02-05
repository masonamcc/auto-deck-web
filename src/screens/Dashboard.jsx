import {fetchDbUsers} from "../scripts/userScripts.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchDbOrgs} from "../scripts/organizationScripts.js";
import {useAuthUser} from "../contexts/AuthUserContext.js";
import '../styles/styles.css'

export default function Dashboard() {

    const [users, setUsers] = useState([])
    const [orgs, setOrgs] = useState([])
    const {authUser, setAuthUser} = useAuthUser()

    const getDbUsers = async () => {
        console.log('Getting DB Users...')
        const allUsers = await fetchDbUsers();
        if (allUsers) {
            console.log('Got DB Users')
            setUsers(allUsers)
        } else {
            console.log('error getting users')
        }
    }

    const getDbOrgs = async () => {
        console.log('Getting DB Orgs...')
        const allOrgs = await fetchDbOrgs()
        if (allOrgs) {
            console.log('Got DB Orgs:', allOrgs)
            setOrgs(allOrgs)
        } else {
            console.log('Error getting DB Orgs')
        }
    }

    useEffect(() => {
        getDbUsers()
        getDbOrgs()
    }, []);

    return (

        <div className={'section-container text-white'}>

            <div style={{width: '100%'}} className={'flex'}>
                <div style={{flex: 1}} className="section p-2">
                    <div className={'grid-2-col gap-1'}>
                        <h5 className={'span-2-col'}>Dashboard</h5>

                        <div className={'panel height-300 p-1 span-3-col center column'}>
                            <h3 className={'faint-text'}>You haven't set up an organization yet.</h3>
                            <p className={'mb-1 faint-text'}>Once you setup an organization, people can join, and use tools you assign to it.</p>

                            <button className={'button-accent'}>+ Create Organization </button>
                        </div>

                        <div className={'height-300 p-1 panel'}>
                            <div className={'mb-1'}>
                                <h4>Usage</h4>
                                <p>View how your teams use tools</p>
                            </div>

                            <div>
                                <h4 className={'faint-text'}>No usage to show</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={'p-2'} style={{flex: .3, background: '#09121d', color: 'white'}}>
                    <h5 style={{fontWeight: '100'}}>Activity</h5>
                </div>
            </div>

        </div>

    )
}