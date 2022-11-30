import React, { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
const CheckoutContainer = (props) => {
  const [validInfo, setValidInfo] = useState(false);
  const checkValid = (isValid) => {
    if (isValid) {
      setValidInfo(true);
    } else {
      setValidInfo(false);
    }
  };

  const submitHandler = (event) => {
    if (!validInfo) {
      event.preventDefault();
      props.submitSuccess(false);
    } else {
      props.submitSuccess(true);
    }
  };

  return (
    <React.Fragment>
      <form className="row remove-margin-left-to-row">
        <div className="display-flex">
          <CheckoutForm checkValid={checkValid} />
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
              onClick={submitHandler}
              value="THANH TOÁN"
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CheckoutContainer;
