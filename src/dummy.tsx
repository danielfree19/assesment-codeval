export interface Item {
    id: number,
    name: string,
    description: string,
    price: number,
    createDate: Date
}

const data:Array<Item> = [
    {
        id: 1,
        name: 'ps5',
        description: 'gaming console next gen made by sony',
        price: 3200.0,
        createDate: new Date('2022-02-05 15:30:00')
    },
    {
        id: 2,
        name: 'ps4',
        description: 'gaming console 4th gen made by sony',
        price: 1300.0,
        createDate: new Date('2020-05-23 08:11:00')
    },
    {
        id: 3,
        name: 'ps3',
        description: 'gaming console 3rd gen made by sony',
        price: 800.0,
        createDate: new Date('2018-03-15 20:20:00')
    },
    {
        id: 4,
        name: 'Xbox one',
        description: 'gaming console 4rd gen by microsoft',
        price: 3000.0,
        createDate: new Date('2018-03-15 20:20:00')
    },
    {
        id: 5,
        name: 'Switch',
        description: 'portable gaming console made by nintendo',
        price: 1600.0,
        createDate: new Date('2018-03-15 20:20:00')
    },
    {
        id: 6,
        name: 'Psv',
        description: 'portable gaming console 3rd gen',
        price: 1250.0,
        createDate: new Date('2018-03-15 20:20:00')
    },
    {
        id: 7,
        name: 'Xbox 360',
        description: 'gaming console 3rd gen',
        price: 1300.0,
        createDate: new Date('2018-03-15 20:20:00')
    },
    {
        id: 8,
        name: 'aGameboy',
        description: 'gaming console 3rd gen',
        price: 400.0,
        createDate: new Date('2018-03-15 20:20:00')
    },
];

export const sortTypes = {
    name: 'name',
    date: 'date'
}

export default data;