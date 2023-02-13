import React, { useState, useEffect } from "react";
import SaleoffButton from "../SaleoffButton/SaleoffButton";
import "./SaleoffModal.css";
const SaleoffModal = (props) => {
  let filterData = [];
  const [saleoffData, setSaleoffData] = useState([]);
  useEffect(() => {
    fetch("https://team12-ads-app.fly.dev/api/products-sale-price")
      .then((response) => response.json())
      .then((data) => {
        // data.data = data.data.map((data) => (data.key = data.product_id));
        setSaleoffData(data);
        console.log(data);
        // console.log(props.itemData);
        props.itemData.forEach((element) => {
          let filter = data.data.find(
            (el) => Number(el.product_id) === Number(element.product_id)
          );

          filterData.push(filter);
        });
        console.log(filterData);
        setSaleoffData(filterData);
      });
  }, []);
  const closeModalHandler = () => {
    props.onClose();
  };

  const calculateSaleOffPrice = (id, saleoffPercent) => {
    props.onUpdatePrice(id, saleoffPercent);
    props.onClose();
  };

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
            {filterData ? (
              saleoffData.map((data) => (
                <tr>
                  <th scope="row">{data.product_id}</th>
                  <td>{data.sale_of}</td>
                  <td>{data.coin}</td>
                  <td className="text-align-center">
                    <SaleoffButton
                      onCalculateSaleOffPrice={calculateSaleOffPrice}
                      data={data}
                      onClose={props.onClose}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <p>Không có mã giảm giá cho các sản phẩm này</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="overlay" onClick={closeModalHandler}></div>
    </React.Fragment>
  );
};

export default SaleoffModal;
