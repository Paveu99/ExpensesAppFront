import React, {useState} from "react";
import * as XLSX from 'xlsx';
import {ExpenseEntity} from 'types';
import '../styles/DownloadButton.scss';
import el1 from '../styles/images/Download.png'
import el2 from '../styles/images/Download-blue.png'

interface Props {
    name: string;
    trades: ExpenseEntity[];
}
export const DownloadButton = (props: Props) => {

    const [isHovered1, setIsHovered1] = useState(false);
    const handleMouseEnter1 = () => {
        setIsHovered1(true);
    };
    const handleMouseLeave1 = () => {
        setIsHovered1(false);
    };
    const downloadXls = (e: React.MouseEvent, data: any) => {
        e.preventDefault();
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, `Expenses "${props.name}".xlsx`);
    }
    return <>
        <label
            className="download-label"
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
        >
        <button
            className="download"
            onClick={(e) => {
                downloadXls(e, props.trades);
            }}
        >
            Download expenses
        </button>
            {isHovered1 ? <img src={el2} alt="Download Icon" className="download-icon"/> :
                <img src={el1} alt="Download Icon" className="download-icon"/>}
        </label>
    </>
}