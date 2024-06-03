import React from 'react';
import { Pie } from 'react-chartjs-2';

import styles from "./styles.module.scss";

const EventTypeDistributionChart = ({ eventTypes }) => {

    const uniqueEvents = new Set(eventTypes);
    const array = Array.from(uniqueEvents);

    const eventData = array.map(event => {
        return eventTypes.filter(item => item === event).length;
    });

    const data = {
        labels: array,
        datasets: [{
            data: eventData,
            backgroundColor: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"],
            borderColor: "#00bfa0",
            borderWidth: 1,
        }],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#ffffff', // Set label color to white for better contrast on dark backgrounds
                },
            },
            title: {
                display: true,
                text: 'Alert types',
                color: '#ffffff', // Set title color to white
            },
        },
    };


    return (
        <div className=''>
            <Pie data={data} className={styles.charts} options={options} />
        </div>
    )
};

export default EventTypeDistributionChart;
