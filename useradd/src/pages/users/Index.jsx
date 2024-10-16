import React, { useState, useEffect } from 'react';
import '../Styles/Tasks.css';
import { Link } from 'react-router-dom';

const Tasks = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch('https://aliakbar-fake-api.netlify.app/.netlify/functions/server/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="content">
        <section className="main-header grid">
          <h1>Users</h1>
          <button className="button">
            <i className="fa-solid fa-plus"></i>
            <Link to="/new-user" className="button">
              <i className="fa-solid fa-plus"></i>
              <span>Add new user</span>
            </Link>      
                </button>
        </section>

        <section className="table-header grid">



        </section>

        <div className="card">
          <table>
            <thead>
              <tr>
              
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.id} className="selected">
                  
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="table-footer grid">
          <span>Displaying 1-10 of {users.length} items</span>
          <div className="paging grid">
            <span>
              Page
              <input type="number" value="1" readOnly />
              of {Math.ceil(users.length / 10)}
            </span>
            <div className="button icon">
              <i className="fa-solid fa-angle-left"></i>
            </div>
            <div className="button icon">
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Tasks;
