import * as React from 'react';
import {memo, useState} from "react";
import {changeInputTable, deleteTableItem} from "../../service/recipeService";
import {CloseCircleOutlined} from "@ant-design/icons";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {DataType} from "../../service/type";

const RecipeTable = ({block, save, reset, restart, item, loading, rowSelection}) => {
    const [checkStrictly] = useState(false);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Название',
            dataIndex: 'title',
            render: (text: string, row) => {
                return <input className='inputTable'
                              type={'text'}
                              value={text}
                              onChange={(e) => {
                                  let newObj = changeInputTable(block, e, row, 'title')
                                  save(newObj);
                              }}/>
            },
        },
        {
            title: 'Вес',
            dataIndex: 'weight',
            width: '3%',
            render: (text: string, row) => {
                return <input className='inputTable'
                              type={'number'}
                              value={text}
                              onChange={(e) => {
                                  let newObj = changeInputTable(block, e, row, 'weight')
                                  save(newObj);
                              }}/>
            },
        },
        {
            title: 'Ккал',
            dataIndex: 'kcal',
            width: '3%',
            render: (text: string, row) => {
                return <input className='inputTable'
                              type={'number'}
                              value={text}
                              onChange={(e) => {
                                  let newObj = changeInputTable(block, e, row, 'kcal')
                                  save(newObj);
                              }}/>
            },
        },
        {
            title: 'Примечание',
            dataIndex: 'note',
            render: (text: string, row) => {
                return <input className='inputTable'
                              type={'text'}
                              value={text}
                              onChange={(e) => {
                                  let newObj = changeInputTable(block, e, row, 'note')
                                  save(newObj);
                              }}/>
            },
        },
        {
            title: '',
            dataIndex: 'delete',
            render: (text: string, row) => {
                return (
                    <CloseCircleOutlined
                        className='block_delete'
                        onClick={() => {
                            let newObj = deleteTableItem(block, row)
                            reset();
                            restart();
                            save(newObj);
                        }}/>
                )
            },
        }
    ];

    return (<>
            {
                !loading && item.ingredients && item.ingredients.length > 0 && (
                    <Table
                        loading={loading}
                        expandable={{defaultExpandAllRows: true, expandIcon: () => null}}
                        columns={columns}
                        rowSelection={{...rowSelection, checkStrictly}}
                        dataSource={item.ingredients}
                        pagination={false}
                    />
                )
            }

        </>
    );
}

export default memo(RecipeTable);
