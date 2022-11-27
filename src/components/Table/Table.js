import React from "react";
import Item from "../Item/Item";

const Table = (props) => {
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th className="p-name">Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.itemData.map((element) => (
            <Item
              key={element.id}
              id={element.id}
              title={element.title}
              image={element.image}
              price={element.price}
              onDelete={props.onDeleteItem}
              onGetItemQuantity={props.onGetQuantity}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
