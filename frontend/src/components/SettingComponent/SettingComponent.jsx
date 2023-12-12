import React from 'react'
import "./style.scss"
import { FaMeta } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { MdOutlineSecurity } from "react-icons/md";
import { LiaAdversal } from "react-icons/lia";
import { CiCreditCard1 } from "react-icons/ci";
const SettingComponent = ({active,handleClick}) => {
  return (
    <>
        <div className="settings-left">
                    <div className='settings-left-container'>
                        <div className="settings-left-header">
                            <div className='meta'>
                                <FaMeta />
                                <span>Meta</span>
                            </div>
                            <div className='account-center'>
                                <span>Account Center</span>
                            </div>
                            <div className='account-p'>
                                <p>Manage your connected experiences and account settings across Meta technologies.</p>
                            </div>
                            <div className='account-content'>
                                <div className='account-content-1'>
                                    <GoPerson />
                                    <span>Personal details</span>
                                </div>
                                <div className='account-content-1'>
                                    <MdOutlineSecurity />
                                    <span>Password and security</span>
                                </div>
                                <div className='account-content-1'>
                                    <LiaAdversal />
                                    <span>Ad preferences</span>
                                </div>
                                <div className='account-content-1'>
                                    <CiCreditCard1 />
                                    <span>Payments</span>
                                </div>
                            </div>
                            <div className='account-below'>
                                <span>See more in Accounts Center</span>
                            </div>
                        </div>
                        <div className="settings-left-heading">
                            <span>Settings</span>
                        </div>
                        <div className={`setting-left-1 ${active[0] ? "active" : ""}`} onClick={() => handleClick(0)}>
                            <span>Edit profile</span>
                        </div>
                        <div className={`setting-left-1 ${active[1] ? "active" : ""}`} onClick={() => handleClick(1)}>
                            <span>Language preferences</span>
                        </div>
                        <div className={`setting-left-1 ${active[2] ? "active" : ""}`} onClick={() => handleClick(2)}>
                            <span>Apps and websites</span>
                        </div>
                        <div className={`setting-left-1 ${active[3] ? "active" : ""}`} onClick={() => handleClick(3)}>
                            <span>Email notifications</span>
                        </div>
                        <div className={`setting-left-1 ${active[4] ? "active" : ""}`} onClick={() => handleClick(4)}>
                            <span>Push notifications</span>
                        </div>
                        <div className={`setting-left-1 ${active[5] ? "active" : ""}`} onClick={() => handleClick(5)}>
                            <span>What you see</span>
                        </div>
                        <div className={`setting-left-1 ${active[6] ? "active" : ""}`} onClick={() => handleClick(6)}>
                            <span>Who can see your content</span>
                        </div>
                        <div className={`setting-left-1 ${active[7] ? "active" : ""}`} onClick={() => handleClick(7)}>
                            <span>How others can interact with <br />you</span>
                        </div>
                        <div className={`setting-left-1 ${active[8] ? "active" : ""}`} onClick={() => handleClick(8)}>
                            <span>Supervision</span>
                        </div>
                        <div className={`setting-left-1 ${active[9] ? "active" : ""}`} onClick={() => handleClick(9)}>
                            <span>Help</span>
                        </div>
                        <div className="settings-left-footer">
                            <span>Switch to professional account</span>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default SettingComponent
