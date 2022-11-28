import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  const [productsData, setProductsData] = useState([]);
  const [cartListData, setCartListData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [displaySearchData, setDisplaySearchData] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [url, setUrl] = useState("https://dummyjson.com/products");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProductsData(data.products));
  }, [url]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategoriesData(data));
  }, []);

  function defaultPage() {
    setUrl("https://dummyjson.com/products");
    setSelectedCategories("");
    setSearchData(false);
  }

  function searchProducts(e) {
    const searchValue = e.currentTarget.value;
    setSearchData(searchValue);
  }

  function onPressEnterInputValue() {
    setUrl(`https://dummyjson.com/products/search?q=${searchData}`);
    setDisplaySearchData(true);
  }

  function clickCategories(e) {
    const categoriesName = e.currentTarget.id;
    setSelectedCategories(categoriesName);
    setUrl(`https://dummyjson.com/products/category/${categoriesName}`);
  }

  function addToCart(id) {
    isProductsInCart(id)
      ? removeFromCart(id)
      : setCartListData((prevItems) => [...prevItems, getProductById(id)]);
  }

  function isProductsInCart(id) {
    return getProductsFromCartById(id).length !== 0;
  }

  function getProductsFromCartById(id) {
    return cartListData.filter((item) => item.id === id);
  }

  function getProductById(id) {
    return productsData.filter((item) => item.id === id)[0];
  }

  function removeFromCart(id) {
    const updatedList = cartListData.filter((item) => item.id !== id);
    setCartListData(updatedList);
  }

  function emptyCart() {
    setCartListData([]);
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home
              productsData={productsData}
              categoriesData={categoriesData}
              searchProducts={searchProducts}
              addToCart={addToCart}
              cartListData={cartListData}
              onPressEnterInputValue={onPressEnterInputValue}
              clickCategories={clickCategories}
              selectedCategories={selectedCategories}
              searchData={searchData}
              displaySearchData={displaySearchData}
              defaultPage={defaultPage}
            />
          </Route>
          <Route path="/cart">
            <Cart
              productsData={productsData}
              addToCart={addToCart}
              cartListData={cartListData}
              emptyCart={emptyCart}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
