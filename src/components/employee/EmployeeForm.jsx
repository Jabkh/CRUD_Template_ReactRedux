import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, fetchEmployees } from '../../store/employee/employeeSlice.js';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    identificationNumber: '',
    address: '',
    phone: '',
    email: '',
    birthDate: '',
    contractStart: '',
    contractEnd: '',
    occupation: '',
    password: '',
    admin: false,
    salary: '',
    observation: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const employeeToEdit = id ? employees.find((emp) => emp.id === parseInt(id)) : null;

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEmployee({
      ...employee,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const employeeData = { ...employee, salary: parseFloat(employee.salary) };

    if (id) {
      dispatch(updateEmployee({ id: parseInt(id), employee: employeeData })).then(() => navigate('/employees'));
    } else {
      dispatch(addEmployee(employeeData)).then(() => navigate('/employees'));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{id ? 'Edit Employee' : 'Add New Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={employee.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="identificationNumber" className="form-label">Identification Number</label>
          <input type="text" className="form-control" id="identificationNumber" name="identificationNumber" value={employee.identificationNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={employee.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={employee.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={employee.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">Birth Date</label>
          <input type="date" className="form-control" id="birthDate" name="birthDate" value={employee.birthDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contractStart" className="form-label">Contract Start</label>
          <input type="date" className="form-control" id="contractStart" name="contractStart" value={employee.contractStart} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contractEnd" className="form-label">Contract End</label>
          <input type="date" className="form-control" id="contractEnd" name="contractEnd" value={employee.contractEnd} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="occupation" className="form-label">Occupation</label>
          <input type="text" className="form-control" id="occupation" name="occupation" value={employee.occupation} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={employee.password} onChange={handleChange} required />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="admin" name="admin" checked={employee.admin} onChange={handleChange} />
          <label className="form-check-label" htmlFor="admin">Admin</label>
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="number" className="form-control" id="salary" name="salary" value={employee.salary} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="observation" className="form-label">Observation</label>
          <textarea className="form-control" id="observation" name="observation" value={employee.observation} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
