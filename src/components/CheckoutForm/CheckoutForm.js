import React from "react";

const CheckoutForm = (props) => {
  return (
    <React.Fragment>
      <div class="form-container">
        <div className="fill-in-notify-text">Thông tin giao hàng:</div>
        <div>
          <div className="form-display-flex">
            <div className="seperate-input-column">
              <input
                className="input-field"
                placeholder="Nhập địa chỉ giao hàng"
              />
              <input className="input-field" placeholder="Số điện thoại" />
            </div>
            <div className="seperate-input-column">
              <input
                className="input-field"
                placeholder="Địa chỉ email"
                for="email"
                type="email"
                required
              />
              <input className="input-field" placeholder="Họ và tên" />
            </div>
          </div>
          <div>
            <div>Yêu cầu khác:</div>
            <textarea
              type="text"
              className="textarea-styling"
              placeholder="Nhập các yêu cầu khác"
            />
          </div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutForm;
