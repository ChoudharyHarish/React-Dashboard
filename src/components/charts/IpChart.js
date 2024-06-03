import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import styles from "./styles.module.scss";
import { Bar } from 'react-chartjs-2';

const TopSourceIPChart = ({ sourceIPs }) => {
    // const chartRef = useRef(null);
    // const chartInstanceRef = useRef(null);

    // useEffect(() => {
    //     if (!chartRef.current || sourceIPs.length === 0) return;

    //     // Clear previous chart instance if exists
    //     if (chartInstanceRef.current) {
    //         chartInstanceRef.current.destroy();
    //     }

    const uniqueSourceIPsSet = new Set(sourceIPs);
    const uniqueSourceIPsArray = Array.from(uniqueSourceIPsSet);

    const eventData = uniqueSourceIPsArray.map(ip => {
        return sourceIPs.filter(item => item === ip).length;
    });

    // const ctx = chartRef.current.getContext('2d');

    const data = {
        labels: uniqueSourceIPsArray,
        datasets: [{
            label: "No of events by an ip",
            data: eventData,
            backgroundColor: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"],
            borderColor: "#00bfa0",
            borderWidth: 1,
        }]
    }

    const options = {
        scales: {
            x: {
                type: 'category',
                display: false
            },
            y: {
                beginAtZero: true,
                max: 30
            }
        }
    }

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
};

export default TopSourceIPChart;
