import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();
console.log(cart)
  const removeItem = id => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const increaseQty = (id, stock, quantity) => {
    if (stock > quantity) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: quantity + 1 } });
    }
  };

  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: quantity - 1 } });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="border p-4 mt-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={item.images} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div>
                <p>{item.title} - ${item.price} x {item.quantity}</p>
                {item.stock === 0 && <p className="text-red-500 text-sm">Currently Unavailable – We’re restocking soon!</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-red-500 text-white px-2 py-1" onClick={() => decreaseQty(item.id, item.quantity)}>-</button>
              <span>{item.quantity}</span>
              <button 
                className="bg-green-500 text-white px-2 py-1 disabled:opacity-50" 
                onClick={() => increaseQty(item.id, item.stock, item.quantity)} 
                disabled={item.stock <= item.quantity}
              >
                +
              </button>
            </div>
            <button className="bg-red-500 text-white px-2 py-1" onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))
      )}
      <p className="text-lg font-bold mt-4">Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default Cart;
