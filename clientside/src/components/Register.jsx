import { useState } from 'react';

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role:''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to API
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input type="text" name="role" value={form.role} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;


