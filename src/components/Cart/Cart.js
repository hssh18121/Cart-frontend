import React from "react";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import CheckoutContainer from "../CheckoutContainer/CheckoutContainer";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      `https://sp11-cart.000webhostapp.com/api/carts_details/show.php?cart_id=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setItems(data.data);
        console.log(data.data);
      });
  }, []);

  const [total, setTotal] = useState();
  // items.reduce((sum, { quantity, price }) => sum + price * quantity, 0)
  const [finishSubmit, setFinishSubmit] = useState(false);
  const deleteItemHandler = (id) => {
    setItems((items) => {
      const updatedItems = items.filter((item) => item.product_id !== id);
      // calculatingTotal(updatedItems);
      const deleteItem = items.find((item) => item.product_id === id);
      deleteItemAndSave(deleteItem);
      return updatedItems;
    });
  };

  const updateItems = (quantity, id) => {
    setItems((items) => {
      const objIndex = items.findIndex((obj) => obj.product_id === id);
      items[objIndex].quantity = quantity;

      calculatingTotal(items);
      saveCartHandler(items);
      return items;
    });
  };

  const calculatingTotal = (items) => {
    const total = items.reduce(
      (sum, { quantity, price, saleoffPrice }) => sum + saleoffPrice * quantity,
      0
    );
    setTotal(total);
    return total;
  };

  const submitSuccess = (bool) => {
    if (bool) {
      setItems([]);
      submitSuccessHandler();
      setFinishSubmit(true);
    } else {
      setFinishSubmit(false);
    }
  };

  const getItemPrice = (price, id) => {
    setItems((items) => {
      const objIndex = items.findIndex((obj) => obj.product_id == id);

      if (price) {
        if (items[objIndex].saleOffPercent) {
          items[objIndex].price = price;
          items[objIndex].saleoffPrice = price * 0.9;
        } else {
          items[objIndex].price = price;
          items[objIndex].saleoffPrice = price;
        }
      } else {
        items[objIndex].price = 0;
        items[objIndex].saleoffPrice = 0;
      }

      calculatingTotal(items);
      return items;
    });
  };

  const updateItemPrice = (id, saleOffPercent) => {
    setItems((items) => {
      const objIndex = items.findIndex(
        (obj) => Number(obj.product_id) === Number(id)
      );
      console.log(objIndex);

      if (saleOffPercent) {
        items[objIndex].saleOffPercent = 10;

        getItemPrice(items[objIndex].price, id);
      } else {
        items[objIndex].saleOffPercent = 10;

        getItemPrice(items[objIndex].price, id);
      }

      return items;
    });
  };

  const saveCartHandler = (items) => {
    items.map((item) => {
      (async () => {
        const rawResponse = await fetch(
          "https://sp11-cart.000webhostapp.com/api/carts_details/update.php",
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",

            // },
            body: JSON.stringify(item),
          }
        );
        const content = await rawResponse.json();

        console.log(content);
      })();
    });
  };

  const deleteItemAndSave = (item) => {
    (async () => {
      const rawResponse = await fetch(
        "https://sp11-cart.000webhostapp.com/api/carts_details/delete.php",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",

          // },
          body: JSON.stringify(item),
        }
      );
      const content = await rawResponse.json();

      console.log(content);
    })();
  };

  const submitSuccessHandler = () => {
    items.map((item) => {
      (async () => {
        const rawResponse = await fetch(
          "https://sp11-cart.000webhostapp.com/api/carts_details/delete.php",
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",

            // },
            body: JSON.stringify(item),
          }
        );
        const content = await rawResponse.json();

        console.log(content);
      })();
    });
  };

  return (
    <React.Fragment>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text product-more">
                <a href="/">
                  <i class="fa fa-home"></i> Trang chủ
                </a>
                <a href="/">Cửa hàng</a>
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
                    onGetItemPrice={getItemPrice}
                  />
                )}
              </div>
              {items.length !== 0 && (
                <CheckoutContainer
                  itemData={items}
                  total={total}
                  submitSuccess={submitSuccess}
                  onUpdatePrice={updateItemPrice}
                />
              )}
              {items.length === 0 && (
                <div style={{ height: "55vh" }}>
                  <h3 className="notify-to-user">
                    {!finishSubmit
                      ? "Không có sản phẩm trong giỏ hàng"
                      : "Checkout giỏ hàng thành công!"}
                  </h3>
                  <button className="continue-shopping-button btn btn-dark">
                    {!finishSubmit
                      ? "Quay về trang chủ"
                      : "Chuyển đến thanh toán"}
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
    </React.Fragment>
  );
};

export default Cart;
