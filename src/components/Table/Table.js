import React from "react";
import Item from "../Item/Item";

const Table = (props) => {
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Ảnh</th>
            <th className="p-name">Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {props.itemData.map((element) => (
            <Item
              key={element.product_id}
              id={element.product_id}
              title={element.title}
              image={element.image}
              price={element.price}
              saleoffPrice={element.saleoffPrice}
              quantity={element.quantity}
              onDelete={props.onDeleteItem}
              onGetItemQuantity={props.onGetQuantity}
              onGetItemPrice={props.onGetItemPrice}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
