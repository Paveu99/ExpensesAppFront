import React, {useState} from 'react';
import './App.scss';
import {Header} from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./views/HomePage";
import {InfoPage} from "./views/InfoPage";
import {CreatorPage} from "./views/CreatorPage";
import {DetailedPage} from "./views/DetailedPage";
import el from './components/styles/images/Menu.png';
import {RecordProvider} from "./components/context/RecordContext";
import {DetailedPageYear} from "./views/DetailedPageYear";
import {DetailedPageMonth} from "./views/DetailedPageMonth";
import { SearchContext } from './components/search/SearchContext';
export const App = () => {

    const [search, setSearch] = useState('')

    const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(true);

    const toggleNavbar = () => {
        setIsNavbarHidden(!isNavbarHidden);
    }

  return (
    <div className="App">
        <SearchContext.Provider value={{search, setSearch}}>
            <RecordProvider>
                <button className="test-button" onClick={toggleNavbar}><img src={el} alt="" className="icon-inside"/></button>
                <div className={`navbar ${isNavbarHidden ? 'hidden' : ''}`}>
                    <Header/>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/info" element={<InfoPage/>}/>
                        <Route path="/creator" element={<CreatorPage/>}/>
                        <Route path="/details" element={<DetailedPage/>}/>
                        <Route path="/details/:year" element={<DetailedPageYear/>}/>
                        <Route path="/details/:year/:month" element={<DetailedPageMonth/>}/>
                    </Routes>
                </div>
            </RecordProvider>
        </SearchContext.Provider>
    </div>
  );
}

