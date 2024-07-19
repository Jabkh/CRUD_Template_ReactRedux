import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import { createCandidate, updateCandidate, fetchCandidateById } from '../../store/candidate/candidateSlice';

const CandidateForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const candidate = useSelector((state) => state.candidate.currentCandidate);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        // Add other fields as needed
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchCandidateById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (candidate) {
            setFormData(candidate);
        }
    }, [candidate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateCandidate({ id, ...formData }));
        } else {
            dispatch(createCandidate(formData));
        }
        navigate('/candidates');
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit' : 'Add'} Candidate</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CandidateForm;
