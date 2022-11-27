import React from "react";
import Item from "../Item/Item";

const Table = (props) => {
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th style={{ width: "80px" }}></th>
            <th>Name</th>
            <th>Number ordered</th>
            <th>Price</th>
            <th style={{ textAlign: "center" }}>Remove</th>
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
            />
          ))}

          {/* <Item
            id={props.itemData[0].id}
            title={props.itemData[0].title}
            image={props.itemData[0].image}
            quantity={props.itemData[0].quantity}
            price={props.itemData[0].price}
          />
          <Item
            id={props.itemData[1].id}
            title={props.itemData[1].title}
            image={props.itemData[1].image}
            quantity={props.itemData[1].quantity}
            price={props.itemData[1].price}
          />
          <Item
            id={props.itemData[2].id}
            title={props.itemData[2].title}
            image={props.itemData[2].image}
            quantity={props.itemData[2].quantity}
            price={props.itemData[2].price}
          /> */}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
