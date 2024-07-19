import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Employee Manager</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/employees">Employees</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employees/new">Add Employee</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/candidates">Candidates</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/candidates/new">Add Candidates</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vacations">Vacations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vacations/new">Add Vacations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/absences">Absences</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/absences/new">Add Absences</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
