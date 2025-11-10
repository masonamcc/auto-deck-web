import {fetchDbUsers} from "../scripts/userScripts.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchDbOrgs} from "../scripts/organizationScripts.js";

export default function AppHomeScreen() {

    const [users, setUsers] = useState([])
    const [orgs, setOrgs] = useState([])

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
            console.log('Got DB Orgs')
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

        <div className={'mainframe-grid'}>

            <div className="mainframe-section scroll column">

                <div className="grid has-3-col">

                    <div className={'cell p-1 is-col-span-3'}>
                        <h3>Dashboard</h3>
                    </div>


                    <div className={'cell p-1 shadow'}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Users</h4>
                            <h4>{users.length}</h4>
                        </div>
                        <a>Manage Users</a>
                    </div>

                    <div className={'cell p-1 shadow'}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Organizations</h4>
                            <h4>{orgs.length}</h4>
                        </div>
                        <Link to={'/app/manage/organizations'}
                              onClick={() => localStorage.setItem('orgs', JSON.stringify(orgs))}
                        >
                            Manage Organizations
                        </Link>
                    </div>

                </div>


            </div>
        </div>

    )
}