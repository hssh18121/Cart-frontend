import React, { useState, useEffect } from "react";

import SaleoffModal from "../Modal/SaleoffModal";
import "./CheckoutContainer.css";
const CheckoutContainer = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(
        `https://api-admin-dype.onrender.com/api/user/${props.itemData[0].cart_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGx0Y3QuY29tIiwiaWF0IjoxNjc2MjAxNDI3LCJleHAiOjE2NzYyNDQ2Mjd9.MbWOKS1uf3oVy1CnaBSL9ghzkM5bFe9jSxaxdipLdJk`,
          },
        }
      );
      const user = await rawResponse.json();
      console.log(user);
      setUserInfo(user);
    })();
  }, [props.itemData]);

  const submitHandler = (e) => {
    // if (!validInfo) {
    //   event.preventDefault();
    //   props.submitSuccess(false);
    // } else {
    //   props.submitSuccess(true);
    // }
    e.preventDefault();
    props.submitSuccess(true);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const updatePriceHandler = (id, saleOffPercent) => {
    props.onUpdatePrice(id, saleOffPercent);
  };

  return (
    <React.Fragment>
      {openModal && (
        <SaleoffModal
          onUpdatePrice={updatePriceHandler}
          onClose={closeModalHandler}
          itemData={props.itemData}
        />
      )}
      <form className="row remove-margin-left-to-row" onSubmit={submitHandler}>
        <div className="display-flex">
          {/* <CheckoutForm checkValid={checkValid} /> */}
          <div class="form-container">
            <div className="fill-in-notify-text">Thông tin giao hàng (*):</div>
            <div>
              <div className="form-display-flex">
                <div className="seperate-input-column">
                  <input
                    className="input-field"
                    placeholder="Nhập địa chỉ giao hàng"
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="Số điện thoại"
                    defaultValue={userInfo?.phoneNumber}
                    required
                  />
                </div>
                <div className="seperate-input-column">
                  <input
                    className="input-field"
                    placeholder="Địa chỉ email"
                    for="email"
                    type="email"
                    defaultValue={userInfo?.email}
                    required
                  />

                  <input
                    className="input-field"
                    placeholder="Họ và tên"
                    defaultValue={userInfo?.name}
                    required
                  />
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
            </div>
          </div>
          <div className="col-lg-4  proceed-checkout add-end-to-proceed-checkout">
            <ul>
              <li className="subtotal">
                Mã giảm giá:
                <span className="add-cursor-pointer" onClick={openModalHandler}>
                  Chọn mã
                </span>
              </li>
              <li className="cart-total">
                Tổng: <span>{props.total}Đ</span>
              </li>
            </ul>
            <input
              type="submit"
              style={{ width: "100%" }}
              className="proceed-btn"
              value="THANH TOÁN"
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CheckoutContainer;
