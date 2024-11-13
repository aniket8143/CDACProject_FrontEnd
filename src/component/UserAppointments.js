import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import AdminNavBar from './AdminNavBar';

function UserAppointments() {
  const location = useLocation();
  const user = location.state?.userData;
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/appointment/u/${user.id}`)
      .then(response => {
        console.log('Appointments:', response.data); // Inspect the data structure
        // Assuming each appointment has a `date` field in ISO format or adjust accordingly
        const sortedAppointments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAppointments(sortedAppointments);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, [user.id]);

  const updateStatus = (appointmentId, status) => {
    axios.put(`http://localhost:8080/appointment/${appointmentId}/status?status=${status}`)
      .then(response => {
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === appointmentId
              ? { ...appointment, status: response.data.status }
              : appointment
          )
        );
      })
      .catch(error => console.error('Error updating status:', error));
  };

  return (
    <div style={{ backgroundImage: 'url(/login.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '750px' }}>
      <div>
        <div>
          {user.role === 'ADMIN' ? <AdminNavBar /> : <UserNavBar />}
        </div>
      </div>
      <h2 style={{ textAlign: 'center' }}>Your Appointments</h2>
      <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
        <table className="table table-striped" style={{ width: '90%', marginLeft: '5%' }}>
          <thead style={{ position: 'static', zIndex: '1', top: '0' }}>
            <tr>
              <th>Worker Name</th>
              <th>Worker Field</th>
              <th>Worker Phone</th>
              <th>Visiting Charge</th>
              <th>Address</th>
              <th>PinCode</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.worker?.name || 'N/A'}</td>
                  <td>{appointment.worker?.field || 'N/A'}</td>
                  <td>{appointment.worker?.phone || 'N/A'}</td>
                  <td>{appointment.worker?.vcharge || 'N/A'}</td>
                  <td>{appointment.address || 'N/A'}</td>
                  <td>{appointment.pincode || 'N/A'}</td>
                  <td>{appointment.status || 'N/A'}</td>
                  <td>
                    {(appointment.status === 'pending' || appointment.status === 'accepted') && (
                      <button
                        onClick={() => updateStatus(appointment.id, 'completed')}
                        className="btn btn-success"
                      >
                        Mark as Completed
                      </button>
                    )}
                    {appointment.status === 'completed' && (
                      <span>Appointment Completed</span>
                    )}
                    {appointment.status === 'denied' && (
                      <span>Appointment denied</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserAppointments;
