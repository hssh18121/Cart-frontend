import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [cartList, setCartList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [availableUser, setAvailableUser] = useState([]);
  let user_item = [];

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    if (e.target.value.length > 0) {
      setAvailableUser(
        cartList.filter((cart) => {
          return cart.username.match(e.target.value);
        })
      );
    } else setAvailableUser(cartList);
  };

  const fetchCart = async () => {
    let user_cart = [];

    let result = await fetch(
      `https://sp11-cart.000webhostapp.com/api/carts_details/count-products-by-uid.php`
    );
    result = await result.json();
    let cart_item = [];
    cart_item = [...cart_item, result.data];
    result.data.forEach((item) => (item.user_id = item.cart_id));
    user_cart = [...user_cart, result.data];
    let count = 0;
    result = await fetch("https://api-admin-dype.onrender.com/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@ltct.com",
        password: "123456",
      }),
    });

    result = await result.json();
    let token = result.access_token;
    result = await fetch("https://api-admin-dype.onrender.com/api/user", {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    });

    result = await result.json();
    let user_list = [];
    user_list = result;

    user_cart[0].forEach((cart) => {
      for (let i = 0; i < cart_item[0].length; i++) {
        if (cart.cart_id === cart_item[0][i].cart_id) {
          user_item = [
            ...user_item,
            {
              user_id: cart.user_id,
              cart_id: cart.cart_id,
              total_products: cart_item[0][i].total_products,
            },
          ];
          count++;
          break;
        }
      }
      if (count === 0)
        user_item = [
          ...user_item,
          { user_id: cart.user_id, cart_id: cart.cart_id, total_products: 0 },
        ];
      count = 0;
    });

    user_item.forEach((element, index) => {
      for (let i = 0; i < user_list.length; i++) {
        if (element.user_id === JSON.stringify(user_list[i].id)) {
          user_item[index] = {
            user_id: element.user_id,
            cart_id: element.cart_id,
            total_products: element.total_products,
            username: user_list[i].name,
            email: user_list[i].email,
          };
          count++;
          break;
        }
      }
      if (count == 0)
        user_item[index] = {
          user_id: element.user_id,
          cart_id: element.cart_id,
          total_products: element.total_products,
          username: "default",
          email: "default",
        };
      count = 0;
    });
    setCartList(user_item);
    setAvailableUser(user_item);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  let navigate = useNavigate();
  const rowCLickHandler = (id) => {
    let path = `/Cart-frontend/${id}`;
    navigate(path);
  };

  return (
    <div className="admin-container">
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text product-more">
                <a href="./home">
                  <i class="fa fa-home"></i> Trang chủ
                </a>
                <a href="./shop">Cửa hàng</a>
                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3>Admin Screen</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm"
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      <div className="user-item-list">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Tên khách hàng</th>
              <th>Email</th>
              <th>Số sản phẩm trong giỏ hàng</th>
            </tr>
          </thead>
          <tbody>
            {cartList.length > 0 ? (
              availableUser.map((cart) => (
                <tr
                  className="user-info"
                  onClick={() => rowCLickHandler(cart.cart_id)}
                >
                  <td>{cart.user_id}</td>
                  <td>{cart.username}</td>
                  <td>{cart.email}</td>
                  <td>{cart.total_products}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
