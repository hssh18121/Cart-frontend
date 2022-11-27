import React, { useEffect, useState } from "react";

const Item = (props) => {
  const [enteredQuantity, setEnteredQuantity] = useState(1);
  // useEffect(() => {
  //   setEnteredQuantity(1);
  // }, []);

  function quantityChangeHandler(event) {
    setEnteredQuantity(event.target.value);
  }

  const addQuantity = () => {
    if (enteredQuantity < 100) setEnteredQuantity(enteredQuantity + 1);
  };
  const subtractQuantity = () => {
    if (enteredQuantity > 0) setEnteredQuantity(enteredQuantity - 1);
  };

  const deleteHandler = () => {
    // setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  };

  return (
    <React.Fragment>
      <tr>
        <th>
          <img
            src={require("../../img/nguyen_nhat_anh.jpg")}
            // src={`${props.image}`}
            className="product-image"
            alt="Product"
          />
        </th>
        <th>{props.title}</th>
        <td style={{ textAlign: "center" }}>
          <div className="quantity-controller-container">
            <div className="minus-icon-container">
              {/* <a href="#"> */}
              <ion-icon
                name="remove-outline"
                className="ion-icon"
                id="minus-add-ion-icon"
                onClick={subtractQuantity}
              ></ion-icon>
              {/* </a> */}
            </div>
            <input
              // value="2"
              className="input-quantity"
              type="number"
              min="0"
              max="100"
              value={enteredQuantity}
              onChange={quantityChangeHandler}
              required
            />
            <div className="add-icon-container">
              {/* <a href="#"> */}
              <ion-icon
                name="add-outline"
                className="ion-icon"
                id="minus-add-ion-icon"
                onClick={addQuantity}
              ></ion-icon>
              {/* </a> */}
            </div>
          </div>
        </td>
        <td>{props.price * enteredQuantity} VND</td>
        <td style={{ textAlign: "center" }}>
          {/* <a href="#"> */}
          <ion-icon
            name="trash-bin"
            id="trash-ion-icon"
            onClick={deleteHandler}
          ></ion-icon>
          {/* </a> */}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Item;
