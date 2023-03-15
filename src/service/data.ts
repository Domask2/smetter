import {MenuProps} from "antd";

export const routing = [
    {key: 'sandwiches', title: 'сендвичи'},
    {
        key: 'baguette', title: 'багет', children: [
            {key: 'withHam', title: 'С ветчиной'},
            {key: 'withPastrami', title: 'С пастрами'},
            {key: 'withGarlic', title: 'Чесночный'},
            {key: 'withGrilledPepper', title: 'С перцем-гриль'},
        ]
    },
    {
        key: 'burgers', title: 'бургеры', children: [
            {key: 'classic', title: 'классический'},
            {key: 'cheeseburger', title: 'чизбургер'},
            {key: 'bigMac', title: 'биг мак'},
            {key: 'bigTasty', title: 'биг тейсти'},
        ]
    },
]

export const sidebar: MenuProps['items'] = [
    {
        label: 'Бургеры',
        key: 'burgers',
        children: [
            {
                label: 'Классический',
                key: 'classic'
            },
            {
                label: 'Чизбургер',
                key: 'cheeseburger'
            },
            {
                label: 'Биг Мак',
                key: 'bigMac'
            },
            {
                label: 'Биг Тейсти',
                key: 'bigTasty'
            },
        ]
    },
    {
        label: 'Багет',
        key: 'baguette',
        children: [
            {
                label: 'С ветчиной',
                key: 'withHam'
            },
            {
                label: 'С пастрами',
                key: 'withPastrami'
            },
            {
                label: 'Чесночный',
                key: 'withGarlic'
            },
            {
                label: 'С перцем-гриль',
                key: 'withGrilledPepper'
            },
        ]
    },
];

export const navigation: MenuProps['items'] = [
    {
        label: 'Рецепты',
        key: 'recipes',
    },
    {
        label: 'Прайс-лист',
        key: 'price',
    },
    {
        label: 'Комбо-наборы',
        key: 'combo',
    },
];

export const menuItems:MenuProps['items']= [
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
