import { create } from "zustand";

const useStore = create((set) => ({
  itemsList: [],
  filteredItemsToShow: [],
  selectedCategory: "all",

  setItemsList(items) {
    set(() => ({
      itemsList: items,
      filteredItemsToShow: items,
    }));
  },

  filterItems(category) {
    set((state) => ({
      filteredItemsToShow:
        category === "all"
          ? state.itemsList
          : state.itemsList.filter((item) => item.category === category),
    }));
  },
}));

export default useStore;
