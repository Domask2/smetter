import * as React from 'react';
import {Button, Card, Row} from "antd";
import {useEffect, useState} from "react";
import {copy, deleteSelect} from "../../service/recipeService";
import {CloseCircleOutlined, FolderAddOutlined, SwitcherOutlined} from "@ant-design/icons";

const RecipeSelectBlock = ({select, block, save, restart, reset, setSelectedRowKeys}) => {
    const [allWeight, setAllWeight] = useState([]);

    useEffect(() => {
        let sum = select.reduce((prev: any, cur: any) => {
            return prev + cur.weight * 1
        }, 0)
        setAllWeight(sum);
    }, [select])

    const deleteSelectAll = () => {
        let newObj = deleteSelect(block, select)
        save(newObj);
        restart();
        reset();
    }

    const copyTableItem = () => {
        let newObj = copy(select, block);
        save(newObj);
        restart();
        reset();
    }

    return (
        <>
            {
                select && select.length > 0 && (
                    <Card className='card__select__block'>
                        <Row className='jc-sb'>
                            <div>
                                <Button className='mr-12' onClick={deleteSelectAll}><CloseCircleOutlined className='block_delete '/> Удалить</Button>
                                <Button className='mr-12' onClick={copyTableItem}><FolderAddOutlined className='block_delete '/> Копировать</Button>
                                <Button onClick={() => setSelectedRowKeys([])}><SwitcherOutlined className='block_delete'/> Снять выделение</Button>
                            </div>
                            <div>
                                <span className='mr-10'>Выбранные ингредиенты: {select.length}</span>
                                <span>Общий вес: {allWeight}</span>
                            </div>
                        </Row>
                    </Card>
                )
            }
        </>
    );
}

export default RecipeSelectBlock;
