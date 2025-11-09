import {fetchDbUsers} from "../scripts/userScripts.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function AppHomeScreen() {

    const [users, setUsers] = useState([])

    const getDbUsers = async() => {
        console.log('Getting DB Users...')
        const allUsers = await fetchDbUsers();
        if (allUsers) {
            console.log('Got DB Users')
            setUsers(allUsers)
        } else {
            console.log('error getting users')
        }
    }

    useEffect(() => {
        getDbUsers()
    }, []);

    return (

        <div className={'mainframe-grid'}>

            <div className="mainframe-section scroll column">

                <div className="grid has-3-col">

                    <div className={'cell shadow'}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Users</h4>
                            <h4>{users.length}</h4>
                        </div>
                        <a>Manage Users</a>
                    </div>

                    <div className={'cell shadow'}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Organizations</h4>
                            <h4>2,536</h4>
                        </div>
                        <Link to={'/app/manage/organizations'}>Manage Organizations</Link>
                    </div>

                </div>


            </div>
        </div>

    )
}