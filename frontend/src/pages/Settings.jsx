import React, { useState } from 'react'
import "../styles/Settings.scss"
import SettingComponent from '../components/SettingComponent/SettingComponent';
import img01 from "../assets/profileimages/img01.jpg";
import Sidebar from '../components/Sidebar/Sidebar'
import Footer from "../components/Profile/Profile-Footer"
const Settings = () => {
    const [biocount, setbiocount] = useState(0);
    const [active, setactive] = useState([true, false, false, false, false, false, false, false, false, false]);
    const handleClick = (index) => {
        let temp = [true, false, false, false, false, false, false, false, false, false];
        if (index !== 0) {
            temp[index] = !temp[index];
            temp[0] = !temp[0];
            setactive(temp);
        }
        else {
            temp[0] = true;
            setactive(temp);
        }
    }
    return (
        <>
            <Sidebar />
            <div className='settings'>
                <SettingComponent active={active} handleClick={handleClick} />
                <div className="settings-right">
                    <div className='settings-right-headings'>
                        <span>Edit profile</span>
                    </div>
                    <div className='settings-right-profile-img'>
                        <img src={img01} alt='' />
                        <div className='profile-name'>
                            <span>iam_anurag2420</span>
                            <span className='change' onClick={() => document.getElementById('upload').click()}>Change profile photo</span>
                            <input type='file' id='upload' name='upload' accept="image/jpeg image/png image/jpg" hidden />
                        </div>
                    </div>
                    <div className='settings-right-options'>
                        <div className='bio'>
                            <span>Bio</span>
                            <div className='bio-right'>
                                <textarea onChange={(e)=>setbiocount(e.target.value.length)} maxLength="150" type='text' placeholder='Add a bio to your profile....' />
                                <span>{biocount} / 150</span>
                            </div>
                        </div>
                        <div className='gender'>
                              <span for="gender">Gender</span>
                              <div className='gender-right'>
                                <select name='gender' id='gender'>
                                    <option value="Custom">Custom</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Prefer not to Say">Prefer not to Say</option>
                                </select>
                                <span className='information'>This won’t be part of your public profile.</span>
                              </div>
                        </div>
                        <div className='profile-suggestion'>
                            <span> Show account suggestions on profiles</span>
                            <div className='profile-suggestion-right'>
                                <input type='checkbox' />
                                <span className='text'>Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.</span>
                            </div>
                        </div>
                        <div className='button'>
                            <button>Submit</button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Settings
