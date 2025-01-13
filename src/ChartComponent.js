// ChartComponent.js
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ labels, datasetLabel, data, borderColor = 'blue' }) => {
    // Chart data
    const chartData = {
        labels: labels, // X-axis labels
        datasets: [
            {
                label: datasetLabel,
                data: data, // Y-axis data
                fill: false,
                borderColor: borderColor,
                tension: 0.1, // Curve smoothness
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default ChartComponent;
