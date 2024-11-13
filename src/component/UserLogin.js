import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';

const UserLogin = () => {
  const location = useLocation();
  const user = location.state?.userData;
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/user/allworkers')
      .then(response => response.data)
      .then(data => setWorkers(data));
  }, []);

  return (
    <div  style={{ backgroundImage: 'url(/login.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',height:'750px' }}>
      <UserNavBar />
      <div className="container">
        <h2 style={{textAlign:'center',color:'black'}}>Worker's Details</h2>
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
          <thead style={{position:"static", zIndex:'1', top:'0'}}>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Visiting-Charge</th>
              <th>Pincode</th>
              <th>Field</th>
              <th>View</th>
              <th>Appointment</th>
            </tr>
          </thead>
          <tbody>
            {workers.filter(worker => worker.pincode.includes(searchText) && worker.field.includes(filterText)).map(worker => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.phone}</td>
                <td>{worker.vcharge}</td>
                <td>{worker.pincode}</td>
                <td>{worker.field}</td>
                <td>
                <Link to={`/worker/${worker.id}`} state={{ worker, userData:user } }   className="btn btn-primary">View</Link>
                </td>
                <td>
                <Link to={`/user/appointment/${worker.id}`} state={ {worker, userData:user} }  className="btn btn-primary">Book Appointment</Link>
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

export default UserLogin;
