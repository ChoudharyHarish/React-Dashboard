import React from 'react';
import { Line } from 'react-chartjs-2';


import styles from "./styles.module.scss";

const SeverityTrendChart = ({ severityData }) => {
    const timestamps = severityData.map(item => item.timeStamp);
    const severityLevels = severityData.map(item => item.severity);


    const chartData = {
        labels: timestamps,
        datasets: [{
            label: 'Severity Level',
            data: severityLevels,
            fill: false,
            backgroundColor: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"],
            borderColor: ["#00bfa0", "#b3d4ff", "#dc0ab4", "#ffa300"],
            tension: 0.1,
            borderWidth: 1
        }],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        hour: 'MMM D HH:mm',
                    },
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <div>
        <Line data={chartData} options={options} className={styles.charts} />;
    </div>
};

export default SeverityTrendChart;
