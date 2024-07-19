import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../../store/employee/employeeSlice.js';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const employeeStatus = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <div>
      <h2>Employees</h2>
      {employeeStatus === 'loading' && <div>Loading...</div>}
      {employeeStatus === 'failed' && <div>{error}</div>}
      {employeeStatus === 'succeeded' && (
        <ul className="list-group">
          {employees.map((employee) => (
            <li key={employee.id} className="list-group-item">
              {employee.name} | {employee.occupation} | {employee.email} | {employee.phone} | {employee.address} | {employee.birthDate} | {employee.contractStart} | {employee.contractEnd} | {employee.salary} | {employee.observation}
              <div className="float-end">
                <Link to={`/employees/${employee.id}`} className="btn btn-primary btn-sm me-2">View</Link>
                <Link to={`/employees/${employee.id}/edit`} className="btn btn-secondary btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(employee.id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
