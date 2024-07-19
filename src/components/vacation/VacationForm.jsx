import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import { createVacation, updateVacation, fetchVacationById } from '../../store/vacation/vacationSlice';

const VacationForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const vacation = useSelector((state) => state.vacation.currentVacation);
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchVacationById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (vacation) {
            setFormData(vacation);
        }
    }, [vacation]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateVacation({ id, ...formData }));
        } else {
            dispatch(createVacation(formData));
        }
        navigate('/vacations');
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit' : 'Add'} Vacation</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Destination</label>
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} className="form-control" />
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

export default VacationForm;
