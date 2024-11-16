import { useState } from 'react';

function SaleForm() {
  const [form, setForm] = useState({
    productName: '',
    amount: '',
    DateofSale: '',
    status: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to API
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="mb-4">
        <label className="block text-gray-700">Product Name</label>
        <input type="text" name="productName" value={form.productName} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date of Sale</label>
        <input type="date" name="DateofSale" value={form.DateofSale} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <input type="text" name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Sale</button>
    </form>
  );
}

export default SaleForm;
