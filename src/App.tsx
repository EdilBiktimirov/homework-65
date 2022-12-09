import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import axiosApi from "./axiosApi";
import Page from "./components/Page/Page";
import Navbar from "./components/Navbar/Navbar";
import PageForm from "./components/PageForm/PageForm";
import type {PagesType} from "./types";

function App() {
  const location = useLocation();
  const [pages, setPages] = useState<string[]>([]);

  const fetchPagesName = useCallback(async () => {
    try {
      const response = await axiosApi.get<PagesType | null>('/pages.json');
      const newPages = response.data;

      if (newPages !== null) {
        const pagesNames = Object.keys(newPages);
        setPages(pagesNames);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    void fetchPagesName();
  }, [fetchPagesName, location]);

  return (
    <div className="App">
      <Navbar pages={pages}/>
      <Routes>
        <Route path='/' element={<Page/>}/>
        <Route path='/pages' element={<Page/>}/>
        <Route path={"/pages/:category"} key={Math.random()} element={(
          <Page/>
        )}/>
        <Route path='/pages/admin' element={<PageForm pages={pages} isEdit/>}/>
        <Route path='/pages/add-page' element={<PageForm pages={pages}/>}/>
        <Route path='*' element={<h1 className="mt-3">Not found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
