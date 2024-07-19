import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacations, deleteVacation } from '../../store/vacation/vacationSlice';
import { Link } from 'react-router-dom';

const VacationList = () => {
    const dispatch = useDispatch();
    const vacations = useSelector((state) => state.vacation.vacations);

    useEffect(() => {
        dispatch(fetchVacations());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteVacation(id));
    };

    return (
        <div className="container">
            <h1>Vacation List</h1>
            <Link to="/vacations/new" className="btn btn-primary mb-3">Add Vacation</Link>
            <ul className="list-group">
                {vacations.map((vacation) => (
                    <li key={vacation.id} className="list-group-item">
                        {vacation.destination}
                        <Link to={`/vacations/${vacation.id}`} className="btn btn-info ml-3">View</Link>
                        <button onClick={() => handleDelete(vacation.id)} className="btn btn-danger ml-3">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VacationList;
