import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCandidateById } from '../../store/candidate/candidateSlice';

const CandidateDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const candidate = useSelector((state) => state.candidate.currentCandidate);

    useEffect(() => {
        dispatch(fetchCandidateById(id));
    }, [dispatch, id]);

    if (!candidate) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{candidate.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {candidate.email}</p>
                    <p className="card-text"><strong>Phone:</strong> {candidate.phone}</p>
                    {/* Add other fields as needed */}
                    <Link to={`/candidates/${candidate.id}/edit`} className="btn btn-primary">Edit</Link>
                </div>
            </div>
        </div>
    );
};

export default CandidateDetails;
