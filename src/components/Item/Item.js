import React, { useState } from "react";

const Item = (props) => {
  const [enteredQuantity, setEnteredQuantity] = useState(1);
  // useEffect(() => {
  //   setEnteredQuantity(1);
  // }, []);

  function quantityChangeHandler(event) {
    setEnteredQuantity(Number(event.target.value) || 0);
    props.onGetItemQuantity(Number(event.target.value) || 0, props.id);
  }

  const addQuantity = () => {
    if (enteredQuantity < 100) {
      setEnteredQuantity(enteredQuantity + 1);
      props.onGetItemQuantity(enteredQuantity + 1, props.id);
    }
  };
  const subtractQuantity = () => {
    if (enteredQuantity > 0) {
      setEnteredQuantity(enteredQuantity - 1);
      props.onGetItemQuantity(enteredQuantity - 1, props.id);
    }
  };

  const deleteHandler = () => {
    // setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  };

  return (
    <React.Fragment>
      <tr>
        <td className="cart-pic first-row">
          <img
            src={require("../../img/cart-page/product-2.jpg")}
            alt="Product"
          />
        </td>
        <td className="cart-title first-row">
          <h5>{props.title}</h5>
        </td>
        <td className="p-price first-row">${props.price} </td>
        <td className="qua-col first-row">
          <div className="quantity ">
            <div className="pro-qty">
              <span className="dec qtybtn" onClick={subtractQuantity}>
                -
              </span>
              <input
                type="text"
                value={enteredQuantity}
                onChange={quantityChangeHandler}
              />
              <span className="inc qtybtn" onClick={addQuantity}>
                +
              </span>
            </div>
          </div>
        </td>
        <td className="total-price first-row">
          ${props.price * enteredQuantity}
        </td>
        <td className="close-td first-row">
          <i className="ti-close" onClick={deleteHandler}></i>
        </td>
        <td className="close-td first-row">
          <i className="ti-save"></i>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Item;
