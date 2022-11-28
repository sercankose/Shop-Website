import { useState } from "react";
import { Link } from "react-router-dom";

function Home(props) {
  const [selectedValue, setSelectedValue] = useState("");

  const productsDataHTML = props.productsData.map((item) => {
    return (
      <div key={item.id} id={item.id} className="products">
        <img src={item.thumbnail}></img>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
        <div className="cart-bottom">
          <div className="cart-bottom-star">
            <i className="fa-solid fa-star"></i>
            <p>{item.rating}</p>
          </div>
          <button
            className="add-remove-cart"
            onClick={() => props.addToCart(item.id)}
          >
            {props.cartListData.includes(item)
              ? "Remove from Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  });

  const categoriesDataHTML = props.categoriesData.map((item, index) => (
    <li key={index} onClick={(e) => props.clickCategories(e)} id={item}>
      {item}
    </li>
  ));

  function changeOptions(e) {
    const selectOptions = e.target.value;
    setSelectedValue(selectOptions);
    selectOptions == 2 && lowerToHigherPrice(props.productsData);
    selectOptions == 3 && higherToLowerPrice(props.productsData);
    selectOptions == 4 && higherToLowerRating(props.productsData);
  }

  function lowerToHigherPrice(data) {
    data.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  function higherToLowerPrice(data) {
    data.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  function higherToLowerRating(data) {
    data.sort(function (a, b) {
      return (
        parseFloat(b.rating.toString().substr(1)) -
        parseFloat(a.rating.toString().substr(1))
      );
    });
  }

  return (
    <div>
      <div>
        <header className="header">
          <h1 onClick={props.defaultPage}>Shopping</h1>
          <input
            onChange={(e) => props.searchProducts(e)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                props.onPressEnterInputValue();
              }
            }}
            type="search"
            placeholder="Search Products"
          ></input>

          <Link to="/cart">
            {props.cartListData.length === 0 ? (
              <i className="fa-solid fa-cart-plus fa-2xl "></i>
            ) : (
              <i className="fa-solid fa-cart-shopping fa-2xl "></i>
            )}
          </Link>
        </header>
        <div className="body-container">
          <div className="sidebar-container">
            <h2>Categories</h2>
            <ul className="categories">{categoriesDataHTML}</ul>
          </div>
          <main className="main-page-container">
            <div className="selected-container">
              <select
                onChange={(e) => changeOptions(e)}
                value={selectedValue}
                className="options"
              >
                <option value="" defaultValue disabled>
                  Sort of by
                </option>
                <option value="2">Lower to Higher</option>
                <option value="3">Higher to Lower</option>
                <option value="4">Rating</option>
              </select>
              {props.selectedCategories.length > 0 && (
                <button className="categories-data">
                  {props.selectedCategories}
                </button>
              )}
              {props.displaySearchData && (
                <button className="search-data">{props.searchData}</button>
              )}
            </div>
            {productsDataHTML.length === 0 ? (
              <h3>There is no products!</h3>
            ) : (
              <div className="products-container">{productsDataHTML}</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
