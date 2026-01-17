// src/components/ErrorMessage.jsx

// Used to show validation or API errors to the user
const ErrorMessage = ({ message }) => (
  <p style={{ color: "red", textAlign: "center" }}>⚠️ {message}</p>
);

export default ErrorMessage;
