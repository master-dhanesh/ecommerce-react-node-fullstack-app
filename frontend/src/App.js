import axios from "axios";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import { useSelector } from "react-redux";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";

import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ProtectedRoute from "./component/Route/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeAPiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    axios.defaults.baseURL = "http://localhost:4000/";
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeAPiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="" element={<Profile />} />
        </Route>

        <Route path="/me/update" element={<ProtectedRoute />}>
          <Route path="" element={<UpdateProfile />} />
        </Route>

        <Route path="/password/update" element={<ProtectedRoute />}>
          <Route path="" element={<UpdatePassword />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route path="" element={<Shipping />} />
        </Route>

        <Route path="/order/confirm" element={<ProtectedRoute />}>
          <Route path="" element={<ConfirmOrder />} />
        </Route>

        {stripeApiKey && (
          <Route path="/process/payment" element={<ProtectedRoute />}>
            <Route
              path=""
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          </Route>
        )}

        <Route path="/success" element={<ProtectedRoute />}>
          <Route path="" element={<OrderSuccess />} />
        </Route>

        <Route path="/orders" element={<ProtectedRoute />}>
          <Route path="" element={<MyOrders />} />
        </Route>

        <Route path="/order/:id" element={<ProtectedRoute />}>
          <Route path="" element={<OrderDetails />} />
        </Route>

        <Route path="/admin/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
