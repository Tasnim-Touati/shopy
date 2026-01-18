const orders = [];

export const saveOrder = (order) => {
  orders.push(order);
  return order;
};

export const getAllOrders = () => {
  return orders;
};
