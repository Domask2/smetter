import * as React from 'react';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import RecipeSelectBlock from "./RecipeSelectBlock";
import {v4 as uuidv4} from 'uuid';
import RecipeContent from "./RecipeContent";
import {Button} from "antd";
import {DataType} from "../../service/type";
import type {TableRowSelection} from 'antd/es/table/interface';
import './recipe.scss';

const Recipe = () => {
    const {pathname} = useLocation();
    const [block, setBlock] = useState([]);
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState([]);
    const [select, setSelect] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(pathname));
        if (items) {
            setBlock(items);
        } else {
            setBlock([])
        }
    }, [pathname])
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(pathname));
        if (items) {
            setBlock(items);
        }
    }, []);

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: (selectedRow, selectedRows) => {
            setSelectedRowKeys(selectedRow)
        },
        onSelect: (record, selected, selectedRows) => {
            setGroup([record]);
            setSelect(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            setGroup(selectedRows);
            setSelect(selectedRows);
        },
    };

    const save = (newObj) => {
        localStorage.setItem(pathname, JSON.stringify(newObj));
        setBlock(prev => [...newObj]);
    }
    const restart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        })
    }
    const reset = () => {
        setGroup([]);
        setSelectedRowKeys([])
        setSelect([])
    }

    const addNewBlock = () => {
        let newObj = block;
        newObj.push({key: uuidv4(), title: 'Название нового блока', ingredients: []})
        save(newObj);
        reset();
    }

    return (
        <>
            <div className='recipe'>
                <div className='recipe__content'>
                    <RecipeContent block={block}
                                   save={save}
                                   group={group}
                                   restart={restart}
                                   reset={reset}
                                   loading={loading}
                                   rowSelection={rowSelection}
                    />

                    <Button onClick={addNewBlock}>+ Новый блок</Button>
                </div>
            </div>

            <div className='recipe__content__select'>
                <RecipeSelectBlock
                    select={select}
                    block={block}
                    save={save}
                    restart={restart}
                    reset={reset}
                    setSelectedRowKeys={setSelectedRowKeys}
                />
            </div>
        </>
    );
};

export default Recipe;
