import { useState, useEffect } from 'react';
import SalesList from '../components/SalesList';
import SaleForm from '../components/SaleForm';

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch sales data from API
    fetch('/api/sales')
      .then(response => response.json())
      .then(data => setSales(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sales</h1>
      <SaleForm />
      <SalesList sales={sales} />
    </div>
  );
}

export default Sales;