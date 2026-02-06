import { useLocation } from "react-router-dom";
import {fetchDbUserByOrgId} from "../scripts/userScripts.js";
import {useEffect} from "react";

export default function EditOrgScreen() {

    const location = useLocation();
    const {org} = location.state
    console.log('Org: ', org.id)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const orgUsers = storedUsers.filter(user => user.organizationId === org.id)
    if (orgUsers) {
        console.log('Org Users: ', orgUsers)
    }

    const getUsersByOrgId = async (org) => {
        const orgUsers = await fetchDbUserByOrgId(org);
        if (orgUsers) {
            console.log('Org Users: ', orgUsers)
        }
    }

    useEffect(() => {
        getUsersByOrgId(org);
    }, []);

    return (
        <div className={'mainFrame-grid'}>
            <div className="mainFrame-section scroll column">

                <div className="grid has-3-col">
                    <div className={'cell is-col-span-3'}>
                        <p>Workspace:</p>
                        <h4>{org.organizationName}</h4>
                        <p>{org.organizationAddress}</p>
                    </div>

                    <div>
                        <h4>Users</h4>
                        <table>
                            <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email Address</th>
                            </tr>
                            </thead>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    )
}