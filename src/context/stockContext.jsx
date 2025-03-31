import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStock = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://joy-shiiiii-backend.onrender.com/stock/all');
      setStock(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addStock = async (stockData) => {
    try {
      const response = await axios.post('https://joy-shiiiii-backend.onrender.com/stock/add', stockData);
      setStock(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateStock = async (stockId, stockData) => {
    try {
      const response = await axios.put(`https://joy-shiiiii-backend.onrender.com/stock/update/${stockId}`, stockData);
      setStock(prev => prev.map(item => 
        item.id === stockId ? response.data : item
      ));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteStock = async (stockId) => {
    try {
      await axios.delete(`https://joy-shiiiii-backend.onrender.com/stock/delete/${stockId}`);
      setStock(prev => prev.filter(item => item.id !== stockId));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <StockContext.Provider
      value={{
        stock,
        loading,
        error,
        addStock,
        updateStock,
        deleteStock,
        fetchStock
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);