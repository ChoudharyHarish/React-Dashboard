import React from 'react';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
    console.log(children)
    return (
        <div className="layout">
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default Layout;
