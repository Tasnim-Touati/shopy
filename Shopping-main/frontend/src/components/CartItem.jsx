// src/components/CartItem.jsx

// Displays a single item in the shopping cart
const CartItem = ({ item, onRemove }) => {
  return (
    <div>
      <span>Product ID: {item.productId}</span>
      <span> | Quantity: {item.quantity}</span>
      {/* Remove this product from the cart using its productId */}
      <button onClick={() => onRemove(item.productId)}>Remove</button>
    </div>
  );
};

export default CartItem;
