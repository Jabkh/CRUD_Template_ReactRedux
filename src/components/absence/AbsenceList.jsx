import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAbsences } from '../../store/absence/absenceSlice';

const AbsenceList = () => {
    const dispatch = useDispatch();
    const { absences, loading, error } = useSelector((state) => state.absence);

    useEffect(() => {
        dispatch(fetchAbsences());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Absence List</h2>
            <Link to="/absences/new" className="btn btn-primary mb-3">Add Absence</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {absences.map((absence) => (
                    <tr key={absence.id}>
                        <td>{absence.employee.name}</td>
                        <td>{absence.startDate}</td>
                        <td>{absence.endDate}</td>
                        <td>
                            <Link to={`/absences/${absence.id}`} className="btn btn-info">Details</Link>
                            <Link to={`/absences/${absence.id}/edit`} className="btn btn-warning">Edit</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AbsenceList;
