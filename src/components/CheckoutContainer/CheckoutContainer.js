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
      <div className="checkout--info--container">
        <p className="total-title-field">Total:</p>
        <p className="total--price--field">90000VND</p>
        <hr style={{ marginTop: "20px" }} />
        <button
          className="orange-button show-modal"
          onClick={activeModalHandler}
        >
          Checkout
        </button>
        <button className="green-button">Continue shopping</button>
      </div>
      {activeModal && <CheckoutForm closeModal={modalHandler} />}
    </React.Fragment>
  );
};

export default CheckoutContainer;
