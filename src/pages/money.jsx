import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageFunds = () => {
  const [pulledMoney, setPulledMoney] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    total_money: '',
    pulled_money: '',
  });

  // Base API URL - adjust this to match your backend
  const API_BASE_URL = 'https://joy-shiiiii-backend.onrender.com/'; //

  useEffect(() => {
    fetchPulledMoney();
  }, []);

  const fetchPulledMoney = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pulled-money`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPulledMoney(response.data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    // Validate inputs
    if (!formData.total_money || !formData.pulled_money) {
      setError('Both fields are required');
      return;
    }

    const totalMoney = parseFloat(formData.total_money);
    const pulledAmount = parseFloat(formData.pulled_money);

    if (isNaN(totalMoney) || isNaN(pulledAmount)) {
      setError('Please enter valid numbers');
      return;
    }

    if (pulledAmount > totalMoney) {
      setError('Pulled amount cannot exceed total money');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/pulled-money`,
        {
          total_money: totalMoney,
          pulled_money: pulledAmount,
          total_left: totalMoney - pulledAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage('Record added successfully!');
      setFormData({
        total_money: '',
        pulled_money: '',
      });
      await fetchPulledMoney();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        'Failed to create record. Please try again.'
      );
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Pulled Money</h1>
      <h2 className="text-xl mb-6 text-center">Money Pulled by gasman from TILL</h2>

      {/* Add New Record Form */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-center">Add New Pulled Money Record</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Total Money in TILL</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                value={formData.total_money}
                onChange={(e) => setFormData({...formData, total_money: e.target.value})}
                placeholder="Enter total amount"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Amount Pulled</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                value={formData.pulled_money}
                onChange={(e) => setFormData({...formData, pulled_money: e.target.value})}
                placeholder="Enter pulled amount"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>

      {/* Records Table */}
      {pulledMoney.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border text-left">ID</th>
                <th className="p-3 border text-left">Date</th>
                <th className="p-3 border text-left">Total Money</th>
                <th className="p-3 border text-left">Pulled Money</th>
                <th className="p-3 border text-left">Total Left</th>
              </tr>
            </thead>
            <tbody>
              {pulledMoney.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{record.id}</td>
                  <td className="p-3 border">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="p-3 border">{Number(record.total_money).toFixed(2)}</td>
                  <td className="p-3 border">{Number(record.pulled_money).toFixed(2)}</td>
                  <td className="p-3 border">{Number(record.total_left).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          No pulled money records found
        </div>
      )}
    </div>
  );
};

export default ManageFunds;