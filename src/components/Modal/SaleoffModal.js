import React, { useState, useEffect } from "react";
import "./SaleoffModal.css";
const SaleoffModal = (props) => {
  const closeModalHandler = () => {
    props.onClose();
  };
  const [saleoffData, setSaleoffData] = useState([]);
  useEffect(() => {
    fetch("https://team12-ads-app.fly.dev/api/products-sale-price")
      .then((response) => response.json())
      .then((data) => {
        // data.data = data.data.map((data) => (data.key = data.product_id));
        setSaleoffData(data);
        console.log(data);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="modal">
        <h2 className="saleoff-title">Danh sách mã giảm giá</h2>
        <button className="close-modal" onClick={closeModalHandler}>
          &times;
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ProductID</th>
              <th scope="col">Saleoff</th>
              <th scope="col">Coin</th>
              <th scope="col" className="text-align-center">
                Chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {saleoffData.data ? (
              saleoffData.data.map((data) => (
                <tr>
                  <th scope="row">{data.product_id}</th>
                  <td>{data.sale_of}</td>
                  <td>{data.coin}</td>
                  <td className="text-align-center">
                    <button type="button" class="btn btn-secondary">
                      Chọn mã
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Khong co thong tin ma giam gia</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="overlay" onClick={closeModalHandler}></div>
    </React.Fragment>
  );
};

export default SaleoffModal;
