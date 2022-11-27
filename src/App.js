import React, { useState } from "react";

import Table from "./components/Table/Table";
import CheckoutContainer from "./components/CheckoutContainer/CheckoutContainer";

function App() {
  const [items, setItems] = useState([
    {
      id: "item1",
      image: "../../img/cart-page/product-2.jpg",
      title: "American lobster",
      quantity: 1,
      price: 100,
    },
    {
      id: "item2",
      image: "../../img/cart-page/product-1.jpg",
      title: "Italian Lobster",
      quantity: 1,
      price: 60,
    },
    {
      id: "item3",
      image: "../../img/cart-page/product-3.jpg",
      title: "Bla Bla Bla",
      quantity: 1,
      price: 200,
    },
    {
      id: "item4",
      image: "../../img/cart-page/product-1.jpg",
      title: "Something random",
      quantity: 1,
      price: 205,
    },
  ]);
  const [total, setTotal] = useState(
    items.reduce((sum, { quantity, price }) => sum + price * quantity, 0)
  );

  const deleteItemHandler = (id) => {
    setItems((items) => {
      const updatedItems = items.filter((item) => item.id !== id);
      calculatingTotal(updatedItems);
      return updatedItems;
    });
  };

  const updateItems = (quantity, id) => {
    setItems((items) => {
      // const updatedItems = items.map((item) =>
      //   item.id === id ? (item.quantity = quantity) : item.quantity
      // );
      // console.log(quantity);
      // return updatedItems;
      const objIndex = items.findIndex((obj) => obj.id === id);
      items[objIndex].quantity = quantity;
      console.log(items[objIndex].quantity);
      calculatingTotal(items);
      return items;
    });
  };

  const calculatingTotal = (items) => {
    // const total = items.reduce(
    //   (a, b) => Number(a.quantity * a.price) + Number(b.quantity * b.price)

    // );
    const total = items.reduce(
      (sum, { quantity, price }) => sum + price * quantity,
      0
    );
    setTotal(total);
    return total;
  };

  return (
    <React.Fragment>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text product-more">
                <a href="./home.html">
                  <i class="fa fa-home"></i> Home
                </a>
                <a href="./shop.html">Shop</a>
                <span>Shopping Cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-table">
                <Table
                  itemData={items}
                  onDeleteItem={deleteItemHandler}
                  onGetQuantity={updateItems}
                />
              </div>
              <CheckoutContainer total={total} />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="copyright-reserved">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-text"></div>
                <div className="payment-pic">
                  <img src={"img/payment-method.png"} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
