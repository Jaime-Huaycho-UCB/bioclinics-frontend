import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa"; // Íconos de FontAwesome
import "./salida.css";
const buyers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Carlos Mendez" },
    { id: 4, name: "Laura García" }
  ];
  
const products = [
  {
    id: 1,
    name: "North wolf bag",
    price: 9000,
  },
  {
    id: 2,
    name: "LW sneakers",
    price: 9000,
  },
  {
    id: 3,
    name: "Luxe card holder",
    price: 9000,
  },
];

const Salida = () => {
  const [cart, setCart] = useState(
    products.map((product) => ({ ...product, quantity: 1 }))
  );
  const [selectedBuyer, setSelectedBuyer] = useState("");

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 30;
  const tax = 39;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-container">
      <h1 className="title">Venta Completa</h1>
      <div className="main-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-content">
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <p className="cart-item-price">Price: ${item.price.toLocaleString()}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)} className="quantity-btn">
                    <FaMinus />
                  </button>
                  <span className="quantity-text">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="quantity-btn">
                    <FaPlus />
                  </button>
                </div>
                <div className="cart-item-total">
                  <p>Total: ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="buyer-selection">
        <label htmlFor="buyer">Select Buyer:</label>
        <select
          id="buyer"
          value={selectedBuyer}
          onChange={(e) => setSelectedBuyer(e.target.value)}
          className="buyer-select"
        >
          <option value="">-- Select a Buyer --</option>
          {buyers.map((buyer) => (
            <option key={buyer.id} value={buyer.name}>
              {buyer.name}
            </option>
          ))}
        </select>
      </div>

        </div>
        
        <div className="cart-summary">
  <h2 className="summary-title">Factura</h2>
  
  {/* Información del comprador */}
  <div className="buyer-info">
    <p className="buyer-name">Comprador: Juan Pérez</p> {/* Nombre del interno */}
    <p className="buyer-date">Fecha: {new Date().toLocaleDateString()}</p> {/* Fecha actual */}
  </div>
  
  {/* Lista de productos */}
  <div className="products-list">
    {cart.map((item) => (
      <div key={item.id} className="product-item">
        <p className="product-name">{item.name}</p>
        <p className="product-quantity">Cantidad: {item.quantity}</p>
        <p className="product-price">Precio: ${item.price.toLocaleString()}</p>
        <p className="product-total">
          Total: ${(item.price * item.quantity).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
  
  {/* Resumen de la factura */}
  <p className="summary-text">Subtotal: ${subtotal.toLocaleString()}</p>
  <p className="summary-text">Shipping: ${shipping}</p>
  <p className="summary-text">Tax: ${tax}</p>
  
  <h3 className="summary-total">Total: ${total.toLocaleString()}</h3>
  
  <button className="checkout-btn">Checkout</button>
</div>

      </div>
    </div>
  );
};

export default Salida;
