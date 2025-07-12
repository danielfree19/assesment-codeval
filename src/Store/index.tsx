import {create} from 'zustand';
import data , { Item, sortTypes } from '../dummy';
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
    items:Array<Item>;
    selectedItem: number | undefined;
    sortBy: string;
    search: string;
    page: number;
    maxPage: number;
    maxPerPage: number;
    new: boolean;

    toggleNew: (flag: boolean) => void;
    getItems: () => void;
    getItem: (id: Item['id']) => Item;
    getNewId: () => Item['id'];
    selectItem: (id: Item['id']) => void;
    resetSelection: () => void;
    deleteItem: (id: Item['id']) => void;
    addItem: (item: Item) => void;
    updateItem: (item: Item) => void;

    nextPage: () => void;
    prevPage: () => void;
    setPage: (pageNumber: number) => void;
    setSearch: (search: string) => void;
    setSortBy: (sort: string) => void;
}

const unknownItem: Item = {
    id: -1,
    name: 'Item not found',
    description: 'somehow you stumbled upon a non existent item',
    price: -1,
    createDate: new Date()
};

const storage = createJSONStorage(() => localStorage)

const useStore = create<Store>()(
    persist(
    (set, get) => ({
    items: [],
    selectedItem: undefined,
    sortBy: sortTypes.name,
    search: '',
    page: 0,
    maxPage: 0,
    maxPerPage: 5,
    new: false,

    toggleNew: (flag: boolean = false) => set({new: flag}),
    getItems: ()=>{
        if (get().items.length === 0) {
            set({
                items: data,
                maxPage: Math.floor((data.length - 1) / get().maxPerPage) 
            });
        } else {
            set({
                maxPage: Math.floor((get().items.length - 1) / get().maxPerPage)     
            });
        }
    },
    getItem: (id: number): Item => {
        const items = get().items;
        const selectedItem = items.find(item => item.id === id);
        return selectedItem === undefined ? unknownItem : selectedItem;
    },
    getNewId: () => {
        return get().items.length + 1
    },
    selectItem: (id: Item['id']) => {
        set({selectedItem: id})
    },
    resetSelection: () => {
        set({selectedItem: undefined});
    },
    deleteItem: (id: Item['id']) => {
        set(state => ({
            items: state.items.filter(item => item.id !== id),
            maxPage: Math.floor((state.items.filter(item => item.id !== id).length - 1) / get().maxPerPage)
        }))
    },
    addItem: (item: Item) => {
        set(state => ({
            items: [
                ...state.items, 
                item,
            ],
            maxPage: Math.floor((state.items.length) / get().maxPerPage)
        }))
    },
    updateItem: (newItem: Item) => {
        set(state => ({
            items: [
                ...state.items.filter(item => item.id !== newItem.id),
                newItem
            ]
        }))
    },
    nextPage: ()=>{
        set((state) => ({ page: state.page + 1 }))
    },
    prevPage: () => {
        set((state) => ({ page: state.page - 1 >= 0 ? state.page - 1 : state.page }))
    },
    setPage: (pageNumber: number) => set({page: pageNumber}),
    setSearch: (search: string) => set({search}),
    setSortBy: (sort: string) => set({sortBy: sort})
    }),
    {
        name: 'assessment-store', 
        storage: storage,
    }
),
);

export default useStore;