import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import "./index.css";
import { Provider } from 'react-redux';  // ← نزيدو هاد
import { store } from './store/store';   // ← نزيدو هاد


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <App />
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> f007301275f37080fbfbd8fc8073737b29d81c58
    </Provider>
  </React.StrictMode>
);
