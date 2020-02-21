import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux";
import BasicLayout from "./pages/BasicLayout";

function App() {
  return (
    <Provider store={store}>
        <BasicLayout />
    </Provider>
  );
}

export default App;
