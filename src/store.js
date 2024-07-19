import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './store/employee/employeeSlice';
import candidateReducer from './store/candidate/candidateSlice';
import absenceReducer from './store/absence/absenceSlice';
import vacationReducer from './store/vacation/vacationSlice';
import authReducer from './store/auth/authSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    candidate: candidateReducer,
    absence: absenceReducer,
    vacation: vacationReducer,
    auth: authReducer
  },
});
