import React from 'react'
import "./more.scss"
import { IoIosSettings } from "react-icons/io";
import { LuActivitySquare } from "react-icons/lu";
import { MdOutlineLightMode } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import save from "../../assets/save.png";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const More = () => {
    const navigate = useNavigate();
    const handleLogout=()=>{
        Cookies.remove('token');
        navigate("/login");
    }
    return (
        <>
            <div className='more'>
                <div className='more-up'>
                    <div className='more-upone' onClick={()=>navigate("/accounts/edit")}>

                        <div className='logo'> <IoIosSettings className='logoitem' /></div>
                        <span className='text'>Settings</span>

                    </div>
                    <div className='more-upone'>

                        <div className='logo'> <LuActivitySquare className='logoitem'  /></div>
                        <span className='text'>Your Activity</span>

                    </div>
                    <div className='more-upone'>

                        <div className='logo'> <img src={save} alt=''   /></div>
                        <span className='text'>Saved</span>

                    </div>
                    <div className='more-upone'>

                        <div className='logo'> <MdOutlineLightMode className='logoitem'  /></div>
                        <span className='text'>Switch Appearance</span>

                    </div>
                    <div className='more-upone'>

                        <div className='logo'> <MdReportProblem  className='logoitem' /></div>
                        <span className='text'>Report a Problem</span>

                    </div>
                </div>
                <div className='more-down'>
                    <div className='switchaccounts'><span>Switch Accounts</span></div>
                    <div className='logout' onClick={handleLogout}>Log Out</div>
                </div>
            </div>
        </>
    )
}

export default More
