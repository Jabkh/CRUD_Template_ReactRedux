import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAbsenceById } from '../../store/absence/absenceSlice';

const AbsenceDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentAbsence: absence, loading, error } = useSelector((state) => state.absence);

    useEffect(() => {
        dispatch(fetchAbsenceById(id));
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!absence) {
        return <div>No absence found</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Reason: {absence.reason}</h5>
                    <p className="card-text"><strong>Start Date:</strong> {absence.startDate}</p>
                    <p className="card-text"><strong>End Date:</strong> {absence.endDate}</p>
                    <Link to={`/absences/${absence.id}/edit`} className="btn btn-primary">Edit</Link>
                </div>
            </div>
        </div>
    );
};

export default AbsenceDetails;
