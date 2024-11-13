import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

const UserTable = () => {
  const location = useLocation();
  const admin = location.state?.userData;
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/user/allUsers')
      .then(response => response.data)
      .then(data => setUsers(data))
      .catch(error => console.error(error)); // Catch any errors
  }, []);

  const handleDeleteUser = (userId) => {
    // Add logic to delete the user with the given ID
    console.log(`Delete user with ID: ${userId}`);
    // You can make an API call to delete the user or use a delete function from your database
  };

  return (
   <div style={{ backgroundImage: 'url(/login3.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',height:'750px' }}>
    <AdminNavBar />
    <div className="container">
      <h2 style={{textAlign:'center'}}>Consumer Table</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by username" />
        </div>
        
      </div>
      <div style={{maxHeight:'550px', overflowY:'auto'}}>
      <table className="table table-striped">
        <thead style={{position:'static', zIndex:'1', top:'0'}}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>View</th>
            
          </tr>
        </thead>
        <tbody>
  {users.filter(user => user.email?.includes(searchText)).map(user => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`/user/${user.id}`} state={{ user, userData: admin }} className="btn btn-primary">View</Link>
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

export default UserTable;