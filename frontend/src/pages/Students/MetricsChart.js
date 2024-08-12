// MetricsChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MetricsChart = ({ relevance, accuracy, efficiency, grammar }) => {
    const data = {
        labels: ['Relevance', 'Accuracy', 'Efficiency', 'Grammar'],
        datasets: [
            {
                label: 'Metrics',
                data: [relevance, accuracy, efficiency, grammar],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return `${context.label}: ${context.raw}%`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h2>Metrics Chart</h2>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default MetricsChart;
