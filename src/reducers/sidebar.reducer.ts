import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';

const initialState = {
    selected: parseInt(localStorage.getItem("selected")) || 0,
};

const sidebarAction = createSlice({
    name: "sidebarReducer",
    initialState,
    reducers: {
        setSelected(state, action: PayloadAction<number>) {
            state.selected = action.payload;
            localStorage.setItem("selected", action.payload.toString());
        },
        clearSelected(state) {
            state.selected = 0
        }
    }
})

export const {
    setSelected,
    clearSelected
} = sidebarAction.actions;

export const setSideBarSelected = (num: number): AppThunk => async (dispatch) => {
    dispatch(setSelected(num));
}

export default sidebarAction.reducer;