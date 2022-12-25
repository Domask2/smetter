import * as React from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
    return (
        <div className="container">
            <Sidebar/>
            <Outlet/>
        </div>
    );
};

export default Home;
