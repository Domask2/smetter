import {v4 as uuidv4} from 'uuid';

export const changeInputTable = (block, e, row, inputName) => {
    let newObj = block;
    newObj.map((item: any) => {
        return item?.ingredients.map((ing: any) => {
            if (ing.key === row.key) {
                ing[inputName] = e.target.value
            }

            if (ing?.children?.length > 0) {
                ing?.children.map((chil: any, i) => {
                    if (chil.key === row.key) {
                        chil[inputName] = e.target.value
                    }
                    return chil
                })
            }
            return ing
        })
    })

    return newObj;
}

export const deleteTableItem = (block, row) => {
    let newObj = block;
    newObj.forEach((item: any, index) => {
        return item?.ingredients.map((ing: any, ind) => {
            if (ing.key === row.key) {
                newObj[index].ingredients.splice(ind, 1)
            }

            if (ing?.children?.length > 0) {
                ing?.children.map((chil: any, i) => {
                    if (chil.key === row.key) {
                        newObj[index].ingredients[ind].children.splice(i, 1);
                    }
                })
            }
        })
    })

    return newObj;
}

export const addIngredientGroup = (block, group, index) => {
    let newObj = block;
    newObj[index].ingredients.map((ing: any) => {
        if (ing.key === group[0].key) {
            ing.children.push({
                group:true,
                key: uuidv4(),
                title: 'новый ингридиент',
                weight: 0,
                kcal: 0,
                note: ''
            })
        }
        return ing
    })

    return newObj;
}

export const deleteSelect = (block, select) => {
    let newObj = block;
    let deleteKey = [];

    select.forEach((item: any) => {
        deleteKey.push(item.key);
    })

    newObj.forEach((item: any, index) => {
        deleteKey.forEach((key: any) => {
            item?.ingredients.forEach((ing: any, ind) => {
                if (ing.key === key) {
                    newObj[index].ingredients.splice(ind, 1)
                } else {
                    if (ing?.children?.length > 0) {
                        ing?.children.map((chil: any, i) => {
                            if (chil.key === key) {
                                newObj[index]?.ingredients[ind]?.children.splice(i, 1);
                            }
                        })
                    }
                }
            })
        })
    })

    return newObj;
}

export const copy = (select, block) => {
    let newSelect = select;
    let array = [];

    newSelect.forEach((item: any) => {
        if (item.group && item.children) {
            let clone = Object.assign({}, item);
            clone.key = uuidv4();
            array.push(clone);
        }

        if (!item.group) {
            let clone = Object.assign({}, item);
            clone.key = uuidv4();
            array.push(clone);
        }
    })

    let newObj = block;
    newObj.push({
        key: uuidv4(),
        title: 'Название нового блока',
        ingredients: [...array]
    })

    return newObj;
}