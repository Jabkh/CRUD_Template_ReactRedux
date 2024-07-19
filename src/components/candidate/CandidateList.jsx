import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidates, deleteCandidate } from '../../store/candidate/candidateSlice';
import { Link } from 'react-router-dom';

const CandidateList = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state) => state.candidate.candidates);

    useEffect(() => {
        dispatch(fetchCandidates());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCandidate(id));
    };

    return (
        <div className="container">
            <h1>Candidate List</h1>
            <Link to="/candidates/new" className="btn btn-primary mb-3">Add Candidate</Link>
            <ul className="list-group">
                {candidates.map((candidate) => (
                    <li key={candidate.id} className="list-group-item">
                        {candidate.name}
                        <Link to={`/candidates/${candidate.id}`} className="btn btn-info ml-3">View</Link>
                        <button onClick={() => handleDelete(candidate.id)} className="btn btn-danger ml-3">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateList;
