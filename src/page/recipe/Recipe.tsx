import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import {CloseCircleOutlined} from '@ant-design/icons';
import {Button, Card, Row} from "antd";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import type {TableRowSelection} from 'antd/es/table/interface';

import './recipe.scss';

interface DataType {
    key: React.Key;
    name: string;
    weight: number;
    kcal: number;
    note: string;
}

const Recipe = () => {
    const {pathname} = useLocation();
    const [block, setBlock] = useState([]);
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState([]);
    const [select, setSelect] = useState([]);
    const [allWeight, setAllWeight] = useState([]);
    const [checkStrictly] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

    useEffect(() => {
        let sum = select.reduce((prev: any, cur: any) => {
            return prev + cur.weight * 1
        }, 0)
        setAllWeight(sum);
    }, [select])

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

    const columns: ColumnsType<DataType> = [
        {
            title: 'Название',
            dataIndex: 'title',
            render: (text: string, row) => {
                return <input style={{border: 'none', outline: 'none',}} type={'text'} value={text} onChange={(e) => {
                    let newObj = block;
                    newObj.map((item: any) => {
                        return item?.ingredients.map((ing: any) => {
                            if (ing.key === row.key) {
                                ing.title = e.target.value
                            }

                            if (ing?.children?.length > 0) {
                                ing?.children.map((chil: any, i) => {
                                    if (chil.key === row.key) {
                                        chil.title = e.target.value
                                    }
                                    return chil
                                })
                            }
                            return ing
                        })
                    })
                    localStorage.setItem(pathname, JSON.stringify(newObj));
                    setBlock(prev => [...newObj]);
                }}/>
            },
        },
        {
            title: 'Вес',
            dataIndex: 'weight',
            width: '3%',
            render: (text: string, row) => {
                return <input style={{border: 'none', outline: 'none',}} type={'number'} value={text} onChange={(e) => {
                    let newObj = block;
                    newObj.map((item: any) => {
                        return item?.ingredients.map((ing: any) => {
                            if (ing.key === row.key) {
                                ing.weight = e.target.value
                            }

                            if (ing?.children?.length > 0) {
                                ing?.children.map((chil: any, i) => {
                                    if (chil.key === row.key) {
                                        chil.weight = e.target.value
                                    }
                                    return chil
                                })
                            }

                            return ing
                        })
                    })
                    localStorage.setItem(pathname, JSON.stringify(newObj));
                    setBlock(prev => [...newObj]);
                }}/>
            },
        },
        {
            title: 'Ккал',
            dataIndex: 'kcal',
            width: '3%',
            render: (text: string, row) => {
                return <input style={{border: 'none', outline: 'none',}} type={'number'} value={text} onChange={(e) => {
                    let newObj = block;
                    newObj.map((item: any) => {
                        return item?.ingredients.map((ing: any) => {
                            if (ing.key === row.key) {
                                ing.kcal = e.target.value
                            }

                            if (ing?.children?.length > 0) {
                                ing?.children.map((chil: any, i) => {
                                    if (chil.key === row.key) {
                                        chil.kcal = e.target.value
                                    }
                                    return chil
                                })
                            }

                            return ing
                        })
                    })
                    localStorage.setItem(pathname, JSON.stringify(newObj));
                    setBlock(prev => [...newObj]);
                }}/>
            },
        },
        {
            title: 'Примечание',
            dataIndex: 'note',
            render: (text: string, row) => {
                return <input style={{border: 'none', outline: 'none',}} type={'text'} value={text} onChange={(e) => {
                    let newObj = block;
                    newObj.map((item: any) => {
                        return item?.ingredients.map((ing: any) => {
                            if (ing.key === row.key) {
                                ing.note = e.target.value
                            }

                            if (ing?.children?.length > 0) {
                                ing?.children.map((chil: any, i) => {
                                    if (chil.key === row.key) {
                                        chil.note = e.target.value
                                    }
                                    return chil
                                })
                            }

                            return ing
                        })
                    })
                    localStorage.setItem(pathname, JSON.stringify(newObj));
                    setBlock(prev => [...newObj]);
                }}/>
            },
        },
        {
            title: '',
            dataIndex: 'delete',
            render: (text: string, row) => {
                return <CloseCircleOutlined style={{cursor: 'pointer'}} onClick={() => {
                    let newObj = block;
                    newObj.forEach((item: any, index) => {
                        return item?.ingredients.map((ing: any, ind) => {
                            if (ing.key === row.key) {
                                newObj[index].ingredients.splice(ind, 1)
                            }

                            if (ing?.children?.length > 0) {
                                ing?.children.map((chil: any, i) => {
                                    if (chil.key === row.key) {
                                        console.log(chil)
                                        console.log(newObj[index].ingredients[ind].children)
                                        newObj[index].ingredients[ind].children.splice(i, 1);
                                    }
                                })
                            }
                        })
                    })

                    setLoading(true);
                    localStorage.setItem(pathname, JSON.stringify(newObj));
                    setBlock(prev => [...newObj]);
                    setTimeout(() => {
                        setLoading(false);
                    })

                }}/>
            },
        }
    ];

    const changeTitleBlock = (e, index) => {
        let newObj = block;
        newObj[index].title = e.target.value
        localStorage.setItem(pathname, JSON.stringify(newObj));
        setBlock(prev => [...newObj]);
    }
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
    const deleteBlock = (index) => {
        let newObj = block;
        newObj.splice(index, 1);
        localStorage.setItem(pathname, JSON.stringify(newObj));
        setBlock(prev => [...newObj]);
        reset();
    }
    const addIngredient = (index) => {
        if (group.length > 0) {
            let newObj = block;
            newObj[index].ingredients.map((ing: any) => {
                if (ing.key === group[0].key) {
                    ing.children.push({
                        key: uuidv4(),
                        title: 'новый ингридиент',
                        weight: 0,
                        kcal: 0,
                        note: ''
                    })
                }
                return ing
            })

            save(newObj);
            restart();
            reset();
        } else {
            let newObj = block;
            let obj = {
                key: uuidv4(),
                title: 'новый ингридиент',
                weight: 0,
                kcal: 0,
                note: ''
            }

            newObj[index].ingredients.push(obj)
            restart();
            save(newObj);
            restart();

        }
    }
    const addGroup = (index) => {
        let newObj = block;
        let obj = {
            group: true,
            children: [],
            key: uuidv4(),
            title: 'Новая группа',
            weight: 0,
            kcal: 0,
            note: ''
        }
        setLoading(true);
        newObj[index].ingredients.push(obj)
        localStorage.setItem(pathname, JSON.stringify(newObj));
        setBlock(prev => [...newObj]);
        setTimeout(() => {
            setLoading(false);
        })

    }
    const addNewBlock = () => {
        let newObj = block;
        newObj.push({key: uuidv4(), title: 'Название нового блока', ingredients: []})
        setBlock(prev => [...newObj]);
        setGroup([]);
        localStorage.setItem(pathname, JSON.stringify(newObj));
    }
    return (
        <div className='recipe'>
            <div className='recipe__content'>
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
                                </div>
                            )
                        })
                    }
                </div>

                <Button onClick={addNewBlock}>+ Новый блок</Button>

                {
                    select && select.length > 0 && <div>
                        <Card>
                            <Row style={{justifyContent: 'space-between'}}>
                                <div>
                                    <Button onClick={() => {
                                        let newObj = block;
                                        let deleteKey = [];

                                        select.forEach((item: any) => {
                                            deleteKey.push(item.key);
                                        })

                                        newObj.forEach((item: any, index) => {
                                            item?.ingredients.forEach((ing: any, ind) => {
                                                deleteKey.forEach((key: any) => {
                                                    if (ing.key === key) {
                                                        newObj[index].ingredients.splice(ind, 1)
                                                    }

                                                    if (ing?.children?.length > 0) {
                                                        ing?.children.map((chil: any, i) => {
                                                            if (chil.key === key) {
                                                                newObj[index]?.ingredients[ind]?.children.splice(i, 1);
                                                            }
                                                        })
                                                    }
                                                })
                                            })
                                        })

                                        setLoading(true);
                                        localStorage.setItem(pathname, JSON.stringify(newObj));
                                        setBlock(prev => [...newObj]);

                                        let newSelect = selectedRowKeys.forEach((item: any, index) => {
                                            deleteKey.forEach((key: any) => {
                                                if (item === key) {
                                                    selectedRowKeys.splice(index, 1)
                                                    console.log(selectedRowKeys)
                                                }
                                            })

                                            return selectedRowKeys
                                        })


                                        setGroup([]);
                                        setSelectedRowKeys(newSelect)


                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 0)
                                    }
                                    }>Удалить</Button>
                                    <Button onClick={() => {
                                        let newSelect = select;
                                        let array = [];

                                        newSelect.forEach((item: any) => {
                                            let clone = Object.assign({}, item);
                                            clone.key = uuidv4()
                                            array.push(clone)
                                        })

                                        setLoading(true);
                                        let newObj = block;
                                        newObj.push({
                                            key: uuidv4(),
                                            title: 'Название нового блока',
                                            ingredients: [...array]
                                        })
                                        setGroup([]);
                                        setSelectedRowKeys([])
                                        setSelect([])
                                        setBlock(newObj);
                                        localStorage.setItem(pathname, JSON.stringify(newObj));
                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 0)
                                    }
                                    }>Копировать</Button>

                                    <Button onClick={() => {
                                        setSelectedRowKeys([]);
                                    }
                                    }>Снять выделение</Button>
                                </div>
                                <div>
                                    <span style={{marginRight: '10px'}}>Выбранные ингредиенты: {select.length}</span>
                                    <span>Общий вес: {allWeight}</span>
                                </div>
                            </Row>
                        </Card>
                    </div>
                }

            </div>
        </div>
    );
};

export default Recipe;
