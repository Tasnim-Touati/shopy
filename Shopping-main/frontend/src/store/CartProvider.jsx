const addToCart = (product) => {
  setCart((prev) => {
    const existing = prev.find((p) => p.id === product.id);

    if (existing) {
      return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    }

    return [
      ...prev,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image, // ← Add this line
        quantity: 1,
      },
    ];
  });
};
