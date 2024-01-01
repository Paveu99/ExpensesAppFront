import React, {FormEvent, useContext, useState} from "react";
import {SearchContext} from "./SearchContext";
import '../styles/Search.scss';
import el1 from '../styles/images/Search.png'

interface Props {
    page: (pageNumber: number) => void
}

export const SearchComponent = (props: Props) => {

    const {search, setSearch} = useContext(SearchContext);

    const [inputVal, setInputVal] = useState<string>(search);

    function submitHandler(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <label className="search-label">
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Type in expense"
                        value={inputVal}
                        onChange={e => {
                            setInputVal(e.target.value);
                            setSearch(e.target.value);
                            props.page(1);
                        }}
                    />
                    <img src={el1} alt="Search Icon" className="search-icon" />
                </label>
            </form>
        </>
    );
};
