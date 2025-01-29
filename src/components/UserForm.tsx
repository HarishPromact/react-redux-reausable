import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux';
// Adjust this import path as needed
import { createUser, deleteUser, selectUser, updateUser } from '../redux/slices/user/userSlice';
import { User } from '../redux/slices/genericSlice';

const UserComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.items);
  const selectedUser = useAppSelector((state) => state.user.selectedItem);

  const addUser = () => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: '',
      mobileNumber: '',
    };
    dispatch(createUser(newUser));
  };

  const handleUpdateUser = (user: User) => {
    dispatch(updateUser(user));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleSelectUser = (id: string) => {
    dispatch(selectUser(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={addUser}
      >
        Add User
      </button>
      <ul className="space-y-4">
        {users.map((user: User) => (
          <li key={user.id} className="flex items-center space-x-4">
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleUpdateUser({ ...user, name: e.target.value })}
              placeholder="Name"
              className="border rounded px-2 py-1"
            />
            <input
              type="text"
              value={user.mobileNumber}
              onChange={(e) => handleUpdateUser({ ...user, mobileNumber: e.target.value })}
              placeholder="Mobile Number"
              className="border rounded px-2 py-1"
            />
            <button 
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => handleSelectUser(user.id)}
            >
              Select
            </button>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {selectedUser && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Selected User</h2>
          <p>Name: {selectedUser.name}</p>
          <p>Mobile: {selectedUser.mobileNumber}</p>
        </div>
      )}
    </div>
  );
};

export default UserComponent;