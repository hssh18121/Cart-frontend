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
      <form className="row remove-margin-left-to-row">
        <div className="display-flex">
          <CheckoutForm closeModal={modalHandler} />
          <div className="col-lg-4  proceed-checkout add-end-to-proceed-checkout">
            <ul>
              <li className="subtotal">
                Mã giảm giá: <span>Chọn mã</span>
              </li>
              <li className="cart-total">
                Tổng: <span>${props.total}</span>
              </li>
            </ul>
            <input
              type="submit"
              style={{ width: "100%" }}
              className="proceed-btn"
              onClick={activeModalHandler}
              value="THANH TOÁN"
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CheckoutContainer;
