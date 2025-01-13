import React, { memo, useMemo } from 'react';
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

const ChartComponent = memo(({ labels, datasetLabel, data, borderColor = 'blue' }) => {
    // Memoize chart data to avoid unnecessary recalculations
    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: datasetLabel,
                data,
                fill: false,
                borderColor,
                tension: 0.1, // Curve smoothness
            },
        ],
    }), [labels, datasetLabel, data, borderColor]);

    // Chart options
    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
    }), []);

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
});

ChartComponent.defaultProps = {
    borderColor: 'blue',
};

export default ChartComponent;
