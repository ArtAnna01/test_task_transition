import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: {
      reducer: (state, action) => {
        const { color } = action.payload;
        state.unshift({ id: Date.now(), color });
      },
      prepare: (color) => {
        return { payload: { color } };
      },
    },
    removeItem: (state) => {
      state.pop();
    },
  },
});

export const { addItem, removeItem } = itemsSlice.actions;

export const selectItems = (state) => state.items;

export default itemsSlice.reducer;
