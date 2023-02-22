import React, { useState, useEffect } from "react";
import SaleoffButton from "../SaleoffButton/SaleoffButton";
import "./SaleoffModal.css";
const SaleoffModal = (props) => {
  let filterData = [];
  let userVoucher = [];
  const [saleoffData, setSaleoffData] = useState([]);
  const [voucherList, setVoucherList] = useState([]);

  useEffect(() => {
    fetch("https://team12-ads-app.fly.dev/api/products-sale-price")
      .then((response) => response.json())
      .then((data) => {
        // data.data = data.data.map((data) => (data.key = data.product_id));

        props.itemData.forEach((element) => {
          let filter = data.data.find(
            (el) => Number(el.product_id) === Number(element.product_id)
          );
          filter.name = element.name;
          filterData.push(filter);
        });
        // setSaleoffData(filterData);
      })
      .then(() => {
        setSaleoffData(filterData);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://team12-ads-app.fly.dev/api/vouchers-payment?user_id=${props.userID}`
    )
      .then((response) => response.json())
      .then((data) => {
        // data.data = data.data.map((data) => (data.key = data.product_id));
        console.log(data.voucher_list);
        setVoucherList(data.voucher_list);
      });
  }, []);
  const closeModalHandler = () => {
    props.onClose();
  };

  const calculateSaleOffPrice = (id, saleoffPercent) => {
    props.onUpdatePrice(id, saleoffPercent);
  };

  const revertCalculateSaleOffPrice = (id) => {
    props.onRevertUpdatePrice(id);
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
              <th scope="col">Product name</th>
              <th scope="col">Saleoff</th>

              <th scope="col" className="text-align-center">
                Chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData ? (
              saleoffData.map((data) => (
                <tr>
                  <th scope="row">{data.name}</th>
                  <td>{data.sale_of}%</td>

                  <td className="text-align-center">
                    <SaleoffButton
                      onCalculateSaleOffPrice={calculateSaleOffPrice}
                      onRevertCalculateSaleOffPrice={
                        revertCalculateSaleOffPrice
                      }
                      data={data}
                      onClose={props.onClose}
                      itemData={props.itemData}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <p>Không có mã giảm giá cho các sản phẩm này</p>
            )}
          </tbody>
        </table>
        <h2 className="saleoff-title" style={{ marginTop: "3rem" }}>
          Voucher người dùng
        </h2>
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">Voucher Người Dùng</th>
              <th scope="col">Nội dung</th>

              <th scope="col" className="text-align-center">
                Chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData ? (
              voucherList.map((data) => (
                <tr>
                  <th scope="row">{data.titlle}</th>
                  <td>{data.content}%</td>

                  <td className="text-align-center">
                    <button class="btn btn-secondary">Chọn</button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Không có mã giảm giá cho các sản phẩm này</p>
            )}
          </tbody>
        </table> */}
      </div>
      <div className="overlay" onClick={closeModalHandler}></div>
    </React.Fragment>
  );
};

export default SaleoffModal;
