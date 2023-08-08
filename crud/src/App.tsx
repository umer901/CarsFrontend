import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import "./App.css";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import AllCars from "./pages/AllCars";
import { Provider } from 'react-redux';
import { store } from './features/store';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';

 
function App() {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<AllCars />}></Route>
            <Route path="/add-car" element={<AddCar />}></Route>
            <Route path="edit-car/:id" element={<EditCar />}></Route>
          </Routes>
        </Layout>
      </Provider>
    </>
  );
}

export default App;