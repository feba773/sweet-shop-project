// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { purchaseSweet } from '../api/sweets';
import SearchFilter from '../components/SearchFilter'; // Import the search component

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const HomePage = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Refactored function to handle both initial fetch and searching
  const fetchSweets = async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      // Use the /sweets/search endpoint
      const response = await api.get('/sweets/search', { params });
      setSweets(response.data);
    } catch (err) {
      setError('Failed to fetch sweets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets(); // Initial fetch when component loads
  }, []);

  const handlePurchase = async (sweetId: string) => {
    if (!token) {
      alert('Please log in to purchase sweets.');
      return;
    }
    try {
      const response = await purchaseSweet(sweetId);
      setSweets(sweets.map(sweet =>
        sweet._id === sweetId ? response.data.sweet : sweet
      ));
      alert('Purchase successful!');
    } catch (err) {
      alert('Failed to purchase sweet. It might be out of stock.');
    }
  };

  if (loading) return <p>Loading sweets...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Our Sweets</h1>
      <SearchFilter onSearch={fetchSweets} /> {/* Add the SearchFilter component here */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {sweets.map((sweet) => (
          <div key={sweet._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '200px' }}>
            <h2>{sweet.name}</h2>
            <p><strong>Category:</strong> {sweet.category}</p>
            <p><strong>Price:</strong> ${sweet.price.toFixed(2)}</p>
            <p><strong>In Stock:</strong> {sweet.quantity}</p>
            <button
              onClick={() => handlePurchase(sweet._id)}
              disabled={sweet.quantity === 0}
            >
              {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;