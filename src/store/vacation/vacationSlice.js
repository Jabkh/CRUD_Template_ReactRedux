import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVacations = createAsyncThunk('vacation/fetchVacations', async () => {
    const response = await axios.get('/api/vacations');
    return response.data;
});

export const fetchVacationById = createAsyncThunk('vacation/fetchVacationById', async (id) => {
    const response = await axios.get(`/api/vacations/${id}`);
    return response.data;
});

export const createVacation = createAsyncThunk('vacation/createVacation', async (vacation) => {
    const response = await axios.post('/api/vacations', vacation);
    return response.data;
});

export const updateVacation = createAsyncThunk('vacation/updateVacation', async ({ id, ...vacation }) => {
    const response = await axios.put(`/api/vacations/${id}`, vacation);
    return response.data;
});

export const deleteVacation = createAsyncThunk('vacation/deleteVacation', async (id) => {
    await axios.delete(`/api/vacations/${id}`);
    return id;
});

const vacationSlice = createSlice({
    name: 'vacation',
    initialState: {
        vacations: [],
        currentVacation: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacations.fulfilled, (state, action) => {
                state.vacations = action.payload;
            })
            .addCase(fetchVacationById.fulfilled, (state, action) => {
                state.currentVacation = action.payload;
            })
            .addCase(createVacation.fulfilled, (state, action) => {
                state.vacations.push(action.payload);
            })
            .addCase(updateVacation.fulfilled, (state, action) => {
                const index = state.vacations.findIndex(vacation => vacation.id === action.payload.id);
                state.vacations[index] = action.payload;
            })
            .addCase(deleteVacation.fulfilled, (state, action) => {
                state.vacations = state.vacations.filter(vacation => vacation.id !== action.payload);
            });
    },
});

export default vacationSlice.reducer;
