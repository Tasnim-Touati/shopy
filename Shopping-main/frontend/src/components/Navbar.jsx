import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const { cart } = useCart(); // Custom hook to access cart state

  // Compute total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <div className="nav-container">
        {/* Clicking the title navigates to the homepage */}
        <h1 onClick={() => navigate("/")}>Produits</h1>

        {/* Cart icon with clickable navigation to cart page */}
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          {/* Cart item count badge; only shown if cart is not empty */}
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
