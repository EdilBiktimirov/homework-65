import React from 'react';
import './App.css';
import Page from "./components/Page/Page";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PageForm from "./components/PageForm/PageForm";


// const INFO = [
//   {id: 'home'},
//   {id: 'info'},
//   {id: 'products'},
//   {id: 'contacts'},
//   {id: 'about'},
//   {id: 'admin'},
// ]

function App() {


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<h1 className="mt-3">Please choose page</h1>}/>

        <Route path={"/pages/:category"} key={Math.random()} element={(
          <Page/>
        )}/>

        <Route path='/pages/admin' element={<PageForm/>}/>

        <Route path='*' element={<h1 className="mt-3">Not found</h1>}/>


      </Routes>
    </div>
  );
}

export default App;
