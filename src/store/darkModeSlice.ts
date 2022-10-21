import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getInitialDarkmode, processDarkModeChange } from '../helpers';

type DarkModeState = {
  isDarkMode: boolean;
};

const initialState: DarkModeState = {
  isDarkMode: getInitialDarkmode()
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<string>) => {
      const newDarkMode = `${action.payload}` === 'dark';
      processDarkModeChange(newDarkMode);
      state.isDarkMode = newDarkMode;
    }
  }
});

export const { setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
