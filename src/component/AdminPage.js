import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

const AdminPage = () => {
  const location = useLocation();
  const admin = location.state?.userData;

  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/user/allUsers')
      .then(response => response.data)
      .then(data => setUsers(data));

    axios.get('http://localhost:8080/user/allworkers')
      .then(response => response.data)
      .then(data => setWorkers(data));
  }, []);
  return (
    <div style={{ backgroundImage: 'url(/login3.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',height:'750px' }}>
      <AdminNavBar></AdminNavBar>
     
      <div className="container">
        <h2 style={{textAlign:'center'}}>Worker Profile</h2>
        <div className="row mb-3">
          <div className="col-md-4">
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by pincode" />
          </div>
          <div className="col-md-4">
            <input type="text" value={filterText} onChange={(e) => setFilterText(e.target.value)} placeholder="Filter by field" />
          </div>
        </div>
        <div style={{maxHeight:'550px', overflowY:'auto'}}>
        <table className="table table-striped">
          <thead style={{position:'static', zIndex:'1', top:'0'}}>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Pincode</th>
              <th>Field</th>
              <th>View</th>
              <th>Appointment</th>
            </tr>
          </thead>
          <tbody>
  {workers.filter(worker => worker.pincode !== null && worker.pincode.includes(searchText) && worker.field !== null && worker.field.includes(filterText)).map(worker => (
    <tr key={worker.id}>
      <td>{worker.name}</td>
      <td>{worker.phone}</td>
      <td>{worker.pincode}</td>
      <td>{worker.field}</td>
      <td>
        <Link to={`/worker/admin/${worker.id}`} state={{ worker,userData:admin }} className="btn btn-primary">View</Link>
      </td>
      <td>
      <Link to={`/user/appointment/${worker.id}`} state={ {worker, userData:admin} }  className="btn btn-primary">Book Appointment</Link>
      </td>
    </tr>
  ))}
</tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;