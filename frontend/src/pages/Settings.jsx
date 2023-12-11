import React from 'react'
import "../styles/Settings.scss"
import Sidebar from '../components/Sidebar/Sidebar'
const Settings = () => {
    return (
        <>
            <Sidebar />
            <div className='settings'>
                <div className="settings-left">
                    <div className='settings-left-container'>
                     <div className="settings-left-header"></div>
                     <div className="settings-left-body"></div>
                     <div className="settings-left-footer"></div>
                    </div>
                </div>
                <div className="settings-right">
                </div>
            </div>
        </>
    )
}

export default Settings
