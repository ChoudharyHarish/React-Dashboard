import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from "./styles.module.scss";

const ConnectionsBarChart = ({ srcIPs, destIPs }) => {

    const connectionCounts = countConnections(srcIPs, destIPs);
    const labels = Object.keys(connectionCounts);

    const data = {
        labels,
        datasets: [{
            label: 'Connection Count',
            data: Object.values(connectionCounts),
            backgroundColor: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"],
            borderColor: ["#00bfa0", "#b3d4ff", "#dc0ab4", "#ffa300"],
            borderWidth: 1,
        }],
    };

    const options = {
        plugins: {
            title: { display: true, text: 'Connections Bar Chart' },
        },
        scales: {
            x: { display: false },
            y: { beginAtZero: true, max: 16 },
        },
    };

    return <div>
        <Bar data={data} options={options} className={styles.charts} />;
    </div>
};

// Function to count occurrences of connections
const countConnections = (srcIPs, destIPs) => {
    const connectionCounts = {};
    for (let i = 0; i < srcIPs.length; i++) {
        const connection = `${srcIPs[i]} - ${destIPs[i]}`;
        connectionCounts[connection] = (connectionCounts[connection] || 0) + 1;
    }
    return connectionCounts;
};

export default ConnectionsBarChart;
