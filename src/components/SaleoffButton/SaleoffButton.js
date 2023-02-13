import React from "react";
import { useState } from "react";
const SaleoffButton = (props) => {
  const saleoffProduct = props.itemData.find(
    (el) => el.product_id == props.data.product_id
  );
  const [apply, setApply] = useState(
    saleoffProduct.price > saleoffProduct.saleoffPrice ? true : false
  );
  const calculateSaleOffPrice = (id, saleoffPercent) => {
    if (apply === false) {
      setApply(true);
      props.onCalculateSaleOffPrice(id, saleoffPercent);
    } else {
      setApply(false);
      props.onRevertCalculateSaleOffPrice(id);
    }
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
        {apply === true ? "Bỏ áp dụng" : "Áp dụng"}
      </button>
    </React.Fragment>
  );
};

export default SaleoffButton;
