import { useState } from "react";
import { Link } from "react-router-dom";

function Cart(props) {
  const [buttonText, setButtonText] = useState("Place Order");
  const [orderText, setOrderText] = useState(false);

  const inCartProductsDataHTML = props.cartListData.map((item) => {
    return (
      <div key={item.id} id={item.id} className="products-in-cart">
        <img src={item.thumbnail}></img>
        <h3>{item.title}</h3>
        <h4>${item.price}</h4>
        <button onClick={() => props.addToCart(item.id)}>Remove</button>
      </div>
    );
  });

  const productsCostArray = [];
  props.cartListData.map((item) => productsCostArray.push(item.price));

  const totalCostInCart = productsCostArray.reduce(
    (total, current) => total + current,
    0
  );

  function placeOrder() {
    setButtonText("Ordering...");
    setTimeout(() => {
      setOrderText(true);
      setButtonText("Place Order");
      props.emptyCart();
    }, 2500);
  }

  return (
    <div className="cart-container">
      {!orderText && (
        <a className="cart-list" href="/">
          Return to Homepage
        </a>
      )}
      {props.cartListData.length === 0 && !orderText ? (
        <div className="empty-cart-container">
          <p className="empty-cart">Cart is empty !</p>
          <a href="/">Continue Shopping</a>
        </div>
      ) : (
        inCartProductsDataHTML
      )}

      {props.cartListData.length > 0 && (
        <div className="total-cost-container">
          <h3>Total Cost:</h3>
          <h3 className="total-cost">${totalCostInCart}</h3>
        </div>
      )}
      {props.cartListData.length > 0 && (
        <button className="placeorder" onClick={placeOrder}>
          {buttonText}
        </button>
      )}
      {orderText && (
        <div className="order-placed-container">
          <h1>Order Placed!</h1>
          <a href="/">Continue Shopping</a>
        </div>
      )}
    </div>
  );
}

export default Cart;
