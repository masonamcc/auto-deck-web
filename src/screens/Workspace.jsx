import {useState} from "react";

export default function Workspace() {

    const [userGroup, setUserGroup] = useState([])

    return (
        <div className={'section-container off-black'}>
            <div style={{flex: 1}} className="section p-2">
                <div className={'grid-2-col gap-1 text-white'}>

                    <div className={'panel gunmetal span-2-col p-1 grid-3-col'}>

                        <div className={'span-2-col'}>
                            <h5 className={'inter-400 mb-half'}>Workspace</h5>

                            <p>This is where you can create your organization. Give it a name, set permissions, roles, and user groups.</p>

                        </div>

                        <div style={{alignContent: 'center', textAlign: 'right'}}>
                            <button className={'forsythia'}>Learn More</button>
                        </div>

                    </div>



                    {/*Left Column*/}
                    <div className={'grid gap-1'}>
                        <div className={'panel gunmetal p-1'}>
                            <h5 className={'mb-1 inter-400'}>Workspace Name</h5>
                            <div >
                                <div>
                                    <div className={'field'}>
                                        <input className={'input clear '} type={'text'} placeholder={'Workspace Name'}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'panel p-1 height-300 gunmetal'}>
                            <h5 className={'mb-1 inter-400'}>User Groups</h5>
                            <div className={'grid-2-col'}>
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

                                <div className={'span-2-col center column'}>
                                    <h3 className={'faint-text'}>No User Groups</h3>
                                    <button>Add User Group</button>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/*Right Column*/}

                    <div className={'panel gunmetal p-1'}>
                        <h5>User Groups</h5>
                    </div>


                </div>

            </div>
        </div>
    )
}