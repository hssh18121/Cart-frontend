import React from "react";
import { useState } from "react";
const SaleoffButton = (props) => {
  const calculateSaleOffPrice = (id, saleoffPercent) => {
    props.onCalculateSaleOffPrice(id, saleoffPercent);
  };
  return (
    <React.Fragment>
      <button
        type="button"
        class="btn btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          calculateSaleOffPrice(props.data.product_id, props.data.sale_of);
        }}
      >
        Áp dụng
      </button>
    </React.Fragment>
  );
};

export default SaleoffButton;
