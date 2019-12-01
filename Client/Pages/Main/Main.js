import './Main.css';

import Base from '../../Blocks/Plot/Plot';
import withTimeMarkers from '../../Blocks/Plot/withTimeMarkers/Plot';
import compose from 'compose';
import Statistics from '../../Blocks/Statistics/Statistics';

const Plot = compose(Base, withTimeMarkers);

/**
 * Runs when new value received
 * @param {String} value - new value
 * @callback
 */
function onData(value, time)
{
    statistics.update('Current:', value);
    plot.pushDots([{ y: value, x: time }]);
}

var statistics = new Statistics(document.querySelector('.page__statistics'), {
    variables: [
        { name: 'Current:', value: '0' },
        { name: 'In 5sec:', value: '0' },
    ],
});

var plot = new Plot(document.querySelector('.page__plot'), {
    width: 600, height: 400,
    maxDotsAmount: 16,
    legendPaddings: { x: 25, y: 50 },
    secondsOffset: true, measures: 3,
    xScale: 8,
});

/**
 * This part is server-query WebSockets emulation
 * Remove then create one
 */
var time = 48255;

function generateValue()
{
    onData(Math.round(Math.random() * 7), time);
    time += 5;
    setTimeout(generateValue, 5000);
}

generateValue();
