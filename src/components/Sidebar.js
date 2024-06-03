import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import logo from '../assets/logo.png';
import avatar from "../assets/avatar.jpeg";

const Sidebar = () => {
    const [active, setActive] = useState('');
    const [open, setOpen] = useState(window.innerWidth > 1024);
    const [mobile, setMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setOpen(window.innerWidth > 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={`${!open ? 'hidden' : 'flex'} bg-subBackground text-white w-[220px]  flex-col justify-between px-6 py-8 h-screen fixed`}>
                <div className='flex flex-col gap-12'>
                    <div>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="flex flex-col gap-6">
                        General
                        <div className="flex flex-col gap-4 px-4">
                            <Link to="/" onClick={() => setActive('')} className={`flex items-center gap-3 ${active === '' && 'text-red-600'}`}>
                                <Icon icon="pixelarticons:dashboard" width="24" height="24" />
                                Dashboard
                            </Link>
                            <Link to="/events" onClick={() => setActive('events')} className={`flex items-center gap-3 ${active === 'events' && 'text-red-600'}`}>
                                <Icon icon="mdi:events" width="24" height="24" />
                                Events
                            </Link>
                            <Link to="/trends" onClick={() => setActive("trends")} className={`flex items-center gap-3 ${active === 'trends' && 'text-red-600'}`}>
                                <Icon icon="icon-park-outline:trend-two" width="24" height="24" />
                                Trends
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        Graphs
                        <div className="flex flex-col gap-4 px-4">
                            <Link to="/ip-events" className={`flex items-center gap-3 ${active === 'ip-events' && 'text-red-600'}`}>
                                <Icon icon="uis:graph-bar" width="24" height="24" />
                                Ip - Events
                            </Link>
                            <Link to="/categorical" className={`flex items-center gap-3 ${active === 'pie' && 'text-red-600'}`}>
                                <Icon icon="mdi:graph-pie" width="24" height="24" />
                                Categorical
                            </Link>
                            <Link to="/bar" className={`flex items-center gap-3 ${active === 'bar' && 'text-red-600'}`}>
                                <Icon icon="gridicons:line-graph" width="24" height="24 " />
                                Bar
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='flex gap-4 w-full cursor-pointer'>
                        <img src={avatar} alt="Avatar" className='h-8 w-8 rounded-full' />
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-sm'>Harish Choudhary</h2>
                            <p className='text-gray-400 text-xs'>harish17@gmail.com</p>
                        </div>
                    </div>
                    <div className={`${!mobile && 'hidden'} cursor-pointer z-50`} onClick={() => setOpen(false)}>
                        <Icon icon="ic:outline-close" width="28" height="28" style={{ color: 'white' }} />
                    </div>
                </div>

            </div>
            <div className={`${open && 'hidden'} absolute left-6 top-8 cursor-pointer z-50`} onClick={() => setOpen(true)}>
                <Icon icon="quill:hamburger" width="28" height="28" style={{ color: 'white' }} />
            </div>
        </>
    );
}

export default Sidebar;
