import React, {useState} from "react";
import * as XLSX from 'xlsx';
import {ExpenseEntity} from 'types';
import '../styles/DownloadButton.scss';
import el1 from '../styles/images/Download.png'

interface Props {
    name: string;
    trades: ExpenseEntity[];
    color: string;
}
export const DownloadButton = (props: Props) => {

    const [isHovered1, setIsHovered1] = useState(false);
    const handleMouseEnter1 = () => {
        setIsHovered1(true);
    };
    const handleMouseLeave1 = () => {
        setIsHovered1(false);
    };

    let wanted = '';
    let wantedColor = '';

    if (props.color === "blue") {
        wanted = '#3498db';
        wantedColor = '#3498db'
    } else {
        wanted = 'rgba(213, 219, 52, 0.77)';
        wantedColor = 'rgba(165, 168, 71, 0.77)'
    }

    const color = {
        backgroundColor: isHovered1 ? '#ffffff' : wanted,
        color: isHovered1 ? wantedColor : '#ffffff',
        border: `solid 2px ${wanted}`,
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
            style={color}
        >
            {isHovered1 && `Download expenses`}
        </button>
            {!isHovered1 && <img src={el1} alt="Download Icon" className="download-icon"/>}
        </label>
    </>
}