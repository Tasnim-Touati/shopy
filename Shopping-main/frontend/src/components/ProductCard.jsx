import { useCart } from "../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
      <p className="stock-info">
        {product.stock > 0 ? `En stock: ${product.stock}` : "Rupture de stock"}
      </p>

      <button disabled={product.stock === 0} onClick={() => addToCart(product)}>
        {product.stock === 0 ? "Indisponible" : "Ajouter au panier 🛒"}
      </button>
    </div>
  );
};

export default ProductCard;
