import React from 'react';
import Table from "../dynamic-elements/table.jsx";

export default function ClientsScreen() {
    return (
        <div className={'section-container'}>
            <div className={'fullwidth flex column gap-1'}>
                <div className={'fullwidth panel toolbar'}>
                    <button  onClick={() => setOpen(true)} className={'button-accent'}>+ Add New Client</button>
                </div>
                <div className={'page-body'}>

                    <div className={'grid-3-col gap-1 flex'}>

                        {/*Left Column*/}


                        {/*Center Column*/}
                        <div style={{flex: 1}} className={'flex column gap-1'}>
                            <div className={'panel mb-1-children'}>
                                <h4>Clients</h4>
                                <Table tableColumns={['Company', 'Owner']}/>
                            </div>

                            <div className={'panel'}>
                                <h4>Test</h4>
                            </div>
                        </div>

                        {/*Right Column*/}
                        <div style={{flex: .25}} className={'flex column gap-1'}>
                            <div className={'panel'}>
                                <h4>Test</h4>
                            </div>

                            <div className={'panel'}>
                                <h4>Test</h4>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}