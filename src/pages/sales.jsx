import { useState } from 'react';
import { useSales } from '../context/salesContext';

const SalesPage = () => {
  const {
    wholesaleSales = [],
    retailSales = [],
    loading,
    error,
    addWholesaleSale,
    addRetailSale,
    updateSaleStatus,
    deleteSale,
    fetchWholesaleSales,
    fetchRetailSales
  } = useSales();

  const [wholesaleForm, setWholesaleForm] = useState({
    gas_type: 'Pro',
    price: '',
    cylinders_sold: '',
    buyer_name: '',
    balance: '',
    status: 'Pending'
  });

  const [retailForm, setRetailForm] = useState({
    gas_type: 'Pro',
    price: '',
    cylinders_sold: '',
    buyer_name: '',
    balance: '',
    status: 'Pending'
  });

  const [editingSale, setEditingSale] = useState(null);
  const [saleType, setSaleType] = useState('');

  // Handle form submission for wholesale
  const handleWholesaleSubmit = async (e) => {
    e.preventDefault();
    try {
      const total = wholesaleForm.price * wholesaleForm.cylinders_sold;
      const saleData = { ...wholesaleForm, total };
      
      await addWholesaleSale(saleData);
      resetWholesaleForm();
      fetchWholesaleSales(); // Refresh data
    } catch (err) {
      console.error('Error saving wholesale sale:', err);
    }
  };

  // Handle form submission for retail
  const handleRetailSubmit = async (e) => {
    e.preventDefault();
    try {
      const total = retailForm.price * retailForm.cylinders_sold;
      const saleData = { ...retailForm, total };
      
      await addRetailSale(saleData);
      resetRetailForm();
      fetchRetailSales(); // Refresh data
    } catch (err) {
      console.error('Error saving retail sale:', err);
    }
  };

  // Edit sale handler
  const handleEditSale = (sale, type) => {
    setSaleType(type);
    setEditingSale(sale);
    const formData = {
      gas_type: sale.gas_type,
      price: sale.price,
      cylinders_sold: sale.cylinders_sold,
      buyer_name: sale.buyer_name,
      balance: sale.balance,
      status: sale.status
    };
    
    if (type === 'wholesale') {
      setWholesaleForm(formData);
    } else {
      setRetailForm(formData);
    }
  };

  // Reset forms
  const resetWholesaleForm = () => {
    setWholesaleForm({
      gas_type: 'Pro',
      price: '',
      quantity: '',
      buyer_name: '',
      balance: '',
      status: 'Pending'
    });
    setEditingSale(null);
  };

  const resetRetailForm = () => {
    setRetailForm({
      gas_type: 'Pro',
      price: '',
      quantity: '',
      buyer_name: '',
      balance: '',
      status: 'Pending'
    });
    setEditingSale(null);
  };

  // Mark as paid
  const handleMarkAsPaid = async (id, type) => {
    try {
      await updateSaleStatus(id, type);
      if (type === 'wholesale') {
        fetchWholesaleSales();
      } else {
        fetchRetailSales();
      }
    } catch (err) {
      console.error('Error updating sale status:', err);
    }
  };

  // Delete sale
  const handleDeleteSale = async (id, type) => {
    try {
      await deleteSale(id, type);
      if (type === 'wholesale') {
        fetchWholesaleSales();
      } else {
        fetchRetailSales();
      }
      if (editingSale?.id === id) {
        if (type === 'wholesale') resetWholesaleForm();
        else resetRetailForm();
      }
    } catch (err) {
      console.error('Error deleting sale:', err);
    }
  };

  // Pro
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sales Management</h1>

      {/* Wholesale Sales Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold bg-red-600 p-3 rounded-lg mb-6">Wholesale Sales</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-medium mb-4">Add Wholesale Sale</h3>
          <form onSubmit={handleWholesaleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gas Type</label>
              <select
                value={wholesaleForm.gas_type}
                onChange={(e) => setWholesaleForm({...wholesaleForm, gas_type: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Pro-gas">Pro</option>
                <option value="K-gas">K-gas</option>
                <option value="none">None</option>
                <option value="unknown">unknown</option>
                <option value="unknown">unknown</option>
                <option value="unknown">unknown</option>

              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                value={wholesaleForm.price}
                onChange={(e) => setWholesaleForm({...wholesaleForm, price: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={wholesaleForm.cylinders_sold}
                onChange={(e) => setWholesaleForm({...wholesaleForm, cylinders_sold: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Name</label>
              <input
                type="text"
                value={wholesaleForm.buyer_name}
                onChange={(e) => setWholesaleForm({...wholesaleForm, buyer_name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
              <input
                type="number"
                value={wholesaleForm.balance}
                onChange={(e) => setWholesaleForm({...wholesaleForm, balance: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={wholesaleForm.status}
                onChange={(e) => setWholesaleForm({...wholesaleForm, status: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add Wholesale Sale
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto">
          <h3 className="text-xl font-medium mb-4">Wholesale Sales Records</h3>
          {Array.isArray(wholesaleSales) && wholesaleSales.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID/no.</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Gas Type</th>
                  <th className="py-2 px-4 border">Price</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Total</th>
                  <th className="py-2 px-4 border">Buyer</th>
                  <th className="py-2 px-4 border">Balance</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wholesaleSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{sale.id}</td>
                    <td className="py-2 px-4 border">{new Date(sale.date_sold).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border">{sale.gas_type}</td>
                    <td className="py-2 px-4 border">{sale.price}</td>
                    <td className="py-2 px-4 border">{sale.cylinders_sold}</td>
                    <td className="py-2 px-4 border">{sale.total}</td>
                    <td className="py-2 px-4 border">{sale.buyer_name}</td>
                    <td className="py-2 px-4 border">{sale.balance}</td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded-full text-xs ${sale.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSale(sale, 'wholesale')}
                          className="bg-yellow-600 text-white px-2 py-1 rounded-md text-sm hover:bg-yellow-700"
                        >
                          Edit
                        </button>
                        {sale.status === 'Pending' && (
                          <button
                            onClick={() => handleMarkAsPaid(sale.id, 'wholesale')}
                            className="bg-green-600 text-white px-2 py-1 rounded-md text-sm hover:bg-green-700"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSale(sale.id, 'wholesale')}
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
            <div className="text-center py-4 text-gray-500">No wholesale sales records found</div>
          )}
        </div>
      </section>

      {/* Retail Sales Section */}
      <section>
        <h2 className="text-2xl font-semibold bg-red-600 p-3 rounded-lg mb-6">Retail Sales</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-medium mb-4">Add Retail Sale</h3>
          <form onSubmit={handleRetailSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gas Type</label>
              <select
                value={retailForm.gas_type}
                onChange={(e) => setRetailForm({...retailForm, gas_type: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="progas">Pro-gas</option>
                <option value="k">K-gas</option>
                <option value="others">Others</option>
                <option value="unknown">Unknown</option>

              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                value={retailForm.price}
                onChange={(e) => setRetailForm({...retailForm, price: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={retailForm.cylinders_sold}
                onChange={(e) => setRetailForm({...retailForm, cylinders_sold: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Name</label>
              <input
                type="text"
                value={retailForm.buyer_name}
                onChange={(e) => setRetailForm({...retailForm, buyer_name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
              <input
                type="number"
                value={retailForm.balance}
                onChange={(e) => setRetailForm({...retailForm, balance: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={retailForm.status}
                onChange={(e) => setRetailForm({...retailForm, status: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add Retail Sale
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto">
          <h3 className="text-xl font-medium mb-4">Retail Sales Records</h3>
          {Array.isArray(retailSales) && retailSales.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Gas Type</th>
                  <th className="py-2 px-4 border">Price</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Total</th>
                  <th className="py-2 px-4 border">Buyer</th>
                  <th className="py-2 px-4 border">Balance</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {retailSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{sale.id}</td>
                    <td className="py-2 px-4 border">{new Date(sale.date_sold).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border">{sale.gas_type}</td>
                    <td className="py-2 px-4 border">{sale.price}</td>
                    <td className="py-2 px-4 border">{sale.cylinders_sold}</td>
                    <td className="py-2 px-4 border">{sale.total}</td>
                    <td className="py-2 px-4 border">{sale.buyer_name}</td>
                    <td className="py-2 px-4 border">{sale.balance}</td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded-full text-xs ${sale.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSale(sale, 'retail')}
                          className="bg-yellow-600 text-white px-2 py-1 rounded-md text-sm hover:bg-yellow-700"
                        >
                          Edit
                        </button>
                        {sale.status === 'Pending' && (
                          <button
                            onClick={() => handleMarkAsPaid(sale.id, 'retail')}
                            className="bg-green-600 text-white px-2 py-1 rounded-md text-sm hover:bg-green-700"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSale(sale.id, 'retail')}
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
            <div className="text-center py-4 text-gray-500">No retail sales records found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SalesPage;