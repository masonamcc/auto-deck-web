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

    const [userGroups, setUserGroups] = useState([])

    const [view, setView] = useState('dashboard')

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

        <div className={'section-container text-white off-black'}>

            <div style={{width: '100%'}} className={'flex'}>


                {view === 'dashboard' &&
                    <div style={{flex: 1, paddingRight: 0}} className="section p-2" >
                        <div className={'grid-2-col gap-1'}>

                            <div className={'panel gunmetal height-300 p-1 span-3-col grid-3-col'}>
                                <h5 className={'span-3-col'} style={{height: 'auto'}}>Dashboard</h5>
                                <div className={'mb-half-children faint-text'}>
                                    <h2>You haven't set up a Workspace yet.</h2>
                                    <p>Workspaces allow you to manage branding, users, user groups, and tools.</p>
                                    <p>You can setup a Workspace by clicking the <strong>Workspace</strong> menu item on the left.</p>
                                </div>

                            </div>

                            <div className={'height-300 p-1 panel gunmetal'}>
                                <div className={'mb-1'}>
                                    <h4>Usage</h4>

                                </div>

                                <div>
                                    <h4 className={'faint-text'}>No usage to show</h4>
                                </div>
                            </div>
                        </div>

                    </div>

                }

                <div className={'p-2'} style={{flex: .25}}>
                    <div className={'panel saffron p-2'}>
                        <h5 style={{fontWeight: '200'}}>Activity</h5>
                    </div>
                </div>
            </div>

        </div>

    )
}