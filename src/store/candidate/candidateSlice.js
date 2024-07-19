import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCandidates = createAsyncThunk('candidate/fetchCandidates', async () => {
    const response = await axios.get('/api/candidates');
    return response.data;
});

export const fetchCandidateById = createAsyncThunk('candidate/fetchCandidateById', async (id) => {
    const response = await axios.get(`/api/candidates/${id}`);
    return response.data;
});

export const createCandidate = createAsyncThunk('candidate/createCandidate', async (candidate) => {
    const response = await axios.post('/api/candidates', candidate);
    return response.data;
});

export const updateCandidate = createAsyncThunk('candidate/updateCandidate', async ({ id, ...candidate }) => {
    const response = await axios.put(`/api/candidates/${id}`, candidate);
    return response.data;
});

export const deleteCandidate = createAsyncThunk('candidate/deleteCandidate', async (id) => {
    await axios.delete(`/api/candidates/${id}`);
    return id;
});

const candidateSlice = createSlice({
    name: 'candidate',
    initialState: {
        candidates: [],
        currentCandidate: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCandidates.fulfilled, (state, action) => {
                state.candidates = action.payload;
            })
            .addCase(fetchCandidateById.fulfilled, (state, action) => {
                state.currentCandidate = action.payload;
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.candidates.push(action.payload);
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                const index = state.candidates.findIndex((candidate) => candidate.id === action.payload.id);
                state.candidates[index] = action.payload;
            })
            .addCase(deleteCandidate.fulfilled, (state, action) => {
                state.candidates = state.candidates.filter((candidate) => candidate.id !== action.payload);
            });
    },
});

export default candidateSlice.reducer;
