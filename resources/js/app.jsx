/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import "./bootstrap";

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "../css/app.css";
import Layout from "./components/layout/Layout";
import store from "./store/store";
import { Provider } from "react-redux";

if (document.getElementById("root")) {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Layout />
      </Provider>
    </React.StrictMode>
  );
}
