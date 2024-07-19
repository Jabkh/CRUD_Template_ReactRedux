import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createAbsence, updateAbsence, fetchAbsenceById } from '../../store/absence/absenceSlice';

const AbsenceForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const absence = useSelector((state) => state.absence.currentAbsence);
    const [formData, setFormData] = useState({
        reason: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchAbsenceById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (absence) {
            setFormData(absence);
        }
    }, [absence]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateAbsence({ id, ...formData }));
        } else {
            dispatch(createAbsence(formData));
        }
        navigate('/absences');
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit' : 'Add'} Absence</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Reason</label>
                    <input type="text" name="reason" value={formData.reason} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AbsenceForm;
