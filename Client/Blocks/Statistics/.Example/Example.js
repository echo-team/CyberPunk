import './Example.css';
import Statistics from '../Statistics';

var statistics = new Statistics(
    document.getElementById('statistics'),
    {
        variables: [
            { name: 'Current amount:', value: 5643 },
            { name: 'In 5s:', value: '146' },
        ]
    }
);