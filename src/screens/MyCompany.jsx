import React, {useEffect, useState} from "react";
import brand from '../brand.config.json'
import {useAuthUser} from "../contexts/AuthUserContext.js";
import {createMyCompanyFunc, fetchMyCompaniesFunc} from "../scripts/myCompanyScripts.js";

import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import {map} from "ionicons/icons";


export default function MyCompany() {

    const {authUser} = useAuthUser()
    const [myCompanies, setMyCompanies] = useState([])
    const [focusedCompany, setFocusedCompany] = useState(null)
    const [focusedCompanyPanel, setFocusedCompanyPanel] = useState('home')
    const [focusedCompanySubPanel, setFocusedCompanySubPanel] = useState('onboarding-client')

    // Modal states
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [companyCreated, setCompanyCreated] = useState(false)

    // Create Company
    const [companyName, setCompanyName] = useState('')
    const [uniqueName, setUniqueName] = useState('')
    const [companyWebsite, setCompanyWebsite] = useState('')
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')


    const createCompany = async () => {
        setIsLoading(true)
        const response = await createMyCompanyFunc(companyName, uniqueName, companyWebsite, companyEmail, companyPhoneNumber, authUser.id)
        if (response) {
            const company = response.company;
            if (company) {
                console.log('Created Company:', company)
                setMyCompanies([...myCompanies, company])
                setCompanyCreated(true)
                setIsLoading(false)
            }
        }
    }

    const getMyCompanies = async () => {
        const response = await fetchMyCompaniesFunc(authUser.id);
        if (response) {
            console.log('Got My Companies:', response);
            localStorage.setItem('myCompanies', JSON.stringify(response))
            setMyCompanies(response); // assuming response is an array
        }
    };

    useEffect(() => {

        // First, check if we have cached companies
        const cachedCompanies = localStorage.getItem('myCompanies')
        console.log('Cached companies: ', cachedCompanies)

        // Set the cached companies if we have them
        setMyCompanies(JSON.parse(cachedCompanies))

        if (!cachedCompanies) {
            console.log('No cached Companies found. Getting from API...')
            getMyCompanies()
        }

    }, [authUser?.id])

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

                    {isLoading ? (
                            <div className={'flex center fullheight'}>
                                <div className={'width-25 center column gap-1 text-center'}>
                                    <DotLottieReact
                                        src="https://lottie.host/3feee7f7-10cf-4010-af24-8a0519aace1f/6Rq6Ajeo7w.lottie"
                                        loop
                                        autoplay
                                    />
                                    <p>Creating your company</p>
                                </div>

                            </div>
                        ) :
                        companyCreated ? (
                            <div className={'center flex height-50 column gap-1 text-center'}>
                                <h2>Your Company has been created!</h2>
                                <button onClick={() => {
                                    setOpen(false)
                                    setCompanyCreated(false)
                                }}>Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={'panel'} style={{flex: 1}}>
                                    <div className={'grid-4-col gap-1 mb-1-children'}>
                                        <div className={'mb-1-children span-4-col'}>
                                            <h4>Name</h4>
                                            <input placeholder={'Company Name'} className={'input-medium'}
                                                   type={'text'}
                                                   value={companyName}
                                                   onChange={(e) => setCompanyName(e.target.value)}
                                            />

                                        </div>
                                        <div className={'mb-half-children'}>
                                            <h4>Unique Name</h4>
                                            <input placeholder={'unique-name'} className={'input'}
                                                   type={'text'} value={uniqueName}
                                                   onChange={(e) => setUniqueName(e.target.value)}/>
                                            <p className={'inter-400'}>The unique name of you company will be used to
                                                create
                                                custom
                                                landing pages, forms, and other assets for you company. No two companies
                                                in {brand.name} can share the same unique name.</p>
                                        </div>
                                        <div className={'mb-half-children'}>
                                            <h4>Website</h4>
                                            <div className={'prepended-input'}>
                                                <p className={'text-dim'} style={{fontSize: '18px'}}>www.</p>
                                                <input value={companyWebsite} placeholder={'website.com'} type={'text'}
                                                       onChange={(e) => setCompanyWebsite(e.target.value)}/>
                                            </div>


                                        </div>
                                        <div className={'mb-half-children'}>
                                            <h4>Work Email</h4>
                                            <input placeholder={'john.smith@website.com'} className={'input'}
                                                   type={'text'}
                                                   value={companyEmail}
                                                   onChange={(e) => setCompanyEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className={'mb-half-children'}>
                                            <h4>Phone Number</h4>
                                            <input placeholder={'111-222-3333'} className={'input'}
                                                   type={'text'}
                                                   value={companyPhoneNumber}
                                                   onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className={'flex gap-half'} style={{justifyContent: 'space-between'}}>
                                    <div className={'flex gap-1'} style={{alignItems: 'center'}}>
                                        <button onClick={() => createCompany()} className={'button-accent'}>Create
                                            Company
                                        </button>
                                    </div>

                                    <button onClick={() => {
                                        // Hide the modal
                                        setOpen(false)

                                        // Clear the selected widgets

                                    }}>Close
                                    </button>
                                </div>
                            </>
                        )}


                </div>
            </div>

            <div className={'page-body'}>

                {myCompanies.length === 0 ? (
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
                        <div className={'grid-3-col gap-1 flex fullheight'}>
                            <div className={'flex column gap-1'} style={{width: '25%'}}>
                                <div className={'panel'}>
                                    {myCompanies.map((company, index) => (
                                        <div key={index} className={'flex gap-1'}
                                             style={{justifyContent: 'space-between'}}>
                                            <h3 className={'mb-0'}>{company.name}</h3>
                                            <button onClick={() => {
                                                setFocusedCompany(company)
                                            }}>Edit
                                            </button>
                                        </div>

                                    ))}
                                </div>
                            </div>
                            <div style={{width: '1px', height: '100%', borderRight: '1px solid rgba(0,0,0,.2)'}}>

                            </div>
                            {focusedCompany && (
                                <div className={'panel mb-1-children flex column fullheight'} style={{flex: 1}}>
                                    <div>
                                        <h3>{focusedCompany.name}</h3>
                                    </div>
                                    <div className={'toolbar flex gap-half'}>
                                        <span className={'tag'}
                                              onClick={() => setFocusedCompanyPanel('home')}>Home</span>
                                        <span className={'tag'}
                                              onClick={() => setFocusedCompanyPanel('onboarding')}>Onboarding</span>
                                        <span className={'tag'}
                                              onClick={() => setFocusedCompanyPanel('onboarding')}>Sales Funnels</span>
                                    </div>
                                    {focusedCompanyPanel === 'home' && (
                                        <div>
                                            <h4>Home</h4>
                                        </div>
                                    )}

                                    {focusedCompanyPanel === 'onboarding' && (
                                        <div className={'mb-1-children flex column fullheight'}>
                                            <div className={'grid-3-col flex gap-1 pb-1'} style={{
                                                justifyContent: 'space-between',
                                                alignItems: 'start',
                                                borderBottom: '1px solid rgba(0,0,0,.2)'
                                            }}>
                                                <h4 style={{flex: .2}}>Onboarding</h4>
                                                <p className={'is-size-7 text-opacity-50'} style={{flex: .3}}>This is
                                                    where you can add onboarding material for your team and your
                                                    clients.</p>
                                                <div className={'flex toolbar gap-1'}
                                                     style={{flex: .5, justifyContent: 'flex-end'}}>
                                                    <button className={'accent'}>Add Onboarding</button>
                                                    <button>Test</button>
                                                </div>

                                            </div>
                                            <div className={'flex gap-1 fullheight'}>
                                                <div className={'toolbar gap-half column flex'}>
                                                    <span className={'tag'}
                                                          onClick={() => setFocusedCompanySubPanel('onboarding-client')}>Client Onboarding</span>
                                                    <span className={'tag'}
                                                          onClick={() => setFocusedCompanySubPanel('onboarding-team')}>Team Onboarding</span>
                                                </div>

                                                <div className={'p-1'}
                                                     style={{flex: 1, background: 'white', borderRadius: '1rem'}}>
                                                    {focusedCompanySubPanel === 'onboarding-client' && (
                                                        <div className={'mb-half-children'}>
                                                            <h4>Documents</h4>
                                                            <p>This is where you can add onboarding material for your team and your</p>
                                                        </div>

                                                    )}
                                                </div>


                                            </div>


                                        </div>
                                    )}


                                </div>
                            )}


                        </div>
                    </>
                )}


            </div>

        </div>
    )
}