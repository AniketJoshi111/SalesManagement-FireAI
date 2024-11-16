function SalesList({ sales }) {
    return (
      <div>
        <h2 className="text-xl font-bold">Sales List</h2>
        <ul>
          {sales.map(sale => (
            <li key={sale._id} className="border p-2 my-2">
              {sale.productName} - {sale.amount}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default SalesList;