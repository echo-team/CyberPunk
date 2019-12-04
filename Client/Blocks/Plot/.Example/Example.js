import './Example.css';
import Base from '../Plot.js';
import withTimeMarkers from '../withTimeMarkers/Plot.js';
import compose from 'compose';

const Plot = compose(Base, withTimeMarkers);

var plot = new Plot(document.getElementById('plot'), {
    width: 600, height: 300,
    maxDotsAmount: 16,
    legendPaddings: { x: 25, y: 50 },
    secondsOffset: true, measures: 3,
});

plot.pushDots([
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 2 },
    { x: 3, y: 5 },
    { x: 4, y: 4.5 },
    { x: 5, y: 3 },
    { x: 6, y: 2.8 },
    { x: 7, y: 1 },
    { x: 8, y: 1.4 },
    { x: 9, y: 3 },
    { x: 10, y: 2 },
]);

var dots = [
        { x: 11, y: 3 },
        { x: 12, y: 2.9 },
        { x: 13, y: 2.3 },
        { x: 14, y: 4 },
        { x: 15, y: 4.9 },
        { x: 16, y: 4.5 },
        { x: 17, y: 3 },
        { x: 18, y: 1 },
        { x: 19, y: 1.6 },
        { x: 20, y: 2 },
        { x: 21, y: 3 },
    ],
    current = 0,
    timer = setInterval(() =>
    {
        plot.pushDots([dots[current]]);
        current ++;

        if (current >= dots.length)
        {
            clearInterval(timer);
        }
    }, 1000);
