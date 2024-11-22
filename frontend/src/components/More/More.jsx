import React, { useEffect, useRef } from 'react'
import { IoIosSettings } from "react-icons/io";
import { LuActivitySquare } from "react-icons/lu";
import { MdOutlineLightMode } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import save from "../../assets/save.png";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const More = ({ onClose }) => {
    const navigate = useNavigate();
    const moreRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreRef.current && !moreRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <div ref={moreRef} className="absolute bottom-16 left-4 w-[265px] bg-white rounded-xl border border-gray-300 shadow-md">
            <div className="flex flex-col p-2 space-y-1">
                <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={() => navigate("/accounts/edit")}>
                    <IoIosSettings className="w-6 h-6" />
                    <span className="ml-4 text-sm">Settings</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <LuActivitySquare className="w-6 h-6" />
                    <span className="ml-4 text-sm">Your Activity</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <img src={save} alt="" className="w-6 h-6" />
                    <span className="ml-4 text-sm">Saved</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <MdOutlineLightMode className="w-6 h-6" />
                    <span className="ml-4 text-sm">Switch Appearance</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <MdReportProblem className="w-6 h-6" />
                    <span className="ml-4 text-sm">Report a Problem</span>
                </div>
            </div>
            <div className="mt-4 border-t">
                <div className="p-3 hover:bg-gray-100 cursor-pointer">
                    <span className="text-sm">Switch Accounts</span>
                </div>
                <div className="p-3 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                    <span className="text-sm">Log Out</span>
                </div>
            </div>
        </div>
    )
}

export default More
