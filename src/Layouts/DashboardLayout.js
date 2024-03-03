import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../Pages/Dashboard/Sidebar/Sidebar';
import Header from '../Pages/Shared/Header/Header';

const DashboardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                    
                </div>
                <div className="drawer-side shadow-xl">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <div className="menu p-4 w-80 text-base-content">
                    <Sidebar></Sidebar>
                       

                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;