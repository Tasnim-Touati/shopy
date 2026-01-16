const CartItem = ({ item, onRemove }) => {
  return (
    <div>
      <span>Product ID: {item.productId}</span>
      <span> | Quantity: {item.quantity}</span>
      <button onClick={() => onRemove(item.productId)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
