import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavBar from './UserNavBar';
import AdminNavBar from './AdminNavBar';

const Appointment = () => {
  const location = useLocation();
  const user = location.state?.userData;
  const worker = location.state.worker;
  const admin = location.state?.userData;
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address || '');
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleBookAppointment = async (e) => {
    e.preventDefault();
  
    const appointmentDetails = {
     
      address: address,
      pincode: pincode,
      date: appointmentDate,
      user: { id: user.id },
      worker: { id: worker.id },
    };
  
    try {
      const response = await axios.post('http://localhost:8080/appointment/add', appointmentDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Appointment Booked successfully !!!');
      if (user.role === 'USER') {
        navigate('/user/userpage', { state: { userData: user } });
      } else {
        navigate('/admin/adminpage', { state: { userData: admin } });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div style={{ backgroundImage: 'url(/login3.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '740px' }}>
      <div>
        {user.role === 'ADMIN' ? <AdminNavBar /> : <UserNavBar />}
      </div>

      <div className="container mt-5">
        <h1 className="text-center mb-4">Appointment Booking</h1>
        <form onSubmit={handleBookAppointment} className="mx-auto p-4 shadow-lg rounded" style={{ maxWidth: '500px', backgroundColor: '#f8f9fa' }}>
          <div className="mb-3">
            <label htmlFor="workerName" className="form-label">
              Worker Name:
            </label>
            <input
              type="text"
              id="workerName"
              name="workerName"
              value={worker.name}
              className="form-control"
              placeholder="Enter worker name"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="workerField" className="form-label">
              Worker Field:
            </label>
            <input
              type="text"
              id="workerField"
              name="workerField"
              value={worker.field}
              className="form-control"
              placeholder="Enter worker field"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="visitingCharge" className="form-label">
              Visiting Charge:
            </label>
            <input
              type="text"
              id="visitingCharge"
              name="visitingCharge"
              value={worker.vcharge}
              className="form-control"
              placeholder="Enter visiting charge"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Consumer's Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Enter Address"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">
              Consumer's PinCode:
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="form-control"
              placeholder="Enter Pincode"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="appointmentDate" className="form-label">
              Appointment Date:
            </label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="form-control"
              placeholder="Select Appointment Date"
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
