import {fetchDbUsers} from "../scripts/userScripts.js";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchDbOrgs} from "../scripts/organizationScripts.js";
import {useAuthUser} from "../contexts/AuthUserContext.js";
import '../styles/styles.css'
import '../styles/modal.css'
import {widgetScripts} from "../widgets/widgetScripts.js";

export default function Dashboard() {

    const [users, setUsers] = useState([])
    const [orgs, setOrgs] = useState([])
    const {authUser, setAuthUser} = useAuthUser()

    const [userGroups, setUserGroups] = useState([])

    const [view, setView] = useState('dashboard')
    const [plugins, setPlugins] = useState([])
    const [open, setOpen] = useState(false);
    const [availableWidgets, setAvailableWidgets] = useState([])
    const [selectedWidgets, setSelectedWidgets] = useState([])

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

    function handleSelectedWidget(widget) {
        if (selectedWidgets.includes(widget)) {
            setSelectedWidgets(selectedWidgets.filter(w => w !== widget))
        } else {
            setSelectedWidgets([...selectedWidgets, widget])
        }
    }

    const getWidgets = () => {
        setAvailableWidgets(widgetScripts.sort((a,b) => (a.name) - (b.name)))

    }


    useEffect(() => {
        getDbUsers()
        getDbOrgs()
    }, []);

    useEffect(() => {
        // Get Widgets
        getWidgets()
    })

    return (

        <div className={'section-container text-white'}>

            <div style={{width: '100%'}} className={'flex column gap-1'}>

                <div className={'fullwidth panel toolbar'}>
                    <button  onClick={() => setOpen(true)} className={'button-accent'}>+ Add New Widget</button>
                </div>

                <div
                    onClick={() => setOpen(false)}
                    className={`backdrop ${open ? "is-open" : ""}`}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "80%",
                            height: '80%',
                            color: 'black'
                        }}
                        className={`modal ${open ? "is-open mb-1-children flex column" : ""}`}
                    >
                        <div className={'mb-1-children'}>
                            <h3 className={'inter-400'}>Widgets</h3>
                            <p>Select the widgets you'd like to add to your dashboard</p>
                        </div>

                        <div className={'panel'} style={{flex: 1}}>
                            <div className={'grid-4-col gap-1'}>
                                {availableWidgets.map((widget, index) => (
                                    <div key={index} className={selectedWidgets.includes(widget) ? 'modal-card mb-1-children accent' : 'modal-card mb-1-children'}

                                    onClick={() => {
                                        handleSelectedWidget(widget)
                                    }}>
                                        <h3>{widget.name}</h3>
                                        <p>{widget.description}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className={'flex gap-half'} style={{justifyContent: 'space-between'}}>
                            <div className={'flex gap-1'} style={{alignItems: 'center'}}>
                                <button className={'button-accent'}>Add Selected to Dashboard</button>
                                {selectedWidgets.length > 0 && <p className={'text-dim'}>Selected: {selectedWidgets.length}</p>}
                            </div>

                            <button onClick={() => {
                                // Hide the modal
                                setOpen(false)

                                // Clear the selected widgets
                                setSelectedWidgets([])
                            }}>Close</button>
                        </div>

                    </div>
                </div>

                <div className={'page-body'}>

                    {plugins.length === 0 ? (
                        <div className={'flex fullwidth fullheight center column'}>
                            <div className={'mb-2-children flex gap-1'} style={{height: '50%', width: '50%'}}>

                                <div className={'text-dim mb-2-children'}>
                                    <h1 className={'big'}>You haven't added any widgets yet.</h1>
                                    <h3 className={'inter-400'}>Add some widgets to your Dashboard by clicking the <span
                                        style={{fontWeight: 800}}>+ Add New Widget</span> button in the top left corner!
                                    </h3>
                                </div>

                            </div>

                        </div>
                    ): (
                        <>
                        </>
                    )}

                </div>



                {/*{view === 'dashboard' &&*/}
                {/*    <div style={{flex: 1, paddingRight: 0}} className="section" >*/}
                {/*        <div className={'grid-2-col gap-1'}>*/}

                {/*            <div className={'panel gunmetal height-300 p-1 span-3-col'}>*/}

                {/*                <h5 className={'mb-1'} style={{height: 'auto'}}>Dashboard</h5>*/}

                {/*                <div className={'mb-half-children faint-text'} style={{flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%'}}>*/}
                {/*                    <div>*/}
                {/*                        <h2>You haven't set up a Workspace yet.</h2>*/}
                {/*                        <p>Workspaces allow you to manage branding, users, user groups, and tools.</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*            </div>*/}

                {/*            <div className={'height-300 p-1 panel gunmetal'}>*/}

                {/*                <div className={'mb-1'}>*/}
                {/*                    <h4>Usage</h4>*/}

                {/*                </div>*/}

                {/*                <div>*/}
                {/*                    <h4 className={'faint-text'}>No usage to show</h4>*/}
                {/*                </div>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*}*/}

                {/*<div style={{flex: .25}}>*/}
                {/*    <div className={'panel saffron p-1'}>*/}
                {/*        <h5 style={{fontWeight: '200'}}>Activity</h5>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

        </div>

    )
}