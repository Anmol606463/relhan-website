import React, { useState } from "react";

const sections = [
  { name: "Products", key: "products" },
  { name: "Users", key: "users" },
  { name: "Orders", key: "orders" },
  { name: "Testimonials", key: "testimonials" },
  { name: "Add Services", key: "add_services" },
  { name: "Catalog", key: "catalog" },
];

// Helper to get/set orders in localStorage
function getOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}
function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("products");
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState({ name: "", description: "", price: "" });
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ name: "", description: "", price: "", image: "" });
  const [editingProductIdx, setEditingProductIdx] = useState(null);

  const handleServiceChange = (e) => {
    setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceForm.name || !serviceForm.description || !serviceForm.price) return;
    setServices([...services, { ...serviceForm }]);
    setServiceForm({ name: "", description: "", price: "" });
  };

  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.description || !productForm.price || !productForm.image) return;
    if (editingProductIdx !== null) {
      // Update existing product
      const updated = [...products];
      updated[editingProductIdx] = { ...productForm };
      setProducts(updated);
      setEditingProductIdx(null);
    } else {
      // Add new product
      setProducts([...products, { ...productForm }]);
    }
    setProductForm({ name: "", description: "", price: "", image: "" });
  };

  const handleEditProduct = (idx) => {
    setProductForm(products[idx]);
    setEditingProductIdx(idx);
  };

  const handleDeleteProduct = (idx) => {
    setProducts(products.filter((_, i) => i !== idx));
    if (editingProductIdx === idx) {
      setProductForm({ name: "", description: "", price: "", image: "" });
      setEditingProductIdx(null);
    }
  };

  // Catalog state and handlers
  const [catalog, setCatalog] = useState([
    {
      name: "Arduino UNO R3",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg",
      category: "Microcontroller",
    },
    {
      name: "NodeMCU ESP8266",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/NodeMCU_DEVKIT_1.0.jpg",
      category: "Microcontroller",
    },
    {
      name: "IR Sensor Module",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Infrared_Sensor_Module.jpg",
      category: "Sensor",
    },
  ]);
  const [catalogForm, setCatalogForm] = useState({ name: "", image: "", category: "" });
  const [editingCatalogIdx, setEditingCatalogIdx] = useState(null);

  const handleCatalogChange = (e) => {
    setCatalogForm({ ...catalogForm, [e.target.name]: e.target.value });
  };

  const handleCatalogSubmit = (e) => {
    e.preventDefault();
    if (!catalogForm.name || !catalogForm.image || !catalogForm.category) return;
    if (editingCatalogIdx !== null) {
      const updated = [...catalog];
      updated[editingCatalogIdx] = { ...catalogForm };
      setCatalog(updated);
      setEditingCatalogIdx(null);
    } else {
      setCatalog([...catalog, { ...catalogForm }]);
    }
    setCatalogForm({ name: "", image: "", category: "" });
  };

  const handleEditCatalog = (idx) => {
    setCatalogForm(catalog[idx]);
    setEditingCatalogIdx(idx);
  };

  const handleDeleteCatalog = (idx) => {
    setCatalog(catalog.filter((_, i) => i !== idx));
    if (editingCatalogIdx === idx) {
      setCatalogForm({ name: "", image: "", category: "" });
      setEditingCatalogIdx(null);
    }
  };

  // Orders state
  const [orders, setOrders] = useState(getOrders());

  // Delete order
  const handleDeleteOrder = (idx) => {
    const updated = orders.filter((_, i) => i !== idx);
    setOrders(updated);
    saveOrders(updated);
  };

  // Listen for new orders (in case Catalog page adds one)
  React.useEffect(() => {
    const onStorage = () => setOrders(getOrders());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md dark:shadow-lg p-6 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`text-left px-4 py-2 rounded transition-colors ${activeSection === section.key ? "bg-orange-200 dark:bg-orange-700/40 font-semibold" : "hover:bg-orange-100 dark:hover:bg-gray-700/60"}`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {activeSection === "products" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Manage Products</h3>
            <form onSubmit={handleProductSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block mb-1 font-semibold">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleProductChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={productForm.image}
                  onChange={handleProductChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
                {editingProductIdx !== null ? "Update Product" : "Add Product"}
              </button>
              {editingProductIdx !== null && (
                <button
                  type="button"
                  className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setProductForm({ name: "", description: "", price: "", image: "" });
                    setEditingProductIdx(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">Products List</h4>
              {products.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No products added yet.</p>
              ) : (
                <ul className="space-y-2">
                  {products.map((product, idx) => (
                    <li key={idx} className="border rounded p-3 bg-white dark:bg-gray-800 shadow dark:shadow-lg flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-bold">{product.name}</div>
                        <div className="text-gray-700 dark:text-gray-300">{product.description}</div>
                        <div className="text-orange-600 dark:text-orange-400 font-semibold">₹{product.price}</div>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleEditProduct(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteProduct(idx)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        {activeSection === "users" && <div><h3 className="text-xl font-bold mb-4">Manage Users</h3><p>User management UI goes here.</p></div>}
        {activeSection === "orders" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Manage Orders</h3>
            {orders.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No orders yet.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order, idx) => (
                  <li key={idx} className="border rounded p-4 bg-white dark:bg-gray-800 shadow flex flex-col md:flex-row md:items-center gap-4">
                    <img src={order.image} alt={order.name} className="w-20 h-20 object-contain rounded bg-gray-100" />
                    <div className="flex-1">
                      <div className="font-bold text-lg">{order.name}</div>
                      <div className="text-gray-700 dark:text-gray-300">Category: {order.category}</div>
                      <div className="text-orange-600 dark:text-orange-400 font-semibold">₹{order.price}</div>
                      <div className="text-xs text-gray-500 mt-1">Payment ID: {order.paymentId}</div>
                      <div className="text-xs text-gray-500">Date: {order.date}</div>
                    </div>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded self-start"
                      onClick={() => handleDeleteOrder(idx)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeSection === "testimonials" && <div><h3 className="text-xl font-bold mb-4">Manage Testimonials</h3><p>Testimonial management UI goes here.</p></div>}
        {activeSection === "add_services" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Add Service</h3>
            <form onSubmit={handleServiceSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block mb-1 font-semibold">Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={serviceForm.name}
                  onChange={handleServiceChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  value={serviceForm.description}
                  onChange={handleServiceChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={serviceForm.price}
                  onChange={handleServiceChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Add Service</button>
            </form>
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">Services List</h4>
              {services.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No services added yet.</p>
              ) : (
                <ul className="space-y-2">
                  {services.map((service, idx) => (
                    <li key={idx} className="border rounded p-3 bg-white dark:bg-gray-800 shadow dark:shadow-lg">
                      <div className="font-bold">{service.name}</div>
                      <div className="text-gray-700 dark:text-gray-300">{service.description}</div>
                      <div className="text-orange-600 dark:text-orange-400 font-semibold">₹{service.price}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        {activeSection === "catalog" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Manage Catalog Components</h3>
            <form onSubmit={handleCatalogSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block mb-1 font-semibold">Component Name</label>
                <input
                  type="text"
                  name="name"
                  value={catalogForm.name}
                  onChange={handleCatalogChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={catalogForm.image}
                  onChange={handleCatalogChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={catalogForm.category}
                  onChange={handleCatalogChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
                {editingCatalogIdx !== null ? "Update Component" : "Add Component"}
              </button>
              {editingCatalogIdx !== null && (
                <button
                  type="button"
                  className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setCatalogForm({ name: "", image: "", category: "" });
                    setEditingCatalogIdx(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">Catalog Components List</h4>
              {catalog.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No components added yet.</p>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {catalog.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-contain bg-gray-800 p-4 rounded-t-xl"
                      />
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">{item.category}</p>
                        <div className="mt-auto flex gap-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => handleEditCatalog(idx)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => handleDeleteCatalog(idx)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 