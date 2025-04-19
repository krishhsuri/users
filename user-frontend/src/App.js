// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import './App.css';

const API_URL = 'http://localhost:30007/users';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      setError(null); // Clear previous errors
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Is the backend running?");
      setUsers([]); // Clear users on error
    }
  };

  // Function to add a new user
  const addUser = async (userName) => {
    if (!userName || userName.trim() === '') {
      alert('User name cannot be empty');
      return;
    }
    try {
      setError(null); // Clear previous errors
      const response = await axios.post(API_URL, { name: userName });
      // Add the new user to the list optimistically or refetch
      // setUsers([...users, response.data]); // Optimistic update
      fetchUsers(); // Refetch the list to ensure consistency
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user. Check backend and network.");
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  return (
      <div className="App">
        <h1>User Management</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <AddUserForm onAddUser={addUser} />
        <UserList users={users} />
        <button onClick={fetchUsers} style={{marginTop: '10px'}}>Refresh Users</button>
      </div>
  );
}

export default App;