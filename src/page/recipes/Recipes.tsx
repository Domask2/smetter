import * as React from 'react';
import {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Breadcrumb, Menu, MenuProps} from 'antd';
import './recipes.scss';

const menuItems:MenuProps['items']= [
    {
        key: 'recipe',
        label: 'Рецепт',
    },
    {
        key: 'cooking-time',
        label: 'Время приготовления',
    },
    {
        key: 'serving',
        label: 'Подача',
    },
];

const Recipes = ({ path, title }) => {
    const {pathname} = useLocation();
    const [current, setCurrent] = useState(path);
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname.split('/')[4] === 'recipe') {
            setCurrent('recipe')
        }
    }, [pathname])

    function ucFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key) {
            navigate(e.key);
            setCurrent(e.key);
        }
    };

    return (
        <div className='recipes'>
            <Breadcrumb separator=">">
                <Breadcrumb.Item>Рецепты</Breadcrumb.Item>
                {
                    path.split('/').map((item:string, index) => {
                        if(index === path.split('/').length -1) {
                           return <Breadcrumb.Item key={index} className='breadcrumb'>{item}</Breadcrumb.Item>
                        }
                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>

            <div className={'recipes__title'}>{ucFirst(title)}</div>

            <Menu className='content-menu' onClick={onClick} selectedKeys={[current]}  mode="horizontal" items={menuItems}/>

            <Outlet />
        </div>
    );
}

export default Recipes;
