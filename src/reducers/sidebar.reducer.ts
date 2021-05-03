import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';

const initialState = {
    selected: JSON.parse(localStorage.getItem('selected')) || 0
};

const sidebarAction = createSlice({
    name: "sidebarReducer",
    initialState,
    reducers: {
        setSelected(state, action: PayloadAction<number>) {
            state.selected = action.payload;
            localStorage.setItem('selected', JSON.stringify(state.selected));
        }
    }
})

export const {
    setSelected
} = sidebarAction.actions;

export const setSideBarSelected = (num: number): AppThunk => async (dispatch) => {
    dispatch(setSelected(num));
}

export default sidebarAction.reducer;