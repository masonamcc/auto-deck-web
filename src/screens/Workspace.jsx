import {useState} from "react";

export default function Workspace() {

    const [userGroup, setUserGroup] = useState([])
    const [showDetails, setShowDetails] = useState(false)

    function toggleDetails() {
        setShowDetails(prev => !prev)
    }

    return (
        <div className={'section-container'}>
            <div style={{flex: 1}} className="section">

                <div className={'grid-3-col gap-1 text-white flex'}>

                    {/*Column 2*/}
                    <div className={'flex-column'} style={{flex: .5}}>
                        <div className={'grid gap-1'} style={{height: 'auto'}}>

                            <div className={'panel'}>
                                <h5 className={'mb-1 inter-400'}>Workspace Name</h5>
                                <div>
                                    <div>
                                        <div className={'field'}>
                                            <input className={'input clear is-size-3'} type={'text'} placeholder={'Workspace Name'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={'panel'}>
                                <div className={'flex gap-half'} style={{justifyContent: 'space-between'}}>
                                    <h5 className={'mb-1 inter-400'}>User Groups</h5>
                                    <button className={'sand'}>Add User Group</button>
                                </div>

                                <div className={'grid-2-col center'}>
                                    {userGroup.length > 0 &&
                                        <div>
                                            <div className={'field'}>
                                                <p className={'inter-200'}>Workspace Name</p>
                                                <input className={'input'} type={'text'} placeholder={'Workspace Name'}/>
                                            </div>

                                            <div className={'field'}>
                                                <p className={'inter-200'}> Name</p>
                                                <input className={'input'} type={'text'} placeholder={'Workspace Name'}/>
                                            </div>
                                        </div>
                                    }

                                    <div className={'span-2-col column mb-half-children '}>
                                        <h3 className={'faint-text-5'}>No User Groups yet.</h3>
                                        <p className={'faint-text-5'}>User groups allow you to categorize users</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    {/*Column 3*/}
                    <div className={'flex-column'} style={{flex: .25}}>
                        <div className={'grid gap-1'} style={{height: 'auto'}}>

                            <div className={'panel mb-half-children'}>
                                <h5>Browser</h5>
                                <p className={'is-size-7 inter-300'}>Selecting a browser will determine which kind of browser extension your team will be using.</p>
                                <select className={'input'}>
                                    <option>Select a Browser</option>
                                    <option>Edge</option>
                                    <option>Firefox</option>
                                    <option>Google Chrome</option>
                                </select>
                            </div>

                            <div className={'panel mb-half-children'}>
                                <h5>Security</h5>
                                <p className={'is-size-7 inter-300 faint-text-5'}>Set security settings for your workspace. Control access, timeouts, and more.</p>
                            </div>

                        </div>
                    </div>

                    {/*Column 3*/}
                    <div className={'flex-column mb-1-children'} style={{flex: .25}}>
                        <div className={'panel'}>
                            <h5 className={'inter-400 mb-half'}>Workspace</h5>
                            <p className={'is-size-7 faint-text-5'}>A Workspace represents your company, brand, organization. Workspaces contain users, user groups, tools, and toll access settings. Once someone joins your Workspace, they'll have access to the tools that you allow either for all users, or the user group that they join as.</p>
                        </div>

                        <div className={'panel'}>
                            <h5 className={'inter-400 mb-half'}>User Groups</h5>
                            <p className={'is-size-7 faint-text-5'}>Users groups control who has access to what. You can create as many as you'd like and assign tools and features to user roles.</p>
                        </div>

                    </div>





                    {/*Left Column*/}


                    {/*Right Column*/}






                </div>

            </div>
        </div>
    )
}