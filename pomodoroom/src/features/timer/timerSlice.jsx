import { createSlice } from '@reduxjs/toolkit';

const pomodoroTime = 25;
const shortBreak = 5;
const longBreak = 15;

const initialState = {
  minutes: pomodoroTime,
  seconds: 0,
  isActive: false,
  mode: 'pomodoro', // Mode can be 'pomodoro', 'shortBreak', or 'longBreak'
  sessionCount: 0,
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
    // Reset the timer based on the current mode (Pomodoro, Short Break, Long Break)
    resetTimer(state)
    {
      switch (state.mode) {
        case 'pomodoro':
          state.minutes = pomodoroTime;
          break;
        case 'shortBreak':
          state.minutes = shortBreak;
          break;
        case 'longBreak':
          state.minutes = longBreak;
          break;
        default:
          state.minutes = pomodoroTime;
          break;
      }
      state.seconds = 0;
      state.isActive = false;
    },
    // Decrement the timer by one second
    tick(state)
    {
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          // When the timer reaches 0, switch between session modes
          if (state.mode === 'pomodoro') {
            state.sessionCount += 1; // Increment the session count when a Pomodoro ends
            if (state.sessionCount % 4 === 0) {
              state.mode = 'longBreak'; // After every 4 Pomodoro sessions, switch to Long Break
            } else {
              state.mode = 'shortBreak'; // Otherwise, switch to Short Break
            }
          } else if (state.mode === 'shortBreak') {
            state.mode = 'pomodoro'; // After Short Break, go back to Pomodoro
          } else if (state.mode === 'longBreak') {
            state.mode = 'pomodoro'; // After Long Break, go back to Pomodoro
          }
          state.minutes = state.mode === 'pomodoro' ? pomodoroTime 
                          : state.mode === 'shortBreak' ? shortBreak 
                          : longBreak;
        } else {
          state.minutes -= 1;
          state.seconds = 59;
        }
      } else {
        state.seconds -= 1;
      }
    },
    // Set the mode to Pomodoro, Short Break, or Long Break
    setMode(state, action)
    {
      state.mode = action.payload;
      switch (state.mode) {
        case 'pomodoro':
          state.minutes = pomodoroTime;
          break;
        case 'shortBreak':
          state.minutes = shortBreak;
          break;
        case 'longBreak':
          state.minutes = longBreak;
          break;
        default:
          state.minutes = pomodoroTime;
      }
      state.seconds = 0;
      state.isActive = false;
    },
  },
});

export const { startTimer, stopTimer, resetTimer, tick, setMode } = timerSlice.actions;

export default timerSlice.reducer;
