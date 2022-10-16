import { configureStore } from '@reduxjs/toolkit';
import { projectListSlice } from 'features/project-list/slices';

export const rootReducer = {
  projectList: projectListSlice.reducer
};

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
