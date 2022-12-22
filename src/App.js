import React, { useEffect, useState } from "react";

import Table from "./components/Table/Table";
import CheckoutContainer from "./components/CheckoutContainer/CheckoutContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [items, setItems] = useState([
    {
      id: "1",
      image: "../../img/cart-page/product-2.jpg",
      title: "Áo Polo Dry Vải Pique",
      quantity: 1,
      price: 100,
    },
    {
      id: "2",
      image: "../../img/cart-page/product-1.jpg",
      title: "Áo Len Extra Fine Merino ",
      quantity: 1,
      price: 60,
    },
    {
      id: "3",
      image: "../../img/cart-page/product-3.jpg",
      title: "Áo Kiểu Vải Rayon Dài Tay",
      quantity: 1,
      price: 200,
    },
    {
      id: "4",
      image: "../../img/cart-page/product-1.jpg",
      title: "Áo Hoodie Fine Merino",
      quantity: 1,
      price: 205,
    },
  ]);

  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    fetch("/cart_api/api/order/read.php")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const [total, setTotal] = useState(
    items.reduce((sum, { quantity, price }) => sum + price * quantity, 0)
  );
  const [finishSubmit, setFinishSubmit] = useState(false);
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

  const submitSuccess = (bool) => {
    if (bool) {
      console.log(items);
      // fetch("http://localhost:5000/checkout", {
      //   method: "POST",
      //   crossDomain: true,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //   },
      //   body: JSON.stringify({
      //     items,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data, "sendCheckoutInfo");
      //     if (data.status === "success") {
      //       alert("Checkout Successfully");
      //       window.location.href = "./checkout";
      //     }
      //   });
      setItems([]);
      setFinishSubmit(true);
    } else {
      setFinishSubmit(false);
    }
  };
  return (
    <Router>
      {/* {typeof backendData.data === "undefined" ? (
        <p>Loading....</p>
      ) : (
        backendData.data.map((testData, i) => <p>{testData.address}</p>)
      )} */}
      <Switch>
        <Route exact path="/cart">
          <div className="breacrumb-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-text product-more">
                    <a href="./home.html">
                      <i class="fa fa-home"></i> Trang chủ
                    </a>
                    <a href="./shop.html">Cửa hàng</a>
                    <span>Giỏ hàng</span>
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
                    {items.length !== 0 && (
                      <Table
                        itemData={items}
                        onDeleteItem={deleteItemHandler}
                        onGetQuantity={updateItems}
                      />
                    )}
                  </div>
                  {items.length !== 0 && (
                    <CheckoutContainer
                      total={total}
                      submitSuccess={submitSuccess}
                    />
                  )}
                  {items.length === 0 && (
                    <div style={{ height: "55vh" }}>
                      <h3 className="notify-to-user">
                        {!finishSubmit
                          ? "Không có sản phẩm trong giỏ hàng"
                          : "Thanh toán thành công!"}{" "}
                      </h3>
                      <button className="continue-shopping-button btn btn-dark">
                        Tiếp tục mua sắm
                      </button>
                    </div>
                  )}
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
        </Route>
        <Route exact path="/home">
          <div>
            <h2>Home page</h2>
            <button>Add to cart</button>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
