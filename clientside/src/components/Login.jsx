function Login() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input type="text" className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full px-3 py-2 border rounded" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        </form>
      </div>
    );
  }
  
  export default Login;