import React, { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import validator from "validator";
import SaleoffModal from "../Modal/SaleoffModal";
import "./CheckoutContainer.css";
const CheckoutContainer = (props) => {
  const [validInfo, setValidInfo] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };
  const [emptyNameField, setEmptyNameField] = useState(true);
  const [emptyAddressField, setEmptyAddressField] = useState(true);
  const [phoneMessage, setPhoneMessage] = useState([false, ""]);
  const [emailMessage, setEmailMessage] = useState([false, ""]);

  const checkEmptyNameField = (e) => {
    var input = e.target.value;
    checkAllValid();
    if (input.length === 0) {
      setEmptyNameField(true);
    } else {
      setEmptyNameField(false);
    }
  };

  const checkEmptyAddressField = (e) => {
    var input = e.target.value;

    if (input.length === 0) {
      setEmptyAddressField(true);
    } else {
      setEmptyAddressField(false);
    }
  };

  const validatePhone = (e) => {
    var phone = e.target.value;
    if (phone.length === 0) {
      setPhoneMessage([false, ""]);
    } else {
      if (
        validator.isMobilePhone(phone) &&
        (phone.length === 10 || phone[0] === "+")
      ) {
        setPhoneMessage([true, ""]);
      } else {
        setPhoneMessage([false, "Vui lòng nhập số điện thoại hợp lệ"]);
      }
    }
  };

  const validateEmail = (e) => {
    var email = e.target.value;
    if (email.length === 0) {
      setEmailMessage([false, ""]);
    } else {
      if (validator.isEmail(email)) {
        setEmailMessage([true, ""]);
      } else {
        setEmailMessage([false, "Vui lòng nhập vào địa chỉ email hợp lệ"]);
      }
    }
  };

  const checkAllValid = () => {
    if (
      !emptyNameField &&
      !emptyAddressField &&
      emailMessage[0] &&
      phoneMessage[0]
    ) {
      console.log("abc");
      setValidInfo(true);
    } else {
      console.log("def");
      setValidInfo(false);
    }
  };
  return (
    <React.Fragment>
      {openModal && (
        <SaleoffModal onClose={closeModalHandler} itemData={props.itemData} />
      )}
      <form className="row remove-margin-left-to-row">
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
                    onChange={(e) => checkEmptyAddressField(e)}
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="Số điện thoại"
                    onChange={(e) => validatePhone(e)}
                    required
                  />
                </div>
                <div className="seperate-input-column">
                  <input
                    className="input-field"
                    placeholder="Địa chỉ email"
                    for="email"
                    type="email"
                    onChange={(e) => validateEmail(e)}
                    required
                  />

                  <input
                    className="input-field"
                    placeholder="Họ và tên"
                    required
                    onChange={(e) => checkEmptyNameField(e)}
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
              <div className={phoneMessage[0] ? "text-success" : "text-danger"}>
                {phoneMessage[1]}
              </div>
              <div className={emailMessage[0] ? "text-success" : "text-danger"}>
                {emailMessage[1]}
              </div>

              {!emptyNameField &&
              !emptyAddressField &&
              emailMessage[0] &&
              phoneMessage[0] ? (
                <div className="text-success">Thông tin hợp lệ </div>
              ) : (
                <div className="text-danger">
                  Vui lòng nhập vào thông tin hợp lệ
                </div>
              )}
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
