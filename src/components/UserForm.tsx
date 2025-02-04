import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import {
  createUser,
  deleteUser,
  selectUser,
  updateUser,
} from "../redux/slices/user/userSlice";
import { User } from "../models/global";
import "../App.css";

export default function UserComponent () {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.items);
  const selectedUser = useAppSelector((state) => state.user.selectedItem);

  /**
   * This function is used to add a new user
   */
  const addUser = useCallback(() => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: "",
      mobileNumber: "",
    };
    dispatch(createUser(newUser));
  }, [dispatch]);

  /**
   * This function is used to update an existing user
   */
  const handleUpdateUser = useCallback(
    (updatedUser: User) => {
      const existingUser = users.find((user) => user.id === updatedUser.id);
      if (
        existingUser &&
        (existingUser.name !== updatedUser.name ||
          existingUser.mobileNumber !== updatedUser.mobileNumber)
      ) {
        dispatch(updateUser(updatedUser));
      }
    },
    [dispatch, users]
  );

  /**
   * This function is used to delete an existing user
   */
  const handleDeleteUser = useCallback(
    (id: string) => {
      if (selectedUser?.id === id) {
        dispatch(selectUser(''));
      }
      dispatch(deleteUser(id));
    },
    [dispatch, selectedUser]
  );

  const handleSelectUser = useCallback(
    (id: string) => {
      dispatch(selectUser(id));
    },
    [dispatch]
  );

  /**
   * This function is used to validate user input
   * @param value user input
   * @param type input type
   * @returns boolean value
   */
  const validateInput = (value: string, type: string) => {
    if (type === "mobileNumber") {
      return /^\d*$/.test(value);
    }
    return true;
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
      <div>
        {users.map((user: User) => (
          <div key={user.id} className="flex items-center space-x-4">
            <div className="flex-container counter-value">
              <div className="flex-container">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    validateInput(e.target.value, "name") &&
                    handleUpdateUser({ ...user, name: e.target.value })
                  }
                  placeholder="Name"
                  className="border rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={user.mobileNumber}
                  onChange={(e) =>
                    validateInput(e.target.value, "mobileNumber") &&
                    handleUpdateUser({
                      ...user,
                      mobileNumber: e.target.value,
                    })
                  }
                  placeholder="Mobile Number"
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="flex-container">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleSelectUser(user.id)}
                  aria-label={`Select user ${user.name}`}
                >
                  Select
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDeleteUser(user.id)}
                  aria-label={`Delete user ${user.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

