import React, {useContext, useEffect, useMemo, useState} from 'react';
import '../components/styles/DetailedPageFuture.scss';
import {DownloadButton} from "../components/download/DownloadButton";
import {NavLink} from "react-router-dom";
import {useRecordContext} from "../components/context/RecordContext";
import el2 from "../components/styles/images/Sum.png";
import el1 from "../components/styles/images/Calendar.png";
import el3 from "../components/styles/images/Category.png";
import el4 from "../components/styles/images/Back-arrow.png";
import el5 from "../components/styles/images/Expense-name.png";
import el6 from "../components/styles/images/Time.png";
import el7 from "../components/styles/images/Overdue.png";
import el8 from "../components/styles/images/Cost.png";
import {SearchContext} from "../components/search/SearchContext";
import { ExpenseEntity } from 'types';
import ReactPaginate from "react-js-pagination";
import {SearchComponent} from "../components/search/SearchComponent";
import {ExpenseDetailsPanelFuture} from "../components/expenses/DetailedInfoFuture";
export const DetailedPageFuture = () => {
    const {allFutureRecords, summaryFuture, fetchFutureRecords } = useRecordContext();

    const {search, setSearch} = useContext(SearchContext);

    useEffect(() => {
        fetchFutureRecords();
    }, []);

    const headers = ['Name', 'Category', 'Cost', 'Date', 'Overdue'];

    const memoizedSummary = useMemo(() => summaryFuture, [summaryFuture]);
    const memoizedData = useMemo(() => allFutureRecords, [allFutureRecords]);

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);

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
    const handleMouseEnter4 = () => {
        setIsHovered4(true);
    };

    const handleMouseLeave4 = () => {
        setIsHovered4(false);
    };

    const calculateRowsPerPage = () => {
        const windowHeight = window.innerHeight;

        const rowsPerPage = Math.floor((windowHeight - 270 - 50 - 85 - 50) / 60);

        return rowsPerPage > 0 ? rowsPerPage : 1;
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

    let shownData: ExpenseEntity[] = memoizedData.filter(
        expense => {
            return (
                expense
                    .name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        }
    );

    const handleToggleName = () => {
        setOption((prevOption) => (prevOption === 'A-Z' ? 'Z-A' : 'A-Z'));
    };
    const handleToggleCat = () => {
        setOption((prevOption) => (prevOption === 'CatUp' ? 'CatDown' : 'CatUp'));
    };
    const handleToggleCost = () => {
        setOption((prevOption) => (prevOption === 'Low' ? 'High' : 'Low'));
    };
    const handleToggleDate = () => {
        setOption((prevOption) => (prevOption === 'Old' ? 'New' : 'Old'));
    };

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
    } else if (option === 'CatUp') {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.category < b.category) {
                return -1;
            }
            if (a.category > b.category) {
                return 1;
            }
            return 0;
        })
    } else if (option === 'CatDown') {
        shownData = shownData.sort(function (a: ExpenseEntity, b: ExpenseEntity) {
            if (a.category < b.category) {
                return 1;
            }
            if (a.category > b.category) {
                return -1;
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

    const yes = <span style={{color: "red"}}>Yes</span>
    const no = <span style={{color: "green"}}>No</span>

    const allExpenses =
        <>
            <div className="planned-expenses">
                <table className="table">
                    <thead>
                    <tr>
                        <th key={headers[0]} onClick={handleToggleName}><img src={el5} className="small-icon" alt=""/>{headers[0]}</th>
                        <th key={headers[1]} onClick={handleToggleCat}><img src={el3} className="small-icon" alt=""/>{headers[1]}</th>
                        <th key={headers[2]} onClick={handleToggleCost}><img src={el8} className="small-icon" alt=""/>{headers[2]}</th>
                        <th key={headers[3]} onClick={handleToggleDate}><img src={el6} className="small-icon" alt=""/>{headers[3]}</th>
                        <th key={headers[4]}><img src={el7} className="small-icon" alt=""/>{headers[4]}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentExpenses.map((row, rowIndex) => (
                        <tr key={rowIndex} onClick={() => handleExpenseClick(row)}>
                            <td key={row['id']}>{row['name']}</td>
                            <td key={row['category']}>{row['category']}</td>
                            <td key={row['cost']}>{row['cost']}</td>
                            <td key={row['month']}>{row['month']}</td>
                            <td key={row['notes']}>{
                                new Date(row['month']).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ? yes : no
                            }</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                totalItemsCount={shownData.length}
                itemsCountPerPage={rowsPerPage}
                onChange={handlePageChange}
                activePage={currentPage}
                itemClass="page-item2"
                linkClass="page-link2"
                activeLinkClass="page-link2__active"
            />
        </>

    const noResults = <div className="failure">
        No results
    </div>

    return <div className="detailed-page-future">
        <header className="header">
            <NavLink className="back-link" onClick={() => setSearch('')} to='/details'>
                <img className="back-icon" src={el4} alt=""/>
            </NavLink>
            <h1>All planned expenses</h1>
        </header>
        <div className="overall-stats-future">
            <div className="stat-future">
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <img src={el2} alt="" style={{height: "35px", marginRight: "5px"}}/>
                    <h2 className="stat__title">
                        Cost of all plans:
                    </h2>
                </div>
                <hr/>
                <div className="stat__handler">
                    <div className="stat__value">
                        {memoizedSummary.sum}$
                    </div>
                </div>
            </div>
            <div className="stat-future">
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <img src={el1} alt="" style={{height: "35px", marginRight: "5px"}}/>
                    <h2 className="stat__title">
                        Month statistics:
                    </h2>
                </div>
                <hr/>
                <div className="stat2-future">
                    <div className="in-future">Month in which most money is planned:</div>
                    <div className="stat__handler">
                        <div
                            className={isHovered1 ? "stat__value2-hovered" : "stat__value2"}
                            onMouseEnter={handleMouseEnter1}
                            onMouseLeave={handleMouseLeave1}
                        >
                            {isHovered1 ? `${memoizedSummary.maxAmountMonth}$` : memoizedSummary.monthMost}
                        </div>
                    </div>
                </div>
                <div className="stat2-future">
                    <div className="in-future">Month in which the least amount of money is planned:</div>
                    <div className="stat__handler">
                        <div
                            className={isHovered2 ? "stat__value2-hovered" : "stat__value2"}
                            onMouseEnter={handleMouseEnter2}
                            onMouseLeave={handleMouseLeave2}
                        >
                            {isHovered2 ? `${memoizedSummary.minAmountMonth}$` : memoizedSummary.monthLeast}
                        </div>
                    </div>
                </div>
            </div>
            <div className="stat-future">
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <img src={el3} alt="" style={{height: "35px", marginRight: "5px"}}/>
                    <h2 className="stat__title">
                        Category statistics:
                    </h2>
                </div>
                <hr/>
                <div className="stat2-future">
                    <div className="in-future">Category on which you plan to spend the most money on:</div>
                    <div className="stat__handler">
                        <div
                            className={isHovered3 ? "stat__value2-hovered" : "stat__value2"}
                            onMouseEnter={handleMouseEnter3}
                            onMouseLeave={handleMouseLeave3}
                        >
                            {isHovered3 ? `${memoizedSummary.maxAmountCat}$` : memoizedSummary.categoryMost}
                        </div>
                    </div>
                </div>
                <div className="stat2-future">
                    <div className="in-future">Category on which you plan to spend the least money on:</div>
                    <div className="stat__handler">
                        <div
                            className={isHovered4 ? "stat__value2-hovered" : "stat__value2"}
                            onMouseEnter={handleMouseEnter4}
                            onMouseLeave={handleMouseLeave4}
                        >
                            {isHovered4 ? `${memoizedSummary.minAmountCat}$` : memoizedSummary.categoryLeast}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <SearchComponent page={() => setCurrentPage(1)}/>
            {option !== 'Old' && <button className="reset" onClick={() => setOption("Old")}>Reset filters</button>}
            <DownloadButton color="yellow" name={`Planned expenses` as string} trades={shownData}/>
        </div>
        <hr className="other-hr"/>
        <div className={`overlay${selectedExpense ? ' show' : ''}`} onClick={handleClosePanel}></div>
        <div className={`expense-details-panel${selectedExpense ? ' show' : ''}`}>
            {selectedExpense && (
                <ExpenseDetailsPanelFuture
                    expense={selectedExpense}
                    onClose={handleClosePanel}
                />
            )}
        </div>
        {shownData.length === 0 ? noResults : allExpenses}
    </div>
}