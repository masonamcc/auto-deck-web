import { useLocation } from "react-router-dom";

export default function EditOrgScreen() {

    const location = useLocation();
    const {org} = location.state

    return (
        <div className={'mainframe-grid'}>
            <div className="mainframe-section scroll column">

                <div className="grid has-3-col">
                    <div className={'cell is-col-span-3'}>
                        <p>Organization:</p>
                        <h4>{org.orgName}</h4>
                    </div>

                </div>
            </div>
        </div>
    )
}