import { useEffect, useState } from "react";
import Bonus from "./Bonus";

const Cart = ({ cart, setCart }) => {
  console.log(cart);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (cart.length) {
      let newTotal = 0;
      cart.forEach((item) => (newTotal += item.amount));
      setTotal(newTotal);
    } else {
      setTotal(0);
      setDiscount(0);
    }
    if (cart.length >= 3) {
      setDiscount(10);
    }
  }, [cart]);

  useEffect(() => {
    setTotal((prev) => (prev / 100) * (100 - discount));
  }, [discount]);

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="Cart">
      <h3>Cart</h3>
      <h3>Discount: {discount}%</h3>
      <h4>Total: ${total} </h4>

      <ol>
        {cart.map(({ id, name, amount }) => (
          <li key={id}>
            {name}: ${amount}
            <button onClick={() => removeItem(id)}>
              <span className="x">X</span>
            </button>
          </li>
        ))}
      </ol>

      <p>You donation has qualified you for the following items:</p>
      <ul>
        <Bonus total={total} />
      </ul>
    </div>
  );
};

export default Cart;