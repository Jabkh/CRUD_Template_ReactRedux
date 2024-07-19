import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAbsences = createAsyncThunk('absence/fetchAbsences', async () => {
    const response = await axios.get('/api/absences');
    return response.data;
});

export const fetchAbsenceById = createAsyncThunk('absence/fetchAbsenceById', async (id) => {
    const response = await axios.get(`/api/absences/${id}`);
    return response.data;
});

export const createAbsence = createAsyncThunk('absence/createAbsence', async (absence) => {
    const response = await axios.post('/api/absences', absence);
    return response.data;
});

export const updateAbsence = createAsyncThunk('absence/updateAbsence', async ({ id, ...absence }) => {
    const response = await axios.put(`/api/absences/${id}`, absence);
    return response.data;
});

export const deleteAbsence = createAsyncThunk('absence/deleteAbsence', async (id) => {
    await axios.delete(`/api/absences/${id}`);
    return id;
});

const absenceSlice = createSlice({
    name: 'absence',
    initialState: {
        absences: [],
        currentAbsence: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAbsences.fulfilled, (state, action) => {
                state.absences = action.payload;
            })
            .addCase(fetchAbsenceById.fulfilled, (state, action) => {
                state.currentAbsence = action.payload;
            })
            .addCase(createAbsence.fulfilled, (state, action) => {
                state.absences.push(action.payload);
            })
            .addCase(updateAbsence.fulfilled, (state, action) => {
                const index = state.absences.findIndex(absence => absence.id === action.payload.id);
                state.absences[index] = action.payload;
            })
            .addCase(deleteAbsence.fulfilled, (state, action) => {
                state.absences = state.absences.filter(absence => absence.id !== action.payload);
            });
    },
});

export default absenceSlice.reducer;
