export default function AppHomeScreen() {
    return (

        <div className={'mainframe-grid dark-mode'}>

            <div className="mainframe-section scroll column">

                <div className="grid has-3-col">

                    <div className={'cell shadow'}>
                        <h4>Repositories</h4>
                        <p>View my projects and architecture</p>
                    </div>

                    <div className="cell shadow">
                        <h4>Documentation</h4>
                        <p>Resources for devs</p>
                    </div>

                    <div className="cell shadow">
                        <h4>Projects</h4>
                        <p>View user data here</p>
                    </div>

                </div>

                <div className="grid">
                    <div className="cell shadow">
                        <h3>Blog</h3>
                        <p>Read my articles on development, software engineering, and landing a career in IT</p>
                        {/*<img className={'img'} src={'https://images.pexels.com/photos/32615328/pexels-photo-32615328.jpeg'} alt={''} />*/}
                    </div>
                </div>
            </div>
        </div>

    )
}