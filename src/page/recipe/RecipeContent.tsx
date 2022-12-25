import * as React from 'react';
import {ChangeEvent, memo} from "react";
import RecipeTable from "./RecipeTable";
import {v4 as uuidv4} from 'uuid';
import {Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {addIngredientGroup} from "../../service/recipeService";

const RecipeContent = ({block, save, group, restart, reset, loading, rowSelection}) => {
    const changeTitleBlock = (e, index) => {
        let newObj = block;
        newObj[index].title = e.target.value
        save(newObj);
    }
    const addIngredient = (index) => {
        if (group.length > 0) {
            let newObj = addIngredientGroup(block, group, index)
            save(newObj);
            restart();
            reset();
        } else {
            let newObj = block;
            let obj = {key: uuidv4(), title: 'новый ингридиент', weight: 0, kcal: 0, note: ''}
            newObj[index].ingredients.push(obj)
            save(newObj);
            restart();
            restart();
        }
    }
    const addGroup = (index) => {
        let newObj = block;
        let obj = {group: true, children: [], key: uuidv4(), title: 'Новая группа', weight: 0, kcal: 0, note: ''}
        newObj[index].ingredients.push(obj)
        save(newObj);
        restart();
        reset();
    }
    const deleteBlock = (index) => {
        let newObj = block;
        newObj.splice(index, 1);
        save(newObj);
        reset();
    }

    return (
        <div className='recipe__content__body'>
            {
                block && block.length > 0 && block.map((item: any, index) => {
                    return (
                        <div key={item.key} className='recipe__content__body__block'>
                            <div>
                                <input className='block__title' type="text"
                                       value={item.title}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitleBlock(e, index)}
                                />

                                <CloseCircleOutlined
                                    className='block_delete'
                                    onClick={() => deleteBlock(index)}
                                />
                            </div>
                            <div className='btn__add'>
                                <Button onClick={() => addIngredient(index)}>+ Ингридиенты</Button>
                                <Button onClick={() => addGroup(index)}>+ Группа</Button>
                            </div>

                            <RecipeTable
                                block={block}
                                save={save}
                                reset={reset}
                                restart={restart}
                                item={item}
                                loading={loading}
                                rowSelection={rowSelection}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default memo(RecipeContent);
