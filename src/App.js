import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux";
import Routers from './router';

function App() {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}

export default App;
