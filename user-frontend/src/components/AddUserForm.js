// src/components/AddUserForm.js
import React, { useState } from 'react';

function AddUserForm({ onAddUser }) {
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission page reload
        onAddUser(name);
        setName(''); // Clear the input field after submission
    };

    return (
        <div>
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter user name"
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default AddUserForm;