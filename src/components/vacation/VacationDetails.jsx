import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchVacationById } from '../../store/vacation/vacationSlice';

const VacationDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const vacation = useSelector((state) => state.vacation.currentVacation);

    useEffect(() => {
        dispatch(fetchVacationById(id));
    }, [dispatch, id]);

    if (!vacation) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="card">

                <div className="card-body">
                    <h5 className="card-title">Destination: {vacation.destination}</h5>
                    <p className="card-text"><strong>Start Date:</strong> {vacation.startDate}</p>
                    <p className="card-text"><strong>End Date:</strong> {vacation.endDate}</p>
                    <Link to={`/vacations/${vacation.id}/edit`} className="btn btn-primary">Edit</Link>
                </div>
            </div>
        </div>
    );
};

export default VacationDetails;
