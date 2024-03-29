import React, {useContext, useEffect, useMemo, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import el1 from "../components/styles/images/Back-arrow.png";
import el2 from "../components/styles/images/Date.png";
import "../components/styles/DetailedMonth.scss"
import {useRecordContext} from "../components/context/RecordContext";
import ReactPaginate from 'react-js-pagination';
import {SearchComponent} from "../components/search/SearchComponent";
import { ExpenseEntity } from "types";
import {SearchContext} from "../components/search/SearchContext";
import {DownloadButton} from "../components/download/DownloadButton";
import el3 from "../components/styles/images/Sum.png";
import el4 from "../components/styles/images/Category.png";
import el5 from "../components/styles/images/Top.png";
import {ExpenseDetailsPanel} from "../components/expenses/DetailedInfo";


export const DetailedPageMonth = () => {

    const {year, month} = useParams<{ year: string, month: string }>();

    const {summaryMonth, groupedByDate, fetchRecords, fetchMonthSummary} = useRecordContext();

    const {search, setSearch} = useContext(SearchContext)

    useEffect(() => {
        fetchRecords();
        fetchMonthSummary(year, month);
    }, []);

    const memoizedData = useMemo(() => groupedByDate, [groupedByDate]);
    const memoizedMonthData = useMemo(() => summaryMonth, [summaryMonth]);

    const singleMonth = memoizedData && memoizedData[`${year}`] && memoizedData[`${year}`][`${month}`] ? memoizedData[`${year}`][`${month}`] : [];

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const [option, setOption] = useState<string>('Old');

    const [selectedExpense, setSelectedExpense] = useState<ExpenseEntity | null>(null);

    const handleExpenseClick = (expense: ExpenseEntity) => {
        setSelectedExpense(expense);
    };

    const handleClosePanel = () => {
        setSelectedExpense(null);
    };

    const handleMouseEnter1 = () => {
        setIsHovered1(true);
    };

    const handleMouseLeave1 = () => {
        setIsHovered1(false);
    };
    const handleMouseEnter2 = () => {
        setIsHovered2(true);
    };

    const handleMouseLeave2 = () => {
        setIsHovered2(false);
    };
    const handleMouseEnter3 = () => {
        setIsHovered3(true);
    };

    const handleMouseLeave3 = () => {
        setIsHovered3(false);
    };

    const calculateRowsPerPage = () => {
        const windowHeight = window.innerHeight;

        const rowsPerPage = Math.floor((windowHeight - 250 - 46) / 80);

        return rowsPerPage > 0 ? rowsPerPage * 5 : 5;
    };

    const [rowsPerPage, setRowsPerPage] = useState(calculateRowsPerPage);

    useEffect(() => {
        const handleResize = () => {
            setRowsPerPage(calculateRowsPerPage());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    let shownData: ExpenseEntity[] = singleMonth.filter(
        expense => {
            return (
                expense
                    .name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        }
    );

    if (option === "Old") {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.month < b.month) {
                return -1;
            }
            if (a.month > b.month) {
                return 1;
            }
            return 0;
        })
    } else if (option === "New") {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.month < b.month) {
                return 1;
            }
            if (a.month > b.month) {
                return -1;
            }
            return 0;
        })
    } else if (option === "A-Z") {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
    } else if (option === 'Z-A') {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        })
    } else if (option === 'High') {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.cost < b.cost) {
                return 1;
            }
            if (a.cost > b.cost) {
                return -1;
            }
            return 0;
        })
    } else if (option === 'Low') {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        })
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastExpense = currentPage * rowsPerPage;
    const indexOfFirstExpense = indexOfLastExpense - rowsPerPage;
    const currentExpenses = shownData.slice(indexOfFirstExpense, indexOfLastExpense);

    const allExpenses =
        <>
            <div className="month-content">
                {currentExpenses.map((expense, index) => (
                    <div className="single-expense" key={index} onClick={() => handleExpenseClick(expense)}>
                        <div className="left">
                            <div>
                                {expense.name}
                            </div>
                            <div className="date">
                                <img className="date__icon" src={el2} alt=""/>
                                <div style={{color: "rgba(194,206,217,0.42", fontSize: "12px"}}>
                                    {expense.month}
                                </div>
                            </div>
                        </div>
                        <div className="right" style={{color: "#3498db"}}>
                            {expense.cost}$
                        </div>
                    </div>
                ))}
            </div>
            <ReactPaginate
                totalItemsCount={shownData.length}
                itemsCountPerPage={rowsPerPage}
                onChange={handlePageChange}
                activePage={currentPage}
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="page-link__active"
            />
        </>

    const noResults = <div className="failure">
        No results
    </div>

    return (
        <div className="detailed-month">
            <header className="month-header">
                <NavLink className="back-link" onClick={() => setSearch('')} to={`/details/past/${year}`}>
                    <img className="back-icon" src={el1} alt=""/>
                </NavLink>
                <h1>Details for the month <span style={{color: "#3498db"}}>{month} {year}</span></h1>
            </header>
            <div className="overall-month-stats">
                <div className="month-stat">
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px"}}>
                        <img src={el3} alt="" style={{height: "20px", marginRight: "5px"}}/>
                        <div className="month-stat__title">
                            Sum of money spent:
                        </div>
                    </div>
                    <hr/>
                    <div className="month-stat__value">
                        {memoizedMonthData.sum}$
                    </div>
                </div>
                <div className="month-stat">
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px"}}>
                        <img src={el4} alt="" style={{height: "20px", marginRight: "5px"}}/>
                        <div className="month-stat__title">
                            Category statistics:
                        </div>
                    </div>
                    <hr/>
                    <div className="month-stat2">
                        <div className="cat">Category on which you spend the most money on:</div>
                        <div className="month-stat__handler">
                            <div
                                className={isHovered1 ? "month-stat__value2-hovered" : "month-stat__value2"}
                                onMouseEnter={handleMouseEnter1}
                                onMouseLeave={handleMouseLeave1}
                            >
                                {isHovered1 ? `${memoizedMonthData.maxAmountCat}$` : memoizedMonthData.categoryMost}
                            </div>
                        </div>
                    </div>
                    <div className="month-stat2">
                        <div className="cat">Category on which you spend the least money on:</div>
                        <div className="month-stat__handler">
                            <div
                                className={isHovered2 ? "month-stat__value2-hovered" : "month-stat__value2"}
                                onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2}
                            >
                                {isHovered2 ? `${memoizedMonthData.minAmountCat}$` : memoizedMonthData.categoryLeast}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="month-stat">
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px"}}>
                        <img src={el5} alt="" style={{height: "20px", marginRight: "5px"}}/>
                        <div className="month-stat__title">
                            The biggest expense:
                        </div>
                    </div>
                    <hr/>
                    <div
                        className={isHovered3 ? "month-stat__value-hovered" : "month-stat__value"}
                        onMouseEnter={handleMouseEnter3}
                        onMouseLeave={handleMouseLeave3}
                    >
                        {isHovered3 ? `${memoizedMonthData.cost}$` : memoizedMonthData.latest}
                    </div>
                </div>
            </div>
            <div className="manage">
                <SearchComponent page={() => setCurrentPage(1)}/>
                <div className="select">
                    <select className="select2" onChange={(e) => setOption(e.target.value)}>
                        <option value="Old">Old</option>
                        <option value="New">New</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <DownloadButton color="blue" name={`${month}_${year}` as string} trades={shownData}/>
            </div>
            <hr className="other-hr"/>
            <div className={`overlay${selectedExpense ? ' show' : ''}`} onClick={handleClosePanel}></div>
            <div className={`expense-details-panel${selectedExpense ? ' show' : ''}`}>
                {selectedExpense && (
                    <ExpenseDetailsPanel
                        expense={selectedExpense}
                        onClose={handleClosePanel}
                    />
                )}
            </div>
            {shownData.length === 0 ? noResults : allExpenses}
        </div>
    )
}