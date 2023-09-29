import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { api } from '../services/apiClient';

const EditUserModal = ({ isOpen, onClose, userData }) => {
  const [name, setName] = useState('');
  const [roles, setRoles] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Set the initial data when userData changes
    if (userData) {
      setName(userData.name);
      setRoles(userData.roles.join(', ')); // Convert roles array to string
      setEmail(userData.email);
    }
  }, [userData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRolesChange = (event) => {
    setRoles(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await api.patch(`/editUser/${userData.id}`, {
        name,
        email,
        roles: roles.split(',').map((role) => role.trim()), // Convert roles string to an array
      });

      console.log('User data updated successfully:', response.data);

      // Update the local user data with the updated values
      const updatedUserData = {
        ...userData,
        name,
        email,
        roles: roles.split(',').map((role) => role.trim()), // Convert roles string to an array
      };

      // Call a function to update the user data in your parent component
      // For example: updateUserData(updatedUserData);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle any errors, e.g., display an error message
    }
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <h2>Edit User</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={handleEmailChange} />

        <label htmlFor="roles">Roles:</label>
        <input type="text" id="roles" value={roles} onChange={handleRolesChange} />
      </form>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </ReactModal>
  );
};

export default EditUserModal;
