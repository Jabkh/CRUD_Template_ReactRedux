import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import EmployeeList from '../components/employee/EmployeeList.jsx';
import EmployeeForm from '../components/employee/EmployeeForm.jsx';
import EmployeeDetails from '../components/employee/EmployeeDetails.jsx';
import CandidateList from '../components/candidate/CandidateList.jsx';
import CandidateForm from '../components/candidate/CandidateForm.jsx';
import CandidateDetails from '../components/candidate/CandidateDetails.jsx';
import AbsenceList from '../components/absence/AbsenceList.jsx';
import AbsenceForm from '../components/absence/AbsenceForm.jsx';
import AbsenceDetails from '../components/absence/AbsenceDetails.jsx';
import VacationList from '../components/vacation/VacationList.jsx';
import VacationForm from '../components/vacation/VacationForm.jsx';
import VacationDetails from '../components/vacation/VacationDetails.jsx';
import Login from "../components/auth/Login.jsx";
import Register from "../components/auth/Register.jsx";
import PrivateRoute from './PrivateRoute.jsx';


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route index element={<EmployeeList />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="employees" element={<EmployeeList />} />
                        <Route path="employees/new" element={<EmployeeForm />} />
                        <Route path="employees/:id" element={<EmployeeDetails />} />
                        <Route path="employees/:id/edit" element={<EmployeeForm />} />
                        <Route path="/candidates" element={<CandidateList />} />
                        <Route path="/candidates/new" element={<CandidateForm />} />
                        <Route path="/candidates/:id/edit" element={<CandidateForm />} />
                        <Route path="/candidates/:id" element={<CandidateDetails />} />
                        <Route path="/absences" element={<AbsenceList />} />
                        <Route path="/absences/new" element={<AbsenceForm />} />
                        <Route path="/absences/:id/edit" element={<AbsenceForm />} />
                        <Route path="/absences/:id" element={<AbsenceDetails />} />
                        <Route path="/vacations" element={<VacationList />} />
                        <Route path="/vacations/new" element={<VacationForm />} />
                        <Route path="/vacations/:id/edit" element={<VacationForm />} />
                        <Route path="/vacations/:id" element={<VacationDetails />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
