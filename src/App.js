import React, { useState } from "react";
import Table from "./components/Table/Table";
import CheckoutContainer from "./components/CheckoutContainer/CheckoutContainer";

function App() {
  const [items, setItems] = useState([
    {
      id: "item1",
      image: "../../img/nguyen_nhat_anh.jpg",
      title: "Toi thay hoa vang tren co xanh",
      price: 100000,
    },
    {
      id: "item2",
      image: "../../img/nguyen_nhat_anh.jpg",
      title: "Title abc 123",
      price: 150000,
    },
    {
      id: "item3",
      image: "../../img/nguyen_nhat_anh.jpg",
      title: "Bla bla bla bla bla",
      price: 200000,
    },
    {
      id: "item4",
      image: "../../img/nguyen_nhat_anh.jpg",
      title: "Something really random",
      price: 205000,
    },
  ]);

  const deleteItemHandler = (id) => {
    setItems((items) => {
      const updatedItems = items.filter((item) => item.id !== id);
      return updatedItems;
    });
  };

  return (
    <React.Fragment>
      <main>
        <div>
          <div>
            <a href="google.com" className="cart--info--backlink">
              Cart information:
            </a>
          </div>
          <div className="table-justify-data">
            <Table itemData={items} onDeleteItem={deleteItemHandler} />
          </div>
        </div>

        <CheckoutContainer showUpdatedItems={items} />
      </main>
      {/* <CheckoutForm /> */}
    </React.Fragment>
  );
}

export default App;
