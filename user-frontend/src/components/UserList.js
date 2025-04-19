// src/components/UserList.js
import React from 'react';

function UserList({ users }) {
    return (
        <div>
            <h2>User List</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map(user => (
                        // Assuming your User object has 'id' and 'name' fields
                        <li key={user.id}>
                            ID: {user.id}, Name: {user.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserList;