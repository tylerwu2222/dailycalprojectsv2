import React from 'react'

import './SiteLogo.css';

export default function SiteLogo() {
    return (
        <div id='logo-container'>
            <a className="nav-brand-link"
                // target='_blank'
                href="https://dailycal-projects.netlify.app/"
            // href="/"
            >
                <img
                    id="DC-logo"
                    src="https://bloximages.chicago2.vip.townnews.com/dailycal.org/content/tncms/custom/image/f6ce5ff6-fb08-11ed-8535-7390484dbdc8.png"
                ></img>
                <img
                    id="projects-logo"
                    src="/icons/projects.png"
                ></img>
            </a>
        </div >
    )
}
