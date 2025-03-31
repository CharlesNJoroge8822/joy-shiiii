import { useState } from 'react';
import { useStock } from '../context/stockContext';

const StockPage = () => {
  const {
    stock = [],
    loading,
    error,
    addStock,
    updateStock,
    deleteStock,
    fetchStock
  } = useStock();

  const [formData, setFormData] = useState({
    gas_type: 'Pro',
    quantity: ''
  });

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStock(editingId, formData);
      } else {
        await addStock(formData);
      }
      resetForm();
      fetchStock(); // Refresh the stock data
    } catch (err) {
      console.error('Error saving stock:', err);
    }
  };

  const handleEdit = (stockItem) => {
    setFormData({
      gas_type: stockItem.gas_type,
      quantity: stockItem.quantity
    });
    setEditingId(stockItem.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      if (editingId === id) {
        resetForm();
      }
      fetchStock(); // Refresh the stock data
    } catch (err) {
      console.error('Error deleting stock:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      gas_type: 'Pro',
      quantity: ''
    });
    setEditingId(null);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Stock Management</h1>

      {/* Stock Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-medium mb-4">
          {editingId ? 'Edit Stock Record' : 'Add New Stock'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gas Type</label>
            <select
              value={formData.gas_type}
              onChange={(e) => setFormData({...formData, gas_type: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="K-gas">K-gas</option>
              <option value="Pro">Pro-gas</option>
              <option value="Afri">Afri</option>
              <option value="others">Others</option>
              <option value="others">others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="md:col-span-2 flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Update Stock' : 'Add Stock'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-medium mb-4">Current Stock</h2>
        {Array.isArray(stock) && stock.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Gas Type</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Date Received</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{item.id}</td>
                  <td className="py-2 px-4 border">{item.gas_type}</td>
                  <td className="py-2 px-4 border">{item.quantity}</td>
                  <td className="py-2 px-4 border">
                    {new Date(item.date_received).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-600 text-white px-2 py-1 rounded-md text-sm hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded-md text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No stock records found. Add your first stock item above.
          </div>
        )}
     </div>

    
    </div>
    
    
  );
};

export default StockPage;