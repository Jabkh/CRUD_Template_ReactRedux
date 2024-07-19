import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../store/employee/employeeSlice';

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const employee = employees.find(emp => emp.id === parseInt(id));

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h1>Employee Details</h1>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Name:</strong> {employee.name}</li>
              <li className="list-group-item"><strong>Identification Number:</strong> {employee.identificationNumber}</li>
              <li className="list-group-item"><strong>Address:</strong> {employee.address}</li>
              <li className="list-group-item"><strong>Phone:</strong> {employee.phone}</li>
              <li className="list-group-item"><strong>Email:</strong> {employee.email}</li>
              <li className="list-group-item"><strong>Birth Date:</strong> {employee.birthDate}</li>
              <li className="list-group-item"><strong>Contract Start:</strong> {employee.contractStart}</li>
              <li className="list-group-item"><strong>Contract End:</strong> {employee.contractEnd}</li>
              <li className="list-group-item"><strong>Occupation:</strong> {employee.occupation}</li>
              <li className="list-group-item"><strong>Salary:</strong> {employee.salary}</li>
              <li className="list-group-item"><strong>Observation:</strong> {employee.observation}</li>
            </ul>
          </div>
          <div className="card-footer text-center">
            <Link to={`/employees/${employee.id}/edit`} className="btn btn-outline-primary">Edit</Link>
            <Link to={`/employees`} className="btn btn-outline-secondary">Go Back</Link>
          </div>
        </div>
      </div>
  );
};

export default EmployeeDetails;
