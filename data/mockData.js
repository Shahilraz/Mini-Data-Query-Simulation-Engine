const users = [
    { id: 1, name: 'John Doe', country: 'USA', active: true, age: 30 },
    { id: 2, name: 'Jane Smith', country: 'Canada', active: true, age: 28 },
    { id: 3, name: 'Mike Johnson', country: 'USA', active: false, age: 35 },
    { id: 4, name: 'Emily Brown', country: 'UK', active: true, age: 25 }
  ];
  
  const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, inStock: true },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, inStock: true },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 250, inStock: false }
  ];
  
  module.exports = { users, products };