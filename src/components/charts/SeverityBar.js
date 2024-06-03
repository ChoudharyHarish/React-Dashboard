import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from "./styles.module.scss"

const SeverityGraph = ({ severityData }) => {
    // Extract severity levels from the severityData data

    console.log(severityData)

    const severityCounts = {};
    severityData.forEach(severity => {
        severityCounts[severity] = (severityCounts[severity] || 0) + 1;
    });


    console.log(severityCounts);

    const data = {
        labels: Object.keys(severityCounts),
        datasets: [{
            label: 'Severity Level',
            data: Object.values(severityCounts),
            backgroundColor: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"],
            borderColor: ["#00bfa0", "#b3d4ff", "#dc0ab4", "#ffa300"],
            borderWidth: 1,
        }],
    };

    // Chart options
    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Bar data={data} options={options} className={styles.charts} />;
        </div>
    )
};

export default SeverityGraph;
