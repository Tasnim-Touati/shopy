import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useCart();
  const count = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="navbar">
      <Link to="/" className="logo">Produits</Link>

      <Link to="/cart" className="cart-icon">
        🛒
        {count > 0 && <span className="badge">{count}</span>}
      </Link>
    </header>
  );
};

export default Navbar;
