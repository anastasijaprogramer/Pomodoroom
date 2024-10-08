import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minutes: 25,
  seconds: 0,
  isActive: false,
  isSession: true, // If true, then it's a Pomodoro session; if false, then break
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer(state)
    {
      state.isActive = true;
    },
    stopTimer(state)
    {
      state.isActive = false;
    },
    resetTimer(state)
    {
      state.minutes = state.isSession ? 25 : 5;
      state.seconds = 0;
      state.isActive = false;
    },
    toggleTimer(state, action)
    {
      state.isSession = action.payload  
      state.minutes = action.payload ? 25 : 5;
    },
    tick(state)
    {
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          state.isSession = !state.isSession;
          state.minutes = state.isSession ? 25 : 5; // Reset to 25 minutes for session and 5 for break
        } else {
          state.minutes -= 1;
          state.seconds = 59;
        }
      } else {
        state.seconds -= 1;
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer, toggleTimer, tick } = timerSlice.actions;

export default timerSlice.reducer;
