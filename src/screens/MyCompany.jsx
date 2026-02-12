import React, {useState} from "react";
import brand from '../brand.config.json'

export default function MyCompany() {

    const [companies, setCompanies] = useState([])
    const [open, setOpen] = useState(false);
    const [companyName, setCompanyName] = useState('')
    const [uniqueName, setUniqueName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyWebsite, setCompanyWebsite] = useState('')
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('')

    return (
        <div className={'section-container flex column gap-1'}>
            <div className={'toolbar panel'}>
                <button onClick={() => setOpen(true)} className={'button-accent'}>+ Add New Company</button>

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
                        <h3 className={'inter-400'}>Company</h3>
                        <p>Create a new Company</p>
                    </div>

                    <div className={'panel'} style={{flex: 1}}>
                        <div className={'gap-1 flex column width-50 mb-1-children'}>
                            <div className={'mb-1-children'}>
                                <h4>Name</h4>
                                <input placeholder={'Company Name'} className={'input-medium'} style={{width: '50%'}}
                                       type={'text'}
                                       value={companyName}
                                       onChange={(e) => setCompanyName(e.target.value)}
                                />

                            </div>
                            <div className={'mb-half-children'}>
                                <h4>Unique Name</h4>
                                <input placeholder={'unique-name'} className={'input'} style={{width: '50%'}}
                                       type={'text'} value={uniqueName} onChange={(e) => setUniqueName(e.target.value)}/>
                                <p className={'inter-400'}>The unique name of you company will be used to create custom
                                    landing pages, forms, and other assets for you company. No two companies
                                    in {brand.name} can share the same unique name.</p>
                            </div>
                            <div className={'mb-1-children'}>
                                <h4>Website</h4>
                                <div className={'prepended-input'} style={{width: '50%'}}>
                                    <p className={'text-dim'} style={{fontSize: '18px'}}>www.</p>
                                    <input value={companyWebsite} placeholder={'website.com'} type={'text'}
                                           onChange={(e) => setCompanyWebsite(e.target.value)}/>
                                </div>


                            </div>
                            <div className={'mb-1-children'}>
                                <h4>Phone Number</h4>
                                <input placeholder={'111-222-3333'} className={'input'} style={{width: '50%'}}
                                       type={'text'}
                                       value={companyPhoneNumber}
                                       onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                                />

                            </div>
                        </div>

                    </div>
                    <div className={'flex gap-half'} style={{justifyContent: 'space-between'}}>
                        <div className={'flex gap-1'} style={{alignItems: 'center'}}>
                            <button className={'button-accent'}>Create Company</button>
                        </div>

                        <button onClick={() => {
                            // Hide the modal
                            setOpen(false)

                            // Clear the selected widgets

                        }}>Close
                        </button>
                    </div>

                </div>
            </div>

            <div className={'page-body'}>

                {companies.length === 0 ? (
                    <div className={'flex fullwidth fullheight center column'}>
                        <div className={'mb-2-children flex gap-1'} style={{height: '50%', width: '50%'}}>

                            <div className={'text-dim mb-2-children'}>
                                <h1 className={'big'}>You haven't created a Company yet.</h1>
                                <h3 className={'inter-400'}>Create your Company by clicking the <span
                                    style={{fontWeight: 800}}>+ Add New Company</span> button in the top left corner!
                                </h3>
                            </div>

                        </div>

                    </div>
                ) : (
                    <>
                        <div className={'grid-3-col gap-1 flex'}>
                            <div className={'flex column gap-1'} style={{flex: .5}}>
                                <div className={'panel'}>

                                </div>
                            </div>
                            <div className={'flex column gap-1'} style={{flex: .5}}>
                                <div className={'panel'}>

                                </div>
                            </div>

                        </div>
                    </>
                )}


            </div>

        </div>
    )
}