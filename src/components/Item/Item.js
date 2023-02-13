import React, { useState, useEffect } from "react";

const Item = (props) => {
  const [enteredQuantity, setEnteredQuantity] = useState(
    Number(props.quantity)
  );
  // useEffect(() => {
  //   setEnteredQuantity(1);
  // }, []);
  const [itemDetailData, setItemDetailData] = useState();
  useEffect(() => {
    fetch(
      `https://p01-product-api-production.up.railway.app/api/user/products/${props.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setItemDetailData(data);
        // console.log(data);
        console.log(data.data.cost);
        props.onGetItemPrice(data.data.cost, props.id);
      });
  }, []);
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
    if (enteredQuantity > 1) {
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
            src={itemDetailData?.data.sub_products[0].image_url}
            // src={require(`${props.image}`)}
            alt="Product"
            className="product-img"
          />
        </td>
        <td className="cart-title first-row">
          <h5>{itemDetailData?.data.name}</h5>
        </td>
        <td className="p-price first-row">{props.saleoffPrice}Đ </td>
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
          {props.saleoffPrice * enteredQuantity}Đ
        </td>
        <td className="close-td first-row">
          <i className="ti-close" onClick={deleteHandler}></i>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Item;
