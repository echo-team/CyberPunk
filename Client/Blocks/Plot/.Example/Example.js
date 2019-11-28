import './Example.css';
import Plot from '../Plot';

var plot = new Plot(document.getElementById('plot'), { width: 600, height: 300 });

plot.pushDots([
    { x: 0, y: 100 },
    { x: 1, y: 130 },
    { x: 2, y: 110 },
    { x: 3, y: 60 },
    { x: 4, y: 80 },
    { x: 5, y: 100 },
    { x: 6, y: 160 },
    { x: 7, y: 150 },
    { x: 8, y: 140 },
    { x: 9, y: 160 },
    { x: 10, y: 130 },
]);

var dots = [
        { x: 11, y: 50 },
        { x: 12, y: 60 },
        { x: 13, y: 90 },
        { x: 14, y: 60 },
        { x: 15, y: 120 },
        { x: 16, y: 100 },
        { x: 17, y: 110 },
        { x: 18, y: 150 },
        { x: 19, y: 140 },
        { x: 20, y: 100 },
        { x: 21, y: 90 },
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
