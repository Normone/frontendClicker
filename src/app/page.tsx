"use client";
import styles from "./page.module.css";
import { Provider } from "react-redux";
import store from "../store";
import App from "./App";

export default function Home() {

  return (
    <Provider store={store}>
      <div className={styles.page}>
        <App/>
      </div>
    </Provider>
  );
}
