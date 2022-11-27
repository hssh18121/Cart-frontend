import React, { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
const CheckoutContainer = (props) => {
  const [activeModal, setActiveModal] = useState(false);
  const activeModalHandler = () => {
    setActiveModal(true);
  };
  const modalHandler = () => {
    setActiveModal(false);
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-4 offset-lg-8">
          <div className="proceed-checkout">
            <ul>
              <li className="subtotal">
                Subtotal <span>$240.00</span>
              </li>
              <li className="cart-total">
                Total <span>${props.total}</span>
              </li>
            </ul>
            <a href={"google.com"} className="proceed-btn">
              PROCEED TO CHECK OUT
            </a>
          </div>
        </div>
      </div>
      {activeModal && <CheckoutForm closeModal={modalHandler} />}
    </React.Fragment>
  );
};

export default CheckoutContainer;
