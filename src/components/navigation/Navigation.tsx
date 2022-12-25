import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Menu} from 'antd';
import {navigation} from "../../service/data";
import type {MenuProps} from 'antd';
import './navigation.scss';

const Navigation: React.FC = () => {
    const {pathname} = useLocation();
    const [current, setCurrent] = useState(pathname);
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname.includes('recipes')) {
            setCurrent('recipes')
        }
    }, [pathname])

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key) {
            navigate(e.key);
            setCurrent(e.key);
        }
    };
    return <Menu className="navigation" onClick={onClick} selectedKeys={[current]} mode="horizontal"
                 items={navigation}/>;
};

export default Navigation;
