import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [wholesaleSales, setWholesaleSales] = useState([]);
  const [retailSales, setRetailSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWholesaleSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://joy-shiiiii-backend.onrender.com/wholesale/all');
      setWholesaleSales(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRetailSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://joy-shiiiii-backend.onrender.com/retail/all');
      setRetailSales(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addWholesaleSale = async (saleData) => {
    try {
      const response = await axios.post('https://joy-shiiiii-backend.onrender.com/wholesale/add', saleData);
      setWholesaleSales(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const addRetailSale = async (saleData) => {
    try {
      const response = await axios.post('https://joy-shiiiii-backend.onrender.com/retail/add', saleData);
      setRetailSales(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateSaleStatus = async (saleId, type) => {
    try {
      const endpoint = type === 'wholesale' ? 'https://joy-shiiiii-backend.onrender.com/wholesale/update' : 'https://joy-shiiiii-backend.onrender.com/retail/update';
      await axios.put(`${endpoint}/${saleId}`, { status: 'Paid' });
      
      if (type === 'wholesale') {
        setWholesaleSales(prev => prev.map(sale => 
          sale.id === saleId ? { ...sale, status: 'Paid' } : sale
        ));
      } else {
        setRetailSales(prev => prev.map(sale => 
          sale.id === saleId ? { ...sale, status: 'Paid' } : sale
        ));
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteSale = async (saleId, type) => {
    try {
      const endpoint = type === 'wholesale' ? 'https://joy-shiiiii-backend.onrender.com/wholesale/delete' : 'https://joy-shiiiii-backend.onrender.com/retail/delete';
      await axios.delete(`${endpoint}/${saleId}`);
      
      if (type === 'wholesale') {
        setWholesaleSales(prev => prev.filter(sale => sale.id !== saleId));
      } else {
        setRetailSales(prev => prev.filter(sale => sale.id !== saleId));
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchWholesaleSales();
    fetchRetailSales();
  }, []);

  return (
    <SalesContext.Provider
      value={{
        wholesaleSales,
        retailSales,
        loading,
        error,
        addWholesaleSale,
        addRetailSale,
        updateSaleStatus,
        deleteSale,
        fetchWholesaleSales,
        fetchRetailSales
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => useContext(SalesContext);