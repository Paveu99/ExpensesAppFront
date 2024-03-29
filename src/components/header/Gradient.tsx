import React, { useState, useEffect } from 'react';
import '../styles/Gradient.scss'
interface MousePosition {
    x: number;
    y: number;
}

interface Props {
    text: string;
}

export const MouseGradientText = (props: Props) => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculateGradient = (): string => {
        const xPercentage = (mousePosition.x / window.innerHeight) * 100;

        return `linear-gradient(${xPercentage}deg, #ff0000 20%, #00ff00 50%, #0000ff 80%)`;
    };

    return (
        <h1
            className="gradient"
            style={{
                backgroundImage: calculateGradient(),
            }}
        >
            {props.text}
        </h1>
    );
};