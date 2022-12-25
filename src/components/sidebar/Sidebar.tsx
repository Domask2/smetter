import * as React from 'react';
import * as cn from 'classnames';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Menu} from 'antd';
import {sidebar} from "../../service/data";

import shrinkLeftIcon from '../../assets/img/shrink-left.png';
import expandRightIcon from '../../assets/img/expand-right.png';
import burgerLogo from '../../assets/img/burger.png';

import type {MenuProps} from 'antd';
import './sidebar.scss';

const Sidebar = () => {
    const [isHidden, setIsHidden] = useState(false);
    const navigate = useNavigate();

    const handleToggleClick = () => {
        setIsHidden(!isHidden);
    };

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key) {
            if (e.keyPath.length === 1) {
                navigate(e.keyPath[0]);
            } else if (e.keyPath.length === 2) {
                navigate(`${e.keyPath[1]}/${e.keyPath[0]}/recipes/recipe`);
            }
        }
    };

    return (
        <div className={cn('sidebar', {sidebar_hidden: isHidden})}>
            <div className={cn('sidebar__content', {sidebar__content_hidden: isHidden})}>
                <div className="sidebar__header">
                    <Link className="link" to="/">
                        <img src={burgerLogo} alt="Логотип фабрика бургеров"/>
                    </Link>
                    <span className="sidebar__title">Добро пожаловать в “Фабрику бургеров”</span>
                </div>
                <div className="sidebar__separator"/>

                <Menu
                    onClick={onClick}
                    mode="inline"
                    items={sidebar}
                />
            </div>
            <img
                className="sidebar__toggle"
                src={isHidden ? expandRightIcon : shrinkLeftIcon}
                onClick={handleToggleClick}
                alt={isHidden ? 'Развернуть боковое меню' : 'Свернуть боковое меню'}
            />
        </div>
    );
};

export default Sidebar;
