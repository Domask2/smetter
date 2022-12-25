import * as React from 'react';
import {Outlet} from 'react-router-dom';
import Navigation from "../../components/navigation/Navigation";

const Content: React.FC = () => {
    return (
        <div className='content'>
            <Navigation />
            <Outlet />
        </div>
    );
}

export default Content;
