import React from "react";
import "../styles/elements.css"
import {navigate} from "ionicons/icons";
import {Link} from "react-router-dom";

export default function ManageUsersScreen() {

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    return (
        <div className={'mainFrame-grid'}>
            <div className="mainFrame-section scroll column">

                <div className="grid has-3-col">
                    <div className={"cell is-col-span-3"}>
                        <h4>Manage Users</h4>
                    </div>


                    <div className={"cell is-col-span-3"}>
                        <table className={'table'}>
                            <thead>
                            <tr>
                                <th style={{width: "5%"}}>
                                    User Id
                                </th>
                                <th style={{width: "20%"}}>
                                    First Name
                                </th>
                                <th>
                                    Domain
                                </th>
                                <th>
                                    OrganizationId
                                </th>
                                <th style={{width: "10%"}}>
                                    Actions
                                </th>

                            </tr>

                            </thead>
                            <tbody>
                            {storedUsers.map((user, index) => (
                                <tr key={index}>
                                    <td><input type={"checkbox"}/>{user.orgId}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.orgId}</td>
                                    <td>
                                        <Link
                                        to="/app/manage/organizations/edit"
                                        state={{ user }}
                                    >
                                        Edit
                                    </Link></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        </div>
    )
}