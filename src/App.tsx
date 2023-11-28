import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./views/HomePage";
import {InfoPage} from "./views/InfoPage";
import {CreatorPage} from "./views/CreatorPage";
import {DetailedPage} from "./views/DetailedPage";
export const App = () => {

  return (
    <div className="App">
        <Header/>
        <div className="content">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/info" element={<InfoPage/>}/>
                <Route path="/creator" element={<CreatorPage/>}/>
                <Route path="/detailed/:id" element={<DetailedPage/>}/>
            </Routes>
        </div>
    </div>
  );
}

