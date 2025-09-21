// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import api from '../api/api';

interface Sweet { _id: string; name: string; category: string; price: number; quantity: number; }

const AdminDashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const { data } = await api.get('/sweets');
        setSweets(data);
      } catch (error) {
        console.error("Failed to fetch sweets", error);
      }
    };
    fetchSweets();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await api.delete(`/sweets/${id}`);
        setSweets(sweets.filter(sweet => sweet._id !== id));
        alert('Sweet deleted successfully.');
      } catch (err) {
        alert('Failed to delete sweet. You must be an admin.');
      }
    }
  };

  return (
    <div>
      <h1>Admin Dashboard - Manage Sweets</h1>
      {/* You would add a form here for adding/updating sweets */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map(sweet => (
            <tr key={sweet._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{sweet.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{sweet.quantity}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button style={{ marginRight: '5px' }}>Edit</button> {/* This would open an update form */}
                <button onClick={() => handleDelete(sweet._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;