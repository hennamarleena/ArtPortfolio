import { create } from 'zustand'
import { items } from './data';

const useStore = create((set) => ({
  itemsList: items,
  filteredItemsToShow: items,
  
  filterItems(category) {
    set((state) => ({
      filteredItemsToShow: category === "all"
        ? state.itemsList
        : state.itemsList.filter((item) => item.category === category),
    }));
  },
}))


export default useStore;