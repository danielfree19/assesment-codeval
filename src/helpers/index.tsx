import { Item } from "../dummy";

export const sortByName = (a: Item , b: Item) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
};

export function sortByDate (a: Item,b: Item) 
{ 
    const aDate = typeof a.createDate == 'string' ? new Date(a.createDate) : a.createDate;
    const bDate = typeof b.createDate == 'string' ? new Date(b.createDate) : b.createDate;
    return aDate.getTime() - bDate.getTime() 
}

export function sortSelect(sortBy: string) {
    switch (sortBy) {
        case 'name':
            return sortByName;
        case 'date':
            return sortByDate;
        default:
            return sortByName;
    }
}